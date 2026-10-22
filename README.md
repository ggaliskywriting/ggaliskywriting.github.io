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
| `music` | A player plus whatever you want to say | `soundcloud` or `spotify`, `body` |

Any entry, whatever its type, can also take `source`, `tags`, `place`, and
`secret` — those are covered further down.

If a piece first appeared somewhere else, `source` prints a small credit line
at the end linking back to it:

```js
source: { name: 'Mountain Project', url: 'https://www.mountainproject.com/...' },
```

### Photos

Put the image files in the `writing/images/` folder. For a `photos` grid,
point at them:

```js
photos: [
  { src: 'images/ridge.jpg', alt: 'A granite ridge under cloud', caption: 'Day two' },
],
```

For writing, it's much easier to drop a photo straight into the text. Put it
on a line of its own, wherever you want it to land:

```
    We got to the ledge around four.

    ![Looking down past the haul bag at the valley floor](images/day-two.jpg)

    Nobody said much after that.
```

Two or more on consecutive lines share a row instead of stacking. Add a
visible caption by putting it in quotes after the filename:

```
    ![What it shows](images/day-two.jpg "The caption that prints underneath.")
```

`alt` — the bit in square brackets — describes the photo for anyone using a
screen reader, and for anyone whose connection drops the image. It's worth
writing properly. The caption is optional and is for things you want everyone
to read.

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

Your SoundCloud tracks are already in, in a separate file —
`writing/assets/js/music.js` — so that `entries.js` stays short enough to read.
They're generated from your account, one row each, and they get folded into the
same timeline as everything else:

```js
{ date: '2023-01-09', id: 1419592711, len: '1:42', slug: 'kelp-depths',
  title: 'Kelp Depths',
  note: 'Inspired by the cold kelp forests of Northern California' },
```

`note` is optional and prints under the player; it's filled in for the handful
of tracks that had a description on SoundCloud. If you write a new description
over there, copy it into `note` here too — the page doesn't call SoundCloud
until someone presses play.

Each track shows as a small card. The real player only gets built when someone
clicks it, because seventy-odd embedded players on one page would make it
unusable.

For a one-off music entry in `entries.js`, paste a Spotify link instead:

```js
{ type: 'music', spotify: 'https://open.spotify.com/track/...', body: `...` }
```

Leave both out and supply `track`, `artist` and `link` to get a plain card
that just links away.

### Tags

Any entry can carry tags. They show as small outlined chips next to the date:

```js
tags: ['yosemite', 'private'],
```

They're also how the lock below decides what opens together.

### Keeping an entry private

Some things you want on the timeline without putting them in front of
strangers. Open `writing/lock.html` in your browser — it isn't linked from
anywhere and nobody will stumble onto it. Paste the writing in, choose a
password, press **Lock it**, and it hands you a finished block to paste into
`entries.js`.

What you get has a `secret` where the `body` would normally be:

```js
{
  date: '2026-10-22',
  type: 'writing',
  title: 'A title you don\'t mind people seeing',
  tags: ['private'],
  hint: 'Ask me for the password.',
  bg: PALETTE.slate,
  secret: '1$...a long scramble...',
}
```

That scramble is the real thing, not a curtain over the text. The words are
genuinely encrypted, so even though they sit in a public file on the internet,
nobody can read them without the password — and the unlocking all happens in
the reader's own browser. Nothing is sent anywhere, and there's no server to
ask.

A few things that follow from that:

- **Nothing recovers a forgotten password.** Not you, not me, not GitHub.
  Keep the original text somewhere safe.
- **The date, title and tags stay public.** Only the writing is hidden. Title
  it with that in mind.
- **One password can cover several entries.** Unlocking one also opens every
  other entry that shares a tag with it and uses the same password, and the
  browser remembers it until the tab closes. So give everything behind the same
  password the same tag.
- `hint` is optional and prints above the password box. It defaults to
  "Ask me for the password."

### Where it was written

Add a `place` and a small map appears above the entry:

```js
place: { name: 'El Capitan, Yosemite Valley', lat: 37.7340, lon: -119.6376, zoom: 11 },
```

To get the numbers: find the spot in Google Maps, right-click it, and the first
thing in the menu is the two numbers — latitude then longitude, in that order.
Click it to copy and paste it straight in.

`zoom` is how close in it sits: `8` shows a region, `11` shows a valley, `14`
shows a neighbourhood. `name` is the label printed underneath, and it's the
only text a reader sees, so write it however you'd say it out loud.

The map is a few image tiles from OpenStreetMap, which is free and needs no
account. They're faded to match the page and don't load until you scroll near
them. The small "© OpenStreetMap" credit is required by their licence, so
please leave it there.

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

### Colours, and how the gradient works

You give each entry one colour. That's the whole of your side of it:

```js
bg: PALETTE.ember,      // or any hex code: bg: '#dda87e'
```

`PALETTE` at the top of `entries.js` is a named Yosemite-ish set, there so you
can write `PALETTE.pine` instead of memorising `#b6c4b0`:

| | | | | |
| --- | --- | --- | --- | --- |
| `clay` | `sand` | `ember` | `meadow` | `lichen` |
| `pine` | `fog` | `slate` | `granite` | `taupe` |

Any hex code works too. Add your own to `PALETTE` if you find one you like and
want to reuse it.

**What happens with it.** There's one single background behind the entire page
— not a colour per section — and it's a vertical gradient with one stop per
entry, in the order the entries appear. Once everything has been laid out, the
page measures where the *middle* of each entry falls, turns that into a
percentage of the total page height, and plants that entry's colour there.
Roughly:

```
0%   ─ the hero's colour
12%  ─ middle of the first entry  → its bg      ← measured, not guessed
34%  ─ middle of the second entry → its bg
58%  ─ middle of the third entry  → its bg
...
100% ─ the last entry's bg, held to the bottom
```

So each entry is at its own purest colour right in the middle of itself, and
the halves either side of that are already on their way to its neighbours.

The browser then does the actual blending, which is why nothing ever looks like
it's switching: between any two entries you're looking at a continuous fade
from one colour to the next, and the speed of that fade depends on how long the
two entries are. A short entry gets a quick transition, a 7,000-word trip
report gets a slow wash. Scroll position isn't involved at all — the gradient is
painted once and held still while the page scrolls over it, so it's smooth even
on a phone. It gets re-measured when the window resizes or when images finish
loading and change the page's height.

Two practical consequences:

- **Order is what matters, not distance.** Two entries months apart but next to
  each other in the list will blend directly into one another.
- **Neighbours read best a step or two apart**, not wildly different. Big jumps
  put a visible band between entries. The current order runs sunset orange on
  El Cap, into dry grass, into pine, into cold shadow, finishing on valley haze.

And keep new colours **muted**. They sit behind body text, and anything
saturated fights it.

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
writing/lock.html               the tool for locking an entry behind a password
writing/assets/css/style.css    all of the notebook's styling
writing/assets/js/entries.js    >>> your writing lives here <<<
writing/assets/js/music.js      your SoundCloud tracks, kept separate
writing/assets/js/app.js        dials, scrubber, gradient, maps, locks, lightbox
writing/assets/js/markdown.js   the small text formatter used by body text
writing/assets/js/lock.js       the encrypting and decrypting
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
