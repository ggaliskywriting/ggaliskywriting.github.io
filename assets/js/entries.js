/* ============================================================================
   ░░░  YOUR ENTRIES  ░░░   —  this is the only file you need to edit.

   Add a new entry by copying one of the blocks below and changing it.
   Order does not matter: the page sorts by date, newest first.

   ── EVERY entry can have ──────────────────────────────────────────────
     date   "2026-10-18"   required. Always YYYY-MM-DD.
     type   one of: "photos" | "photo-essay" | "writing" | "quote" | "music"
     bg     the background colour for this entry. It fades into the
            colours above and below it automatically. Use PALETTE.something
            or any hex code you like.
     title  optional for quotes/photos, nice for everything else
     slug   optional. Sets the shareable link (#your-slug).
            If you leave it out, one is generated from the title + date.
            NOTE: once you've shared a link, don't change its slug.

   ── EXTRA FIELDS BY TYPE ──────────────────────────────────────────────
     photos        photos: [...]   cols: 1|2|3
     photo-essay   photos: [...]   body: `...`   flip: true (photos on right)
     writing       body: `...`     dropcap: true
     quote         quote: "..."    by: "..."     body: `...` (optional note)
     music         spotify: "https://open.spotify.com/track/..."   body: `...`
                   or, with no spotify link, a plain card instead:
                   track: "..."  artist: "..."  link: "..."

   ── PHOTOS ────────────────────────────────────────────────────────────
     Drop image files into the  images/  folder, then:
         photos: [
           { src: "images/my-photo.jpg", alt: "what it shows", caption: "optional" }
         ]
     Any src starting with "placeholder:" draws generated abstract art
     instead — handy while you're still picking photos.

   ── BODY TEXT ─────────────────────────────────────────────────────────
     Write plain text between the `backticks`. Blank line = new paragraph.
     **bold**  *italic*  [link](https://x.com)  ## heading  > quote
     - bullets   1. numbered   `code`   --- (divider)
   ============================================================================ */

const PALETTE = {
  blush:       '#f9dce9',
  butter:      '#fdf0c9',
  mint:        '#d8f2e6',
  sky:         '#d6ecfb',
  periwinkle:  '#dfe0fb',
  lilac:       '#ebdcf9',
  peach:       '#fde3d4',
  sage:        '#e4f0da',
  clay:        '#f5e2d6',
  mauve:       '#eed9e4',
  fog:         '#e8e8ef',
};

window.ENTRIES = [

  /* ══════════════════════════════════════════ PHOTOS ══════════════════════ */
  {
    date: '2026-10-18',
    type: 'photos',
    title: 'Desert varnish, late light',
    bg: PALETTE.clay,
    slug: 'desert-varnish',
    cols: 3,
    photos: [
      { src: 'placeholder:varnish-one',   alt: 'Dark mineral streaks down a sandstone wall', caption: 'Manganese, a thousand years of it' },
      { src: 'placeholder:varnish-two',   alt: 'A narrow slot canyon glowing orange' },
      { src: 'placeholder:varnish-three', alt: 'Cracked mud flat at dusk', caption: 'The ground keeps a record' },
      { src: 'placeholder:varnish-four',  alt: 'Juniper growing from bare rock' },
      { src: 'placeholder:varnish-five',  alt: 'Long shadows across a dune field', caption: '7:14pm' },
      { src: 'placeholder:varnish-six',   alt: 'First stars over a canyon rim' },
    ],
  },

  /* ══════════════════════════════════════════ WRITING ═════════════════════ */
  {
    date: '2026-09-27',
    type: 'writing',
    title: 'Tolerance stacking is a theory of people',
    bg: PALETTE.mint,
    slug: 'tolerance-stacking',
    dropcap: true,
    body: `
      Every part in an assembly is wrong. That's not cynicism, it's the spec.
      You don't get a 10.00 millimetre shaft, you get 10.00 plus or minus
      something, and the whole discipline of mechanical design is deciding how
      much wrongness you can afford to let through.

      What took me years to notice is that the math doesn't care *which*
      part is wrong. Stack up enough small, individually acceptable errors in
      the same direction and the thing seizes. Nobody made a mistake. Every
      part passed inspection. The assembly still doesn't move.

      ## The honest version

      I think about this constantly now, and not about parts.

      - A team where every handoff loses a little context
      - A relationship where every conversation rounds down
      - A plan where every estimate was *technically* reasonable

      None of these fail at a single point. They fail in aggregate, quietly,
      and the post-mortem finds no villain — which is exactly why it keeps
      happening.

      > The fix for a tolerance stack is never "be more careful."
      > It's to design a joint that doesn't care.

      That's the part engineers get and the rest of life mostly doesn't. You
      don't demand perfection from each piece. You build in a float, a shim, a
      slip fit — somewhere for the accumulated error to go. A place where
      being a little wrong is *allowed*, so it doesn't have to be fought.

      ---

      I don't have a tidy ending. I just think most of the systems I've seen
      break — mechanical, organisational, personal — broke because someone
      insisted the parts be perfect instead of giving them room to be off.
    `,
  },

  /* ══════════════════════════════════════════ QUOTE ═══════════════════════ */
  {
    date: '2026-09-02',
    type: 'quote',
    bg: PALETTE.sky,
    slug: 'dillard-seeing',
    quote: 'Beauty and grace are performed whether or not we sense them. The least we can do is try to be there.',
    by: 'Annie Dillard, Pilgrim at Tinker Creek',
    body: `
      I keep this one taped inside a camera bag. It is the entire argument for
      getting up before sunrise, and it does not require that the sunrise be
      good.
    `,
  },

  /* ═════════════════════════════════════ PHOTOS + WRITING ═════════════════ */
  {
    date: '2026-08-14',
    type: 'photo-essay',
    title: 'Four days without a signal',
    bg: PALETTE.periwinkle,
    slug: 'four-days-no-signal',
    cols: 1,
    photos: [
      { src: 'placeholder:signal-ridge', alt: 'A granite ridge line under moving cloud', caption: 'Day two. The map stopped being useful here.' },
      { src: 'placeholder:signal-tarn',  alt: 'A still alpine tarn reflecting talus' },
    ],
    body: `
      The phone died on the first afternoon and I made a show of being annoyed
      about it. By the second morning I'd stopped reaching for the pocket.

      What surprised me wasn't the quiet — I expected the quiet, I'd packed for
      the quiet. It was how much of my attention had been running as a
      background process. Four days in, the foreground got wider. I noticed I
      was reading weather off the ridge instead of off a screen, and getting it
      right more often than I'd have guessed.

      I'm suspicious of the tidy version of this story, the one where the
      engineer goes to the mountains and comes back cured. I came back and
      immediately checked my email. But something did shift, and it's held:
      I'm much worse now at pretending that a notification is an event.
    `,
  },

  /* ══════════════════════════════════════════ MUSIC ═══════════════════════ */
  {
    date: '2026-07-06',
    type: 'music',
    title: 'The drum fill that shouldn\'t work',
    bg: PALETTE.lilac,
    slug: 'drum-fill',
    // Replace with any Spotify track/album/playlist/episode link.
    //    In Spotify: right-click the song, then Share, then Copy Song Link.
    spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
    body: `
      There's a move I've become obsessed with: the fill that lands *late* on
      purpose and drags the whole band a hair behind the click, then snaps back
      on the downbeat like nothing happened.

      On paper it's an error. Quantise it and the song dies instantly — I've
      tried, it goes flat and polite and you can hear the life leave it.

      ## Why it works

      1. Your ear predicts the grid, so the delay creates genuine tension
      2. The resolution is *early* relative to the lag, which reads as relief
      3. Nothing else in the arrangement moves, so the drums carry all of it

      It's the same thing as the tolerance stack, honestly. The groove isn't in
      the precision. It's in the *controlled* imprecision — somebody decided
      exactly how wrong to be.
    `,
  },

  {
    date: '2026-05-21',
    type: 'writing',
    title: 'Notes on carrying heavy things',
    bg: PALETTE.butter,
    slug: 'carrying-heavy-things',
    body: `
      A short list, assembled over about nine hundred trail miles and one very
      bad decision involving a cast-iron pan.

      - Weight on your hips is nearly free. Weight on your shoulders is rent.
      - You will never regret the extra socks. You will always regret the extra book.
      - The pack is heaviest in the first hour and the last hour, and those are different kinds of heavy.
      - Anything you brought "just in case" is a bet that you're worse at planning than you are.
      - Water is the only weight that gets lighter by being useful.

      The cast-iron pan was for eggs. I carried it eleven miles. The eggs were
      excellent. I would not do it again, but I'm glad the version of me that
      would do it once exists.
    `,
  },

  {
    date: '2026-03-09',
    type: 'photos',
    title: 'Thaw',
    bg: PALETTE.fog,
    slug: 'thaw',
    cols: 2,
    photos: [
      { src: 'placeholder:thaw-a', alt: 'Ice breaking apart on a dark river', caption: 'It sounds like a building settling' },
      { src: 'placeholder:thaw-b', alt: 'Bare branches with meltwater droplets' },
      { src: 'placeholder:thaw-c', alt: 'Snow pulling back from brown grass' },
      { src: 'placeholder:thaw-d', alt: 'Low grey sky over a flooded field', caption: 'March is not a pretty month and I love it' },
    ],
  },

  /* ══════════════════════════════════════════ 2025 ════════════════════════ */
  {
    date: '2025-12-31',
    type: 'quote',
    bg: PALETTE.mauve,
    slug: 'berry-wild-things',
    quote: 'For a time I rest in the grace of the world, and am free.',
    by: 'Wendell Berry, The Peace of Wild Things',
    body: `
      Read on a cold dock at the end of a year I was glad to be done with.
      "For a time" is doing a lot of work in that sentence, and I think that's
      the point — it isn't a promise, it's a permission slip.
    `,
  },

  {
    date: '2025-11-08',
    type: 'photo-essay',
    title: 'The shop at 2am',
    bg: PALETTE.sage,
    slug: 'shop-at-2am',
    flip: true,
    cols: 1,
    photos: [
      { src: 'placeholder:shop-bench', alt: 'A cluttered workbench under a single lamp', caption: 'The fixture that caused all this' },
    ],
    body: `
      Nobody tells you that the best debugging happens when you're too tired to
      defend your assumptions.

      I'd been chasing an intermittent fault for three weeks. Scope on it,
      nothing. Swapped the harness, nothing. Wrote a logger, caught it twice,
      learned nothing. At 2am I stopped trying to prove my theory and started
      just *watching* the thing, and within ten minutes I saw the ground strap
      flex when the gantry moved.

      It had been in front of me the whole time. I couldn't see it because I'd
      already decided what kind of problem it was.
    `,
  },

  {
    date: '2025-08-19',
    type: 'music',
    title: 'A song for driving at night',
    bg: PALETTE.peach,
    slug: 'driving-at-night',
    // No spotify link on this one — it renders as a simple card instead.
    track: 'Night Window',
    artist: 'someone you have not heard of yet',
    link: 'https://open.spotify.com/',
    body: `
      Four chords, no bridge, and a hi-hat that sounds like it was recorded in a
      stairwell. It is perfect and I will not be taking questions.

      The trick is the bass enters eight bars later than you expect. Until it
      does, the song feels like it's hovering. When it lands you are suddenly
      moving, and if you happen to be on a dark highway at the time the effect
      is genuinely unfair.
    `,
  },

];
