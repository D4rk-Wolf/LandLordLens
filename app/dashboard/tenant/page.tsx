"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Wrench, FileText } from "lucide-react";

// Mock tenant data
const mockTenantData = {
  property: "123 High Street, London",
  tenancy: {
    startDate: "2023-01-15",
    endDate: "2024-01-14",
    monthlyRent: 1850,
    deposit: 2775,
  },
  maintenanceTickets: [
    {
      id: 1,
      issue: "Boiler not working",
      status: "open",
      reportedDate: "2024-02-10",
    },
  ],
};

export default function TenantPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Portal</h1>
          <p className="text-gray-600">Manage your tenancy and maintenance requests</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Home className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{mockTenantData.property}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Tenancy Start</p>
                    <p className="font-medium">{new Date(mockTenantData.tenancy.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tenancy End</p>
                    <p className="font-medium">{new Date(mockTenantData.tenancy.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Monthly Rent</p>
                    <p className="font-medium">£{mockTenantData.tenancy.monthlyRent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Deposit</p>
                    <p className="font-medium">£{mockTenantData.tenancy.deposit.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Maintenance Requests</CardTitle>
                  <Button size="sm">
                    <Wrench className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTenantData.maintenanceTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">{ticket.issue}</h4>
                          <p className="text-sm text-gray-500">
                            Reported: {new Date(ticket.reportedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Wrench className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
