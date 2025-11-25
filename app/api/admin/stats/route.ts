import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { getTenantPrismaClient } from "@/lib/tenant-prisma";

export async function GET() {
  await requireAdmin();

  // Get all users with their tenant database info
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      currentPlan: true,
      createdAt: true,
      tenantDatabaseUrl: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Get stats from each tenant database
  const statsPromises = users.map(async (user) => {
    if (!user.tenantDatabaseUrl) {
      return {
        userId: user.id,
        propertyCount: 0,
        tenancyCount: 0,
        totalMonthlyIncome: 0,
      };
    }

    try {
      const tenantClient = getTenantPrismaClient(user.tenantDatabaseUrl);
      const [properties, tenancies] = await Promise.all([
        tenantClient.property.findMany(),
        tenantClient.tenancy.findMany(),
      ]);

      const totalMonthlyIncome = tenancies.reduce(
        (sum, tenancy) => sum + Number(tenancy.monthlyRent ?? 0),
        0
      );

      return {
        userId: user.id,
        propertyCount: properties.length,
        tenancyCount: tenancies.length,
        totalMonthlyIncome,
      };
    } catch (error) {
      console.error(`Error fetching stats for user ${user.id}:`, error);
      return {
        userId: user.id,
        propertyCount: 0,
        tenancyCount: 0,
        totalMonthlyIncome: 0,
      };
    }
  });

  const stats = await Promise.all(statsPromises);

  // Combine user data with stats
  const usersWithStats = users.map((user) => {
    const userStats = stats.find((s) => s.userId === user.id) || {
      propertyCount: 0,
      tenancyCount: 0,
      totalMonthlyIncome: 0,
    };

    return {
      ...user,
      ...userStats,
    };
  });

  // Calculate totals
  const totals = {
    totalUsers: users.length,
    totalProperties: stats.reduce((sum, s) => sum + s.propertyCount, 0),
    totalTenancies: stats.reduce((sum, s) => sum + s.tenancyCount, 0),
    totalMonthlyIncome: stats.reduce(
      (sum, s) => sum + s.totalMonthlyIncome,
      0
    ),
    freePlanUsers: users.filter((u) => u.currentPlan === "free").length,
    proPlanUsers: users.filter((u) => u.currentPlan === "pro").length,
  };

  return NextResponse.json({
    users: usersWithStats,
    totals,
  });
}

