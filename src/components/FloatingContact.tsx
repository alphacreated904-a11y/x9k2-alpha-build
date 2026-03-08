import React, { useState } from "react";
import { Headphones, MessageSquare, PhoneCall, X } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded options */}
      <div
        className={cn(
          "flex flex-col items-end gap-2.5 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Chat with us */}
        <a
          href="https://wa.me/911800123456"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-full bg-primary pl-4 pr-5 py-2.5 text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquare className="size-4" />
          <span className="text-sm font-semibold whitespace-nowrap">Chat with us</span>
        </a>

        {/* Missed call */}
        <a
          href="tel:+911800123456"
          className="flex items-center gap-2.5 rounded-full bg-blue-600 pl-4 pr-5 py-2.5 text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
        >
          <PhoneCall className="size-4" />
          <span className="text-sm font-semibold whitespace-nowrap">Missed call</span>
        </a>
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95",
          isOpen
            ? "bg-primary text-primary-foreground rotate-0"
            : "bg-primary text-primary-foreground"
        )}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
      >
        <div className="relative">
          <Headphones
            className={cn(
              "size-6 transition-all duration-300 absolute inset-0",
              isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            )}
          />
          <X
            className={cn(
              "size-6 transition-all duration-300",
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            )}
          />
        </div>
      </button>
    </div>
  );
};

export { FloatingContact };
