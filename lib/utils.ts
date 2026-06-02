export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatGuestName(name: string | null | undefined): string {
  if (!name || name.trim() === "") return "Tamu Undangan";
  return decodeURIComponent(name.trim());
}
