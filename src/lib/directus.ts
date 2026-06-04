const rawDirectusUrl =
	import.meta.env.PUBLIC_DIRECTUS_URL ||
	import.meta.env.DIRECTUS_URL ||
	'https://admin.golfista.app';

export const DIRECTUS_URL = rawDirectusUrl.replace(/\/+$/, '');
const directusToken = import.meta.env.DIRECTUS_TOKEN || import.meta.env.PUBLIC_DIRECTUS_TOKEN;

type AssetTransformOptions = {
	width?: number;
	height?: number;
	quality?: number;
	format?: 'webp' | 'avif' | 'jpg' | 'png';
	fit?: 'cover' | 'contain' | 'inside' | 'outside';
};

export function directusItemsUrl(path: string) {
	const cleanedPath = path.replace(/^\/+/, '');
	return new URL(`/items/${cleanedPath}`, DIRECTUS_URL);
}

export async function directusFetch<T>(url: URL | string, init: RequestInit = {}): Promise<T | null> {
	const headers = new Headers(init.headers);
	if (directusToken && !headers.has('Authorization')) {
		headers.set('Authorization', `Bearer ${directusToken}`);
	}

	const response = await fetch(url, { ...init, headers });
	if (!response.ok) {
		console.error(`Directus request failed: ${response.status} ${response.statusText}`);
		return null;
	}

	return (await response.json()) as T;
}

export async function directusItems<T>(path: string, params: Record<string, string> = {}) {
	const url = directusItemsUrl(path);
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}
	const payload = await directusFetch<{ data: T[] }>(url);
	return payload?.data ?? [];
}

export async function directusSingleton<T>(path: string, params: Record<string, string> = {}) {
	const url = directusItemsUrl(path);
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}
	const payload = await directusFetch<{ data: T | T[] }>(url);
	return Array.isArray(payload?.data) ? payload.data[0] ?? null : payload?.data ?? null;
}

export function directusAssetUrl(asset: string, options: AssetTransformOptions = {}) {
	if (!asset) return '';
	if (asset.startsWith('http://') || asset.startsWith('https://') || asset.startsWith('/')) {
		return asset;
	}

	const url = new URL(`/assets/${asset}`, DIRECTUS_URL);
	if (options.format) url.searchParams.set('format', options.format);
	if (options.quality) url.searchParams.set('quality', String(options.quality));
	if (options.width) url.searchParams.set('width', String(options.width));
	if (options.height) url.searchParams.set('height', String(options.height));
	if (options.fit) url.searchParams.set('fit', options.fit);
	return url.toString();
}
