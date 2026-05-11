import React from "react";
import Link from "next/link";
import { Sparkles, Mail, MessageSquare, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t bg-background pt-16 pb-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <span className="text-3xl font-black relative flex items-center gap-2">
              <span className="relative text-primary flex items-center">
                SUPER NICK
                <Sparkles className="h-5 w-5 ml-1 text-primary animate-pulse" />
              </span>
            </span>
            <p className="text-muted-foreground max-w-sm">
              The premier marketplace for elite gaming accounts. Secure, fast,
              and constantly evolving to bring you the best selections.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-wider uppercase text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-legend"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Mobile Legend
                </Link>
              </li>
              <li>
                <Link
                  href="/pubg"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  PUBG
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/offers"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Offers
                </Link>
              </li> */}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground tracking-wider uppercase text-sm">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="tg://resolve?domain=Super_NickGameServices"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" /> Telegram Channel
                </a>
              </li>
              <li>
                <a
                  href="mailto:laxee561@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" /> laxee561@gmail.com
                </a>
              </li>

              <li>
                <span className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" /> 09 673 753 054
                </span>
                {/* <a
                  href="mailto:laxee561@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" /> laxee561@gmail.com
                </a> */}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Super Nick. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Contact us{" "}
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
};

export default Footer;
