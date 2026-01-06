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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-zinc-900">Flower Gallery</h1>
                    <Link
                        href="/secret-garden"
                        className="text-zinc-500 hover:text-zinc-900 text-sm font-medium tracking-widest uppercase border border-zinc-200 px-6 py-2 rounded-full hover:border-zinc-900 transition-all hover:scale-105"
                    >
                        ← Back to Garden
                    </Link>
                </div>

                {/* Stats */}
                {!loading && (
                    <div className="mb-8 flex items-center justify-between">
                        <p className="text-sm font-medium tracking-widest uppercase text-zinc-400">{totalCount} total flowers</p>
                    </div>
                )}

                {/* Loading state */}
                {loading && (
                    <div className="text-center py-20">
                        <p className="text-xl font-medium tracking-widest text-zinc-400">loading flowers... 🌸</p>
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
                    <div className="flex flex-wrap justify-start gap-6 w-full">
                        {flowers.map((flower) => {
                            const isLoaded = loadedFlowers.has(flower.id);
                            return (
                                <div key={flower.id} className="flex flex-col items-center group/item">
                                    <div
                                        className={`relative aspect-square rounded-xl overflow-hidden w-24 h-24 cursor-pointer bg-white/50 border border-zinc-100 transition-all duration-300 hover:border-zinc-300 ${isLoaded ? "animate-growIn" : "opacity-0 scale-0"
                                            }`}
                                        onClick={() => console.log(flower.id)}
                                        style={{
                                            transformOrigin: "center bottom",
                                        }}
                                    >
                                        <img
                                            src={flower.image_url}
                                            alt={`Flower ${flower.id}`}
                                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                                            onLoad={() => handleImageLoad(flower.id)}
                                        />
                                    </div>
                                    {flower.creator_name && (
                                        <span className="text-[10px] font-medium tracking-widest uppercase text-zinc-400 mt-2 text-center max-w-24 truncate opacity-0 group-hover/item:opacity-100 transition-opacity">
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
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-6 py-2 rounded-full border text-sm font-medium tracking-widest uppercase transition-all ${currentPage === 1
                                ? "border-zinc-100 text-zinc-300 cursor-not-allowed"
                                : "border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                                }`}
                        >
                            ← Previous
                        </button>
                        <span className="text-sm font-medium tracking-widest uppercase text-zinc-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-6 py-2 rounded-full border text-sm font-medium tracking-widest uppercase transition-all ${currentPage === totalPages
                                ? "border-zinc-100 text-zinc-300 cursor-not-allowed"
                                : "border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                                }`}
                        >
                            Next →
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && flowers.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl font-medium tracking-widest uppercase text-zinc-400">No flowers yet 🌱</p>
                        <Link
                            href="/secret-garden"
                            className="text-zinc-500 hover:text-zinc-900 mt-4 inline-block border-b border-zinc-300 hover:border-zinc-900 transition-colors text-sm font-medium tracking-widest uppercase"
                        >
                            Start planting!
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
