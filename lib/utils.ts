import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDescription = (receiptLongString: string) => {
  const description = receiptLongString.split("\n")[0];
  if (!description) return;

  if (description.toLocaleLowerCase().includes("sure,"))
    return description.slice(5, -1);

  return description.slice(0, -1);
};
