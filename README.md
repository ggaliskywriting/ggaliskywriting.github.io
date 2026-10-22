# ggaliskywriting.github.io

A single-page scrolling notebook: photos, writing, quotes and music, laid out
on one continuous colour wash with a year / month / day dial timeline on the
left.

There is **no build step and no dependencies**. It's three files of plain
HTML, CSS and JavaScript. Nothing to install, nothing to update, nothing that
can rot.

---

## Adding an entry

Open `assets/js/entries.js`. That's the only file you need to touch.

Copy one of the existing blocks, change it, save, refresh. Entries sort
themselves by date (newest first), so it doesn't matter where in the list you
put a new one.

```js
{
  date: '2026-11-03',          // always YYYY-MM-DD
  type: 'writing',             // see the five types below
  title: 'Something I thought about',
  bg: PALETTE.mint,            // this entry's background colour
  slug: 'something-i-thought', // the shareable link: #something-i-thought
  body: `
    Write normally. A blank line starts a new paragraph.

    **bold**, *italic*, [a link](https://example.com), \`code\`.

    ## A heading
    - a bullet
    > a pulled-out quote
  `,
},
```

### The five types

| `type` | What it shows | Fields it uses |
| --- | --- | --- |
| `writing` | Text in a frosted panel | `body`, `dropcap: true` |
| `photos` | A photo grid, no text | `photos`, `cols: 1`–`3` |
| `photo-essay` | Photos beside text | `photos`, `body`, `flip: true` |
| `quote` | A big pulled quote | `quote`, `by`, optional `body` note |
| `music` | A Spotify player plus analysis | `spotify`, `body` |

### Photos

Put the image files in the `images/` folder, then point at them:

```js
photos: [
  { src: 'images/ridge.jpg', alt: 'A granite ridge under cloud', caption: 'Day two' },
],
```

`alt` describes the photo for screen readers and is worth writing.
`caption` is optional and prints under the photo.

Until you've picked real photos, any `src` beginning with `placeholder:`
draws generated abstract art instead, so the layout still looks finished:

```js
{ src: 'placeholder:anything-here', alt: 'temporary' }
```

Keep photos under roughly 2500px on the long edge and re-save as JPEG at
~80% quality. The old site was a gigabyte of full-resolution files, which is
why it was slow to clone.

### Music

Right-click a song in Spotify, then **Share → Copy Song Link**, and paste it
in. Tracks, albums, playlists and podcast episodes all work.

```js
{ type: 'music', spotify: 'https://open.spotify.com/track/...', body: `...` }
```

Leave `spotify` out and supply `track`, `artist` and `link` instead to get a
simple card with no embedded player.

### Colours

Each entry's `bg` is a stop in one tall gradient spanning the whole page, so
every entry genuinely fades into the ones above and below it. There's a
`PALETTE` of pastels at the top of `entries.js`, but any hex code works.
Neighbouring entries look best a step or two apart on the colour wheel
rather than wildly different.

---

## Linking to a single entry

Every entry has its own URL: `https://ggaliskywriting.github.io/#desert-varnish`

Send that to someone and they land on that entry with the dials already spun
to its date. The link icon in each entry's header copies that URL to your
clipboard.

The link comes from `slug`. **Once you've shared a link, don't change that
entry's slug** or the link will break. If you omit `slug`, one is generated
from the title and date.

---

## Previewing it locally

Double-clicking `index.html` works for a quick look.

To see it exactly as visitors will, serve it over HTTP:

```sh
cd ggaliskywriting.github.io
python3 -m http.server 8787
```

Then open <http://127.0.0.1:8787>. Stop it with `Ctrl-C`.

---

## Publishing it

The repo is set up to push to the **ggaliskywriting** account.

1. Create an empty repo at <https://github.com/new> named
   `ggaliskywriting.github.io`. Don't add a README or licence.
2. Push:

   ```sh
   git remote add origin https://github.com/ggaliskywriting/ggaliskywriting.github.io.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment**, set source to
   *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.

A minute later it's live at <https://ggaliskywriting.github.io>.

Every later update is just:

```sh
git add -A && git commit -m "new entry" && git push
```

### About the old domain

The previous site used **graysongalisky.com**. Domain registration lives with
your registrar, not GitHub, so losing the old GitHub account doesn't cost you
the domain. To point it here:

1. Create a file called `CNAME` in this folder containing one line:
   `graysongalisky.com`
2. At your registrar, set an `ALIAS`/`ANAME` or four `A` records for the apex
   domain to GitHub's addresses: `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`.
3. Add a `CNAME` record for `www` pointing to `ggaliskywriting.github.io`.
4. In **Settings → Pages**, enter the custom domain and tick *Enforce HTTPS*
   once the certificate is issued.

---

## What's in here

```
index.html              page shell
assets/css/style.css    all styling
assets/js/entries.js    >>> your content lives here <<<
assets/js/app.js        dials, gradient, deep links, lightbox, filters
assets/js/markdown.js   the small text formatter used by body text
images/                 your photos
.nojekyll               tells GitHub Pages to serve the files as-is
```

`app.js` is commented if you want to change behaviour, but you never need to
open it just to post something.
