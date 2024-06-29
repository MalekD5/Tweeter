import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize<T extends string>(s: T) {
  return (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;
}

function safeURL(url: URL | string): URL | null {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

export function verifyRequestOrigin(origin: string, allowedDomains: string[]): boolean {
  if (!origin || allowedDomains.length === 0) return false;
  const originHost = safeURL(origin)?.host ?? null;
  if (!originHost) return false;
  for (const domain of allowedDomains) {
    let host: string | null;
    if (domain.startsWith("http://") || domain.startsWith("https://")) {
      host = safeURL(domain)?.host ?? null;
    } else {
      host = safeURL("https://" + domain)?.host ?? null;
    }
    if (originHost === host) return true;
  }
  return false;
}

export function isInvalidDate(date: Date | null): boolean {
  if (!date) return false;

  return date > new Date() || date < new Date(1900, 1, 1);
}
