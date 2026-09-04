const configuredAssetBaseUrl =
  import.meta.env.VITE_ASSET_PUBLIC_BASE_URL?.trim() ?? "";

export function resolveDynamicAssetUrl(
  url?: string | null,
): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (!configuredAssetBaseUrl) return url;
  return `${configuredAssetBaseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}
