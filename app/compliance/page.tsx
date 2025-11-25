"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle2,
  Calendar,
  FileText,
  Home
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockCompliance = [
  {
    id: 1,
    property: "123 High Street, London",
    type: "Gas Safety Certificate",
    dueDate: "2024-02-15",
    daysUntil: 5,
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    property: "45 Park Avenue, Manchester",
    type: "EPC Certificate",
    dueDate: "2024-02-20",
    daysUntil: 10,
    priority: "medium",
    status: "pending",
  },
  {
    id: 3,
    property: "78 Oak Road, Birmingham",
    type: "Electrical Safety Check",
    dueDate: "2024-02-25",
    daysUntil: 15,
    priority: "medium",
    status: "pending",
  },
  {
    id: 4,
    property: "12 Victoria Street, Bristol",
    type: "Gas Safety Certificate",
    dueDate: "2024-06-01",
    daysUntil: 110,
    priority: "low",
    status: "valid",
  },
  {
    id: 5,
    property: "56 King's Road, Leeds",
    type: "EPC Certificate",
    dueDate: "2024-08-15",
    daysUntil: 185,
    priority: "low",
    status: "valid",
  },
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance</h1>
            <p className="text-gray-600">Track all compliance requirements for your properties</p>
          </div>
          <Button asChild>
            <Link href="/compliance/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Compliance Record
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
                  placeholder="Search compliance records..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance List */}
        <div className="space-y-4">
          {mockCompliance.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        item.priority === "high" 
                          ? "bg-red-100 text-red-600" 
                          : item.priority === "medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {item.status === "valid" ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.type}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Home className="h-4 w-4" />
                          <span>{item.property}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-13">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                      </div>
                      <Badge
                        variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "secondary" : "default"}
                      >
                        {item.priority} priority
                      </Badge>
                      <Badge variant={item.status === "valid" ? "default" : "outline"}>
                        {item.status}
                      </Badge>
                      {item.status === "pending" && (
                        <span className="text-sm text-gray-600">
                          {item.daysUntil} {item.daysUntil === 1 ? "day" : "days"} remaining
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
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
