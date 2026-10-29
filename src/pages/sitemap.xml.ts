import type { APIRoute } from 'astro';
import { assertSupabasePublicConfig, circoloSlug, fetchCircoli } from '../lib/supabase';
import { staticPages } from '../data/site';

export const prerender = true;

type Entry = { loc: string; lastmod?: string };

function xmlEscape(value: string) {
	return value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char] || char));
}

export const GET: APIRoute = async () => {
	assertSupabasePublicConfig();
	const siteUrl = (import.meta.env.PUBLIC_SITE_URL || 'https://www.golfista.app').replace(/\/+$/, '');
	const circoli = await fetchCircoli();
	const entries: Entry[] = [
		...['/', '/circoli', '/news', '/privacy-policy', '/condizioni-del-servizio', '/cookie-policy'].map((path) => ({ loc: `${siteUrl}${path}` })),
		...staticPages.filter((page) => page.slug !== 'home').map((page) => ({ loc: `${siteUrl}/${page.slug}` })),
		...circoli.map((circolo) => ({
			loc: `${siteUrl}/circoli/${circoloSlug(circolo)}`,
			lastmod: circolo.updated_at || circolo.created_at || undefined,
		})),
	];
	const urlset = entries.map(({ loc, lastmod }) => `<url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString().slice(0, 10)}</lastmod>` : ''}</url>`).join('');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}</urlset>`, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
	});
};
