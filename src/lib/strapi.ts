// Fonction fetch unifiée pour Strapi
export async function fetchFromStrapi<T = unknown>(endpoint: string): Promise<T> {
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${base}/${endpoint}?populate=*`);
  if (!res.ok) throw new Error(`[Strapi] ${res.status} ${res.statusText}`);
  return res.json();
}
