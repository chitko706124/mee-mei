"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  TrendingUp,
  Users,
  Shield,
  Sparkles,
  Send,
  ReceiptText,
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/frontend/Navbar";
import { Footer } from "@/components/frontend/Footer";
import { useLanguage } from "@/lib/language";

interface SellText {
  id: string;
  title: string;
  sell_content: string;
  description: string;
  type: "info" | "benefit" | "rule";
  order: number;
}

export default function SellAccountsPage() {
  const [sellTexts, setSellTexts] = useState<SellText[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const telegramUrl = "https://t.me/kazumixle";
  const messengerUrl =
    "https://www.facebook.com/share/1ShVfmkytB/?mibextid=wwXIfr";

  useEffect(() => {
    const fetchSellTexts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sell-texts`,
        );
        if (!response.ok) throw new Error("Failed to fetch sell texts");
        const data = await response.json();

        if (data.status === "success") {
          setSellTexts(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch");
        }
      } catch (err) {
        console.error("Error fetching sell texts:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellTexts();
  }, []);

  // Group texts by type
  const infoTexts = sellTexts.filter((text) => text.type === "info");
  const benefitTexts = sellTexts.filter((text) => text.type === "benefit");
  const ruleTexts = sellTexts.filter((text) => text.type === "rule");

  const benefits = [
    {
      icon: TrendingUp,
      title: "Best Price",
      description: "Get the best market price for your accounts",
    },
    {
      icon: Users,
      title: "Instant Payment",
      description: "Receive payment immediately after verification",
    },
    {
      icon: Shield,
      title: "Secure Transaction",
      description: "Safe and reliable trading process",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 px-4 mb-4 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Sell Your Account</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("sell.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("sell.description")}
          </p>
        </motion.div>

        <div className=" flex flex-col-reverse lg:flex-col">
          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 bg-white/50 dark:bg-black/20 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Main Content Section */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"> */}
          {/* Left Column - Info & Rules */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* Info Card */}
            <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl border border-primary/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Important Information
                </h2>
              </div>

              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="space-y-4">
                  {sellTexts.map((text, index) => (
                    <motion.div
                      key={text.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-primary/5"
                    >
                      {text.sell_content && (
                        <h3 className="font-semibold text-foreground mb-2">
                          {text.sell_content}
                        </h3>
                      )}
                      <p className="text-muted-foreground leading-relaxed">
                        {text.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border-2 border-primary/20 p-8 text-center">
              <ReceiptText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t("sell.rdy_to_sell")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("sell.contact_desc")}
               
              </p>
              {/* <Button
                size="lg"
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-colors hover:bg-primary/90"
                onClick={() => window.open(telegramUrl, "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Contact Us on Telegram
              </Button> */}

              <div className=" flex flex-col gap-3">
                <a
                  href={telegramUrl}
                  target="_blank"
                  className="w-full flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-fit px-5  py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-colors hover:bg-primary/90"
                  >
                    <Send className="w-5 h-5" />
                    <span>Contact via Telegram</span>
                  </motion.button>
                </a>

                <a
                  href={messengerUrl}
                  target="_blank"
                  className="w-full flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-fit px-5  py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-colors hover:bg-primary/90"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Contact via Messenger</span>
                  </motion.button>
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                ⚡ Typically responds within 5 minutes
              </p>
            </div>
          </motion.div>
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
