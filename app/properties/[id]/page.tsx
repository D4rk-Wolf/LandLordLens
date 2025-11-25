"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Home, 
  MapPin, 
  Users, 
  PoundSterling,
  Calendar,
  FileText,
  Wrench,
  Edit,
  Plus
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockProperty = {
  id: 1,
  address: "123 High Street",
  city: "London",
  postcode: "SW1A 1AA",
  type: "Flat",
  bedrooms: 2,
  bathrooms: 1,
  monthlyRent: 1850,
  status: "occupied",
  tenants: 2,
  complianceStatus: "good",
  tenancies: [
    {
      id: 1,
      tenantName: "John Smith",
      startDate: "2023-01-15",
      endDate: "2024-01-14",
      monthlyRent: 1850,
      deposit: 2775,
    },
  ],
  compliance: [
    {
      id: 1,
      type: "Gas Safety Certificate",
      dueDate: "2024-02-15",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      type: "EPC Certificate",
      dueDate: "2024-06-01",
      status: "valid",
      priority: "medium",
    },
  ],
  maintenance: [
    {
      id: 1,
      issue: "Boiler not working",
      priority: "urgent",
      status: "open",
      reportedDate: "2024-02-10",
    },
  ],
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockProperty.address}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{mockProperty.city}, {mockProperty.postcode}</span>
              </div>
            </div>
            <Button asChild>
              <Link href={`/properties/${params.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Property
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Property Type</p>
                    <p className="font-medium">{mockProperty.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Bedrooms</p>
                    <p className="font-medium">{mockProperty.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Bathrooms</p>
                    <p className="font-medium">{mockProperty.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Monthly Rent</p>
                    <p className="font-medium flex items-center gap-1">
                      <PoundSterling className="h-4 w-4" />
                      {mockProperty.monthlyRent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <Badge variant={mockProperty.status === "occupied" ? "default" : "secondary"}>
                      {mockProperty.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Compliance Status</p>
                    <Badge variant="default">{mockProperty.complianceStatus}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenancies */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tenancies</CardTitle>
                    <CardDescription>Current and past tenancy agreements</CardDescription>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/properties/${params.id}/tenancies/new`}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Tenancy
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperty.tenancies.map((tenancy) => (
                    <div key={tenancy.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{tenancy.tenantName}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(tenancy.startDate).toLocaleDateString()} - {new Date(tenancy.endDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Monthly Rent</p>
                          <p className="font-medium flex items-center gap-1">
                            <PoundSterling className="h-3 w-3" />
                            {tenancy.monthlyRent.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Deposit</p>
                          <p className="font-medium flex items-center gap-1">
                            <PoundSterling className="h-3 w-3" />
                            {tenancy.deposit.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
                <CardDescription>Recent maintenance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperty.maintenance.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{item.issue}</h4>
                        <div className="flex gap-2">
                          <Badge variant={item.priority === "urgent" ? "destructive" : "secondary"}>
                            {item.priority}
                          </Badge>
                          <Badge variant="outline">{item.status}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        Reported: {new Date(item.reportedDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compliance */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance</CardTitle>
                <CardDescription>Upcoming requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProperty.compliance.map((item) => (
                    <div key={item.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{item.type}</h4>
                        <Badge
                          variant={item.priority === "high" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href={`/properties/${params.id}/compliance/new`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Compliance
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/properties/${params.id}/compliance/new`}>
                    <FileText className="h-4 w-4 mr-2" />
                    Add Compliance Record
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/dashboard/maintenance/new`}>
                    <Wrench className="h-4 w-4 mr-2" />
                    Create Maintenance Ticket
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/properties/${params.id}/tenancies/new`}>
                    <Users className="h-4 w-4 mr-2" />
                    Add New Tenancy
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
