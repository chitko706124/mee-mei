"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { BackButton } from "@/components/ui/BackButton";
import {
  MessageCircle,
  Phone,
  Send,
  Info,
  Tag,
  CreditCard,
  Heart,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useLanguage } from "@/lib/language";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap } from "lucide-react";

interface Account {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  collector_level?: string;
  is_sold?: boolean;
  images: string[];
}

export default function OfferClient({ account }: { account: Account }) {
  const { t } = useLanguage();

  const categoryName =
    CATEGORIES[account.category as keyof typeof CATEGORIES] || account.category;

  const telegramUrl = `https://t.me/kazumixle?text=${encodeURIComponent(
    account.title,
  )}%20ဒီအကောင့်လေး%20ဝယ်ချင်လို့ပါ။!`;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <BackButton>Back</BackButton>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative mb-10 mt-6">
        {/* Decorative Floating Shapes */}
        <div className="absolute top-10 right-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none animate-float" />
        <div
          className="absolute -bottom-20 left-10 w-[200px] h-[200px] bg-rose-200/30 rounded-full blur-[60px] -z-10 pointer-events-none animate-float"
          style={{ animationDelay: "1s" }}
        />

        {/* Images Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-white/50 backdrop-blur-md">
            <ImageCarousel images={account.images} title={account.title} />
          </div>
        </div>

        {/* Details Column */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-white/40 p-8 rounded-[2rem] border border-white/60 shadow-lg backdrop-blur-sm relative"
          >
            <div className="absolute top-6 right-6">
              <Heart className="w-8 h-8 text-rose-300 fill-rose-100 animate-pulse" />
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge className="px-3 py-1 bg-white border border-primary/20 text-primary shadow-sm hover:bg-white rounded-full font-serif uppercase tracking-widest text-[10px]">
                <Tag className="w-3 h-3 mr-1" />
                {categoryName}
              </Badge>
              {account.collector_level && (
                <Badge className="px-3 py-1 bg-primary/10 text-primary border-0 rounded-full text-[10px] uppercase tracking-widest font-bold">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {account.collector_level}
                </Badge>
              )}
              {account.is_sold && (
                <Badge className="px-4 py-1 uppercase tracking-widest font-black shadow-lg bg-rose-500 hover:bg-rose-600 text-white border-2 border-white rounded-full">
                  {t("offer.sold")}
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-serif font-black tracking-tight leading-tight text-foreground">
                {account.title}
              </h1>
              <div className="flex items-center gap-3 mt-6 bg-white/60 w-fit px-6 py-3 rounded-full border border-white">
                <span className="text-3xl font-black text-primary drop-shadow-sm">
                  {Math.round(account.price).toLocaleString()}
                </span>
                <span className="text-lg text-primary/70 font-bold mt-1">
                  MMK
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/50 backdrop-blur-md border-white shadow-lg relative overflow-hidden rounded-[2rem]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
              <CardHeader className="pb-3 border-b border-primary/10">
                <CardTitle className="text-xl font-serif text-primary flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  {t("offer.description") || "Account Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="whitespace-pre-line text-foreground/80 leading-relaxed font-medium">
                  {account.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Checkout / Contact Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-white border-2 border-white shadow-xl space-y-6"
          >
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="bg-white p-3 rounded-full shadow-sm text-primary mb-2">
                <CreditCard className="w-6 h-6 " />
              </div>
              <h3 className="font-serif font-bold text-2xl text-foreground">
                {t("contact.seller") || "Secure Purchase"}
              </h3>
              <p className="text-sm text-foreground/60">
                Ready to make this yours? Let&apos;s connect.
              </p>
            </div>

            <a href={telegramUrl} target="_blank" className="block w-full">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-colors hover:bg-primary/90"
              >
                <Send className="w-5 h-5" />
                <span>Contact via Telegram</span>
              </motion.button>
            </a>

            <div className="bg-white/60 p-3 rounded-2xl border border-white">
              <p className="text-center text-xs text-foreground/70 flex items-center justify-center gap-2 font-semibold">
                <Shield className="w-4 h-4 text-emerald-500" />
                100% Safe & Secure Transaction Process
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
