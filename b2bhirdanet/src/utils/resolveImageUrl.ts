const API_ORIGIN = "http://localhost:5105";

export function resolveImageUrl(imageUrl?: string): string {
  if (!imageUrl) return "";

  const isAbsolute = imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
  if (isAbsolute) return imageUrl;

  if (imageUrl.startsWith("/")) {
    return `${API_ORIGIN}${imageUrl}`;
  }

  // Legacy case: stored as just filename or path without leading slash
  return `${API_ORIGIN}/images/${imageUrl}`;
}

export default resolveImageUrl;

