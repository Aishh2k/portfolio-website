"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Drawing {
    id: number;
    filename: string;
    image_url: string;
    confidence: number;
    created_at: string;
    manual_moderation?: boolean;
    creator_name?: string;
}

const ITEMS_PER_PAGE = 200;

export default function Gallery() {
    const [flowers, setFlowers] = useState<Drawing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loadedFlowers, setLoadedFlowers] = useState<Set<number>>(new Set());

    const fetchFlowers = useCallback(
        async (page: number) => {
            setLoading(true);
            setLoadedFlowers(new Set());
            try {
                const offset = (page - 1) * ITEMS_PER_PAGE;

                const { supabase } = await import("@/lib/supabase");

                const { data, error } = await supabase
                    .from("public_flowers")
                    .select("*")
                    .order("created_at", { ascending: false })
                    .range(offset, offset + ITEMS_PER_PAGE - 1);

                if (error) {
                    throw error;
                }

                if (totalCount === 0) {
                    const { count, error: countError } = await supabase
                        .from("public_flowers")
                        .select("*", { count: "exact", head: true });

                    if (countError) {
                        console.error("Error fetching count:", countError);
                    } else {
                        setTotalCount(count || 0);
                    }
                }

                setFlowers(data || []);
            } catch (err) {
                console.error("Error fetching flowers:", err);
                setError(
                    err instanceof Error ? err.message : "Failed to fetch flowers"
                );
            } finally {
                setLoading(false);
            }
        },
        [totalCount]
    );

    useEffect(() => {
        fetchFlowers(currentPage);
    }, [currentPage, fetchFlowers]);

    const handleImageLoad = (flowerId: number) => {
        setLoadedFlowers((prev) => new Set(prev).add(flowerId));
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div
            className="min-h-dvh flex-grow p-8 overflow-auto bg-background"
        >
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl text-white">Flower Gallery</h1>
                    <Link
                        href="/secret-garden"
                        className="text-white hover:text-muted-foreground text-lg border border-white/30 px-4 py-2 rounded-full hover:scale-105 transition-all"
                    >
                        ← Back to Garden
                    </Link>
                </div>

                {/* Stats */}
                {!loading && (
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-muted-foreground">{totalCount} total flowers</p>
                    </div>
                )}

                {/* Loading state */}
                {loading && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-muted-foreground">Loading flowers... 🌸</p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                        <p className="font-bold">Error loading flowers</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Grid of flowers */}
                {!loading && !error && (
                    <div className=" flex flex-wrap gap-4">
                        {flowers.map((flower) => {
                            const isLoaded = loadedFlowers.has(flower.id);
                            return (
                                <div key={flower.id} className="flex flex-col items-center">
                                    <div
                                        className={`relative aspect-square rounded-lg overflow-hidden group w-12 h-12 cursor-pointer ${isLoaded ? "animate-growIn" : "opacity-0 scale-0"
                                            }`}
                                        onClick={() => console.log(flower.id)}
                                        style={{
                                            transformOrigin: "center bottom",
                                        }}
                                    >
                                        <img
                                            src={flower.image_url}
                                            alt={`Flower ${flower.id}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onLoad={() => handleImageLoad(flower.id)}
                                        />
                                    </div>
                                    {flower.creator_name && (
                                        <span className="text-xs text-muted-foreground mt-1 text-center max-w-12 truncate">
                                            {flower.creator_name}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination Controls */}
                {!loading && !error && flowers.length > 0 && totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-full border transition-all ${currentPage === 1
                                ? "border-white/20 text-muted-foreground cursor-not-allowed"
                                : "border-white text-white hover:bg-white hover:text-black"
                                }`}
                        >
                            ← Previous
                        </button>
                        <span className="text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-full border transition-all ${currentPage === totalPages
                                ? "border-white/20 text-muted-foreground cursor-not-allowed"
                                : "border-white text-white hover:bg-white hover:text-black"
                                }`}
                        >
                            Next →
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && flowers.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-muted-foreground">No flowers yet 🌱</p>
                        <Link
                            href="/secret-garden"
                            className="text-white hover:text-muted-foreground mt-4 inline-block"
                        >
                            Start planting!
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
