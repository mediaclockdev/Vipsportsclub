import type { Prize } from "./content-types";

const GOLD_GRADIENT = "linear-gradient(180deg, #E0D19B 0%, #B6983D 50%)";
const GREEN_GRADIENT = "linear-gradient(180deg, #8FE07D 0%, #4FA07D 50%)";

const IMAGE_BY_KEY: Record<string, string> = {
  kayo: "/kayosports.svg",
  kingdom: "/kingdom.svg",
  gift: "/giftcard.svg",
  card: "/card2.svg",
  card3: "/card3.svg",
  card4: "/card4.svg",
  card6: "/card6.svg",
  card7: "/card7.svg",
  card8: "/card8.svg",
};

export function getPrizeImage(prize: Pick<Prize, "imageUrl" | "imageKey">) {
  if (prize.imageUrl?.trim()) {
    return prize.imageUrl.trim();
  }

  const key = prize.imageKey?.trim().toLowerCase();
  return IMAGE_BY_KEY[key] ?? "/winner.svg";
}

export function getPrizeCardGradient(index: number) {
  return index % 2 === 0 ? GREEN_GRADIENT : GOLD_GRADIENT;
}

export function getPrizeColorClass(index: number) {
  return index % 2 === 0 ? "bg-[#4FA07D]" : "bg-[#E2C86B]";
}

export function formatPrizeDate(drawDate: string) {
  const parsed = new Date(drawDate);
  if (Number.isNaN(parsed.getTime())) {
    return drawDate;
  }

  return parsed
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}
