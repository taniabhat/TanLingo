"use client";

import React from "react";

interface FlagIconProps {
  countryCode?: string;
  name?: string;
  emoji?: string;
  className?: string;
}

const COUNTRY_MAP: Record<string, string> = {
  Spanish: "es",
  English: "us",
  French: "fr",
  Japanese: "jp",
  German: "de",
  Italian: "it",
  Chinese: "cn",
  Korean: "kr",
  Russian: "ru",
  Portuguese: "br",
  Arabic: "sa",
  Hindi: "in",
};

export default function FlagIcon({ countryCode, name, emoji, className = "w-10 h-8" }: FlagIconProps) {
  const code = countryCode || (name ? COUNTRY_MAP[name] : null);

  if (code) {
    return (
      <img
        src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w160/${code.toLowerCase()}.png 2x`}
        alt={name || "Flag"}
        className={`object-cover rounded-lg shadow-sm border border-gray-200/50 dark:border-duo-dark-border ${className}`}
        onError={(e) => {
          // Fallback to emoji if network fails
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return <span className="text-3xl">{emoji || "🌍"}</span>;
}
