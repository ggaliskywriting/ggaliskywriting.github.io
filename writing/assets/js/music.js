/* ============================================================================
   ░░░  MUSIC  ░░░   —  everything from soundcloud.com/grayson-g-184358479

   Kept in its own file so entries.js stays short enough to read. Each line
   below becomes one entry in the feed, sorted in with everything else by
   date. To drop a track from the site, delete its line. To add one, copy a
   line and change the date, the id and the title.

     date   when it went up on SoundCloud
     id     the SoundCloud track id — this is what the player loads
     c      optional. The page colour for this track, taken from its cover
            art — see the note below. Leave it off and the track takes its
            year's tone instead.
     slug   the end of its soundcloud.com address, used for the #link here
     len    how long it runs, just for the card
     title  the track name
     note   optional. The description you wrote on SoundCloud, if there was
            one. Shows as a line of text under the player.

   Nothing here is embedded until you click a track, so having 78 of them on
   the page costs nothing to load.
   ============================================================================ */

(function () {

  /* ── Where the colours come from ──────────────────────────────────────
     A track that has cover art on SoundCloud carries its own `c`, read off
     that image: the colour the cover actually reads as, then pulled into
     the muted range the rest of the page lives in so it can sit behind
     text. The underwater kelp track comes out green, the sunset one comes
     out warm, the one with red lettering comes out dusty pink.

     Fifty of these have no cover art, so there's nothing to read, and they
     fall back to one tone per year below. That's deliberate: if they all
     took the colour of your profile picture instead they'd wash half the
     page in the same teal and drown out the covers that do mean something.

     Put art on a track on SoundCloud and tell me, and I'll pull its colour
     in the same way.
     ──────────────────────────────────────────────────────────────────── */
  const TONE = {
    2025: '#c7d0bb',   // lichen
    2023: '#d2d8d5',   // fog
    2022: '#bfc9cf',   // slate
    2021: '#cac4bd',   // taupe
    2020: '#d6d4ce',   // granite
  };
  const FALLBACK = '#d6d4ce';

  const TRACKS = [
  { date: '2025-06-10', id: 2110981737, c: '#b0b4bd', len: '1:12', slug: 'an-adventure-complete',
    title: 'An Adventure Complete' },
  { date: '2023-05-01', id: 1504220764, c: '#aab7c3', len: '1:27', slug: 'a-journeys-end',
    title: 'A journey\'s end' },
  { date: '2023-05-01', id: 1504219996, c: '#cbc8ba', len: '1:04', slug: 'they-are-ephemeral-flowers',
    title: 'They are ephemeral flowers' },
  { date: '2023-04-02', id: 1483387522, c: '#bfbeb4', len: '2:02', slug: 'a-journeya',
    title: 'A Journey' },
  { date: '2023-04-02', id: 1483386697, c: '#b7c6d6', len: '1:12', slug: 'ocean-cliffs-central-california',
    title: 'Ocean Cliffs - Central California' },
  { date: '2023-01-09', id: 1419592711, c: '#9cd0c7', len: '1:42', slug: 'kelp-depths',
    title: 'Kelp Depths',
    note: 'Inspired by the cold kelp forests of Northern California and the music from the documentary "Forest in the Sea" (1983)' },
  { date: '2022-09-26', id: 1350920299, len: '0:58', slug: 'forgoten-place',
    title: 'Forgoten place' },
  { date: '2022-09-26', id: 1350920260, len: '0:33', slug: 'sad-moment',
    title: 'Sad moment' },
  { date: '2022-09-26', id: 1350920203, len: '1:49', slug: 'travel-to-distant-worlds',
    title: 'Travel To Distant Worlds' },
  { date: '2022-07-28', id: 1313251921, len: '1:17', slug: 'the-future',
    title: 'The Future' },
  { date: '2022-07-24', id: 1310754775, c: '#d4a4ab', len: '1:14', slug: 'daisy',
    title: 'Daisy' },
  { date: '2022-07-17', id: 1306622248, c: '#d2cec8', len: '1:13', slug: 'el5e',
    title: 'EL5E',
    note: 'Made on OP-1 Field, inspired by ELSE on Rainworld sountrack' },
  { date: '2022-02-04', id: 1210043971, c: '#d5ccc0', len: '0:28', slug: 'green-hills',
    title: 'Green Hills' },
  { date: '2022-01-09', id: 1193273122, len: '0:13', slug: 'skyislands',
    title: 'Skyislands' },
  { date: '2021-11-15', id: 1160187031, len: '0:24', slug: 'a-memory-of-a-time-someone-ran-and-jumped-into-your-arms-and-it-felt-like-the-world-stopped',
    title: 'A Memory Of A Time Someone Ran And Jumped Into Your Arms And It Felt Like The World Stopped' },
  { date: '2021-11-13', id: 1159497031, len: '0:10', slug: 'pch-malibu',
    title: 'PCH - Malibu' },
  { date: '2021-10-29', id: 1149953083, len: '0:35', slug: 'space-movements',
    title: 'Space Movements' },
  { date: '2021-10-28', id: 1149516130, len: '0:29', slug: 'cool-track',
    title: 'Open space' },
  { date: '2021-10-24', id: 1146967891, len: '0:24', slug: 'deep-sea-transmission',
    title: 'Deep Sea Transmission' },
  { date: '2021-10-20', id: 1144709689, len: '1:12', slug: 'ascention',
    title: 'Ascention' },
  { date: '2021-10-18', id: 1143634648, len: '1:03', slug: 'fakeabq',
    title: 'Palos Verdes Drive East 2:41am August 2019 on a weekday' },
  { date: '2021-10-14', id: 1141858810, len: '1:39', slug: 'the-climb-up',
    title: 'The Climb Up' },
  { date: '2021-10-10', id: 1139206531, len: '1:16', slug: 'another-time',
    title: 'Another Time' },
  { date: '2021-10-02', id: 1135052344, len: '1:46', slug: 'swaying-without-arps',
    title: 'Swaying Without Arps' },
  { date: '2021-10-02', id: 1135052122, len: '1:50', slug: 'swaying-with-arps',
    title: 'Swaying with arps' },
  { date: '2021-09-30', id: 1133356855, len: '0:13', slug: 'inspired-by-swaying-fronds',
    title: 'Inspired By Swaying Fronds' },
  { date: '2021-09-01', id: 1117028875, len: '1:55', slug: 'video-game-music',
    title: 'Video Game Music' },
  { date: '2021-08-25', id: 1112681845, len: '0:01', slug: 'temp',
    title: 'TEMP' },
  { date: '2021-08-24', id: 1111547443, len: '0:09', slug: 'audio-issue',
    title: 'Audio issue' },
  { date: '2021-08-18', id: 1108270459, len: '0:26', slug: 'timepassingby',
    title: 'Timepassingby' },
  { date: '2021-08-02', id: 1098519673, len: '0:30', slug: 'hills',
    title: 'Hills' },
  { date: '2021-06-10', id: 1065835600, len: '0:08', slug: 'more-mars',
    title: 'More Mars' },
  { date: '2021-02-27', id: 994261084, len: '1:11', slug: 'may-20th-2018-pismo-beach',
    title: 'May 20th 2018, Pismo Beach',
    note: 'A different time. Never to be repeated. Not for a lack of trying. Goodbye always.' },
  { date: '2021-02-24', id: 992063926, c: '#c3bcb4', len: '5:00', slug: 'martian-plains',
    title: 'Martian Planes' },
  { date: '2021-02-24', id: 992055826, c: '#c3bcb6', len: '3:00', slug: 'percy',
    title: 'Percy' },
  { date: '2021-02-24', id: 991676203, c: '#c9c9c6', len: '33:17', slug: 'coastline',
    title: 'Coastline' },
  { date: '2021-02-13', id: 984660088, c: '#bebab4', len: '1:24', slug: 'im-tired',
    title: 'Im Tired' },
  { date: '2021-01-29', id: 975310132, len: '1:28', slug: 'after-the-door',
    title: 'After The Door',
    note: 'mix of prologue and Juno 60. not great but its cool I guess. Uploading stuff helps me track progress so even up loading the stuff I dont like should help me look back in time and track progress. I read somewhere that  alot of artist dont like 90 percent of the work they make' },
  { date: '2021-01-06', id: 960451684, len: '0:20', slug: 'juno-sim-test-meme',
    title: 'Juno Sim Test Meme' },
  { date: '2021-01-04', id: 958959097, len: '0:54', slug: 'acord',
    title: 'Acord' },
  { date: '2020-12-12', id: 946069291, len: '1:36', slug: 'brutt',
    title: 'Brutt' },
  { date: '2020-11-30', id: 938439496, len: '0:49', slug: 'strkfr-medicine-inspired-synth-loop',
    title: 'STRKFR Medicine Inspired Synth Loop' },
  { date: '2020-11-15', id: 929816188, len: '1:36', slug: 'martian-romance-cont',
    title: 'Martian Romance Cont' },
  { date: '2020-11-15', id: 929813065, len: '2:18', slug: 'the-beach-house',
    title: 'The Beach House' },
  { date: '2020-11-13', id: 928366216, len: '0:35', slug: 'archives0',
    title: 'Archives0' },
  { date: '2020-11-10', id: 926479204, len: '0:38', slug: 'fall19',
    title: 'Fall19' },
  { date: '2020-11-01', id: 921618040, len: '0:20', slug: 'mars-dance',
    title: 'Mars Dance' },
  { date: '2020-10-23', id: 916451696, len: '1:20', slug: 'deepspace',
    title: 'Deepspace' },
  { date: '2020-10-17', id: 912094864, len: '0:18', slug: 'note',
    title: 'Note' },
  { date: '2020-10-14', id: 910280560, len: '0:33', slug: 'greatest-place-in-the-greatest-time-man-has-ever-lived',
    title: 'Greatest Place In The Greatest Time Man Has Ever Lived' },
  { date: '2020-10-02', id: 903686470, len: '0:21', slug: 'long-night',
    title: 'Long Night' },
  { date: '2020-10-02', id: 903249985, len: '0:21', slug: 'rooftopslightsfiberopticscables',
    title: 'Rooftops,lights,fiberopticscables' },
  { date: '2020-09-10', id: 890734894, len: '0:38', slug: 'gahmer2kalm',
    title: 'Gahmer2kalm' },
  { date: '2020-09-07', id: 889310110, len: '3:38', slug: 'coastline-impression',
    title: 'Coastline Impression' },
  { date: '2020-09-06', id: 888817252, len: '2:36', slug: 'gahmer',
    title: 'Gahmer' },
  { date: '2020-08-17', id: 877075315, len: '0:12', slug: 'its-not-meant-to-be-sounding-thing',
    title: 'Its Not Meant To Be Sounding Thing' },
  { date: '2020-08-16', id: 876582292, len: '0:44', slug: 'tung',
    title: 'Tung' },
  { date: '2020-07-26', id: 864806866, len: '1:06', slug: 'skinshape',
    title: 'Skinshape inspired track, Path' },
  { date: '2020-07-12', id: 856839190, len: '1:21', slug: 'travel',
    title: 'Travel' },
  { date: '2020-06-09', id: 836690644, len: '0:15', slug: 'weird-forest-video-game-music-synth-meme',
    title: 'Weird Forest Video Game Music Synth Meme' },
  { date: '2020-05-26', id: 828339940, c: '#bacedd', len: '0:37', slug: 'i-dont-sleep-anymore-because-of-quarntine-help-tyrel-records-coastline-depression-studio-track-4',
    title: 'I Dont Sleep Anymore Because Of Quarntine Help (Tyrel Records Coastline Depression Studio Track 4)' },
  { date: '2020-05-26', id: 828332686, c: '#c0dfe1', len: '0:28', slug: 'desk-lamp-limted-edition-bootleg-clip-never-before-released-1984-coastline-impression-tyrell-records-tm',
    title: 'Desk Lamp Limted Edition Bootleg Clip (never Before Released) Tyrell Records TM' },
  { date: '2020-05-25', id: 827544544, c: '#bfdfe1', len: '1:22', slug: 'the-best-i-can-do-right-now-interlude-coastline-depression-tm-copyright-1982-ce',
    title: 'The Best I Can Do Right Now (Interlude) Coastline Depression TM Copyright 1982 CE' },
  { date: '2020-05-22', id: 825789643, c: '#d9c7b4', len: '0:19', slug: 'when-you-see-me',
    title: 'When You See Me',
    note: 'Big sad, but kinda hopeful but still mega depressed.' },
  { date: '2020-05-19', id: 823554208, len: '2:38', slug: 'untiled-1',
    title: 'Untiled 1' },
  { date: '2020-05-19', id: 823554112, len: '1:11', slug: 'brass-anxiety-movie-track-sounding-thing',
    title: 'Brass Anxiety Movie Track Sounding Thing' },
  { date: '2020-05-17', id: 822102934, len: '2:08', slug: 'the-struggle',
    title: 'The Struggle' },
  { date: '2020-05-10', id: 817378474, c: '#ccdad6', len: '0:16', slug: 'drums-and-synth-meme',
    title: 'Drums And Synth Meme' },
  { date: '2020-05-08', id: 816147550, c: '#b2b3bd', len: '3:06', slug: 'dont-be-too-hard-on-yourself',
    title: 'Don\'t Be Too Hard On Yourself [In progress]' },
  { date: '2020-05-04', id: 813573913, c: '#cbc9c5', len: '1:55', slug: 'happy-dissonance-intro-demo',
    title: 'Happy Dissonance Intro [Demo]',
    note: 'More stuff with the korg prologue. Just messin around' },
  { date: '2020-05-02', id: 812297035, c: '#adb3c1', len: '1:41', slug: 'the-moment',
    title: 'The Moment - messing around with korg prologue' },
  { date: '2020-04-20', id: 802805098, c: '#d6d3d0', len: '0:22', slug: 'nothing-special',
    title: 'Anxious Chill' },
  { date: '2020-04-10', id: 794997400, c: '#b2d3db', len: '1:20', slug: 'rainy-beach-days-demo',
    title: 'Rainy Beach Days Demo' },
  { date: '2020-04-09', id: 794892664, c: '#bbb7b1', len: '0:52', slug: 'super-ch1ll-juno-60-demo',
    title: 'SUPER CH1LL Juno 60 Demo' },
  { date: '2020-04-05', id: 791178553, c: '#e1c0cb', len: '1:32', slug: 'synth-test',
    title: 'Synth Test',
    note: 'finally got around to trying another synth' },
  { date: '2020-03-29', id: 785757874, c: '#adbcc9', len: '0:19', slug: 'tancony-test',
    title: 'TANCony Test' },
  { date: '2020-03-29', id: 785757757, c: '#d0ccc9', len: '0:38', slug: 'try-again-test',
    title: 'Try Again Test' },
  { date: '2020-03-18', id: 778619986, c: '#bfbab5', len: '1:41', slug: 'test',
    title: 'Test' },
  ];

  window.ENTRIES = (window.ENTRIES || []).concat(TRACKS.map(function (t) {
    return {
      date:  t.date,
      type:  'music',
      title: t.title,
      slug:  'track-' + t.slug,
      bg:    t.c || TONE[t.date.slice(0, 4)] || FALLBACK,
      track:  t.title,
      artist: 'Coastline Impression',
      length: t.len,
      soundcloud: t.id,
      link:  'https://soundcloud.com/grayson-g-184358479/' + t.slug,
      body:  t.note || '',
    };
  }));

})();
