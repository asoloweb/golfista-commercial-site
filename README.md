# www.golfista.app

Sito pubblico commerciale di Golfista (Astro, output statico), pensato per presentare il gestionale ai circoli.

L'ecosistema Golfista:
- **App giocatori**: app iOS/Android per i golfisti
- **Gestionale circoli**: https://manager.golfista.app (include i pagamenti)
- **Sito pubblico**: questo repository

## Deploy

Cloudflare Pages pubblica automaticamente ogni push su `main` (GitHub).
Le variabili d'ambiente di produzione si configurano nel progetto Cloudflare Pages.

## Comandi

| Comando           | Azione                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Installa le dipendenze                  |
| `npm run dev`     | Server locale su `localhost:4321`       |
| `npm run build`   | Build di produzione in `./dist/`        |
| `npm run preview` | Anteprima della build                   |

## Blocco recensioni Google

Configura `GOOGLE_MAPS_API_KEY` (o `GOOGLE_PLACES_API_KEY`) e, opzionalmente, `GOOGLE_MYBUSINESS_PLACE_ID`.
Senza Place ID il blocco prova a cercarlo da `google_business_query`.
