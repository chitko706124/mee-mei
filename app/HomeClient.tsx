"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { AccountCard } from "@/components/frontend/AccountCard";
import { useLanguage } from "@/lib/language";
import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  Gamepad2,
  Trophy,
  Users,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CarouselSection } from "@/components/ui/carousel-section";
import background from "../components/image/BG1.jpg";
import background2 from "../components/image/BG2.jpg";

import Link from "next/link";
import MLBB from "@/components/image/MLBB.jpg";
import PUBG from "@/components/image/PUBG_LOGO.jpg";
import SELL from "@/components/image/sell.jpg";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function HomeClient({ ads, mlAccounts, pubgAccounts }: any) {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const { t } = useLanguage();
  const [showFeatures, setShowFeatures] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const stats = [
    { icon: Clock, value: "24/7", label: "Fast Support" },
    { icon: TrendingUp, value: "1000+", label: "Happy Customers" },
    { icon: Shield, value: "100%", label: "Secure Payment" },
    { icon: Zap, value: "Instant", label: "Delivery" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative floating shapes for the Girl Theme */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-float" />
      <div
        className="absolute top-40 right-20 w-48 h-48 bg-rose-200/40 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      {/* Featured Deals Carousel */}
      {ads && ads.length > 0 && (
        <section className="relative max-w-5xl mx-auto px-4 z-10 mb-10 lg:mb-20 mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="embla overflow-hidden rounded-[2rem] shadow-xl shadow-primary/10 border-4 border-white/60 bg-white/40 backdrop-blur-sm"
            ref={emblaRef}
          >
            <div className="flex">
              {ads.map((ad: any) => (
                <div
                  key={ad.id}
                  className="relative flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="relative w-full aspect-[16/9] group overflow-hidden">
                    <Image
                      src={ad.image_url}
                      alt={ad.title}
                      fill
                      unoptimized
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform transition-transform duration-300">
                      <h3 className="text-xl font-serif font-bold text-white drop-shadow-md line-clamp-1">
                        {ad.title}
                      </h3>
                      <p className="text-sm text-white/90 line-clamp-2 mt-1 font-medium drop-shadow-sm">
                        {ad.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Main greeting */}
      <div className="flex flex-col items-center justify-center text-center mt-12 mb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r text-foreground bg-clip-text  mb-3">
            {t("hero.welcome_to_meemei")}
          </h2>
          {/* <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mt-2"></div> */}
        </motion.div>
      </div>

      {/* Hero Section - Modern Glassmorphism Design */}
      <section className="relative mx-4 md:mx-6 my-8 overflow-hidden rounded-2xl shadow-2xl">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={theme === "dark" ? background : background2}
            alt="Hero Background"
            fill
            className="object-cover scale-105 transition-transform duration-700 group-hover:scale-100"
            priority
          />
          {/* Gradient Overlay - Multiple layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"></div>
        </div>

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] md:min-h-[550px] px-6 py-16">
          {/* Animated Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-white uppercase tracking-wider">
                Premium Game Accounts
              </span>
            </div>
          </motion.div> */}

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-center max-w-2xl "
          >
            {/* <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
              {t("hero.title") || "Level Up Your"}
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mt-2">
                {t("hero.subtitle") || "Gaming Experience"}
              </span>
            </h1> */}

            <div className="flex flex-col  sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* <Button
                  onClick={() => router.push("/mobile-legend")}
                  size="lg"
                  className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("hero.explore_mlbb_accounts")}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </Button> */}

                <div className=" flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Button
                    onClick={() => router.push("/mobile-legend")}
                    variant="outline"
                  >
                    VIEW ALL MLBB ACC
                  </Button>

                  <Button
                    onClick={() => router.push("/sell-accounts")}
                    variant="outline"
                  >
                    SELL YOUR ACCOUNT
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 pt-6 border-t border-white/20 "
            >
              <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-400" />
                  <span>100% Secure Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-400" />
                  <span>10,000+ Happy Gamers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Decorative Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </section>

      {/* Featured Games Section */}
      {/* <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 mb-8 px-4 md:px-6"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Game Marketplace
          </h3>
          <p className="text-muted-foreground">
            {t("hero.game_marketplace_desc")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            {
              name: "Mobile Legends",
              icon: MLBB,
              color: "from-blue-500 to-purple-500",
              path: "/mobile-legend",
              button: "Buy Now",
            },
            {
              name: "Your Accounts",
              icon: SELL,
              color: "from-orange-500 to-red-500",
              path: "/sell-accounts",
              button: "Sell Now",
            },
          ].map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              onClick={() => router.push(game.path)}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-4 text-center cursor-pointer group border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                <Image
                  src={game.icon}
                  alt={game.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-semibold text-sm text-foreground">
                {game.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {game.button} →
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section> */}

      {/* Product Showcase */}
      {mlAccounts && mlAccounts.length > 0 && (
        <section className="container mx-auto px-4 max-w-7xl relative z-10 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mb-10 mt-10"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground flex items-center gap-4">
              {/* <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="w-6 h-6 fill-primary/30" />
              </span> */}
              {t("hero.new_arrival_mlbb")}
            </h2>
            <div className="h-1 w-24 bg-primary/20 mt-4 rounded-full" />
          </motion.div>

          <CarouselSection title="mobile-legend">
            {mlAccounts.map((account: any, index: number) => (
              <AccountCard
                key={account.id}
                index={index}
                id={account.id}
                title={account.title}
                price={account.price}
                images={account.images}
                category={account.category}
                collectorLevel={account.collector_level}
                isSold={account.is_sold}
              />
            ))}
          </CarouselSection>
        </section>
      )}

      {/* {pubgAccounts && pubgAccounts.length > 0 && (
        <section className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="w-6 h-6 fill-primary/30" />
              </span>
              {t("hero.new_arrival_pubg")}
            </h2>
            <div className="h-1 w-24 bg-primary/20 mt-4 rounded-full" />
          </motion.div>

          <CarouselSection title="pubg">
            {pubgAccounts.map((account: any, index: number) => (
              <AccountCard
                key={account.id}
                index={index}
                id={account.id}
                title={account.title}
                price={account.price}
                images={account.images}
                category={account.category}
                collectorLevel={account.collector_level}
                isSold={account.is_sold}
              />
            ))}
          </CarouselSection>
        </section>
      )} */}
    </main>
  );
}
