# graysongalisky.com

This one repo publishes two separate sites:

| Address | What it is | Where it lives |
| --- | --- | --- |
| [graysongalisky.com](https://graysongalisky.com) | your Jekyll portfolio | `_pages/`, `_art/`, `_engineering/`, `_photography/`, `index.md`, `assets/` |
| [graysongalisky.com/writing](https://graysongalisky.com/writing) | the scrolling notebook | everything inside `writing/` |

They don't share anything and don't know about each other. The portfolio is
built by GitHub's Jekyll, exactly as it was on the old account. The notebook
is plain HTML that Jekyll copies through untouched.

**Nothing links to the notebook.** It also carries a `noindex` tag, so it
stays out of Google. That makes it unlisted, not private — anyone you send
the address to can read it, so treat it as public writing.

The rest of this file is about the notebook. For the portfolio, edit the
markdown in `_pages/`, `_art/`, `_engineering/` and `_photography/` the same
way you always did.

---

## The notebook

A single-page scrolling notebook: photos, writing, quotes and music, laid out
on one continuous colour wash.

Down the left side is a timeline built from two parts: three dials that read
out the year, month and day of whatever you're looking at, and a scrub track
with a tick per entry and a dot you can grab to fly through the whole archive.

The track reads as a time axis running from the past towards the present —
bottom to top on a computer, left to right once it lies flat on a phone — so
moving the dot up or right always takes you towards the newest entry. The
coloured part of the line is the stretch of archive older than wherever you're
reading. When the dot has focus, the arrow keys step one entry at a time in
the same directions, and Home and End jump to the oldest and newest.

There is **no build step and no dependencies**. It's three files of plain
HTML, CSS and JavaScript. Nothing to install, nothing to update, nothing that
can rot.

---

## Adding an entry

Open `writing/assets/js/entries.js`. That's the only file you need to touch.

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

Put the image files in the `writing/images/` folder, then point at them:

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

Keep photos under roughly 2000px on the long edge and re-save as JPEG at
~80% quality — on a Mac, `sips -Z 2000 --setProperty formatOptions 80 photo.jpg`
does it. Full-resolution camera files make the repo slow to clone and the page
slow to open.

### Music

Right-click a song in Spotify, then **Share → Copy Song Link**, and paste it
in. Tracks, albums, playlists and podcast episodes all work.

```js
{ type: 'music', spotify: 'https://open.spotify.com/track/...', body: `...` }
```

Leave `spotify` out and supply `track`, `artist` and `link` instead to get a
simple card with no embedded player.

### Fonts

Everything is set in plain Helvetica (Arial on Windows, Liberation Sans on
Linux), with the timeline dials in the system monospace so they read like
instrument numerals. No webfonts are downloaded, so text appears immediately
and the page works with no network at all.

To change it, edit the two variables at the top of `writing/assets/css/style.css`:

```css
--font:      "Helvetica Neue",Helvetica,Arial,"Liberation Sans",sans-serif;
--font-mono: ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace;
```

Always keep a few fallbacks after your choice, separated by commas — that's
what the browser uses when the first font isn't installed. If you ever want a
webfont, add its `<link>` to `writing/index.html` and put the family name first in
`--font`; just know you're trading instant text for a network request.

### Colours

Each entry's `bg` is a stop in one tall gradient spanning the whole page, so
every entry genuinely fades into the ones above and below it.

`PALETTE` at the top of `entries.js` holds a Yosemite-ish set — granite and
dust greys, dry grass, pine, sunset orange:

| | | | | |
| --- | --- | --- | --- | --- |
| `clay` | `sand` | `ember` | `meadow` | `lichen` |
| `pine` | `fog` | `slate` | `granite` | `taupe` |

Any hex code works too, but keep new colours **muted** — they sit behind body
text, and anything saturated fights it. Neighbouring entries read best a step
or two apart rather than wildly different; the current order runs warm desert
at the top through grass and forest to cold stone, finishing on a sunset.

---

## Linking to a single entry

Every entry has its own URL: `https://graysongalisky.com/writing/#desert-varnish`

Send that to someone and they land on that entry with the dials already spun
to its date. The link icon in each entry's header copies that URL to your
clipboard. As you scroll, the address bar quietly updates to whichever entry
you're reading, so you can also just copy it out of the browser.

The link comes from `slug`. **Once you've shared a link, don't change that
entry's slug** or the link will break. If you omit `slug`, one is generated
from the title and date.

---

## Previewing it locally

Double-clicking `writing/index.html` works for a quick look.

To see it exactly as visitors will, serve it over HTTP from this folder:

```sh
cd ggaliskywriting.github.io
python3 -m http.server 8787
```

Then open <http://127.0.0.1:8787/writing/>. Stop it with `Ctrl-C`.

The portfolio at the root won't render this way — it needs Ruby and Jekyll to
build. If you only change things under `writing/`, you never need that; push
and look at the real site.

---

## Publishing a change

It's already live, so posting is just three lines:

```sh
git add -A
git commit -m "new entry"
git push
```

Give it about five minutes. GitHub rebuilds the site on every push, and the
build is slower now that Jekyll is involved. You can watch it finish under
the **Actions** tab on GitHub.

---

## The domain

**graysongalisky.com** is registered with Squarespace (it came across from
Google Domains) and points at GitHub with four `A` records on the apex:
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
The `CNAME` file in this folder is what tells GitHub the domain belongs to
this repo. Don't delete it — the site drops off the domain if you do.

Two things to keep an eye on:

- **The registration expires 12 November.** Renew it at Squarespace. If it
  lapses the domain can be bought by anyone, and that's the one part of this
  nobody can rebuild for you.
- **`www.graysongalisky.com` still points at the GitHub account you lost**, so
  it doesn't work. In the Squarespace DNS panel, change the `www` record to a
  `CNAME` pointing at `ggaliskywriting.github.io`, and GitHub will redirect
  `www` to the plain domain.

---

## What's in here

```
CNAME                   claims graysongalisky.com for this repo

_config.yml             portfolio settings (title, theme, plugins)
index.md                the portfolio home page
_pages/                 about, engineering, art, climbing journal, 404
_art/  _engineering/  _photography/     portfolio write-ups
_data/navigation.yml    the portfolio's top menu
assets/                 the portfolio's photos and diagrams
Gemfile                 only used if you ever build Jekyll locally

writing/index.html              the notebook's page shell
writing/assets/css/style.css    all of the notebook's styling
writing/assets/js/entries.js    >>> your writing lives here <<<
writing/assets/js/app.js        dials, scrubber, gradient, deep links, lightbox
writing/assets/js/markdown.js   the small text formatter used by body text
writing/images/                 your photos for the notebook
```

`app.js` is commented if you want to change behaviour, but you never need to
open it just to post something.

### A note on the portfolio's photos

The originals were 1 GB — single frames up to 24 MB, which is more than
GitHub will publish and far more than a browser should download. Every photo
here has been capped at 2000px on its longest edge, which looks identical on
screen and brought the site down to 194 MB. **Your full-resolution originals
are untouched** in the old `ggalisky/portfolio_mm` repo, which is still public
and readable even though you can't sign in to it.

If you add new photos, resize them the same way first. On a Mac:

```sh
sips -Z 2000 --setProperty formatOptions 80 your-photo.jpg
```
