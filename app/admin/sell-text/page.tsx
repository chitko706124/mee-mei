"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/frontend/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Save, X, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminSellTextsPage() {
  const router = useRouter();
  const [sellTexts, setSellTexts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [sellTextForm, setSellTextForm] = useState({
    id: "",
    sell_content: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000";

  // Fetch all sell texts
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");

      const response = await fetch(`${BACKEND_URL}/sell-texts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to fetch sell texts");
      }

      setSellTexts(data.data || []);
    } catch (error: any) {
      // console.error("Error fetching sell texts:", error);
      toast.error(error.message || "Error fetching sell texts");
    } finally {
      setLoading(false);
    }
  }, [BACKEND_URL]);

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

  const handleSellTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      // Validate input
      if (!sellTextForm.sell_content.trim()) {
        toast.error("Please enter content");
        return;
      }

      const sellTextData = {
        sell_content: sellTextForm.sell_content.trim(),
      };

      let url, method;

      if (isEditing && sellTextForm.id) {
        url = `${BACKEND_URL}/sell-texts/${sellTextForm.id}`;
        method = "PUT";
      } else {
        url = `${BACKEND_URL}/sell-texts`;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sellTextData),
      });

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        const errorMsg = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.message ||
            `Failed to ${isEditing ? "update" : "create"} sell text`;
        throw new Error(errorMsg);
      }

      toast.success(
        data.message ||
          `Sell text ${isEditing ? "updated" : "created"} successfully`,
      );
      resetSellTextForm();
      await fetchData();
    } catch (error: any) {
      // console.error("Error saving sell text:", error);
      toast.error(error.message || "Error saving sell text");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSellText = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this sell text? This action cannot be undone.",
      )
    )
      return;

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/sell-texts/${id}`, {
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

  const editSellText = (sellText: any) => {
    setSellTextForm({
      id: sellText.id,
      sell_content: sellText.sell_content || "",
    });
    setIsEditing(true);
  };

  const resetSellTextForm = () => {
    setSellTextForm({
      id: "",
      sell_content: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Admin — Sell Texts</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Create/Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Edit className="h-5 w-5" />
                    Edit Sell Text
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    Create New Sell Text
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSellTextSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content *
                  </label>
                  <Textarea
                    id="sell_content"
                    required
                    value={sellTextForm.sell_content}
                    onChange={(e) =>
                      setSellTextForm((prev) => ({
                        ...prev,
                        sell_content: e.target.value,
                      }))
                    }
                    placeholder="Enter your sell text content here..."
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the sell advertisement text content
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
                      onClick={resetSellTextForm}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sell Texts List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Sell Texts ({sellTexts.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center text-muted-foreground py-8">
                    Loading sell texts...
                  </div>
                ) : sellTexts.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No sell texts found. Create your first sell text.
                  </div>
                ) : (
                  <>
                    {sellTexts.map((sellText) => (
                      <div
                        key={sellText.id}
                        className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 mr-4">
                          <div className="mb-2">
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {sellText.sell_content || "Empty content"}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {sellText.created_at && (
                              <span className="ml-2">
                                Created:{" "}
                                {new Date(
                                  sellText.created_at,
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editSellText(sellText)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteSellText(sellText.id)}
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
