const rawSupabaseUrl =
	import.meta.env.PUBLIC_SUPABASE_URL ||
	import.meta.env.SUPABASE_URL ||
	'https://db.golfista.app';

const supabaseAnonKey =
	import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
	import.meta.env.SUPABASE_ANON_KEY ||
	'';

export const SUPABASE_URL = rawSupabaseUrl.replace(/\/+$/, '');

export type Circolo = {
	idcircolo: number;
	nomecircolo: string | null;
	indirizzo: string | null;
	paese: string | null;
	provincia: string | null;
	mail: string | null;
	segretario: string | null;
	telefono: string | null;
	lat: string | null;
	lon: string | null;
	desc_ai: string | null;
	logo_url: string | null;
	cover_url: string | null;
	cover_image_url?: string | null;
	local_cover_url?: string;
	local_logo_url?: string;
	website: string | null;
	autorizzato: boolean | null;
	ragione_sociale?: string | null;
	is_active?: boolean | null;
	billing_status?: string | null;
	created_at: string | null;
	updated_at: string | null;
};

const CIRCOLI_FIELDS = [
	'idcircolo',
	'nomecircolo',
	'indirizzo',
	'paese',
	'provincia',
	'mail',
	'segretario',
	'telefono',
	'lat',
	'lon',
	'desc_ai',
	'logo_url',
	'cover_url',
	'website',
	'autorizzato',
	'ragione_sociale',
	'is_active',
	'billing_status',
	'created_at',
	'updated_at',
].join(',');

export function circoloSlug(circolo: Pick<Circolo, 'idcircolo' | 'nomecircolo'>) {
	const name = circolo.nomecircolo || `circolo-${circolo.idcircolo}`;
	const slug = name
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return `${slug || 'circolo'}-${circolo.idcircolo}`;
}

export function circoloIdFromSlug(slug: string) {
	const match = slug.match(/-(\d+)$/);
	return match ? Number(match[1]) : null;
}

async function supabaseRest<T>(path: string, params: Record<string, string> = {}) {
	if (!supabaseAnonKey) {
		console.error('Missing SUPABASE_ANON_KEY');
		return null;
	}

	const url = new URL(`/rest/v1/${path.replace(/^\/+/, '')}`, SUPABASE_URL);
	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}

	const response = await fetch(url, {
		headers: {
			apikey: supabaseAnonKey,
			Authorization: `Bearer ${supabaseAnonKey}`,
		},
	});

	if (!response.ok) {
		console.error(`Supabase request failed: ${response.status} ${response.statusText}`);
		return null;
	}

	return (await response.json()) as T;
}

export async function fetchCircoli() {
	const circoli =
		(await supabaseRest<Circolo[]>('Circoli', {
			select: CIRCOLI_FIELDS,
			order: 'nomecircolo.asc',
		})) || [];

	return withLocalImages(circoli);
}

export async function fetchCircoloById(id: number) {
	const rows = await supabaseRest<Circolo[]>('Circoli', {
		select: CIRCOLI_FIELDS,
		idcircolo: `eq.${id}`,
		limit: '1',
	});

	const circolo = rows?.[0] ?? null;
	if (!circolo) return null;

	const [withImage] = withLocalImages([circolo]);
	return withImage ?? circolo;
}

function withLocalImages(circoli: Circolo[]) {
	return circoli.map((circolo) => ({
		...circolo,
		local_cover_url: `/circoli/${circolo.idcircolo}.jpg`,
		local_logo_url: `/loghi/${circolo.idcircolo}.png`,
		cover_image_url: `/circoli/${circolo.idcircolo}.jpg`,
	}));
}
