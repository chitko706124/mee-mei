import React from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  MessageSquare,
  Phone,
  MessageCircle,
  Send,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 pt-16 pb-8 border-t border-primary/10 overflow-hidden bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-3xl font-serif font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
              Mee Mei
              <Heart className="h-5 w-5 text-rose-400 fill-rose-200 animate-pulse" />
            </span>
            <p className="text-muted-foreground">
              Your trusted boutique for premium gaming accounts designed for
              you.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-foreground tracking-wider uppercase text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/mobile-legend"
                  className="text-foreground hover:text-primary transition-colors text-sm"
                >
                  Mobile Legend
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-accounts"
                  className="text-foreground hover:text-primary transition-colors text-sm"
                >
                  Sell Accounts
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-foreground tracking-wider uppercase text-sm">
              Contact
            </h3>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li>
                <a
                  href="tg://resolve?domain=haeromi01"
                  className="text-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                >
                  <span className="p-1.5 bg-primary/10 rounded-full">
                    <Send className="h-3 w-3 text-primary" />
                  </span>{" "}
                  Telegram Channel
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1ShVfmkytB/?mibextid=wwXIfr"
                  className="text-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                >
                  <span className="p-1.5 bg-primary/10 rounded-full">
                    <MessageCircle className="h-3 w-3 text-primary" />
                  </span>{" "}
                  Facebook Messenger
                </a>
              </li>
              {/* <li>
                <a
                  href="mailto:laxee561@gmail.com"
                  className="text-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors"
                >
                  <span className="p-1.5 bg-primary/10 rounded-full">
                    <Mail className="h-3 w-3 text-primary" />
                  </span>{" "}
                  laxee561@gmail.com
                </a>
              </li>
              <li>
                <span className="text-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors">
                  <span className="p-1.5 bg-primary/10 rounded-full">
                    <Phone className="h-3 w-3 text-primary" />
                  </span>{" "}
                  09 673 753 054
                </span>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-sm text-foreground/70">
            © 2026 Mee Mei. Crafted with love.
          </p>
          <p className="text-xs text-foreground/50">
            Contact Developer via Telegram :{" "}
            <span>
              <a
                href="tg://resolve?domain=ckk124"
                target="_blank"
                className="text-primary hover:underline"
              >
                Chit Ko Ko
              </a>
            </span>{" "}
            &
            <span>
              <a
                href="tg://resolve?domain=rhymes_T"
                target="_blank"
                className="text-primary hover:underline"
              >
                {" "}
                Thet Naung Phyo
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
