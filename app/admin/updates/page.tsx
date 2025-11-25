"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle2, Clock, X } from "lucide-react";

// Mock update data
const mockUpdates = [
  {
    id: "1",
    version: "1.2.0",
    description: "Added new compliance tracking features and improved dashboard",
    changelog: "- Added gas safety certificate tracking\n- Improved property management UI\n- Bug fixes",
    status: "active",
    deployedAt: "2024-02-05T10:30:00Z",
    deployedBy: "Admin User",
  },
  {
    id: "2",
    version: "1.1.5",
    description: "Bug fixes and performance improvements",
    changelog: "- Fixed database connection issues\n- Improved query performance\n- UI improvements",
    status: "active",
    deployedAt: "2024-01-28T14:20:00Z",
    deployedBy: "Admin User",
  },
  {
    id: "3",
    version: "1.3.0",
    description: "New features coming soon",
    changelog: "In development",
    status: "pending",
    deployedAt: null,
    deployedBy: null,
  },
];

export default function AdminUpdatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">App Updates</h1>
            <p className="text-gray-600">Deploy updates and manage application versions</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Deploy New Update
          </Button>
        </div>

        {/* Deploy Update Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Deploy New Update</CardTitle>
            <CardDescription>Create and deploy a new application version</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Version Number</label>
                  <Input placeholder="e.g., 1.2.0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input placeholder="Brief description of the update" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Changelog</label>
                <textarea
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Detailed changelog (one item per line)"
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit">Deploy Update</Button>
                <Button type="button" variant="outline">Save as Draft</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Updates List */}
        <Card>
          <CardHeader>
            <CardTitle>Update History</CardTitle>
            <CardDescription>All deployed and pending updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockUpdates.map((update) => (
                <div
                  key={update.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold">v{update.version}</h4>
                        <Badge
                          variant={
                            update.status === "active"
                              ? "default"
                              : update.status === "pending"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {update.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                      {update.changelog && (
                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-line">
                          {update.changelog}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {update.status === "active" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : update.status === "pending" ? (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {update.deployedAt && (
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                      <span>
                        Deployed: {new Date(update.deployedAt).toLocaleString()}
                      </span>
                      <span>By: {update.deployedBy}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

