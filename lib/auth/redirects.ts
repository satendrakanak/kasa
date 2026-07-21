export function safeRelativePath(value: string | null | undefined, fallback = "/") {
  if (!value?.startsWith("/") || value.startsWith("//")) return fallback;

  return value;
}
