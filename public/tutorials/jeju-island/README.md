# Tutorial Sample Dataset (Jeju Route Blocks)

This dataset mirrors the archive import package format produced by `buildJourneyArchive`.

Contents:

- `journey-import.json` (`schemaVersion: 2`)
- `index.html`
- `01-Jeju-Stone-Park/0001.jpg` ~ `0005.jpg`
- `02-Eastbound-Coast/0001.jpg` ~ `0003.jpg`
- `03-Woljeongri-Beach/0001.jpg` ~ `0007.jpg`

Route model:

1. `ROUTE_STOP` - Jeju Stone Park (5 photos)
2. `ORPHAN_CLUSTER` - Eastbound coast transit (3 photos)
3. `ROUTE_STOP` - Woljeongri Beach (7 photos)

App runtime source strategy:

- `photo.sourceUri` exists -> use it directly
- otherwise fallback to `${WEB_BASE_URL}/tutorials/jeju-island/${archivePath}`
- if `WEB_BASE_URL` is missing, fallback to internal reference URLs

To serve from a Next.js web project, copy all dataset files (images + metadata):

```bash
mkdir -p <next-project>/public/tutorials/jeju-island
rsync -av docs/testing/tutorial-sample-dataset/ <next-project>/public/tutorials/jeju-island/
```

This includes:

- image folders (`01-*`, `02-*`, `03-*`)
- `journey-import.json`
- `index.html`

This folder intentionally does not include a prebuilt ZIP file.
If needed, generate it locally:

```bash
cd docs/testing/tutorial-sample-dataset
zip -rq tutorial-sample-export.zip journey-import.json index.html 01-Jeju-Stone-Park 02-Eastbound-Coast 03-Woljeongri-Beach
```
