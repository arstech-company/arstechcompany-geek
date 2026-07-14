export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://geek.arstechcompany.com.br"
).replace(/\/$/, "");

export const SITE_NAME = "ARS GEEK";
export const SITE_TAGLINE = "Onde tecnologia encontra cultura pop.";
export const SITE_DESCRIPTION =
  "Filmes, Star Wars, Marvel, DC, animes e games analisados com o olhar de quem constrói tecnologia. O braço editorial geek da ARS Tech Company.";

export const CONTACT_EMAIL = "desenvolvimento@arstechcompany.com.br";

export const INSTITUTIONAL_URL = "https://arstechcompany.com.br";
export const TOOLS_URL = "https://tools.arstechcompany.com.br";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prefixa um caminho de asset do /public com o basePath. Necessário porque,
 * com `images.unoptimized` (exigência do static export), o next/image não
 * aplica o basePath automaticamente no src.
 */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
