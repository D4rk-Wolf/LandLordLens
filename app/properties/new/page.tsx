"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    address: "",
    city: "",
    postcode: "",
    propertyType: "Flat",
    bedrooms: "",
    bathrooms: "",
    monthlyRent: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch("/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: formState.address,
        city: formState.city,
        postcode: formState.postcode,
        propertyType: formState.propertyType,
        bedrooms: formState.bedrooms || undefined,
        bathrooms: formState.bathrooms || undefined,
        monthlyRent: formState.monthlyRent || undefined,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error || "Unable to create property");
      setLoading(false);
      return;
    }

    router.push("/properties");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Property</h1>
          <p className="text-gray-600">Enter the details of your new property</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>Basic details about the property</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 High Street"
                    value={formState.address}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, address: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="London"
                    value={formState.city}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, city: event.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    placeholder="SW1A 1AA"
                    value={formState.postcode}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, postcode: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formState.propertyType}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, propertyType: event.target.value }))
                    }
                  >
                    <option value="Flat">Flat</option>
                    <option value="House">House</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Studio">Studio</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="0"
                    placeholder="2"
                    value={formState.bedrooms}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, bedrooms: event.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="0"
                    placeholder="1"
                    value={formState.bathrooms}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, bathrooms: event.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent (£)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  min="0"
                  placeholder="1500"
                  value={formState.monthlyRent}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, monthlyRent: event.target.value }))
                  }
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Creating..." : "Create Property"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/properties">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
