"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Database,
  Upload,
  Settings,
  BarChart3
} from "lucide-react";
import Link from "next/link";

// Mock admin data
const mockAdminData = {
  stats: {
    totalUsers: 1247,
    activeSubscriptions: 892,
    monthlyRevenue: 22300,
    totalDatabases: 1247,
  },
  recentPayments: [
    {
      id: 1,
      user: "John Smith",
      email: "john@example.com",
      amount: 25,
      plan: "pro",
      status: "succeeded",
      date: "2024-02-10",
    },
    {
      id: 2,
      user: "Jane Doe",
      email: "jane@example.com",
      amount: 25,
      plan: "pro",
      status: "succeeded",
      date: "2024-02-09",
    },
    {
      id: 3,
      user: "Bob Johnson",
      email: "bob@example.com",
      amount: 0,
      plan: "free",
      status: "active",
      date: "2024-02-08",
    },
  ],
  recentUpdates: [
    {
      id: 1,
      version: "1.2.0",
      description: "Added new compliance tracking features",
      deployedAt: "2024-02-05",
      status: "active",
    },
    {
      id: 2,
      version: "1.1.5",
      description: "Bug fixes and performance improvements",
      deployedAt: "2024-01-28",
      status: "active",
    },
  ],
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, payments, and application updates</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockAdminData.stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockAdminData.stats.activeSubscriptions}</div>
              <p className="text-xs text-gray-500 mt-1">Pro plan users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">£{mockAdminData.stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tenant Databases</CardTitle>
              <Database className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockAdminData.stats.totalDatabases.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Active databases</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest subscription payments</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/payments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{payment.user}</p>
                      <p className="text-xs text-gray-500">{payment.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={payment.plan === "pro" ? "default" : "secondary"}>
                          {payment.plan}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{payment.amount}</p>
                      <Badge
                        variant={payment.status === "succeeded" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* App Updates */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>App Updates</CardTitle>
                  <CardDescription>Deployed application versions</CardDescription>
                </div>
                <Button size="sm" asChild>
                  <Link href="/admin/updates">
                    <Upload className="h-4 w-4 mr-2" />
                    Deploy Update
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAdminData.recentUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="flex items-start justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">v{update.version}</h4>
                        <Badge variant="default" className="text-xs">
                          {update.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                      <p className="text-xs text-gray-500">
                        Deployed: {new Date(update.deployedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
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
  );
}

