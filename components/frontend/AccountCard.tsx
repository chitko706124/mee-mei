"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
  const formattedPrice = Math.floor(price).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      {/* <Link href={`/offers?id=${id}`} className="block h-full group">
        <div className="h-full bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border-2   hover:shadow-primary/20 transition-all duration-300 flex flex-col relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/20 transition-colors" />

 
          <div className="relative aspect-[4/3] w-full mt-2 mx-2 rounded-2xl overflow-hidden bg-primary/5">
            {thumbnailImage ? (
              <Image
                src={thumbnailImage}
                alt={title}
                fill
                unoptimized
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/40 font-serif">
                No Image
              </div>
            )}

      
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

            <div className="absolute bottom-3 left-3">
              <Badge className="bg-primary hover:bg-primary/90 text-white rounded-full px-3 shadow-md border-0 uppercase tracking-widest text-[10px]">
                {category}
              </Badge>
            </div>

            {isSold && (
              <div className="absolute top-3 right-3 shadow-lg">
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white shadow-xl rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-white">
                  Sold Out
                </Badge>
              </div>
            )}
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between gap-3 relative z-10">
            <div className="space-y-2">
              {collectorLevel && (
                <div className="inline-flex items-center">
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold tracking-wider border-primary/30 text-primary bg-primary/5 rounded-full px-2"
                  >
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    {collectorLevel}
                  </Badge>
                </div>
              )}
              <h3 className="font-serif font-bold text-xl leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>

            <div className="mt-auto pt-3 flex flex-col gap-1 items-start">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                Special Price
              </span>
              <div className="flex items-baseline gap-1 bg-primary/5 px-4 py-1.5 rounded-full">
                <span className="text-xl font-black text-primary drop-shadow-sm">
                  {formattedPrice}
                </span>
                <span className="text-sm font-bold text-primary/70">MMK</span>
              </div>
            </div>
          </div>
        </div>
      </Link> */}

      <Link href={`/offers?id=${id}`} className="block h-full group">
        <div className="h-full bg-white/70 dark:bg-black/30 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-white/40 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 transition-all duration-300 flex flex-col relative">
          {/* Animated Background Blur Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/20 dark:group-hover:bg-primary/15 transition-colors" />

          {/* Bottom Blur Element */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none group-hover:bg-secondary/20 dark:group-hover:bg-secondary/10 transition-colors" />

          {/* Image Area */}
          {/* <div className="relative aspect-[4/3] w-full mt-2 mb-0 mr-2 rounded-2xl overflow-hidden bg-primary/5 dark:bg-primary/10 "> */}
          <div className="relative aspect-[4/3] w-[calc(100%-1.5rem)] mx-3 mt-3 rounded-2xl overflow-hidden bg-primary/5 dark:bg-primary/10">
            {thumbnailImage ? (
              <Image
                src={thumbnailImage}
                alt={title}
                fill
                unoptimized
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/40 dark:text-primary/30 font-serif">
                No Image
              </div>
            )}

            {/* Elegant overlay - darker for dark mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 dark:from-black/80 via-black/20 to-transparent opacity-80" />

            <div className="absolute bottom-3 left-3">
              <Badge className="bg-primary hover:bg-primary/90 text-white rounded-full px-3 shadow-md border-0 uppercase tracking-widest text-[10px]">
                {category}
              </Badge>
            </div>

            {isSold && (
              <div className="absolute top-3 right-3 shadow-lg">
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white shadow-xl rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-white dark:border-rose-400">
                  Sold Out
                </Badge>
              </div>
            )}
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between gap-3 relative z-10">
            <div className="space-y-2">
              {collectorLevel && (
                <div className="inline-flex items-center">
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-bold tracking-wider border-primary/30 dark:border-primary/40 text-primary bg-primary/5 dark:bg-primary/10 rounded-full px-2"
                  >
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    {collectorLevel}
                  </Badge>
                </div>
              )}
              <h3 className="font-serif font-bold text-xl leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
            </div>

            <div className="mt-auto pt-3 flex flex-col gap-1 items-start">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                Special Price
              </span>
              <div className="flex items-baseline gap-1 bg-primary/5 dark:bg-primary/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span className="text-xl font-black text-primary drop-shadow-sm">
                  {formattedPrice}
                </span>
                <span className="text-sm font-bold text-primary/70 dark:text-primary/60">
                  MMK
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
