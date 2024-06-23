import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize<T extends string>(s: T) {
  return (s[0].toUpperCase() + s.slice(1)) as Capitalize<typeof s>;
}
