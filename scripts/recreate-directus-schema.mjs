const DIRECTUS_URL = 'https://admin.golfista.app';
const TOKEN = 'DiuSUAdx35N5PL26hjHPipj_fr8GRJDb';

const groups = [
  ['Sitoweb', 'web_traffic', null, 1],
  ['Blocchi', 'dashboard', null, 2],
  ['Slider', 'video_library', null, 3],
  ['Forms', 'receipt', null, 4],
  ['Utils', 'hive', null, 5],
];

const tables = [
  ['Menus', 'Sitoweb', 'segment', 2, null, null, false, null],
  ['Menus_menu_items', 'Utils', 'import_export', 5, null, null, true, null],
  ['Menus_menu_items_1', 'Utils', 'import_export', 13, null, null, true, null],
  ['Menus_pages', 'Utils', 'import_export', 4, null, null, true, null],
  ['accordion_block', 'Blocchi', null, 5, null, '{{Titolo}}', false, null],
  ['accordion_block_single_accordion', 'Utils', 'import_export', 11, null, null, true, null],
  ['cards_block', 'Blocchi', null, 3, 'sort', '{{card.single_card_id.titolo_card}}', false, null],
  ['cards_block_single_card', 'Utils', 'import_export', 10, null, null, true, null],
  ['hero_block', 'Blocchi', null, 1, 'sort', '{{titolo}}', false, null],
  ['menu_items', 'Utils', null, 1, 'sort', null, false, null],
  ['menu_items_pages', 'Utils', 'import_export', 9, null, null, true, null],
  ['news', null, 'article', null, 'sort', '{{titolo}}', false, 'Notizie pubblicate sul sito'],
  ['options', 'Utils', null, 2, null, null, false, null, true],
  ['pages', 'Sitoweb', null, 1, 'sort', null, false, null],
  ['pages_editor_1', 'Utils', 'import_export', 3, 'sort', null, true, null],
  ['pratiche_files', 'Utils', 'import_export', 12, null, null, true, null],
  ['richieste', 'Forms', null, 2, null, null, false, null],
  ['single_accordion', 'Utils', null, 8, 'sort', '{{titolo}}', true, null],
  ['single_card', 'Utils', null, 6, null, '{{titolo_card}}', true, null],
  ['slider', 'Slider', null, 1, null, '{{slides.item:slides}}', false, null],
  ['slider_block', 'Blocchi', null, 4, 'sort', null, false, null],
  ['slider_slides', 'Utils', 'import_export', 7, null, null, true, null],
  ['slides', 'Slider', null, 2, null, '{{titolo}}', false, null],
  ['title_block', 'Blocchi', null, 2, 'sort', null, false, null],
];

const f = (collection, field, type, sort, extra = {}) => ({
  collection,
  field,
  type,
  meta: {
    collection,
    field,
    hidden: extra.hidden ?? false,
    interface: extra.interface ?? interfaceFor(type, extra),
    readonly: extra.readonly ?? false,
    required: extra.required ?? false,
    searchable: true,
    sort,
    special: extra.special ?? specialFor(type, extra),
    width: extra.width ?? 'full',
    group: extra.group ?? null,
    display: extra.display ?? null,
    display_options: extra.display_options ?? null,
    options: extra.options ?? null,
    note: extra.note ?? null,
    conditions: null,
    translations: null,
    validation: null,
    validation_message: null,
  },
  ...(type === 'alias' ? {} : { schema: schemaFor(collection, field, type, extra) }),
});

function interfaceFor(type, extra) {
  if (extra.aliasInterface) return extra.aliasInterface;
  if (extra.file) return 'file-image';
  if (extra.m2o) return 'select-dropdown-m2o';
  if (type === 'alias') return 'group-raw';
  if (type === 'text') return extra.rich ? 'input-rich-text-html' : 'input-multiline';
  if (type === 'boolean') return 'boolean';
  if (type === 'date') return 'date';
  if (type === 'timestamp') return 'datetime';
  return 'input';
}

function specialFor(type, extra) {
  if (extra.special) return extra.special;
  if (extra.file) return ['file'];
  if (extra.m2o) return ['m2o'];
  if (extra.uuid) return ['uuid'];
  if (type === 'boolean') return ['cast-boolean'];
  if (type === 'timestamp') return ['cast-timestamp'];
  return null;
}

function schemaFor(collection, field, type, extra) {
  const dataType = extra.data_type ?? ({ integer: 'integer', string: 'varchar', text: 'text', uuid: 'char', boolean: 'boolean', timestamp: 'datetime', date: 'date' }[type]);
  return {
    name: field,
    table: collection,
    data_type: dataType,
    default_value: extra.default_value ?? null,
    max_length: type === 'string' ? 255 : type === 'uuid' ? 36 : null,
    numeric_precision: null,
    numeric_scale: null,
    is_nullable: extra.nullable ?? !extra.required,
    is_unique: extra.unique ?? false,
    is_indexed: false,
    is_primary_key: extra.pk ?? false,
    is_generated: false,
    generation_expression: null,
    has_auto_increment: extra.auto ?? false,
    foreign_key_table: extra.fkTable ?? null,
    foreign_key_column: extra.fkColumn ?? null,
  };
}

const id = (c, type = 'integer', group = null) => f(c, 'id', type, 1, {
  pk: true,
  auto: type === 'integer',
  uuid: type === 'uuid',
  unique: type === 'uuid',
  hidden: true,
  readonly: true,
  required: false,
  interface: 'input',
  group,
});
const alias = (c, field, sort, special, iface, opts = {}) => f(c, field, 'alias', sort, { special, aliasInterface: iface, ...opts });
const file = (c, field, sort, group = null) => f(c, field, 'uuid', sort, { file: true, fkTable: 'directus_files', fkColumn: 'id', group });
const user = (c, field, sort, group = null) => f(c, field, 'string', sort, { hidden: true, readonly: true, special: [field === 'user_created' ? 'user-created' : 'user-updated'], fkTable: 'directus_users', fkColumn: 'id', data_type: 'char', group, display: 'user', interface: 'select-dropdown-m2o' });
const dateAuto = (c, field, sort, group = null) => f(c, field, 'timestamp', sort, { hidden: true, readonly: true, special: [field === 'date_created' ? 'date-created' : 'date-updated', 'cast-timestamp'], group, display: 'datetime' });
const status = (c, sort, group = null) => f(c, 'status', 'string', sort, { required: true, default_value: 'draft', group, interface: 'select-dropdown' });

const fields = [
  id('Menus'), f('Menus', 'titolo', 'string', 2), f('Menus', 'slug', 'string', 3), alias('Menus', 'menu_items', 4, ['m2m'], 'list-m2m', { options: { template: '{{menu_items_id.label}}' } }),
  id('Menus_menu_items'), f('Menus_menu_items', 'Menus_id', 'integer', 2, { hidden: true, fkTable: 'Menus', fkColumn: 'id' }), f('Menus_menu_items', 'menu_items_id', 'integer', 3, { hidden: true, fkTable: 'menu_items', fkColumn: 'id' }),
  id('Menus_menu_items_1'), f('Menus_menu_items_1', 'Menus_id', 'integer', 2, { hidden: true, fkTable: 'Menus', fkColumn: 'id' }), f('Menus_menu_items_1', 'menu_items_id', 'integer', 3, { hidden: true, fkTable: 'menu_items', fkColumn: 'id' }),
  id('Menus_pages'), f('Menus_pages', 'Menus_id', 'integer', 2, { hidden: true, fkTable: 'Menus', fkColumn: 'id' }), f('Menus_pages', 'pages_id', 'integer', 3, { hidden: true, fkTable: 'pages', fkColumn: 'id' }),
  id('accordion_block'), f('accordion_block', 'Titolo', 'text', 2, { interface: 'input' }), alias('accordion_block', 'accordion', 3, ['m2m'], 'list-m2m'), f('accordion_block', 'link', 'string', 4, { width: 'half' }), f('accordion_block', 'label', 'string', 5, { width: 'half' }),
  id('accordion_block_single_accordion'), f('accordion_block_single_accordion', 'accordion_block_id', 'integer', 2, { hidden: true, fkTable: 'accordion_block', fkColumn: 'id' }), f('accordion_block_single_accordion', 'single_accordion_id', 'integer', 3, { hidden: true, fkTable: 'single_accordion', fkColumn: 'id' }),
  f('cards_block', 'sort', 'integer', 1), id('cards_block'), f('cards_block', 'titolo', 'string', 3), alias('cards_block', 'card', 4, ['m2m'], 'list-m2m', { options: { template: '{{single_card_id.titolo_card}}' } }),
  id('cards_block_single_card'), f('cards_block_single_card', 'cards_block_id', 'integer', 2, { hidden: true, fkTable: 'cards_block', fkColumn: 'id' }), f('cards_block_single_card', 'single_card_id', 'integer', 3, { hidden: true, fkTable: 'single_card', fkColumn: 'id' }),
  alias('hero_block', 'tabs-fjiyli', 1, ['alias', 'no-data', 'group'], 'group-tabs'), alias('hero_block', 'generic', 1, ['alias', 'no-data', 'group'], 'group-raw', { group: 'tabs-fjiyli' }), f('hero_block', 'sort', 'integer', 1, { hidden: true, group: 'generic' }), id('hero_block', 'integer', 'generic'), f('hero_block', 'titolo', 'string', 3, { group: 'generic' }), f('hero_block', 'sottotitolo', 'string', 4, { group: 'generic' }), f('hero_block', 'paragrafo', 'text', 5, { rich: true, group: 'generic' }), file('hero_block', 'immagine', 6, 'generic'), f('hero_block', 'href', 'string', 7, { width: 'half', group: 'generic' }), f('hero_block', 'label', 'string', 8, { width: 'half', group: 'generic' }), alias('hero_block', 'varie', 2, ['alias', 'no-data', 'group'], 'group-raw', { group: 'tabs-fjiyli' }), f('hero_block', 'inverti', 'boolean', 1, { group: 'varie' }), f('hero_block', 'background_color', 'string', 2, { group: 'varie', interface: 'select-color', options: { presets: [{ color: '#003147', name: 'blu' }, { color: '#C1A776', name: 'oro' }, { color: '#F2F2F2', name: 'grigio' }] } }),
  id('menu_items'), f('menu_items', 'sort', 'integer', 3, { hidden: true }), f('menu_items', 'label', 'string', 4), f('menu_items', 'custom_href', 'string', 5), alias('menu_items', 'pages', 7, ['m2m'], 'list-m2m', { options: { enableCreate: false, template: '{{pages_id.title}}' } }),
  id('menu_items_pages'), f('menu_items_pages', 'menu_items_id', 'integer', 2, { hidden: true, fkTable: 'menu_items', fkColumn: 'id' }), f('menu_items_pages', 'pages_id', 'integer', 3, { hidden: true, fkTable: 'pages', fkColumn: 'id' }),
  id('news', 'uuid'), status('news', 2), f('news', 'sort', 'integer', 3, { hidden: true }), f('news', 'titolo', 'string', 4, { required: true }), f('news', 'sottotitolo', 'text', 5), f('news', 'data', 'date', 6, { required: true, width: 'half' }), file('news', 'immagine', 7), f('news', 'testo', 'text', 8, { rich: true, required: true }), user('news', 'user_created', 9), dateAuto('news', 'date_created', 10), user('news', 'user_updated', 11), dateAuto('news', 'date_updated', 12), f('news', 'slug', 'string', 13, { unique: true, width: 'half', note: 'Slug URL univoco della news' }), f('news', 'seo_title', 'string', 14, { note: 'Titolo SEO opzionale' }), f('news', 'seo_desc', 'text', 15, { note: 'Meta description SEO opzionale' }),
  id('options'), file('options', 'logo_light', 2), file('options', 'logo_dark', 3), f('options', 'footer_text', 'text', 4, { rich: true }), f('options', 'site_name', 'string', 5), f('options', 'contact_address', 'string', 6), f('options', 'contact_phone', 'string', 7), f('options', 'contact_email', 'string', 8), f('options', 'maps_url', 'string', 9), f('options', 'cookie_policy_url', 'string', 10), f('options', 'instagram_url', 'string', 11), f('options', 'facebook_url', 'string', 12),
  alias('pages', 'tabs-ux2yzp', 1, ['alias', 'no-data', 'group'], 'group-tabs'), alias('pages', 'generali', 1, ['alias', 'no-data', 'group'], 'group-raw', { group: 'tabs-ux2yzp' }), alias('pages', 'contenuti', 2, ['alias', 'no-data', 'group'], 'group-raw', { group: 'tabs-ux2yzp' }), alias('pages', 'seo', 3, ['alias', 'no-data', 'group'], 'group-raw', { group: 'tabs-ux2yzp' }), id('pages', 'integer', 'generali'), f('pages', 'sort', 'integer', 2, { hidden: true, group: 'generali' }), f('pages', 'slug', 'string', 3, { group: 'generali', options: { slug: true } }), user('pages', 'user_created', 4, 'generali'), dateAuto('pages', 'date_updated', 5, 'generali'), status('pages', 6, 'generali'), user('pages', 'user_updated', 7, 'generali'), dateAuto('pages', 'date_created', 8, 'generali'), f('pages', 'hide_page_header', 'boolean', 9, { group: 'generali', default_value: false }), file('pages', 'featured_image', 10, 'generali'), f('pages', 'title', 'string', 1, { group: 'contenuti' }), f('pages', 'description', 'string', 2, { group: 'contenuti' }), alias('pages', 'editor', 3, ['m2a'], 'list-m2a', { group: 'contenuti', display: 'related-values', display_options: { template: null } }), f('pages', 'seo_title', 'string', 1, { group: 'seo' }), f('pages', 'seo_desc', 'text', 2, { group: 'seo' }),
  f('pages_editor_1', 'sort', 'integer', 1), id('pages_editor_1'), f('pages_editor_1', 'pages_id', 'integer', 3, { hidden: true, fkTable: 'pages', fkColumn: 'id' }), f('pages_editor_1', 'item', 'string', 4, { hidden: true }), f('pages_editor_1', 'collection', 'string', 5, { hidden: true }),
  id('pratiche_files'), f('pratiche_files', 'directus_files_id', 'string', 3, { hidden: true, data_type: 'char', fkTable: 'directus_files', fkColumn: 'id' }),
  id('richieste'), f('richieste', 'contatto', 'text', 2), f('richieste', 'email', 'string', 3, { required: true, width: 'half' }), f('richieste', 'telefono', 'string', 4, { required: true, width: 'half' }), f('richieste', 'privacy', 'string', 5, { required: true, width: 'half', default_value: 'si', interface: 'select-dropdown', options: { choices: [{ text: 'Si', value: 'si' }, { text: 'No', value: 'no' }] } }), f('richieste', 'data_richiesta', 'timestamp', 6, { required: true, width: 'half', display: 'datetime' }),
  id('single_accordion'), f('single_accordion', 'sort', 'integer', 2, { hidden: true }), f('single_accordion', 'titolo', 'string', 3), f('single_accordion', 'descrizione', 'text', 4), f('single_accordion', 'Espanso', 'boolean', 5, { default_value: false }),
  id('single_card'), f('single_card', 'titolo_card', 'string', 2), f('single_card', 'descrizione', 'text', 3), file('single_card', 'immagine', 4), f('single_card', 'href', 'string', 5), f('single_card', 'link', 'integer', 6, { m2o: true, fkTable: 'pages', fkColumn: 'id' }), f('single_card', 'icon_url', 'string', 7),
  id('slider'), f('slider', 'titolo', 'string', 2), alias('slider', 'slides', 3, ['m2a'], 'list-m2a'),
  f('slider_block', 'sort', 'integer', 1, { hidden: true }), id('slider_block'), f('slider_block', 'slider', 'integer', 3, { m2o: true, fkTable: 'slider', fkColumn: 'id', options: { template: '{{titolo}}' } }),
  id('slider_slides'), f('slider_slides', 'slider_id', 'integer', 2, { hidden: true, fkTable: 'slider', fkColumn: 'id' }), f('slider_slides', 'item', 'string', 3, { hidden: true }), f('slider_slides', 'collection', 'string', 4, { hidden: true }),
  id('slides'), file('slides', 'immagine', 2), f('slides', 'titolo', 'string', 3), f('slides', 'sottotitolo', 'string', 4), alias('slides', 'pulsante', 5, ['alias', 'no-data', 'group'], 'group-raw'), f('slides', 'label', 'string', 6, { width: 'half' }), f('slides', 'href', 'string', 7, { width: 'half' }),
  f('title_block', 'sort', 'integer', 1, { hidden: true }), id('title_block'), f('title_block', 'title', 'string', 3),
];

const rel = (collection, field, related, junction, oneCollection, oneField = null, sortField = null, allowed = null, onDelete = 'SET NULL') => ({
  collection,
  field,
  related_collection: related,
  meta: {
    junction_field: junction,
    many_collection: collection,
    many_field: field,
    one_allowed_collections: allowed,
    one_collection: oneCollection,
    one_collection_field: allowed ? 'collection' : null,
    one_deselect_action: 'nullify',
    one_field: oneField,
    sort_field: sortField,
  },
  ...(related ? { schema: { table: collection, column: field, foreign_key_table: related, foreign_key_column: 'id', constraint_name: null, on_update: 'NO ACTION', on_delete: onDelete } } : {}),
});

const relations = [
  rel('Menus_menu_items', 'menu_items_id', 'menu_items', 'Menus_id', 'menu_items'), rel('Menus_menu_items', 'Menus_id', 'Menus', 'menu_items_id', 'Menus'),
  rel('Menus_menu_items_1', 'menu_items_id', 'menu_items', 'Menus_id', 'menu_items'), rel('Menus_menu_items_1', 'Menus_id', 'Menus', 'menu_items_id', 'Menus', 'menu_items'),
  rel('Menus_pages', 'pages_id', 'pages', 'Menus_id', 'pages'), rel('Menus_pages', 'Menus_id', 'Menus', 'pages_id', 'Menus'),
  rel('accordion_block_single_accordion', 'single_accordion_id', 'single_accordion', 'accordion_block_id', 'single_accordion'), rel('accordion_block_single_accordion', 'accordion_block_id', 'accordion_block', 'single_accordion_id', 'accordion_block', 'accordion'),
  rel('cards_block_single_card', 'single_card_id', 'single_card', 'cards_block_id', 'single_card'), rel('cards_block_single_card', 'cards_block_id', 'cards_block', 'single_card_id', 'cards_block', 'card'),
  rel('hero_block', 'immagine', 'directus_files', null, 'directus_files'),
  rel('menu_items_pages', 'pages_id', 'pages', 'menu_items_id', 'pages'), rel('menu_items_pages', 'menu_items_id', 'menu_items', 'pages_id', 'menu_items', 'pages'),
  rel('news', 'user_created', 'directus_users', null, 'directus_users'), rel('news', 'user_updated', 'directus_users', null, 'directus_users'), rel('news', 'immagine', 'directus_files', null, 'directus_files'),
  rel('options', 'logo_light', 'directus_files', null, 'directus_files'), rel('options', 'logo_dark', 'directus_files', null, 'directus_files'),
  rel('pages', 'user_created', 'directus_users', null, 'directus_users', null, null, null, 'NO ACTION'), rel('pages', 'user_updated', 'directus_users', null, 'directus_users', null, null, null, 'NO ACTION'), rel('pages', 'featured_image', 'directus_files', null, 'directus_files'),
  rel('pages_editor_1', 'item', null, 'pages_id', null, null, null, ['hero_block', 'title_block', 'cards_block', 'slider_block', 'accordion_block']), rel('pages_editor_1', 'pages_id', 'pages', 'item', 'pages', 'editor', 'sort'),
  rel('pratiche_files', 'directus_files_id', 'directus_files', 'pratiche_id', 'directus_files'),
  rel('single_card', 'immagine', 'directus_files', null, 'directus_files'), rel('single_card', 'link', 'pages', null, 'pages'),
  rel('slider_block', 'slider', 'slider', null, 'slider'),
  rel('slider_slides', 'item', null, 'slider_id', null, null, null, ['slides']), rel('slider_slides', 'slider_id', 'slider', 'item', 'slider', 'slides'),
  rel('slides', 'immagine', 'directus_files', null, 'directus_files'),
];

const collectionMeta = (collection, group, icon, sort, sort_field, display_template, hidden, note, singleton = false) => ({
  accountability: 'all',
  archive_app_filter: true,
  archive_field: ['pages', 'news'].includes(collection) ? 'status' : null,
  archive_value: ['pages', 'news', 'menu_items'].includes(collection) ? 'archived' : null,
  collapse: 'open',
  collection,
  color: null,
  display_template,
  group,
  hidden,
  icon,
  item_duplication_fields: null,
  note,
  preview_url: null,
  singleton,
  sort,
  sort_field,
  translations: null,
  unarchive_value: ['pages', 'news', 'menu_items'].includes(collection) ? 'draft' : null,
  versioning: false,
});

const collections = [
  ...groups.map(([collection, icon, group, sort]) => ({ collection, meta: collectionMeta(collection, group, icon, sort, null, null, false, null) })),
  ...tables.map(([collection, group, icon, sort, sort_field, display_template, hidden, note, singleton]) => ({
    collection,
    meta: collectionMeta(collection, group, icon, sort, sort_field, display_template, hidden, note, singleton ?? false),
    schema: { name: collection },
  })),
];

const snapshot = {
  version: 1,
  directus: '11.14.1',
  vendor: 'sqlite',
  collections,
  fields,
  systemFields: [
    { collection: 'directus_activity', field: 'timestamp', schema: { is_indexed: true } },
    { collection: 'directus_revisions', field: 'activity', schema: { is_indexed: true } },
    { collection: 'directus_revisions', field: 'parent', schema: { is_indexed: true } },
  ],
  relations,
};

async function request(path, options = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path} failed (${response.status}): ${text}`);
  }
  return body;
}

const diff = await request('/schema/diff?force=true', {
  method: 'POST',
  body: JSON.stringify(snapshot),
});

console.log(`Diff operations: ${diff.data?.diff?.length ?? diff.data?.length ?? 0}`);

await request('/schema/apply?force=true', {
  method: 'POST',
  body: JSON.stringify(diff.data),
});

const current = await request('/schema/snapshot');
console.log(`Created collections: ${current.data.collections.length}`);
console.log(`Created fields: ${current.data.fields.length}`);
console.log(`Created relations: ${current.data.relations.length}`);
