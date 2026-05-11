"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/frontend/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Save, X, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminAdTextsPage() {
  const router = useRouter();
  const [adTexts, setAdTexts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [adTextForm, setAdTextForm] = useState({
    id: "",
    content: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const URL = process.env.URL || "http://127.0.0.1:8000";

  // Fetch all ad texts
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${URL}/ad-texts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to fetch ad texts");
      }

      setAdTexts(data.data || []);
    } catch (error: any) {
      // console.error("Error fetching ad texts:", error);
      toast.error(error.message || "Error fetching ad texts");
    } finally {
      setLoading(false);
    }
  }, [URL]);

  // Check auth and fetch data on mount
  useEffect(() => {
    const checkAndFetch = async () => {
      if (!localStorage.getItem("auth_token")) {
        router.replace("/admin/login");
        return;
      }
      await fetchData();
    };
    checkAndFetch();
  }, [router, fetchData]);

  const handleAdTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      // Validate input
      if (!adTextForm.content.trim()) {
        toast.error("Please enter content");
        return;
      }

      const adTextData = {
        content: adTextForm.content.trim(),
      };

      let url, method;

      if (isEditing && adTextForm.id) {
        url = `${URL}/ad-texts/${adTextForm.id}`;
        method = "PUT";
      } else {
        url = `${URL}/ad-texts`;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adTextData),
      });

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        const errorMsg = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.message ||
            `Failed to ${isEditing ? "update" : "create"} ad text`;
        throw new Error(errorMsg);
      }

      toast.success(
        data.message ||
          `Ad text ${isEditing ? "updated" : "created"} successfully`,
      );
      resetAdTextForm();
      await fetchData();
    } catch (error: any) {
      // console.error("Error saving ad text:", error);
      toast.error(error.message || "Error saving ad text");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAdText = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this ad text? This action cannot be undone.",
      )
    )
      return;

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch(`${URL}/ad-texts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to delete ad text");
      }

      toast.success(data.message || "Ad text deleted successfully");
      await fetchData();
    } catch (error: any) {
      // console.error("Error deleting ad text:", error);
      toast.error(error.message || "Error deleting ad text");
    }
  };

  const editAdText = (adText: any) => {
    setAdTextForm({
      id: adText.id,
      content: adText.content || "",
    });
    setIsEditing(true);
  };

  const resetAdTextForm = () => {
    setAdTextForm({
      id: "",
      content: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Admin — Ad Texts</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Create/Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Edit className="h-5 w-5" />
                    Edit Ad Text
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Create New Ad Text
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdTextSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content *
                  </label>
                  <Textarea
                    id="content"
                    required
                    value={adTextForm.content}
                    onChange={(e) =>
                      setAdTextForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Enter your ad text content here..."
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the advertisement text content
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    variant={"outline"}
                    className="flex-1"
                  >
                    {submitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {isEditing ? "Update" : "Create"}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetAdTextForm}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Ad Texts List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Ad Texts ({adTexts.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center text-muted-foreground py-8">
                    Loading ad texts...
                  </div>
                ) : adTexts.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No ad texts found. Create your first ad text.
                  </div>
                ) : (
                  <>
                    {adTexts.map((adText) => (
                      <div
                        key={adText.id}
                        className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 mr-4">
                          <div className="mb-2">
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {adText.content || "Empty content"}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {adText.created_at && (
                              <span className="ml-2">
                                Created:{" "}
                                {new Date(
                                  adText.created_at,
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editAdText(adText)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAdText(adText.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
