/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = <F extends (...args: any) => any>(
  func: F,
  delay = 500,
) => {
  let timeout: ReturnType<typeof setTimeout> | number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
