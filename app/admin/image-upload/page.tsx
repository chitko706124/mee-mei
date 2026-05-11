"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/frontend/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload as UploadIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_FILES = 10; // Maximum number of files to upload at once

interface UploadingFile {
  file: File;
  previewUrl: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

export default function AdminImageUploadPage() {
  const router = useRouter();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // useEffect(() => {
  //   if (!localStorage.getItem("auth_token")) {
  //     router.replace("/admin/login");
  //   }
  // }, [router]);

  useEffect(() => {
    return () => {
      // Cleanup all blob URLs on unmount
      uploadingFiles.forEach((file) => {
        if (file.previewUrl && file.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [uploadingFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    if (files.length > MAX_FILES) {
      toast.error(`You can only upload up to ${MAX_FILES} images at once.`);
      return;
    }

    // Validate all files
    const invalidFiles = files.filter(
      (file) => !file.type.startsWith("image/") || file.size > MAX_FILE_SIZE,
    );

    if (invalidFiles.length > 0) {
      toast.error(
        `${invalidFiles.length} file(s) are invalid. Please check file type (image) and size (max 20MB).`,
      );
      return;
    }

    // Create new uploading files
    const newFiles: UploadingFile[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: "pending",
    }));

    setUploadingFiles((prev) => [...prev, ...newFiles]);

    // Clear the input
    event.target.value = "";
  };

  const removeFile = (index: number) => {
    const file = uploadingFiles[index];
    if (file.previewUrl && file.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(file.previewUrl);
    }
    setUploadingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    uploadingFiles.forEach((file) => {
      if (file.previewUrl && file.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(file.previewUrl);
      }
    });
    setUploadingFiles([]);
    setUploadedUrls([]);
  };

  const uploadSingleFile = async (
    file: UploadingFile,
    index: number,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file.file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);
          setUploadingFiles((prev) => {
            const updated = [...prev];
            updated[index].progress = percent;
            return updated;
          });
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.url);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error"));
      });

      xhr.open("POST", "/api/upload");
      xhr.send(formData);
    });
  };

  const handleUpload = async () => {
    if (uploadingFiles.length === 0) {
      toast.error("Please select at least one image to upload.");
      return;
    }

    const pendingFiles = uploadingFiles.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) {
      toast.error("All files have already been uploaded.");
      return;
    }

    setIsUploading(true);
    const newUploadedUrls: string[] = [...uploadedUrls];

    // Upload files sequentially to avoid overwhelming the server
    for (let i = 0; i < uploadingFiles.length; i++) {
      const file = uploadingFiles[i];

      if (file.status !== "pending") continue;

      // Update status to uploading
      setUploadingFiles((prev) => {
        const updated = [...prev];
        updated[i].status = "uploading";
        return updated;
      });

      try {
        const url = await uploadSingleFile(file, i);

        // Update status to success
        setUploadingFiles((prev) => {
          const updated = [...prev];
          updated[i].status = "success";
          updated[i].url = url;
          updated[i].progress = 100;
          return updated;
        });

        newUploadedUrls.push(url);
        setUploadedUrls([...newUploadedUrls]);

        toast.success(`Uploaded: ${file.file.name}`);
      } catch (error: any) {
        // Update status to error
        setUploadingFiles((prev) => {
          const updated = [...prev];
          updated[i].status = "error";
          updated[i].error = error.message;
          return updated;
        });

        toast.error(`Failed to upload ${file.file.name}: ${error.message}`);
      }
    }

    setIsUploading(false);

    const successCount = uploadingFiles.filter(
      (f) => f.status === "success",
    ).length;
    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} image(s)!`);
    }
  };

  const copyAllUrls = () => {
    if (uploadedUrls.length === 0) return;

    const urlsText = uploadedUrls.join("\n");
    navigator.clipboard.writeText(urlsText);
    toast.success("All URLs copied to clipboard!");
  };

  const getStatusIcon = (status: UploadingFile["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case "success":
        return <div className="h-4 w-4 rounded-full bg-green-500" />;
      case "error":
        return <div className="h-4 w-4 rounded-full bg-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          Admin - Multiple Image Upload
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload to DigitalOcean Spaces</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label htmlFor="image-file">Select Images</Label>
                <Input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="mt-2 cursor-pointer"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Supported: Image files up to 20MB each. Max {MAX_FILES} files
                  at once.
                </p>
              </div>

              {/* File List */}
              {uploadingFiles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      Selected Files ({uploadingFiles.length})
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFiles}
                      disabled={isUploading}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </Button>
                  </div>

                  <div className="max-h-96 space-y-2 overflow-y-auto">
                    {uploadingFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        {/* Preview Thumbnail */}
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={file.previewUrl}
                            alt={file.file.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium">
                            {file.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {file.error && (
                            <p className="text-xs text-red-600">{file.error}</p>
                          )}
                        </div>

                        {/* Progress/Status */}
                        <div className="flex items-center gap-2">
                          {file.status === "uploading" && (
                            <span className="text-sm text-blue-600">
                              {file.progress}%
                            </span>
                          )}
                          {getStatusIcon(file.status)}

                          {file.status !== "uploading" && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              disabled={isUploading}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upload Progress Bar */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{
                            width: `${(uploadingFiles.filter((f) => f.status === "success").length / uploadingFiles.length) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-center text-xs text-muted-foreground">
                        Uploading:{" "}
                        {
                          uploadingFiles.filter((f) => f.status === "success")
                            .length
                        }{" "}
                        / {uploadingFiles.length}
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleUpload}
                    disabled={
                      isUploading ||
                      uploadingFiles.every((f) => f.status === "success")
                    }
                    className="w-full"
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    {isUploading
                      ? "Uploading..."
                      : `Upload ${uploadingFiles.filter((f) => f.status === "pending").length} File(s)`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          {uploadedUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Uploaded URLs ({uploadedUrls.length})</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyAllUrls}
                  >
                    Copy All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 space-y-2 overflow-y-auto">
                  {uploadedUrls.map((url, index) => (
                    <div key={index} className="rounded-md border p-3">
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Image {index + 1}
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-sm text-blue-600 hover:underline"
                      >
                        {url}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
