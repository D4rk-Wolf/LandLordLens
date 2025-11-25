"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  PoundSterling
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockData = {
  stats: {
    totalProperties: 8,
    activeTenancies: 12,
    monthlyIncome: 12450,
    pendingCompliance: 3,
  },
  upcomingCompliance: [
    {
      id: 1,
      property: "123 High Street, London",
      type: "Gas Safety Certificate",
      dueDate: "2024-02-15",
      daysUntil: 5,
      priority: "high" as const,
    },
    {
      id: 2,
      property: "45 Park Avenue, Manchester",
      type: "EPC Certificate",
      dueDate: "2024-02-20",
      daysUntil: 10,
      priority: "medium" as const,
    },
    {
      id: 3,
      property: "78 Oak Road, Birmingham",
      type: "Electrical Safety Check",
      dueDate: "2024-02-25",
      daysUntil: 15,
      priority: "medium" as const,
    },
  ],
  recentProperties: [
    {
      id: 1,
      address: "123 High Street, London",
      postcode: "SW1A 1AA",
      tenants: 2,
      monthlyRent: 1850,
      status: "occupied" as const,
    },
    {
      id: 2,
      address: "45 Park Avenue, Manchester",
      postcode: "M1 1AA",
      tenants: 1,
      monthlyRent: 950,
      status: "occupied" as const,
    },
    {
      id: 3,
      address: "78 Oak Road, Birmingham",
      postcode: "B1 1AA",
      tenants: 0,
      monthlyRent: 1200,
      status: "vacant" as const,
    },
  ],
  maintenanceTickets: [
    {
      id: 1,
      property: "123 High Street, London",
      issue: "Boiler not working",
      priority: "urgent" as const,
      status: "open" as const,
      daysOpen: 2,
    },
    {
      id: 2,
      property: "45 Park Avenue, Manchester",
      issue: "Leaking tap in kitchen",
      priority: "medium" as const,
      status: "in-progress" as const,
      daysOpen: 5,
    },
  ],
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s an overview of your portfolio.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockData.stats.totalProperties}</div>
              <p className="text-xs text-gray-500 mt-1">Active properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Tenancies</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockData.stats.activeTenancies}</div>
              <p className="text-xs text-gray-500 mt-1">Current tenants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <PoundSterling className="inline h-5 w-5" />
                {mockData.stats.monthlyIncome.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">Total monthly rent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Compliance</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{mockData.stats.pendingCompliance}</div>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Compliance */}
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
              <div className="space-y-4">
                {mockData.upcomingCompliance.map((item) => (
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
            </CardContent>
          </Card>

          {/* Recent Properties */}
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
              <div className="space-y-4">
                {mockData.recentProperties.map((property) => (
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
                          {property.monthlyRent}/mo
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
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Tickets */}
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
            <div className="space-y-4">
              {mockData.maintenanceTickets.map((ticket) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
