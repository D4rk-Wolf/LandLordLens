import { prisma } from "./prisma";
import { getTenantPrismaClient } from "./tenant-prisma";

async function getTenantPropertyCount(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tenantDatabaseUrl: true },
  });

  if (!user?.tenantDatabaseUrl) {
    return 0;
  }

  const tenantClient = getTenantPrismaClient(user.tenantDatabaseUrl);
  return tenantClient.property.count();
}

export async function checkPropertyLimit(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentPlan: true },
  });

  if (!user) {
    return false;
  }

  if (user.currentPlan === "pro") {
    return true;
  }

  const propertyCount = await getTenantPropertyCount(userId);
  return propertyCount < 1;
}

export async function getPropertyCount(userId: string): Promise<number> {
  return getTenantPropertyCount(userId);
}

