export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const s3Client = new S3Client({
  region: process.env.DO_SPACES_REGION || "sgp1",
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET || "",
  },
});

// CORS headers to allow requests from any origin asdfa sdf asdf

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const buildUploadKey = (originalName: string) => {
  const timestamp = Date.now();
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");

  return `mee-mei/${timestamp}-${safeName}`;
};

// IMPORTANT
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 20MB)" },
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const objectKey = buildUploadKey(file.name);

    const command = new PutObjectCommand({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: objectKey,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3Client.send(command);

    const endpoint = process.env.DO_SPACES_ENDPOINT!;
    const bucket = process.env.DO_SPACES_BUCKET!;

    const publicUrl = `https://${bucket}.${new URL(endpoint).host}/${objectKey}`;

    return NextResponse.json(
      {
        url: publicUrl,
      },
      {
        headers: corsHeaders,
      },
    );
  } catch (error: any) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        error: error.message || "Upload failed",
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}
