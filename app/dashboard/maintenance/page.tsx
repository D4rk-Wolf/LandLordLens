"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Wrench, 
  AlertTriangle,
  Clock,
  CheckCircle2,
  Home
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockTickets = [
  {
    id: 1,
    property: "123 High Street, London",
    issue: "Boiler not working",
    priority: "urgent",
    status: "open",
    reportedDate: "2024-02-10",
    daysOpen: 2,
    description: "Tenant reports no heating or hot water",
  },
  {
    id: 2,
    property: "45 Park Avenue, Manchester",
    issue: "Leaking tap in kitchen",
    priority: "medium",
    status: "in-progress",
    reportedDate: "2024-02-05",
    daysOpen: 5,
    description: "Kitchen tap has been leaking for several days",
  },
  {
    id: 3,
    property: "78 Oak Road, Birmingham",
    issue: "Broken window lock",
    priority: "low",
    status: "open",
    reportedDate: "2024-02-08",
    daysOpen: 4,
    description: "Bedroom window lock is broken",
  },
  {
    id: 4,
    property: "12 Victoria Street, Bristol",
    issue: "Blocked drain",
    priority: "high",
    status: "resolved",
    reportedDate: "2024-01-28",
    resolvedDate: "2024-02-01",
    description: "Bathroom drain is blocked",
  },
];

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance</h1>
            <p className="text-gray-600">Manage maintenance requests and tickets</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/maintenance/new">
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search maintenance tickets..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <div className="space-y-4">
          {mockTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        ticket.priority === "urgent" 
                          ? "bg-red-100 text-red-600" 
                          : ticket.priority === "high"
                          ? "bg-orange-100 text-orange-600"
                          : ticket.priority === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                        {ticket.status === "resolved" ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Wrench className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{ticket.issue}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Home className="h-4 w-4" />
                          <span>{ticket.property}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 ml-13">{ticket.description}</p>
                    <div className="flex items-center gap-4 ml-13">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {ticket.status === "resolved" 
                            ? `Resolved on ${new Date(ticket.resolvedDate!).toLocaleDateString()}`
                            : `Open for ${ticket.daysOpen} ${ticket.daysOpen === 1 ? "day" : "days"}`
                          }
                        </span>
                      </div>
                      <Badge
                        variant={ticket.priority === "urgent" ? "destructive" : ticket.priority === "high" ? "secondary" : "default"}
                      >
                        {ticket.priority} priority
                      </Badge>
                      <Badge variant={ticket.status === "resolved" ? "default" : "outline"}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
