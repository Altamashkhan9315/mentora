"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { FileText, GraduationCap, PenBox, Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed px-5 py-4 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Middle: Menu (Desktop only) */}
        <div
          className={`hidden md:flex gap-8 text-lg font-medium px-6 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-transparent"
              : "bg-gradient-to-r from-blue-500/20 to-blue-800/20 backdrop-blur-2xl border border-blue-300/20 py-4"
          }`}
        >
          <Link href="/dashboard" className="hover:text-primary transition">
            Industry Insights
          </Link>
          <Link
            href="/ai-cover-letter"
            className="hover:text-primary transition flex items-center gap-1"
          >
            <PenBox className="h-4 w-4" />
            Cover Letter
          </Link>
          <Link
            href="/resume"
            className="hover:text-primary transition flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Resume Builder
          </Link>
          <Link
            href="/interview"
            className="hover:text-primary transition flex items-center gap-1"
          >
            <GraduationCap className="h-4 w-4" />
            Interview Prep
          </Link>
        </div>

        {/* Right: Sign In / User + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="default" className="gradient-button rounded-full px-6 hidden md:block">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-[64px] h-[64px]", // Tailwind overrides
                  avatarImage: "w-[64px] h-[64px]",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
                
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>

          {/* Hamburger (Mobile only) */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden focus:outline-none"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-background shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <ul className="flex flex-col space-y-6 p-6 text-lg">
          <li>
            <Link href="/insights" onClick={() => setIsOpen(false)}>
              Industry Insights
            </Link>
          </li>
          <li>
            <Link href="/ai-cover-letter" onClick={() => setIsOpen(false)}>
              Cover Letter
            </Link>
          </li>
          <li>
            <Link href="/resume" onClick={() => setIsOpen(false)}>
              Resume Builder
            </Link>
          </li>
          <li>
            <Link href="/interview" onClick={() => setIsOpen(false)}>
              Interview Prep
            </Link>
          </li>
          <li>
            <SignedOut>
              <SignInButton>
                <Button variant="default" className="gradient-button rounded-full px-6 w-full">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </li>
        </ul>
      </div>

      {/* Background overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
