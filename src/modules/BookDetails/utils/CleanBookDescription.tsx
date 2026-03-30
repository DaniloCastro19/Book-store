export function cleanBookDescription(description: string | undefined): string {
  if (!description) return "No description available for this book.";

  // clean HTML tags
  let clean = description.replace(/<[^>]*>/g, "");

  // Normalize multiple spaces to a single space
  clean = clean.replace(/\s+/g, " ");

  // Clean spaces around quotes
  clean = clean.replace(/\s*"\s*/g, '"');

  // Fix multiple consecutive quotes
  clean = clean.replace(/"{2,}/g, '"');

  return clean.trim();
}
