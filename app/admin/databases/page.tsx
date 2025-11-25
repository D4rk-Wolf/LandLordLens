"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Database, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

// Mock database data
const mockDatabases = [
  {
    id: "1",
    name: "tenant_abc123",
    user: "John Smith",
    email: "john@example.com",
    status: "active",
    size: "2.5 MB",
    tables: 7,
    lastBackup: "2024-02-10",
  },
  {
    id: "2",
    name: "tenant_def456",
    user: "Jane Doe",
    email: "jane@example.com",
    status: "active",
    size: "1.8 MB",
    tables: 7,
    lastBackup: "2024-02-10",
  },
  {
    id: "3",
    name: "tenant_ghi789",
    user: "Bob Johnson",
    email: "bob@example.com",
    status: "active",
    size: "0.5 MB",
    tables: 7,
    lastBackup: "2024-02-09",
  },
];

export default function AdminDatabasesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Management</h1>
          <p className="text-gray-600">Monitor and manage all tenant databases</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Databases</CardTitle>
              <Database className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockDatabases.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {mockDatabases.filter(db => db.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Size</CardTitle>
              <Database className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.8 MB</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search databases by name or user..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Databases List */}
        <Card>
          <CardHeader>
            <CardTitle>All Databases</CardTitle>
            <CardDescription>Tenant database overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDatabases.map((db) => (
                <div
                  key={db.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Database className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{db.name}</h4>
                        <Badge variant={db.status === "active" ? "default" : "secondary"}>
                          {db.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{db.user} ({db.email})</span>
                        <span>{db.size}</span>
                        <span>{db.tables} tables</span>
                        <span>Backup: {new Date(db.lastBackup).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Backup</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

