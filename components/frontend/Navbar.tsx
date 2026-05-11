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
    // { href: "tg://resolve?domain=", label: "Community" },
    { href: "/mobile-legend", label: "Mobile Legend" },
    { href: "/sell-accounts", label: "Sell Accounts" },

    // { href: "/pubg", label: "PUBG" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/check-auth`, {
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
      const response = await fetch(`${process.env.API_URL}/logout`, {
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
        `${process.env.API_URL}/accounts?q=${encodeURIComponent(
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
    <nav className="sticky top-0 z-50 w-full glass shadow-md shadow-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain rounded-full shadow border-2 border-primary/20"
              priority
              unoptimized
            /> */}
            <span className="text-2xl font-serif font-bold text-foreground tracking-wide">
              Mee Mei
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors hover:text-primary hover:underline underline-offset-4 decoration-primary decoration-2 text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <Link
                  href="/admin/accounts"
                  className="text-sm font-semibold transition-colors hover:text-primary hover:underline underline-offset-4 decoration-primary decoration-2 text-foreground"
                >
                  Manage Accounts
                </Link>
                <Link
                  href="/admin/ads"
                  className="text-sm font-semibold transition-colors hover:text-primary hover:underline underline-offset-4 decoration-primary decoration-2 text-foreground"
                >
                  Manage Ads
                </Link>
                <Link
                  href="/admin/ad-text"
                  className="text-sm font-semibold transition-colors hover:text-primary hover:underline underline-offset-4 decoration-primary decoration-2 text-foreground"
                >
                  Manage Ad Text
                </Link>
                <Link
                  href="/admin/sell-text"
                  className="text-sm font-semibold transition-colors hover:text-primary hover:underline underline-offset-4 decoration-primary decoration-2 text-foreground"
                >
                  Manage Sell Text
                </Link>
                <Link
                  href="/admin/profile"
                  className="text-sm font-semibold transition-colors hover:text-primary hover:underline underline-offset-4 decoration-primary decoration-2 text-foreground"
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Search Dialog */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 text-primary"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-primary font-serif">
                    Find your dream account
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearchSubmit}>
                  <div className="space-y-4">
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                      <Input
                        placeholder="Search accounts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-primary/30 focus-visible:ring-primary bg-white/50"
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
                <SelectTrigger className="w-20 border-primary/30 bg-white/50 text-foreground">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
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
                className="hover:bg-primary/10 text-primary"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* Admin Login/Logout button */}
              {!isAdmin ? (
                <Link href="/admin/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 border-primary/30 hover:bg-primary/10"
                  >
                    Admin Login
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="ml-2 border-primary/30 hover:bg-primary/10"
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
                    className="text-primary hover:bg-primary/10"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-background/95 backdrop-blur-xl border-l border-primary/20 overflow-y-auto"
                >
                  <div className="p-6 border-b border-primary/10">
                    <h2 className="text-2xl font-serif font-bold text-foreground">
                      Welcome
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Navigate through our store
                    </p>
                  </div>
                  <div className="py-6 px-4 space-y-4">
                    {navLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all text-foreground font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-lg">{item.label}</span>
                      </Link>
                    ))}

                    {isAdmin && (
                      <>
                        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-4" />
                        {[
                          { href: "/admin/accounts", label: "Manage Accounts" },
                          { href: "/admin/ads", label: "Manage Ads" },
                          { href: "/admin/ad-text", label: "Manage Ad Text" },
                          {
                            href: "/admin/sell-text",
                            label: "Manage Sell Text",
                          },

                          { href: "/admin/profile", label: "Profile" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all text-foreground font-semibold"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-lg">{item.label}</span>
                          </Link>
                        ))}
                      </>
                    )}

                    <div className="pt-6 mt-6 border-t border-primary/10 space-y-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Contact Us
                      </h3>
                      <a
                        href="tg://resolve?domain=haeromi01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all"
                      >
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Telegram Channel
                          </p>
                          <p className="text-xs text-muted-foreground">
                            @haeromi01
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://www.facebook.com/share/1ShVfmkytB/?mibextid=wwXIfr"
                        className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all"
                      >
                        <Mail className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Messenger</p>
                          <p className="text-xs text-muted-foreground">
                            Mei Haeromi
                          </p>
                        </div>
                      </a>
                    </div>

                    {/* Mobile Controls */}
                    <div className="space-y-4 pt-6 mt-6 border-t border-primary/10">
                      <div className="flex items-center justify-between p-2">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          Language
                        </span>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="w-20 border-primary/30 bg-white/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">EN</SelectItem>
                            <SelectItem value="mm">MM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between p-2">
                        <span className="text-sm font-medium flex items-center gap-2">
                          Theme
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                          }
                          className="hover:bg-primary/10"
                        >
                          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                      </div>
                    </div>

                    {/* Admin Login/Logout Button */}
                    <div className="pt-4">
                      {!isAdmin ? (
                        <Link href="/admin/login" className="block w-full">
                          <Button
                            variant="outline"
                            className="w-full border-primary/30 hover:bg-primary/10"
                          >
                            Admin Login
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full border-primary/30 hover:bg-primary/10"
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
