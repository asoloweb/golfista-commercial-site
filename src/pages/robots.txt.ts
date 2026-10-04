import type { APIRoute } from 'astro';

const fallbackSiteUrl = 'https://www.golfista.app';

export const GET: APIRoute = async () => {
	const siteUrl = (import.meta.env.PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/+$/, '');
	return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /area-riservata\n\nSitemap: ${siteUrl}/sitemap.xml\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
