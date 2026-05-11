"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tag, Sparkles } from "lucide-react";

interface AccountCardProps {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  collectorLevel?: string;
  isSold: boolean;
  index?: number;
}

export function AccountCard({
  id,
  title,
  price,
  images: [thumbnailImage],
  category,
  collectorLevel,
  isSold,
  index = 0,
}: AccountCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Format price
  const formattedPrice = Math.floor(price).toLocaleString();

  // Staggered animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const, // Add 'as const' to fix type
        stiffness: 100,
        damping: 15,
        delay: index * 0.05,
        duration: 0.5,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 200, delay: 0.2 },
    },
    hover: {
      scale: 1.05,
      rotate: [0, -3, 3, 0],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden   group h-full relative border  bg-card/40 backdrop-blur-md hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] hover:border-primary/50 transition-all duration-500 rounded-3xl">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <Link
          href={`/offers?id=${id}`}
          className="flex flex-col h-full relative z-10"
        >
          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              {thumbnailImage ? (
                <Image
                  src={thumbnailImage}
                  alt={title}
                  fill
                  unoptimized
                  loading="lazy"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500">
                  No Image
                </div>
              )}
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

            {/* Category */}
            <div className="absolute bottom-3 left-3">
              <Badge
                variant="secondary"
                className="bg-black/50 text-white backdrop-blur-md border border-white/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider"
              >
                {category}
              </Badge>
            </div>

            {/* Sold Out Badge */}
            {isSold && (
              <motion.div
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="absolute top-3 right-3 z-10"
              >
                <Badge className="bg-destructive/90 hover:bg-destructive text-white border border-red-400/30 shadow-lg px-2.5 py-1 uppercase tracking-widest font-black text-xs">
                  Sold Out
                </Badge>
              </motion.div>
            )}

            {/* Hover Floating Action */}
            {/* <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
              <div className="px-4 py-2 rounded-full bg-primary/90 text-primary-foreground font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-md">
                View Deal
              </div>
            </motion.div> */}
          </div>

          <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              {collectorLevel && (
                <div className="inline-flex items-center">
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold tracking-wider border-primary/30 text-primary bg-primary/10"
                  >
                    {/* <Sparkles className="w-3 h-3 mr-1 inline" /> */}
                    {collectorLevel}
                  </Badge>
                </div>
              )}
              <h3 className="font-bold text-lg leading-tight line-clamp-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>

            <div className="pt-4 border-t border-border/50 flex flex-col gap-1 items-start mt-auto">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                Special Price
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-foreground bg-clip-text ">
                  {formattedPrice}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  MMK
                </span>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
