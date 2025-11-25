import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import {
  createTenantDatabase,
  generateTenantDatabaseName,
  createTenantDatabaseUrl,
} from "@/lib/db-manager";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = signupSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password, name } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await hash(password, 10),
      },
    });

    const tenantDbName = generateTenantDatabaseName(user.id);
    const tenantResult = await createTenantDatabase(tenantDbName, user.id);

    if (!tenantResult.success || !tenantResult.databaseUrl) {
      console.error("Tenant DB creation failed:", tenantResult.error);
      return NextResponse.json(
        { error: "Could not create tenant database" },
        { status: 500 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        tenantDatabaseName: tenantDbName,
        tenantDatabaseUrl: tenantResult.databaseUrl,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

