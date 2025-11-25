import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth-helpers";
import { getTenantPrismaClient } from "@/lib/tenant-prisma";

const propertySchema = z.object({
  address: z.string().min(3),
  city: z.string().optional(),
  postcode: z.string().min(3),
  propertyType: z.string().optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  monthlyRent: z.coerce.number().min(0).optional(),
});

export async function GET() {
  const user = await requireUser();
  if (!user.tenantDatabaseUrl) {
    return NextResponse.json({ data: [] });
  }

  const tenantClient = getTenantPrismaClient(user.tenantDatabaseUrl);
  const properties = await tenantClient.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: properties });
}

export async function POST(request: Request) {
  const user = await requireUser();
  if (!user.tenantDatabaseUrl) {
    return NextResponse.json(
      { error: "Tenant database not provisioned yet" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const parsed = propertySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const tenantClient = getTenantPrismaClient(user.tenantDatabaseUrl);
  const property = await tenantClient.property.create({
    data: parsed.data,
  });

  return NextResponse.json({ data: property });
}

