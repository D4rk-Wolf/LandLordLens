import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, TrendingUp, Database, Upload } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { getTenantPrismaClient } from "@/lib/tenant-prisma";

async function getAdminStats() {
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
      return {
        userId: user.id,
        propertyCount: 0,
        tenancyCount: 0,
        totalMonthlyIncome: 0,
      };
    }
  });

  const stats = await Promise.all(statsPromises);

  const totals = {
    totalUsers: users.length,
    totalProperties: stats.reduce((sum, s) => sum + s.propertyCount, 0),
    totalTenancies: stats.reduce((sum, s) => sum + s.tenancyCount, 0),
    totalMonthlyIncome: stats.reduce((sum, s) => sum + s.totalMonthlyIncome, 0),
    freePlanUsers: users.filter((u) => u.currentPlan === "free").length,
    proPlanUsers: users.filter((u) => u.currentPlan === "pro").length,
  };

  const usersWithStats = users.map((user) => {
    const userStats = stats.find((s) => s.userId === user.id) || {
      propertyCount: 0,
      tenancyCount: 0,
      totalMonthlyIncome: 0,
    };
    return { ...user, ...userStats };
  });

  return { totals, users: usersWithStats };
}

export default async function AdminDashboardPage() {
  await requireAdmin();
  const data = await getAdminStats();
  const { totals } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, payments, and application updates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totals.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totals.proPlanUsers}</div>
              <p className="text-xs text-gray-500 mt-1">Pro plan users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Properties</CardTitle>
              <Database className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totals.totalProperties.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Across all users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Monthly Income</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">£{totals.totalMonthlyIncome.toLocaleString("en-GB")}</div>
              <p className="text-xs text-gray-500 mt-1">Tracked rent income</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest registered accounts</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/users">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.users && data.users.length > 0 ? (
                <div className="space-y-4">
                  {data.users.slice(0, 5).map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{user.name || "No name"}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={user.currentPlan === "pro" ? "default" : "secondary"}>
                            {user.currentPlan || "free"}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {user.propertyCount} properties
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No users yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col" asChild>
                  <Link href="/admin/users">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Manage Users</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col" asChild>
                  <Link href="/admin/payments">
                    <DollarSign className="h-6 w-6 mb-2" />
                    <span>View Payments</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col" asChild>
                  <Link href="/admin/databases">
                    <Database className="h-6 w-6 mb-2" />
                    <span>Manage Databases</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col" asChild>
                  <Link href="/admin/updates">
                    <Upload className="h-6 w-6 mb-2" />
                    <span>Deploy Updates</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
