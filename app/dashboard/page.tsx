import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ArrowRight,
  Calendar,
  PoundSterling,
} from "lucide-react";
import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { getTenantPrismaClient } from "@/lib/tenant-prisma";

async function getDashboardData(tenantDbUrl?: string | null) {
  if (!tenantDbUrl) {
    return {
      stats: {
        totalProperties: 0,
        activeTenancies: 0,
        monthlyIncome: 0,
        pendingCompliance: 0,
      },
      upcomingCompliance: [],
      recentProperties: [],
      maintenanceTickets: [],
    };
  }

  const tenantClient = getTenantPrismaClient(tenantDbUrl);

  const [properties, tenancies, complianceRecords, maintenanceTickets] =
    await Promise.all([
      tenantClient.property.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      tenantClient.tenancy.findMany({
        include: { property: true },
      }),
      tenantClient.complianceRecord.findMany({
        include: { property: true, complianceType: true },
        orderBy: { nextDueDate: "asc" },
        take: 5,
      }),
      tenantClient.maintenanceTicket.findMany({
        include: { property: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const monthlyIncome = tenancies.reduce(
    (sum, tenancy) => sum + Number(tenancy.monthlyRent ?? 0),
    0
  );

  const pendingCompliance = complianceRecords.filter(
    (record) => record.nextDueDate < new Date()
  );

  return {
    stats: {
      totalProperties: properties.length,
      activeTenancies: tenancies.length,
      monthlyIncome,
      pendingCompliance: pendingCompliance.length,
    },
    upcomingCompliance: complianceRecords.map((record) => ({
      id: record.id,
      property: record.property.address,
      type: record.complianceType.name,
      dueDate: record.nextDueDate.toISOString(),
      daysUntil: Math.ceil(
        (record.nextDueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      ),
      priority: record.nextDueDate < new Date() ? "high" : "medium",
    })),
    recentProperties: properties.map((property) => {
      const propertyTenancies = tenancies.filter(
        (tenancy) => tenancy.propertyId === property.id
      );
      return {
        id: property.id,
        address: property.address,
        postcode: property.postcode,
        monthlyRent: propertyTenancies.reduce(
          (sum, tenancy) => sum + Number(tenancy.monthlyRent ?? 0),
          0
        ),
        tenants: propertyTenancies.length,
        status: propertyTenancies.some((tenancy) => tenancy.endDate === null)
          ? "occupied"
          : "vacant",
      };
    }),
    maintenanceTickets: maintenanceTickets.map((ticket) => ({
      id: ticket.id,
      property: ticket.property.address,
      issue: ticket.title,
      priority: ticket.priority.toLowerCase(),
      status: ticket.status.toLowerCase(),
      daysOpen: Math.max(
        0,
        Math.ceil(
          (Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )
      ),
    })),
  };
}

export default async function DashboardPage() {
  const user = await requireUser();
  const data = await getDashboardData(user.tenantDatabaseUrl);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here&apos;s an overview of your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Properties
              </CardTitle>
              <Home className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{data.stats.totalProperties}</div>
              <p className="text-xs text-gray-500 mt-1">Active properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Tenancies
              </CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{data.stats.activeTenancies}</div>
              <p className="text-xs text-gray-500 mt-1">Current tenants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Monthly Income
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <PoundSterling className="inline h-5 w-5" />
                {data.stats.monthlyIncome.toLocaleString("en-GB")}
              </div>
              <p className="text-xs text-gray-500 mt-1">Total monthly rent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Compliance
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {data.stats.pendingCompliance}
              </div>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Compliance</CardTitle>
                  <CardDescription>Items requiring your attention</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/compliance">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.upcomingCompliance.length === 0 ? (
                <p className="text-sm text-gray-500">No compliance reminders.</p>
              ) : (
                <div className="space-y-4">
                  {data.upcomingCompliance.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{item.type}</h4>
                          <Badge
                            variant={item.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.property}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {new Date(item.dueDate).toLocaleDateString()}
                          </div>
                          <span>{item.daysUntil} days remaining</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Properties</CardTitle>
                  <CardDescription>Your property portfolio</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/properties">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.recentProperties.length === 0 ? (
                <p className="text-sm text-gray-500">Add your first property to get started.</p>
              ) : (
                <div className="space-y-4">
                  {data.recentProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{property.address}</h4>
                        <p className="text-xs text-gray-500 mb-2">{property.postcode}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {property.tenants} {property.tenants === 1 ? "tenant" : "tenants"}
                          </div>
                          <div className="flex items-center gap-1">
                            <PoundSterling className="h-3 w-3" />
                            £{property.monthlyRent.toLocaleString("en-GB")}
                          </div>
                          <Badge
                            variant={property.status === "occupied" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {property.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/properties/${property.id}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Maintenance Tickets</CardTitle>
                <CardDescription>Open maintenance requests</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/maintenance">View All</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard/maintenance/new">
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {data.maintenanceTickets.length === 0 ? (
              <p className="text-sm text-gray-500">No open maintenance tickets.</p>
            ) : (
              <div className="space-y-4">
                {data.maintenanceTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{ticket.issue}</h4>
                        <Badge
                          variant={ticket.priority === "urgent" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {ticket.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ticket.property}</p>
                      <p className="text-xs text-gray-500">Open for {ticket.daysOpen} days</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
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
