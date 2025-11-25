import "dotenv/config";
import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Admin user already exists");
    process.exit(0);
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hash(password, 10),
      role: "ADMIN",
      onboardingCompleted: true,
    },
  });

  console.log(`Admin user created: ${user.email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

