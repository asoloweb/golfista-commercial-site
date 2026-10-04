import type { APIRoute } from 'astro';
import { directusItems } from '../lib/directus';
import { circoloSlug, fetchCircoli } from '../lib/supabase';

type CmsPage = {
	slug?: string;
	date_created?: string;
	date_updated?: string;
};

type NewsItem = {
	slug?: string;
	data?: string;
	date_created?: string;
	date_updated?: string;
};

type SitemapEntry = {
	path: string;
	lastmod?: string;
	changefreq?: 'weekly' | 'monthly';
	priority?: number;
};

const fallbackSiteUrl = 'https://www.golfista.app';

function escapeXml(value: string) {
	return value.replace(/[<>&'\"]/g, (character) => ({
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
		"'": '&apos;',
		'"': '&quot;',
	}[character] || character));
}

function isoDate(value?: string) {
	if (!value) return '';
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
}

export const GET: APIRoute = async () => {
	const siteUrl = (import.meta.env.PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/+$/, '');
	const [pages, news, circoli] = await Promise.all([
		directusItems<CmsPage>('pages', {
			fields: 'slug,date_created,date_updated',
			'filter[status][_eq]': 'published',
			limit: '-1',
		}),
		directusItems<NewsItem>('news', {
			fields: 'slug,data,date_created,date_updated',
			'filter[status][_eq]': 'published',
			'filter[slug][_nnull]': 'true',
			limit: '-1',
		}),
		fetchCircoli(),
	]);

	const entries: SitemapEntry[] = [
		{ path: '/', changefreq: 'weekly', priority: 1 },
		{ path: '/circoli', changefreq: 'weekly', priority: 0.9 },
		{ path: '/news', changefreq: 'weekly', priority: 0.8 },
		{ path: '/privacy-policy', changefreq: 'monthly', priority: 0.3 },
		...pages
			.filter((page) => Boolean(page.slug))
			.map((page) => ({
				path: page.slug === 'home' ? '/' : `/${page.slug}`,
				lastmod: isoDate(page.date_updated || page.date_created),
				changefreq: 'monthly' as const,
				priority: 0.7,
			})),
		...news
			.filter((item) => Boolean(item.slug))
			.map((item) => ({
				path: `/news/${item.slug}`,
				lastmod: isoDate(item.date_updated || item.data || item.date_created),
				changefreq: 'monthly' as const,
				priority: 0.6,
			})),
		...circoli.map((circolo) => ({
			path: `/circoli/${circoloSlug(circolo)}`,
			lastmod: isoDate(circolo.updated_at || circolo.created_at || undefined),
			changefreq: 'monthly' as const,
			priority: 0.6,
		})),
	];

	const uniqueEntries = [...new Map(entries.map((entry) => [entry.path, entry])).values()];
	const urls = uniqueEntries
		.map((entry) => {
			const fields = [
				`<loc>${escapeXml(`${siteUrl}${entry.path}`)}</loc>`,
				entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '',
				entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : '',
				entry.priority != null ? `<priority>${entry.priority.toFixed(1)}</priority>` : '',
			]
				.filter(Boolean)
				.join('');
			return `<url>${fields}</url>`;
		})
		.join('');

	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
