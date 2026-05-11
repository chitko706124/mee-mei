"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  Menu,
  Sun,
  Moon,
  Globe,
  LogOut,
  Sparkles,
  MessageSquare,
  Mail,
  Phone,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useLanguage } from "@/lib/language";
import { motion } from "framer-motion";
import Logo from "@/components/image/SuperNickLogo.jpg";
import MLBB from "@/components/image/MLBB.jpg";
import PUBG from "@/components/image/PUBG.png";

// Define empty array as constant to avoid re-renders
const EMPTY_ARRAY: any[] = [];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>(EMPTY_ARRAY);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "tg://resolve?domain=Super_NickGameServices", label: "Channel" },
    { href: "/mobile-legend", label: "Mobile Legend" },
    { href: "/pubg", label: "PUBG" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/check-auth`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        const authData = await response.json();

        if (authData.authenticated) {
          setIsAdmin(true);
          return;
        }
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  // Add the handleSignOut function here
  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(`${process.env.BACKEND_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to sign out");

      localStorage.removeItem("auth_token");
      setIsAdmin(false);
      router.push("/");
      router.refresh(); // Refresh the page to update the state
    } catch (error) {
      // console.error("Error signing out:", error);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(EMPTY_ARRAY);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/accounts?q=${encodeURIComponent(
          query,
        )}&limit=8&includeSold=false`,
      );
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();

      if (data.status === "success") {
        setSearchResults(data.data || EMPTY_ARRAY);
      } else {
        throw new Error(data.message || "Search failed");
      }
    } catch (error) {
      // console.error("Search error:", error);
      setSearchResults(EMPTY_ARRAY);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  const handleResultClick = useCallback(
    (accountId: string) => {
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults(EMPTY_ARRAY);
      setIsOpen(false);
      router.push(`/offers?id=${accountId}`);
    },
    [router],
  );

  const handleViewAllResults = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults(EMPTY_ARRAY);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  }, [searchQuery, router]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults(EMPTY_ARRAY);
        setIsOpen(false);
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    },
    [searchQuery, router],
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 shadow-sm shadow-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain rounded "
              priority
              unoptimized
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SuperNick
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <Link
                  href="/admin/accounts"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Manage Accounts
                </Link>
                <Link
                  href="/admin/ads"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Manage Ads
                </Link>
                <Link
                  href="/admin/ad-text"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Manage Ad Text
                </Link>
                <Link
                  href="/admin/profile"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Profile
                </Link>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button> */}
              </>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Search Dialog */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search Accounts</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearchSubmit}>
                  <div className="space-y-4">
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by account title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        autoFocus
                      />
                    </div>

                    {/* Search Results */}
                    <div className="max-h-60 overflow-y-auto">
                      {isSearching ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            Searching...
                          </p>
                        </div>
                      ) : searchQuery && searchResults.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            No accounts found matching &quot;{searchQuery}&quot;
                          </p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((account) => (
                            <div
                              key={account.id}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                              onClick={() => handleResultClick(account.id)}
                            >
                              <div className="flex items-center space-x-3">
                                {account.images &&
                                  account.images.length > 0 && (
                                    <div className="w-10 h-10 relative rounded overflow-hidden">
                                      <Image
                                        src={account.images[0]}
                                        alt={account.title}
                                        fill
                                        unoptimized
                                        loading="lazy"
                                        className="object-cover"
                                      />
                                    </div>
                                  )}
                                <div>
                                  <p className="text-sm font-medium line-clamp-1">
                                    {account.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {account.price?.toLocaleString()} MMK
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* View All Results */}
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full mt-2"
                            onClick={handleViewAllResults}
                          >
                            View All Results ({searchResults.length})
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground">
                            Type to search for accounts
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="mm">MM</SelectItem>
                </SelectContent>
              </Select>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* Admin Login/Logout button */}
              {!isAdmin ? (
                <Link href="/admin/login">
                  <Button variant="outline" size="sm" className="ml-2">
                    Admin Login
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="ml-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative overflow-hidden transition-transform duration-300 hover:scale-110 active:scale-95"
                  >
                    <motion.div
                      animate={isOpen ? "open" : "closed"}
                      variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-80 p-0">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex flex-col h-full bg-gradient-to-b from-background to-background/95 backdrop-blur-xl ${
                      theme === "dark" && "bg-black/20"
                    } ${theme === "light" && "bg-white/80"}`}
                  >
                    {/* Animated Header */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="p-6 border-b"
                    >
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Menu
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Navigate through our store
                      </p>
                    </motion.div>

                    <div className="flex-1 overflow-y-auto py-6 px-4">
                      {/* Navigation Links with Staggered Animation */}
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.08,
                              delayChildren: 0.2,
                            },
                          },
                        }}
                        className="space-y-4"
                      >
                        {/* {navLinks.map((link, index) => (
                          <motion.div
                            key={link.href}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                },
                              },
                            }}
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href={link.href}
                              className="group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:bg-primary/10"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                →
                              </span>
                              <span className="text-lg font-medium">
                                {link.label}
                              </span>
                            </Link>
                          </motion.div>
                        ))} */}

                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          className="space-y-2 pt-2"
                        >
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-4"
                          />

                          {[
                            {
                              href: "/mobile-legend",
                              label: "Mobile Legend",
                              icon: MLBB,
                            },
                            {
                              href: "/pubg",
                              label: "PUBG",
                              icon: PUBG,
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={item.href}
                              variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: {
                                  opacity: 1,
                                  x: 0,
                                  transition: { delay: index * 0.05 },
                                },
                              }}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Link
                                href={item.href}
                                className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/20 transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                              >
                                {/* <span className="text-xl">{item.icon}</span> */}
                                <Image
                                  src={item.icon}
                                  alt={item.label}
                                  width={24}
                                  height={24}
                                />

                                <span className="text-base font-medium">
                                  {item.label}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>

                        {isAdmin && (
                          <motion.div
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 },
                            }}
                            className="space-y-2 pt-2"
                          >
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              transition={{ duration: 0.3 }}
                              className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-4"
                            />

                            {[
                              {
                                href: "/admin/accounts",
                                label: "Manage Accounts",
                                icon: "📊",
                              },
                              {
                                href: "/admin/ads",
                                label: "Manage Ads",
                                icon: "📢",
                              },
                              {
                                href: "/admin/ad-text",
                                label: "Manage Ad Text",
                                icon: "✏️",
                              },
                              {
                                href: "/admin/profile",
                                label: "Profile",
                                icon: "👤",
                              },
                            ].map((item, index) => (
                              <motion.div
                                key={item.href}
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: index * 0.05 },
                                  },
                                }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link
                                  href={item.href}
                                  className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/20 transition-all duration-300"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="text-xl">{item.icon}</span>
                                  <span className="text-base font-medium">
                                    {item.label}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Contact Support Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.4 }}
                        className="space-y-4 pt-6 mt-6"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center gap-2 mb-3"
                        >
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Support & Contact
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        </motion.div>

                        {/* Telegram Channel */}
                        <motion.a
                          href="tg://resolve?domain=Super_NickGameServices"
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: { delay: 0.55 },
                            },
                          }}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-sky-500/10 to-blue-500/10 hover:from-sky-500/20 hover:to-blue-500/20 transition-all duration-300 border border-sky-500/20"
                        >
                          <div className="p-2 rounded-lg bg-sky-500/20">
                            <MessageSquare className="h-5 w-5 text-sky-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Telegram Channel
                            </p>
                            <p className="text-xs text-muted-foreground">
                              @Super_NickGameServices
                            </p>
                          </div>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: 1,
                            }}
                            className="text-sky-500"
                          >
                            →
                          </motion.span>
                        </motion.a>

                        {/* Email Support */}
                        <motion.a
                          href="mailto:laxee561@gmail.com"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: { delay: 0.6 },
                            },
                          }}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border border-purple-500/20"
                        >
                          <div className="p-2 rounded-lg bg-purple-500/20">
                            <Mail className="h-5 w-5 text-purple-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Email Support</p>
                            <p className="text-xs text-muted-foreground">
                              laxee561@gmail.com
                            </p>
                          </div>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: 1.2,
                            }}
                            className="text-purple-500"
                          >
                            →
                          </motion.span>
                        </motion.a>

                        {/* Phone Support */}
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: { delay: 0.65 },
                            },
                          }}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 cursor-pointer group"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(
                                "09 673 753 054",
                              );
                              setCopiedPhone(true);
                              setTimeout(() => setCopiedPhone(false), 10000);
                              // console.log("Phone number copied!");
                            } catch (err) {
                              // console.error("Failed to copy:", err);
                            }
                          }}
                        >
                          <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                            <Phone className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Phone Support</p>
                            <p className="text-xs text-muted-foreground">
                              09 673 753 054
                            </p>
                          </div>

                          <span className="text-green-500">
                            {copiedPhone ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </span>
                          {/* <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="text-green-500"
                          >
                            {copiedPhone ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </motion.span> */}
                          {/* <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="text-green-500"
                          >
                            {copiedPhone ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </motion.div> */}
                        </motion.div>

                        {/* Quick Response Note */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          className="mt-4 p-3 rounded-lg bg-primary/5 text-center"
                        >
                          <p className="text-xs text-muted-foreground">
                            ⚡ Typically responds within 5 minutes
                          </p>
                        </motion.div>
                      </motion.div>

                      {/* Mobile Controls with Fade In Animation */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75, duration: 0.4 }}
                        className="space-y-4 pt-6 mt-6 border-t"
                      >
                        {/* Language Selector */}
                        <motion.div
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Language
                          </span>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="w-20 border-0 bg-accent/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">EN</SelectItem>
                              <SelectItem value="mm">MM</SelectItem>
                            </SelectContent>
                          </Select>
                        </motion.div>

                        <motion.div
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Theme
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setTheme(theme === "light" ? "dark" : "light")
                            }
                          >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Admin Login/Logout Button with Slide Up Animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      className="p-4 border-t bg-gradient-to-t from-background to-transparent"
                    >
                      {!isAdmin ? (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link href="/admin/login" className="block w-full">
                            <Button variant="outline" className="w-full">
                              <span className="relative">Admin Login</span>
                            </Button>
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full relative overflow-hidden group"
                            onClick={() => {
                              handleSignOut();
                              setIsOpen(false);
                            }}
                          >
                            <motion.span
                              className="absolute inset-0 bg-white/20"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                            />
                            <LogOut className="h-4 w-4 mr-2 relative" />
                            <span className="relative">Sign Out</span>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Decorative Animated Background */}
                    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 90, 0],
                          opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, -90, 0],
                          opacity: [0.1, 0.15, 0.1],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 2,
                        }}
                        className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-3xl"
                      />
                    </div>
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
