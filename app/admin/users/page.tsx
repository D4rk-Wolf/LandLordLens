import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Mail, Database } from "lucide-react";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { getTenantPrismaClient } from "@/lib/tenant-prisma";

async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      currentPlan: true,
      createdAt: true,
      tenantDatabaseUrl: true,
      tenantDatabaseName: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const statsPromises = users.map(async (user) => {
    if (!user.tenantDatabaseUrl) {
      return {
        userId: user.id,
        propertyCount: 0,
        tenancyCount: 0,
      };
    }

    try {
      const tenantClient = getTenantPrismaClient(user.tenantDatabaseUrl);
      const [properties, tenancies] = await Promise.all([
        tenantClient.property.findMany(),
        tenantClient.tenancy.findMany(),
      ]);

      return {
        userId: user.id,
        propertyCount: properties.length,
        tenancyCount: tenancies.length,
      };
    } catch (error) {
      return {
        userId: user.id,
        propertyCount: 0,
        tenancyCount: 0,
      };
    }
  });

  const stats = await Promise.all(statsPromises);

  return users.map((user) => {
    const userStats = stats.find((s) => s.userId === user.id) || {
      propertyCount: 0,
      tenancyCount: 0,
    };
    return { ...user, ...userStats };
  });
}

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">View and manage all user accounts</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users by name or email..." className="pl-10" disabled />
              </div>
              <Button variant="outline" disabled>Filter</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>{users.length} total users</CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-sm text-gray-500 py-8 text-center">No users found.</p>
            ) : (
              <div className="space-y-4">
                {users.map((user: any) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{user.name || "No name"}</h4>
                          <Badge variant={user.currentPlan === "pro" ? "default" : "secondary"}>
                            {user.currentPlan || "free"}
                          </Badge>
                          <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
                            {user.role || "LANDLORD"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          {user.tenantDatabaseName && (
                            <div className="flex items-center gap-1">
                              <Database className="h-3 w-3" />
                              <span>{user.tenantDatabaseName}</span>
                            </div>
                          )}
                          <span>{user.propertyCount || 0} properties</span>
                          <span>{user.tenancyCount || 0} tenancies</span>
                          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
