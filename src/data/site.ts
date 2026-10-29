export type StaticSlide = {
	id?: number;
	titolo?: string;
	sottotitolo?: string;
	label?: string;
	href?: string;
	immagine?: string;
};

export type StaticBlock = {
	collection: string;
	item: Record<string, any>;
};

export type StaticPage = {
	id: number;
	title: string;
	slug: string;
	description: string;
	seo_title: string;
	seo_desc: string;
	hide_page_header?: boolean;
	featured_image?: string;
	editor: StaticBlock[];
};

const slides = {
	home: [
		{ id: 1, titolo: 'CONTROLLA IL TUO CIRCOLO CON <span>GOLFISTA</span>', sottotitolo: 'Esperienze, percorsi e contenuti per vivere il golf al meglio.', label: 'Scopri di più', href: '#contenuti', immagine: '/images/golf/slide-home-aerial-course.jpg' },
		{ id: 7, titolo: 'Mappa dei giocatori in tempo reale', sottotitolo: 'Segui i giocatori e le attività sul campo.', immagine: '/images/golf/slide-home-fairway.jpg' },
	],
	gestionale: [
		{ id: 3, titolo: 'Gestionale dedicato ai circoli', sottotitolo: 'Gestione convenzioni, recensioni, foto, news e mappa dei giocatori in campo in tempo reale!', label: 'Scopri le funzioni', href: '#funzioni', immagine: '/images/golf/slide-manager-golfer.jpg' },
		{ id: 4, titolo: 'Tutto sotto controllo', sottotitolo: 'Giocatori in tempo reale, recensioni, dati, gare, comunicazioni e processi in un unico ambiente.', label: 'Richiedi informazioni', href: '/contatti', immagine: '/images/golf/slide-manager-overview.jpg' },
	],
	app: [
		{ id: 5, titolo: 'App Golfista', sottotitolo: 'Sempre gratuita per i giocatori', label: 'Scopri l’app', href: '#app', immagine: '/images/golf/slide-app-putting.jpg' },
	],
};

const cards = {
	gestionale: [
		{ id: 7, titolo_card: 'Mappa in tempo reale', descrizione: 'Visualizza sulla mappa la posizione dei giocatori e segui le attività in corso nel circolo.' },
		{ id: 9, titolo_card: 'Gestione convenzioni', descrizione: 'Organizza convenzioni, green fee e accordi tra circoli in modo strutturato.' },
		{ id: 10, titolo_card: 'Gestione recensioni', descrizione: 'Raccogli, monitora e modera recensioni e feedback collegati al circolo.' },
		{ id: 11, titolo_card: 'Foto delle gare', descrizione: 'Gestisci le immagini caricate durante le gare e valorizza i contenuti del club.' },
		{ id: 12, titolo_card: 'Stato del campo', descrizione: 'Aggiorna e comunica condizioni di green, fairway, bunker, golf cart e percorsi aperti.' },
		{ id: 13, titolo_card: 'Meteo dettagliato', descrizione: 'Consulta previsioni e indicatori meteo utili per organizzare attività e gare.' },
		{ id: 14, titolo_card: 'Confronto tra circoli', descrizione: 'Confronta andamento, dati e performance con altri circoli presenti nella piattaforma.' },
		{ id: 15, titolo_card: 'Statistiche avanzate', descrizione: 'Analizza dati operativi, utilizzo, attività e trend con viste statistiche evolute.' },
		{ id: 16, titolo_card: 'News', descrizione: 'Pubblica aggiornamenti e comunicazioni del circolo direttamente nel sistema.' },
		{ id: 17, titolo_card: 'Aggiornamenti gare', descrizione: 'Tieni aggiornati giocatori e staff su gare, variazioni, risultati e comunicazioni operative.' },
	],
	contatti: [
		{ id: 4, titolo_card: 'Telefono', descrizione: 'Chiamaci per informazioni su Golfista.', href: 'tel:+393381164785' },
		{ id: 5, titolo_card: 'Email', descrizione: 'Scrivici per ricevere maggiori dettagli.', href: 'mailto:info@golfista.app' },
	],
};

export const staticPages: StaticPage[] = [
	{
		id: 1, title: 'Home', slug: 'home', description: 'La piattaforma digitale per giocatori di golf e circoli.', seo_title: 'Golfista: app e gestionale per circoli golf', seo_desc: 'Scopri Golfista, l’app per giocatori e il gestionale per circoli golf: gare, percorsi, convenzioni e mappa dei giocatori in tempo reale.', hide_page_header: true,
		editor: [
			{ collection: 'slider_block', item: { id: 1, slider: { id: 1, slides: slides.home } } },
			{ collection: 'hero_block', item: { id: 1, titolo: 'Gioca meglio, vivi meglio il golf', sottotitolo: 'Contenuti selezionati per migliorare esperienza, tecnica e conoscenza del gioco.', paragrafo: '<p>Golfista raccoglie approfondimenti, suggerimenti e percorsi editoriali per chi ama il golf e vuole restare aggiornato.</p>', href: '/news', label: 'Leggi le news', immagine: '/images/golf/golfer-swing.jpg', inverti: false, background_color: '#F2F2F2' } },
			{ collection: 'hero_block', item: { id: 2, titolo: 'Una community per appassionati', sottotitolo: 'Dai primi colpi al campo, tutto quello che serve per orientarsi nel mondo del golf.', paragrafo: '<p>Scopri contenuti pratici, ispirazioni e risorse pensate per accompagnarti in ogni fase del tuo percorso.</p>', href: '/circoli', label: 'Scopri i circoli', immagine: '/images/golf/golf-course-sunset.jpg', inverti: true } },
		],
	},
	{
		id: 2, title: 'Gestionale', slug: 'gestionale', description: 'Il gestionale Golfista per circoli golf.', seo_title: 'Gestionale per circoli golf', seo_desc: 'Organizza gare, convenzioni, foto e comunicazioni del tuo circolo con il gestionale Golfista. Scopri la mappa dei giocatori e le statistiche.', hide_page_header: true,
		editor: [
			{ collection: 'slider_block', item: { id: 2, slider: { id: 2, slides: slides.gestionale } } },
			{ collection: 'hero_block', item: { id: 3, titolo: 'Gestione semplice per il circolo', sottotitolo: 'Un sistema pensato per semplificare il lavoro quotidiano.', paragrafo: '<p>Golfista aiuta i circoli a organizzare informazioni, attività e comunicazioni riducendo passaggi manuali e dispersione dei dati.</p>', href: '/contatti', label: 'Contattaci', immagine: '/images/golf/golf-community-mobile.jpg', inverti: false, background_color: '#F2F2F2' } },
			{ collection: 'hero_block', item: { id: 4, titolo: 'Dati sempre disponibili', sottotitolo: 'Una base informativa aggiornata per decisioni più rapide.', paragrafo: '<p>Dashboard e contenuti strutturati permettono di valorizzare le informazioni del circolo e migliorare l’esperienza degli utenti.</p>', href: '/app', label: 'Vai all’app', immagine: '/images/golf/golf-bag-fairway.jpg', inverti: true } },
			{ collection: 'cards_block', item: { id: 1, titolo: 'Funzionalità del <span>gestionale</span>', card: cards.gestionale } },
			{ collection: 'hero_block', item: { id: 9, titolo: 'Prezzi trasparenti per il tuo circolo', sottotitolo: 'Scegli il piano più adatto alla tua gestione.', paragrafo: '<p>Parti con il piano FREE oppure passa al PRO per abilitare strumenti avanzati, statistiche, comunicazioni e funzionalità operative per il circolo.</p>', href: '/prezzi', label: 'Scopri i prezzi', immagine: '/images/golf/golf-putting.jpg', inverti: false, background_color: '#F2F2F2' } },
		],
	},
	{
		id: 3, title: 'App', slug: 'app', description: 'L’app Golfista per giocatori e circoli.', seo_title: 'App Golfista per giocatori di golf', seo_desc: 'Scopri l’app Golfista per consultare i circoli, le gare e i contenuti disponibili e restare in contatto con le attività dei club.', hide_page_header: true,
		editor: [
			{ collection: 'slider_block', item: { id: 3, slider: { id: 3, slides: slides.app } } },
			{ collection: 'hero_block', item: { id: 5, titolo: 'Un’app per vivere il golf', sottotitolo: 'Informazioni, contenuti e funzionalità pensate per i golfisti.', paragrafo: '<p>L’app Golfista accompagna gli utenti nella scoperta dei circoli, nella consultazione di contenuti e nell’accesso ai servizi disponibili.</p>', href: '/circoli', label: 'Consulta i circoli', immagine: '/images/golf/golf-players-together.jpg', inverti: false, background_color: '#F2F2F2' } },
			{ collection: 'hero_block', item: { id: 6, titolo: 'Più valore per giocatori e club', sottotitolo: 'Già oltre 2500 giocatori collegati alla piattaforma.', paragrafo: '<p>Golfista crea un ponte tra circoli e giocatori: una community già attiva con oltre 2500 giocatori, pensata per rendere più accessibili informazioni, attività e aggiornamenti.</p>', href: '/contatti', label: 'Richiedi informazioni', immagine: '/images/golf/golfer-sunset.jpg', inverti: true, background_color: '#ffffff' } },
		],
	},
	{
		id: 4, title: 'Contatti', slug: 'contatti', description: 'Contatta Golfista per informazioni su app, gestionale e servizi per i circoli.', seo_title: 'Contatti', seo_desc: 'Contatta Golfista via telefono o email per informazioni sull’app per giocatori, sul gestionale e sui piani per i circoli golf.', hide_page_header: true,
		editor: [{ collection: 'cards_block', item: { id: 2, titolo: 'Contattaci', card: cards.contatti } }],
	},
	{
		id: 5, title: 'Chi siamo', slug: 'chi-siamo', description: 'Golfista nasce per connettere circoli, giocatori e strumenti digitali in un’unica piattaforma.', seo_title: 'Chi siamo: il progetto Golfista', seo_desc: 'Conosci il progetto Golfista, la piattaforma pensata per semplificare la gestione dei circoli golf e il rapporto con giocatori e staff.',
		editor: [{ collection: 'hero_block', item: { id: 7, titolo: 'La piattaforma per il golf italiano', sottotitolo: 'Un progetto pensato per circoli e golfisti.', paragrafo: '<p>Golfista semplifica la gestione digitale dei circoli e rende più immediata la relazione con giocatori, staff e community.</p>', href: '/contatti', label: 'Contattaci', immagine: '/images/golf/golf-course-twilight.jpg', inverti: false, background_color: '#F2F2F2' } }],
	},
	{
		id: 6, title: 'Prezzi', slug: 'prezzi', description: 'Piani chiari per usare Golfista secondo le esigenze del tuo circolo.', seo_title: 'Prezzi e piani per circoli golf', seo_desc: 'Confronta i piani FREE e PRO di Golfista: costi e funzionalità del gestionale per scegliere gli strumenti adatti al tuo circolo golf.',
		editor: [],
	},
];

export const siteNavigation = [
	{ label: 'Home', href: '/' },
	{ label: 'App', href: '/app' },
	{ label: 'Gestionale', href: '/gestionale' },
	{ label: 'Circoli', href: '/circoli' },
	{ label: 'Prezzi', href: '/prezzi' },
	{ label: 'News', href: '/news' },
	{ label: 'Chi siamo', href: '/chi-siamo' },
	{ label: 'Contatti', href: '/contatti' },
];

export const footerNavigation = [
	[{ label: 'Circoli', href: '/circoli' }, { label: 'News', href: '/news' }, { label: 'Privacy Policy', href: '/privacy-policy' }],
	[{ label: 'App Golfista', href: '/app' }, { label: 'Gestionale', href: '/gestionale' }],
	[{ label: 'Prezzi', href: '/prezzi' }, { label: 'Contatti', href: '/contatti' }, { label: 'Chi siamo', href: '/chi-siamo' }],
];

export function getStaticPage(slug: string) {
	return staticPages.find((page) => page.slug === slug) || null;
}
