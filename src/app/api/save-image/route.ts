import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const probability = formData.get("probability") as string;
        const creatorName = formData.get("creatorName") as string | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Extract IP address from request
        const ip =
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown";

        // Upload image to Supabase Storage
        const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("flowers")
            .upload(filename, file, {
                contentType: "image/png",
                cacheControl: "3600",
            });

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return NextResponse.json(
                { error: "Failed to upload image" },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from("flowers")
            .getPublicUrl(filename);

        // Save metadata to database
        const { data, error } = await supabase
            .from("public_flowers")
            .insert({
                filename,
                image_url: publicUrl,
                confidence: parseFloat(probability) || 1.0,
                ip_address: ip,
                creator_name: creatorName || null,
            })
            .select()
            .single();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to save flower" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, flower: data });
    } catch (error) {
        console.error("Error saving flower:", error);
        return NextResponse.json(
            { error: "Failed to save flower" },
            { status: 500 }
        );
    }
}
