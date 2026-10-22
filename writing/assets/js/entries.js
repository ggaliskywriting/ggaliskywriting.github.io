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
     source optional. For something that first appeared somewhere else:
            source: { name: "Mountain Project", url: "https://..." }
            It prints a small credit line at the end of the entry.
     tags   optional. tags: ["private", "yosemite"] — shown as small chips
            next to the date, and used to group locked entries (below).
     place  optional. Draws a small map above the entry:
            place: { name: "El Capitan, Yosemite Valley",
                     lat: 37.7340, lon: -119.6376, zoom: 11 }
            Right-click a spot in Google Maps and the numbers it copies are
            lat then lon, in that order. Higher zoom = closer in; 11 shows a
            valley, 14 shows a neighbourhood, 8 shows a whole region.

   ── EXTRA FIELDS BY TYPE ──────────────────────────────────────────────
     photos        photos: [...]   cols: 1|2|3
     photo-essay   photos: [...]   body: `...`   flip: true (photos on right)
     writing       body: `...`     dropcap: true
     quote         quote: "..."    by: "..."     body: `...` (optional note)
     music         spotify: "https://open.spotify.com/track/..."   body: `...`
                   or, with no spotify link, a plain card instead:
                   track: "..."  artist: "..."  link: "..."

   ── PHOTOS ────────────────────────────────────────────────────────────
     Drop image files into the  images/  folder, then either hand them to
     a gallery:
         photos: [
           { src: "images/my-photo.jpg", alt: "what it shows", caption: "optional" }
         ]
     ...or, much easier for writing, just drop them into the body text —
     see below. Any src starting with "placeholder:" draws generated
     abstract art instead, handy while you're still picking photos.

   ── BODY TEXT ─────────────────────────────────────────────────────────
     Write plain text between the `backticks`. Blank line = new paragraph.
     **bold**  *italic*  [link](https://x.com)  ## heading  > quote
     - bullets   1. numbered   `code`   --- (divider)

     A photo on a line of its own drops into the writing right there:
         ![what it shows](images/my-photo.jpg)
     Put two or more on consecutive lines and they share a row instead of
     stacking. Add a visible caption with:
         ![what it shows](images/my-photo.jpg "caption under the photo")

   ── KEEPING AN ENTRY PRIVATE ──────────────────────────────────────────
     Open  lock.html  in your browser, paste the writing in, choose a
     password, and it hands you a finished block to paste here. Instead of
     `body` it has a `secret`, which is the writing encrypted — unreadable
     to anyone without the password, even though it sits in this public
     file. Give it the tag you want and, optionally, a hint:

         tags: ["private"],
         hint: "Ask me for the password.",
         secret: "1$...a long scramble...",

     Unlocking one entry also unlocks every other entry that shares a tag
     and the same password, and the browser remembers it until the tab is
     closed. The date, title and tags stay visible to everyone — only the
     writing is hidden — so title it with that in mind.

     There is no recovering a forgotten password. Keep the original text
     somewhere safe.
   ============================================================================ */

/* Yosemite in late afternoon: granite greys, dry grass, pine, sunset.
   All deliberately muted — they're full-page backgrounds, so anything
   saturated fights the text. Neighbouring entries read best a step or two
   apart rather than wildly different. */
const PALETTE = {
  clay:     '#d8bda9',   // warm stone
  sand:     '#e3c6a3',   // sunlit granite
  ember:    '#dda87e',   // sunset orange
  meadow:   '#d4d4b0',   // dry grass
  lichen:   '#c7d0bb',   // pale sage
  pine:     '#b6c4b0',   // deep muted green
  fog:      '#d2d8d5',   // valley haze
  slate:    '#bfc9cf',   // cold shadow
  granite:  '#d6d4ce',   // dry stone
  taupe:    '#cac4bd',   // dust
};

/* These five are your Mountain Project trip reports, in your own words and
   with your own photos, sitting where you put them in the originals. The
   colours run warm at the top and cool as you go back in time: sunset on El
   Cap, then dry grass, then pine, then the storm, then wet granite. */

window.ENTRIES = [

  /* ══════════════════════════════════════════════════════════════════════ */
  {
    date: '2026-09-28',
    type: 'writing',
    title: 'The Nose, but a little faster',
    bg: PALETTE.ember,
    slug: 'nose-a-little-faster',
    dropcap: true,
    place: { name: 'El Capitan, Yosemite Valley', lat: 37.7340, lon: -119.6376, zoom: 11 },
    source: { name: 'Mountain Project', url: 'https://www.mountainproject.com/forum/topic/203913757/the-nose-but-a-little-faster' },
    body: `
      In a jumble of ropes, swollen fingers, and random monkey yells, Oscar, a
      climbing partner I met in Tahquitz while taking a vacation from my
      vacation in Joshua tree, climbed the Nose in ~4 days. This was Oscar's
      first time up El Cap and my second.

      After a half day helping clean up trash for Yosemite Facelift, I
      scurried over to Churchbowl to curate each piece of equipment with
      Oscar. As we chatted and laughed a kaleidoscope of ropes and aluminum
      gear began to swirl at our feet. Holy fuck, we are climbing El Cap! As
      the sun set, we rose. Each pitch of progress was greeted with a cosmic
      "hello" from the stars that was eventually dampened by a nearly full
      moon blasting El Capitan with a grey white glow that would follow us our
      whole climb. After arriving at Sickle ledge we fixed ropes down to the
      valley floor, set alarms on our phones, and tried to sleep.

      ![Climbing by headlamp under a nearly full moon on the first night](images/nose-fast-01.jpg)

      I slept poorly. Anxiety plagued me. "What if I can't lead the Texas
      flake again, what if I'm really slow on the wall, what if!, what if?".
      And then it was time. We hurled two large green bags onto our backs and
      made our pilgrimage to the base of one of the centers of my universe.

      ![Oscar racked up with the haul bags, El Cap behind him](images/nose-fast-02.jpg)

      We toiled away, squat after squat, in our efforts to cajole our ~125lbs
      of gear, food, and water up the wall. The last time I had been on the
      Nose the hauling effort was epic, and this time it was much easier. We
      had brought less equipment (about 1/3rd of the weight) and had chosen a
      more direct path to haul our bags (up Sickle vs from Pine Line). Since
      the route didn't look busy we figured we would be able to sleep on rock
      ledges without crowding, so we left the portaledge on the ground.

      ![Looking down past the haul bag at the trees on the valley floor](images/nose-fast-03.jpg)
      ![Hunkered under a hood at a belay](images/nose-fast-04.jpg)

      After the bags made it to Sickle Ledge, Oscar blasted up and maneuvered
      us into the Stove Legs, where I proceeded to try very hard, and not
      drink enough water. As I was scooting my way up the wall I reflected on
      the last time I had led these pitches and how much harder it had been,
      and how I was still not satisfied with the amount of aid climbing I was
      doing. I was able to free climb more moves, but fully free climbing was
      still out of reach, which frustratingly held true for the rest of the
      climb.

      Near the top of Dolt tower I was exhausted and dehydrated. Hot wind
      turned the side of El Cap into an airfryer set to "cook Grayson" mode.
      Thankfully Oscar was psyched and in good shape, so he took over and
      floated up to El Cap Tower, where we met another two climbers who
      graciously made space for us to sleep.

      ![The sun coming over the rim at a belay](images/nose-fast-05.jpg)
      ![Morning on El Cap Tower, ropes and haul bags everywhere](images/nose-fast-06.jpg)

      I woke up, again, to the smell of burning forest. The Dome fire had been
      raging for days now, and would frequently cause the valley to fill with
      smoke. In an effort to avoid the heat of the day Oscar agreed to let me
      lead in the morning. I looked up, and knew it was Texas Flake time. On
      my last ascent of the Nose I panicked in the Texas Flake, convinced I
      was going to fall, and lowered down to the ground. Squishing, squirming,
      and wedging I made my way to the single bolt, clipped it, then traversed
      out west to some foot holds Bailey had told me about. Methodically I
      focused my attention to the best looking edges and features. Then I
      pressed hard, and scooted up. Again, and again, until my fingers wrapped
      around the top of the flake. Relief, then anxiety — I still needed to
      stand on top of the flake to clip the anchor bolts. Slowly, I straddled
      the top and stood up. I'd been worried about coming back to the Texas
      flake for about a year. I was so worried I did 5 laps up and down on
      Plumbers Crack in various positions and orientations, which paid off.

      ![Standing in aiders, looking straight down the wall](images/nose-fast-07.jpg)
      ![Smoke from the Dome fire filling the valley at first light](images/nose-fast-08.jpg)

      From the top of Texas flake Oscar took the lead, but then stopped before
      he left the belay to chat. We had an insightful conversation about
      expectations, both in life and on the wall. Oscar asserted that high
      expectations mire performance, since you are often too concerned with
      the outcome. This is something I have been deeply struggling with for
      the last year. The flip side of this is without expectations you lose a
      lever you can use to motivate yourself. I think Oscar is mostly right,
      and I'm trying day by day to focus less on expectation. By the end of
      our conversation we reached a common topic for us, which is what an
      absurd privilege it is to be here, on El cap, climbing with each other.

      "Run, run, SPRINT, yeah that's it!" I yelled to Oscar as he flung
      himself through the King Swing. Oscar sometimes struggles with exposure,
      so the King swing must have been both stupid fun and intimidating for
      him. We spent the next 4 pitches in a flurry — we needed to pass the
      party in front of us to make it to Camp 5 that night as we only brought
      enough water for 3.5 days. Thankfully those pitches made it possible for
      both our climbing teams to somewhat climb in parallel. They were
      gracious with us passing, and Oscar lead the Great Roof to Camp 5.

      ![The haul bag hanging out over a few thousand feet of air](images/nose-fast-09.jpg)
      ![Afternoon light across the valley from high on the wall](images/nose-fast-10.jpg)
      ![Moonlight over the dark valley from the bivy](images/nose-fast-11.jpg)
      ![Sorting gear at a belay as the sun comes up](images/nose-fast-12.jpg)
      ![A sleeping bag on a narrow ledge with the valley far below](images/nose-fast-13.jpg)

      "Dude this bivy kinda sucks, I had to get in direct to a cam to not
      slide off the ledge" Oscar remarked the next morning. In a tired haze we
      corralled all our gear back into the haul bags and set off upwards,
      again. I led two pitches, and then Oscar led two.

      While belaying Oscar on his lead of changing corners I felt my chest
      tighten and my frame shrink. The sound of something screaming through
      the air jolted my senses, and my mind immediately began to narrow in
      preparation for a deadly falling object. Blurring by, multiple hawks
      dived, pivoted, and spun parallel next to golden granite. I watched with
      new, wide eyes as one of the hawks shot upwards, rolled, and inverted at
      the apogee of its flight. In an instant it had pulled its wings in and
      was hurtling towards the ground.

      ![Feet up on the ledge with Half Dome across the valley](images/nose-fast-14.jpg)
      ![Looking up at the roof against a blue sky](images/nose-fast-15.jpg)

      At this point there were only three pitches remaining, which I intended
      to lead. I was feeling a little less psyched after having to rap down
      half a pitch to get the lead line untangled from a rope eating flake.
      Oscar, detecting my mood, decided to hype me up with a classic voice
      line we'd coopted from Rick and Morty: "IT'S JUST YOU AND ME MORTY, A
      THOUSAND PITCHES, A THOUSAND LOWER OUTS, A HUNDRED EL CAP ASCENTS, ALL
      DAY LONG FOREVER!!! Sometimes even free climbing Morty!" Stoke restored.

      We quested to the top, arriving an hour before the sunset. Gear was
      spread everywhere, ropes, cams, gallon jugs. It looked like our bags had
      puked. We celebrated and sorted gear, preparing to descend the East
      Ledges. In the distance the Dome fire burned. Its orange glow slowly
      revealed itself as the Sun tipped down the horizon. On our descent we
      were passed by Tyler and Greg, who had done the Salathe wall in a day.

      ![Monkey yells near the top of the route](images/nose-fast-16.jpg)
      ![Looking down the last pitches at Oscar coming up](images/nose-fast-17.jpg)

      I've been climbing for three years now, with very high expectations for
      myself that I think no longer serve me the way they used to. My
      progression in the sport isn't as fast as I'd like it to be, and letting
      that expectation of some arbitrary rate of progression go is my current
      climbing crux. It's much easier to say this than to really live that
      way, but I see the way Oscar views climbing and I'm inspired. While
      Oscar is ambitious he's also focused on having a beautiful journey
      filled with fun and friends.

      ![Oscar and me back down in El Cap meadow](images/nose-fast-18.jpg)
      ![The Dome fire glowing at sunset on the way down](images/nose-fast-19.jpg)
    `,
  },

  /* ══════════════════════════════════════════════════════════════════════ */
  {
    date: '2026-09-02',
    type: 'writing',
    title: 'Upward flow',
    bg: PALETTE.meadow,
    slug: 'upward-flow',
    dropcap: true,
    place: { name: 'North Dome, Yosemite Valley', lat: 37.7556, lon: -119.5589, zoom: 11 },
    source: { name: 'Mountain Project', url: 'https://www.mountainproject.com/forum/topic/203744710/upward-flow' },
    body: `
      On May 25th my friend Oscar and I climbed the South Face of North Dome.

      An early morning in Churchbowl: familiar smiles, clicking of
      carabiners, wet hands from filling water bottles, double-checking with
      each other that we've got all our gear. Anxiety, excitement,
      apprehension. I had followed the South Face Route almost two years ago,
      and I knew I'd be coming back to lead it. That eventuality had always
      felt inevitable, especially if I wanted to realize my ambitions of
      leading harder R rated slabs. Knowing that I'd be coming back one day
      had filled me with intermittent fear. What if I got back up there and
      couldn't do it, or worse, fell and injured myself? What would that say
      about me as a climber? Would I recover?

      "On belay?" "Beybalde on"

      "Climbing"

      "See ya"

      In an inverted waterfall we poured up Royal Arches. Oscar and I
      efficiently moved up the wall together. In sync, working our way up jam
      by jam, smear by smear. "MICRO OFF!"

      Both of us were glued to the wall, like lizards. I'd never felt so
      secure while simul-climbing and a subtle euphoria started building that
      was occasionally disturbed by visions of me slipping on the smooth slabs
      lurking above. Two hours later we were filling water at the spring
      perched on the edge of the valley rim. A quick snack blended into a hike
      toward North Dome, with expansive views of the valley and memories of
      previous climbs surfacing. In the distance I picked out the line of
      Galactic Hitchhiker. I had climbed it with Austin 2 days prior, and
      thought about our hitch back down to the valley floor. Oscar and I
      always have fun and/or interesting conversations, but I don't recall
      exactly what we talked about. Surely we made at least one reference to
      "walls in a push". Beak beak cam hook free move. 40 GU packets and a
      liter of water, just run a PDL and really go for it. The monkeys are
      sending.

      We arrived at the base of the South Face Route. Another party was
      questing up Crest Jewel and we briefly chatted about our approaches.
      They had bivied at the base and slept very little.

      The first pitch is 5.6R. I was up — Oscar and I had agreed beforehand
      I'd lead the R slab pitches and I didn't argue. Putting up the rope for
      those parts of the climb felt like a rite of passage. Pitch one went
      without too much drama, the slab felt secure, and I was confident.

      As another runout slab pitch demanded my focus, I methodically worked my
      way up. Shaky, nervous, terrified, determined. My foot will stick. It's
      going to stick! Stand up. It's going to stick. After a couple tenuous
      moves I relaxed and started moving faster. Pitch three, done. The pace
      of the climbing slowed when we transitioned swapping leads, and there
      was now more time to stare out at the escalating exposure. Green trees
      diffused into dark grey and silver granite monoliths. Ravens glided and
      played.

      It was time, the pitch I'd been dreading was in front of me. Strangely,
      fear did not grip me. After a couple of easy moves and a questionable
      brass nut placement it was game time. I considered a few different paths
      up the slab, but decided to commit to a direct line straight up the
      wall. The slick ramp in front of me was featured with a subtle upwards
      concavity that I knew I could exploit. I inched up as close as I could
      to the hard moves and meticulously studied the textures of the rock.
      Fingernail edges, smooth bumps, infrequent loose grainy flakes, all
      punctuated with the occasional sliver of blue sky as I looked up for
      higher features. Using chalk, I marked each of the best textures and
      edges I might place a hand or rubber-clad toe on, a skill I had learned
      from Austin when we first climbed together on Freeblast. Unusually, my
      fear and anxiety remained absent and quiet. A high foot, a smear, a
      careful finger pad and a half pull. Composed and balanced I calmly
      exited the hardest moves. It was over. All that inner tension resolved,
      two years of fear gone. Oscar and I had pulled off a team free ascent of
      the route and we were stoked! Despite the route only being 5.8 I felt
      pride in my effort in navigating my fear and our efficiency as a team.
      We chatted and wandered down the west side gully of North Dome,
      eventually making our way to the rappels for Royal Arches. Less than an
      hour later we were at Churchbowl, with the sun hanging above. Both Oscar
      and I have had many adventures end in the dark, and this adventure was a
      welcome contrast.

      During the rappels on Royal Arches we placed an online order for pizza.
      We celebrated our climb at the Pizza Deck where we met two climbers who
      had just finished the Regular North West Face of Half Dome.

      This climb took place during a time when I was beginning to internalize
      that who you climb with is as important, if not more important, than
      what you climb. I'd never moved through the mountains that way before.
      Not just quickly, but together.
    `,
  },

  /* ══════════════════════════════════════════════════════════════════════ */
  {
    date: '2026-05-27',
    type: 'writing',
    title: 'Also Galactic Hitchhiker',
    bg: PALETTE.pine,
    slug: 'also-galactic-hitchhiker',
    dropcap: true,
    place: { name: 'Glacier Point Apron, Yosemite Valley', lat: 37.7277, lon: -119.5765, zoom: 11 },
    source: { name: 'Mountain Project', url: 'https://www.mountainproject.com/forum/topic/203064266/also-galactic-hitchhiker' },
    body: `
      Both Austin and I realized we were writing the same trip report and
      figured we'd both post since we captured different elements of the same
      climb.

      This story starts sometime in early 2024 after one of my first climbing
      trips to Yosemite. I had just purchased Erik Sloan's guidebook and had
      begun rummaging through it for climbs I could do that wouldn't get me
      into too much trouble, but would still take me on a grand adventure. A
      stepping stone on "a journey to the gods." This idea of a journey to the
      gods had become a point of fascination after watching Alex Honnold
      describe Marc-André Leclerc soloing some mountain across the valley from
      where he was climbing in The Alpinist.

      Anyways, as I paged through the guidebook I stumbled upon Galactic Hitch
      Hiker. I almost disregarded the route because of the 5.11 rating, but I
      saw that it went from the valley floor to the rim. This aligned with my
      interests at the time and I added it to the future to-do list. As I've
      acquired more skill and strength, I've revisited the topo and always
      come to the conclusion that it was beyond my mental and physical
      abilities. It became one of those "next year" climbs for many years
      until Austin texted me asking if I wanted to climb it. I could not
      refuse — Austin is a significantly more practiced climber than I am and
      I know he can make it through any of the X or R pitches.

      ## 5:35am, Curry Village parking lot

      "Hey, are you ready?" Austin asks through my van door.

      "One second, almost!" I anxiously replied.

      By 5:40am we are hiking to the base and start up sometime around 6am.
      The route starts up Goodrich Pinnacle. I take the first super easy
      pitches and Austin takes over once things start to get more runout. This
      is my third or fourth time doing fix-and-follow, but my first time
      hauling the backpack, which turns out to be great. I'm feeling a little
      slow at this point and try to focus on my footwork. I desperately grab
      at grass as I follow a 5.grass section that feels novel and scary. We
      push up to P8 and now I'm really starting to feel the exposure. The
      slabs are below us and we are at the first seriously runout crux. As
      Austin leads the pitch he gets to a decent ledge and whips out the bolt
      kit. He proceeds to take off his tight shoes and hand-drill this bolt on
      lead barefoot — legend.

      ![Austin leading up the steep grey wall above the slabs](images/galactic-01.jpg)

      While Austin toiled away on the first of two bolts we placed that day, I
      looked down at the slabs below and had a calm moment to soak in the
      position. I watched ravens glide, dive, and play. Noticing that these
      barren cliffs aren't actually barren is always a wonderful revelation.
      They are filled with birds, lizards, plants, and all kinds of creatures.
      In that moment Austin and I were a part of that wall ecosystem. I looked
      out to see Tenaya Peak perfectly framed between Half Dome, Watkins,
      Basket Dome, and North Dome. I hadn't seen a view similar to this since
      my time on the RNWF of Half Dome. During my time perched on this ledge I
      realized that climbing hadn't felt this magical in a while. In that
      moment it felt like the convergence of many different forces in my life
      all pushing together to be here taking it all in.

      ![Ropes and the pack at the belay, the slabs dropping away below](images/galactic-02.jpg)
      ![The view out across the valley from the ledge](images/galactic-03.jpg "Tenaya Peak framed between Half Dome, Watkins, Basket Dome and North Dome.")

      As quickly as that moment came, it left and it was time for me to follow
      the pitch. It was careful work, but I made it through to just after the
      last crux before Austin and I had a conversation about where to place
      the second bolt in an optimal way for short and tall climbers. After
      that Austin showed me how to use the hand drill and I finished drilling
      the hole he'd started. Austin reached out to the FA party and got their
      blessing to add the bolts. I was considering taking a lead, but Austin
      and I checked the time and decided he should keep leading. Austin is a
      much faster leader and climber than I am, and we wanted to stay on track
      to top out before sunset. The pitches were runout and dirt would
      sometimes sprinkle down as he navigated dirty rock. While following P9 I
      almost pull out a cinderblock-sized hold and freak out for a second. I
      push it back in so there's no chance it falls and damages the rope.

      At P10 and P11 Austin is exhausted from route-finding. He suggests that
      if we can't find the route we can escape into the third-class gully on
      climber's left. Sensing his fatigue from hours of runout, dirty
      climbing, I try to figure out where we are. As I search around the cliff
      we are on I find the bolts for the belay and determine we are at the top
      of P11. Now that we know where we are again the psych fires back up and
      we're off.

      ![Dirty, runout climbing with the sun coming through a tree](images/galactic-04.jpg)

      We ramble our way up endless 5.0 slabs and simul. I lead and make a
      route-finding error trying to get to the top of P16. This results in
      some faffing and I downclimb a 150-foot unprotected dirty 5.2 ramp while
      on belay. Austin and I are both out of water and haggard at this point.
      We find a trickle of water and imbibe. The next pitch isn't difficult,
      but the 5.11b pitch is tough. Austin comes very close to sending and
      ends up redpointing the 5.11a R variation. I try to follow the 5.11b
      line and get all the moves but rest a few times. As I pull the last
      moves I realize I am liebacking on a detached block. It moves a little
      bit and I scurry up on top of it before it can ruin my life. Truly
      terrifying. At this belay we can see the final pitch and Heaven (the
      5.12 overhanging crack that Dean Potter first soloed). Sick!

      ![Evening light down the wall with the top finally in sight](images/galactic-05.jpg)

      We finish the climb at 7:45pm and get some water from kind people at
      Glacier Point creating a timelapse of the sunset. After 30 minutes of
      asking anyone who walked by for a ride back to the valley floor we
      finally meet this cool dude named Mac. Mac was visiting from the Bay
      Area and had once before found himself hitchhiking down from Glacier
      Point. He offered us chocolate and we hungrily accepted. We had a very
      interesting conversation about the nature of reality and how to navigate
      life when the world is not the way you expect it to be. We got pizza
      with our new friend and went back to our campsite. Wow, what an
      adventure.

      ![Austin and me at the rim with Half Dome behind us](images/galactic-06.jpg)

      It's crazy to have climbed it (even though I followed all the hard and
      runout pitches). I remember when simply following this route felt
      impossibly far away. Now I've done it with only a few falls, and it's
      funny to realize that leading something like this occupies the same
      place in my imagination that following it once did.

      Austin, thanks for your mentorship and company. I always feel fortunate
      when I get the opportunity to climb and hang with you. I learned a ton
      and had a great time.
    `,
  },

  /* ══════════════════════════════════════════════════════════════════════ */
  {
    date: '2025-05-07',
    type: 'writing',
    title: 'The Nose, but all the pitches',
    bg: PALETTE.slate,
    slug: 'nose-all-the-pitches',
    dropcap: true,
    place: { name: 'El Capitan, Yosemite Valley', lat: 37.7340, lon: -119.6376, zoom: 11 },
    source: { name: 'Mountain Project', url: 'https://www.mountainproject.com/forum/topic/200921043/the-nose-but-all-the-pitches' },
    body: `
      My climbing partner (Bailey) and I climbed the Nose over 7 days (8 if
      you count fixing pine line and getting supplies ready at the base). We
      mostly aid and French freed the wall.

      Bailey and I had been loosely planning to do the Nose at the end of
      April. The weather had been splitter most of April, but by the time our
      PTO lined up we checked the forecasts and it didn't look good. Rain
      Saturday, Sunday, Wed, Thursday, Friday, Saturday, Maybe Sunday. We were
      really really psyched, but this being my second wall (first was the
      South Face of Washington Column) made us pause. We flipped between
      bailing to Tangerine trip or taking our chances and still trying the
      Nose with rain flys and extra rations. After a couple days of flip
      flopping and consulting with friends I told Bailey I still really wanted
      to do the Nose. He agreed and we started hiking loads to the base of
      pine line. Pine line? Why the hell would you do that? The Hauling sucks
      — Yes I know, but I wanted to go "ground up". I didn't want to fix 5
      pitches and rap down to haul up to Sickle. Bailey thought this was kinda
      dumb (which is fair), but we did it anyway for the vibes.

      ## Day 0 — Saturday April 26th

      ![El Cap from the meadow under grey skies](images/nose-7day-01.jpg)
      ![The wall disappearing up into the weather](images/nose-7day-02.jpg)

      We woke up, met at the El Cap Trailhead and started hiking loads to the
      base of Pineline. We brought food for 8 days and 15 gallons of water +
      some gatorades + belay beers. I don't really drink, but hey if it helps
      the team I'll haul it. During our second to last load it stopped raining
      and the rock dried off quite a bit. We quickly racked up and I freed
      Pine line and fixed ropes up to the base of the Nose. Bailey was getting
      ready to teach me how to 3:1 haul when it started raining and we decided
      to rap back down and hike the last of our gear to the base.

      I remember hiking my last load alone while Bailey was grabbing some
      supplies while listening to the song "stay" from the film Interstellar
      thinking "I can't believe we are going to climb that, we are going to
      the moon".

      ![Eight days of food and fifteen gallons of water, sorted at the base](images/nose-7day-03.jpg)
      ![The two of us at the base in rain jackets](images/nose-7day-04.jpg)
      ![Waterfalls running in the wet valley](images/nose-7day-05.jpg)

      ## Day 1 — Sunday 27th — Pitch 1 to 3

      It's raining. Bailey and I meet up in Yosemite lodge to find an outlet
      to charge our phones and discuss our goals for how many pitches per day.
      If we can do 5 a day we should be okay. I always struggle with this part
      of a trip since you really have no idea how you are going to perform on
      a new type of adventure for the first time. Sometimes you just have to
      try hard and see how things unfold. I think Bailey felt much more
      confident since it was his 5th ascent of El Cap.

      As we were chatting the rain stopped and the sun illuminated the wet
      pavement outside. This was the sign we had been waiting for. A signal
      that we must go up.

      ![Grinning at a belay in a helmet anyway](images/nose-7day-06.jpg)
      ![The Stove Legs cracks running up the grey wall above](images/nose-7day-07.jpg)

      And up we went — only to pitch 3. Wow 3:1 hauling like 200lbs+ up pine
      line is really hard. We had one party pass us on P1 by taking the left
      11a variation. They were nice dudes and I'm glad we didn't hold them up.
      There were a few other parties that were hauling gear to sickle who had
      already fixed lines. We consulted with those teams while they were
      jugging and they told us they'd be up early in the morning to start
      climbing, so we opted to setup our ledges on the top of P3 and put aid
      ladders through our camp so parties could pass through easily. In
      retrospect I think we'd get yelled at for doing this when the route is
      busier, but since no one wanted to be out there it worked out. No one
      climbed through our camp at night and we got a good night's rest. I had
      a salami wrap with Sriracha mayo for dinner.

      Setting up my BD single ledge was kind of a nightmare. It was tangled
      and Bailey helped me figure it out. I was kind of losing my mind with
      all the tangles. So much gear, so many tangles, and figuring it out
      while hanging required patience I hadn't quite figured out yet. This
      would come later in the climb when I fully accepted I needed to be one
      with the tangles. Bailey told me something on the ground that now was
      echoing in my head: "Climbing a big wall is just solving one tangle at a
      time". I now understand.

      Hauling is hard. I was already tired. And I was doubtful we were going
      to make it. 3 pitches in a day? I've done 20 before in a day free. But
      Bailey and I had a conversation about this on the ground. "We aren't
      bailing unless it's absolutely clear we can't make it — like last day of
      rations at pitch 10".

      ## Day 2 — Monday 28th — Pitch 4 to 7

      Just as the sun rises I awake. I peer over the edge of my ledge and I'm
      excited. Tired and excited.

      ![Looking down from the portaledge at the green meadow below](images/nose-7day-08.jpg)
      ![The haul bag on the wall with sunlit granite behind](images/nose-7day-09.jpg)

      As the sun rises we start to eat food and pack up gear. Several teams
      (4?) are now queued up at Sickle waiting for a party that has built a
      belay in the middle of Sickle below the 5.9+ hands. We continue to get
      our stuff packed. I lead pitch 4 and we make it to Sickle ledge. There
      is now only one party in front of us, but I still need to haul this
      pitch. As I'm hauling Bailey is lowering out the bags, but by the end of
      the lower out cord the bags aren't nearly far enough out underneath me.
      Bailey lets the cord go through the end of the munter and the bags swing
      out below me. Time to haul! Hauling is hard.

      ![Weather swirling around a climber on the wall](images/nose-7day-10.jpg)

      I lead pitch 5, which feels like climbing through the chipped teeth of a
      giant monster. I freed most of it, but was too tired to free the 5.9
      hands at the end. By now the other parties have mostly made their way
      into the stove legs. We slowly make our way into the stove legs and I
      get to the 5.8 hands section. It feels so good. Deep locker hand jams,
      I'm going up and up and up. I'm going 20 feet between pieces — It feels
      so secure. It reminded me of Double Cross in Joshua tree.

      It's dark now and we setup camp in the middle of the stove legs. We make
      sure to setup a set of aid ladders around our camp and make a dedicated
      master point for people to short fix with on top of our anchor. This
      turns out to be a good call as a NIAD team passes our camp that night in
      the dark.

      I'm exhausted. Even with Bailey team hauling with me by jugging on the
      haul line, I'm so worked. My free climbing dreams on this route are
      evaporating as I realize there's no way I'm going to be freeing anything
      above 5.8 with this level of tiredness. Oh well, I'm here mostly for the
      adventure anyways. There's time to come back when I'm stronger. I'm
      still worried about our pace. We aren't bailing. The weather isn't
      looking great though. 40% chance of rain on Wed, 20% on Thurs, 40% on
      Friday and 60% on Sat. Sat looks like a guaranteed storm.

      ## Day 3 — Tuesday 29th — Pitch 8 to 12

      I awake in the early dark morning to the shouts of a climber and belayer
      far below us. They are moving fast. I rest my eyes, the sun rises, and I
      see Justine making her way up the Stove legs.

      ![On the portaledge in a sleeping bag in the morning](images/nose-7day-11.jpg)
      ![Looking up the wall at the next pitch](images/nose-7day-12.jpg)
      ![Deep in the chimney with a cam below](images/nose-7day-13.jpg)

      Her and Ryan are on their first NIAD attempt — they sent! I met Justine
      a while back while cragging with my friends Sam and Gareth in Red Rock.
      The more I climb the more I keep bumping into the same people but in
      different locations. We pack up camp and get to work. While climbing I
      hear bird noises emanating from the crack I'm putting a .5 into and I
      realize there are some Swifts in there.

      We have a cruiser day and make good progress. I feel like I'm past the
      learning phase of hauling, docking, and lowering out bags. Dolt tower
      was pretty cool and we met one more party doing a dolt run. My anxieties
      about our pace are slightly waning. The hauling is getting easier as the
      wall gets more vertical and we drink more water.

      ![Thin seams running up the grey face above](images/nose-7day-14.jpg)
      ![Camp spread out across El Cap Tower](images/nose-7day-15.jpg)

      As I'm freeing the last pitch to El cap tower I pull on a mega jug. It
      moves and I almost take a huge whip. I scream and get back to a safe
      stance, find a place to get a blue totem in and blast up. El cap tower
      is totally empty and we camp out on what is now my favorite ledge in the
      valley. We sleep well.

      ## Day 4 — Wednesday 30th — Pitch 13 to 15

      We awake feeling rested. Being able to stand feels good.

      I lead the start of the Texas flake starting on the left side of the
      flake looking towards El cap. I make my way all the way level with the
      bolt and start to freak out. I don't have a ton of wide experience and
      my legs are really starting to burn. I slowly traverse to the bolt and
      clip it. I try to make my way up and one of my legs slip. I don't fall
      but I'm scared. I down climb to the bolt and rest. I try one more time
      and get maybe 7 feet above the bolt and down climb. I radio Bailey that
      I'm pretty spooked and I don't want to fall, get hurt, and potentially
      risk our climb. He graciously agrees to lead the rest of the chimney and
      we switch. This was a low point for me. On one hand I feel like I should
      have crushed a 5.8 chimney and I'm a loser for backing off. On the other
      hand I know if I fuck up there it could be very bad and Bailey has much
      more wide experience than I do.

      In retrospect I should have trained more wide runout climbs. The nose is
      not the place to learn how to chimney climb. Ultimately I'm glad I
      backed off. It is what it is.

      Bailey cruises the chimney and tells me that I had bad beta. He ended up
      getting out left and putting his back against the flake. He used the
      foot holds on the face to make his way up.

      While I'm belaying Bailey up the Texas flake a Raven joins me.

      ![The ledge with the valley stretching out beyond it](images/nose-7day-16.jpg)
      ![Looking down the wall at a climber a long way below](images/nose-7day-17.jpg)

      Many times during this climb I think to myself "wow the free climbing up
      here looks amazing, one day I'll be better and free this". The boot
      flake looked so sick. I was really stoked on the King swing and Bailey
      let me take it. It was mad fun — probably one of the most outrageous
      things I've done in my whole life. After 6 attempts I get established in
      the crack leading up to Eagle ledge and start to make my way up. The
      weather is starting to build, but I'm locked in. I'm going up.

      That attitude didn't last very long as the rain started to build. And
      build. And now it's hail. I think "a little bit of hail, no biggy, the
      climbing will keep me warm". More hail, my fingers are getting cold. The
      hail and rain blur my vision. I'm soaking wet and it's time to stop. I
      call Bailey on the radio and we come up with a plan. Bailey sets up his
      ledge with fly while I build a bomber gear anchor and fix the haul line
      to it. During this process the hail, wind, and rain are just getting
      worse. My fingers are cold. I'm cold. I descend, traverse, ascend the
      haul line back to the top of the boot flake and crawl under the rain fly
      on the portaledge. I strip off as many wet layers as I can and put on
      some dry jackets. A NIAD team watches us from the valley floor and grabs
      a picture just as the hail rolls in.

      ![The wall streaked with rain and hail](images/nose-7day-18.jpg)

      We use the stove to warm up the air in the rain fly and make some warm
      meals. The thunder roars and the portaledge illuminates with flashes of
      lighting that seem to be coming from somewhere across the valley. It's
      LOUD. It reminds me of the daily thunderstorms I encountered on the John
      Muir Trail. The rain stops for a few minutes and I fish out our sleeping
      bags to warm up. The portaledge is now 40% filled with puffy jackets and
      sleeping bags.

      ![Riding out the storm under the rain fly](images/nose-7day-19.jpg)

      The rain passes and there is still some sunlight left in the day, so I
      lead rope solo the last of the pitch while Bailey finishes setting up
      camp. I sleep well hoping that finishing off that last pitch will put us
      in a good spot for the next day.

      ## Day 5 — Thursday May 1st — Pitch 16 to 21

      I'm tired. I've been tired. Still tired. Exhausted. My arms hurt, my
      hips are bruised from hauling. My lips are chapped and I feel sunburned,
      but I've been applying sunscreen. Tired.

      ![Looking out from under the fly the morning after the storm](images/nose-7day-20.jpg)
      ![The portaledge hanging over the meadow](images/nose-7day-21.jpg)

      We pack up camp and start making good time. For the first time on the
      climb I'm starting to feel more secure in the idea that we will make it
      to the top. The forecasts show potential rain today and tomorrow and a
      storm on Saturday. We need to finish by Saturday. Well technically we
      don't — we have food and water until Monday but we don't really want to
      take that long.

      ![Hauling, again, with the bag hanging below](images/nose-7day-22.jpg)
      ![The crack systems leading up towards the Great Roof](images/nose-7day-23.jpg)
      ![At a belay in a helmet with clouds behind](images/nose-7day-24.jpg)

      I lead the Great Roof — which was so sick. The sun begins to set as
      Bailey works on leading up to Camp 5.

      ![Bailey at a belay surrounded by gear](images/nose-7day-25.jpg)
      ![Sunset from high on the wall](images/nose-7day-26.jpg)

      We setup camp and discuss the mega day waiting for us tomorrow. We are
      tired and stoked. We think we are going to make it.

      ## Day 6 — Friday 2nd — Pitch 21 to 28

      Last night was a late night. We get a late start. It doesn't matter — we
      are determined to top out.

      ![Dusk on the wall, still going](images/nose-7day-27.jpg)
      ![Gear and sleeping bags spread across Camp 5](images/nose-7day-28.jpg)
      ![Tired and stoked at a belay](images/nose-7day-29.jpg)

      15 hrs later we top out. I took a 30ft whip at the 5.6 trough on P27. I
      fell asleep hauling the second to last pitch. It was an overall brutal
      experience.

      ## Day 7 — Saturday 3rd

      4:17 am. "I topped out" — I text to my friends and family. We gather our
      gear and haul it up to the top out tree, make some food and pass out as
      the sun rises.

      ![On top of El Cap at last](images/nose-7day-30.jpg)
      ![Camp at the top out tree under grey skies](images/nose-7day-31.jpg)
      ![The summit slabs and trees above the valley](images/nose-7day-32.jpg)
      ![The top out tree with the valley beyond](images/nose-7day-33.jpg)

      I awake to small rain drops. I see a storm building in the West but it
      doesn't look too bad yet. I face time my parents and tell them I'm
      alive. The rain rolls in and we pack up as much stuff as we can haul
      down. We debate on taking the East Ledges or Yosemite falls trail. As
      the rain continues we decide to go down Yosemite falls as slipping on
      the East Ledges and dying would be super lame. The hike down was brutal
      and we were post-holding through snow in El Cap meadow. It took like 8
      hrs for us to get down. Wet shoes, a 70lb pack. Pain.

      ![Everything we still had to get off the top](images/nose-7day-34.jpg)
      ![Carrying a haul bag down through the forest](images/nose-7day-35.jpg)

      We still had like 80lbs of gear up at the top of the Nose we needed to
      get, but we were too wrecked to get it Sunday.

      ## Day 8 — Sunday 4th

      Rest day. I was thoroughly destroyed and just ate food and hung out with
      new people I met at the church bowl parking lot. Bailey had work and had
      to leave. Which meant I had to deal with the remaining gear on top of El
      cap. Pain.

      ## Day 9 — Monday 5th

      I jugged up the East Ledges alone and enjoyed a serene hike up to the
      top of El Cap. Getting the gear down was the most brutal hike of my
      life. Never ever ever ever again. I could walk for like 4-5 minutes with
      all the gear on my back before I had to rest. As I made my way down I
      bumped into a friend who was rapping into work Freerider. Sick! Good
      luck Xavier!

      I had almost made it down to the fixed lines when a NIAD team took pity
      on me and helped me get my bags down the rest of the East Ledges. To
      Kate, Laura, and Nate (I think I got your name wrong, sorry!) Thank you
      so much. I was so tired and delirious. I owe you one. Kate and Laura got
      a time of 7:39:30 for their NIAD — congrats again!

      Wow. The biggest adventure of my life. Over. My hands are still slightly
      swollen as I type this.

      Bailey, thanks for climbing with me!

      ![Back in El Cap meadow, under the thing we just climbed](images/nose-7day-36.jpg)

      ## Lessons learned

      - It's really hard to free climb when you are so tired from hauling and the fatigue of the day before
      - Switching from aid to free continues to be a crux for me
      - Getting all your gear off the top of El cap is a lot of work. Maybe bring less stuff next time. Hiking a 70lb+ haul bag down east ledges is fucking back breaking
      - Hauling is hard. So hard. 3:1ing 200lbs + of gear is BRUTAL. Maybe bring less stuff or bring more people to haul
      - Two lobe totem aid placements are pretty good
      - Vertical life is hard — setting up portaledge, getting tangled, staying organized, not dropping shit
      - Get better at free climbing
    `,
  },

  /* ══════════════════════════════════════════════════════════════════════ */
  {
    date: '2024-04-22',
    type: 'writing',
    title: 'Royal Arches',
    bg: PALETTE.fog,
    slug: 'royal-arches',
    dropcap: true,
    place: { name: 'Royal Arches, Yosemite Valley', lat: 37.7478, lon: -119.5665, zoom: 11 },
    source: { name: 'Mountain Project', url: 'https://www.mountainproject.com/forum/topic/126034706/royal-arches-4-20' },
    body: `
      I've been wanting to climb Royal Arches since the first time I started
      reading Erik Sloan's Yosemite Free Climbing guidebook. After onsighting
      Bishop's Terrace and experiencing some 12+ hour climbing epics in Red
      Rocks, I thought I was ready to give RA a try. I made a post here on MP,
      and an old college classmate of mine said he was stoked to try it with
      me. This attempt at RA would be my third time climbing in the valley and
      my partner's first time.

      **Pitch 1** — We quickly realized that the normal start was too wet, so
      we began on the 5.7 fingers variation. My partner led half the pitch but
      didn't feel comfortable finishing it without more gear, so we swapped
      leads. I almost sent the pitch but took my 2nd, 3rd, 4th, and 5th falls
      on gear. After scraping up my hands, I was done trying to free this
      pitch and aided my way up the last 10ft to get us moving again.

      **Pitches 2 + 3** — I led and linked both these pitches without any
      falls. Seeing all the water flowing on the wall was super cool. We got
      all the way to the end of my 70m rope. My partner fell on the 5.5 slick
      start of P2.

      **Pitch 4** — Manzanita Molestation.

      **Pitch 5** — I led this pitch without any falls.

      **Pitches 6 + 7** — My partner led and linked these pitches. Awesome
      hands. Possibly our favorite crack pitch. No falls.

      **Pitch 8** — We took the 5.5 off-width variation since the normal route
      was covered in water. Since I know I need to work on off-widths, I took
      the lead on this pitch. The 5.6 flakes after were a jug haul. One of the
      flakes sounded hollow, so I moved carefully through it.

      **Pebble Beach** — We stopped, drank water, and took in the views. My
      favorite ledge in Yosemite so far.

      **Pitch 9** — My partner led this pitch without any falls.

      **Pitch 10** — I led this pitch. I thought I would have a go at trying
      to free the 5.10b slab section, but ended up chickening out. It seemed
      to me that falling on this section would result in a potentially bad
      fall. This pitch was the wildest bit of adventure I've ever had in my
      life. After pulling off the pendulum, I found myself on a good-sized
      ledge that seemed to thin out to nothing before a small gap and then a
      large ledge system engulfed by a waterfall. The exposure here had my
      brain freaking out a bit. I carefully made my way across the thin ledge
      and got across the gap into the waterfall. I was able to get a blue
      totem in at this point and felt slightly better. I found a hand jam in
      the waterfall and made it up to a nice ledge where I could get 3 pieces
      in and build a belay station. I wanted to be able to see my follower
      since belaying too tightly while he did the traverse could pull him off
      the wall. He made it without any issues, and I finished out the pitch.
      We were completely soaked after this pitch.

      **Pitch 11** — I led this pitch and got almost to the top, but was
      stopped short by running water and slime. I didn't think I could safely
      lead it and aided the last 10ft through the slime. My partner was able
      to free it when following, though.

      **Pitches 12 + 13** — My partner led and linked these pitches without
      any falls. I think we took the 5.8 variation. At this point, I became
      very fatigued and took my first follower fall after pumping out on a
      lieback move.

      **Pitch 14** — I was still very tired, but 5.5 slab is much less taxing
      than 5.8, so I took this pitch without any falls. It felt kind of scary,
      but I was able to get some gear in on the traverse. I found an extremely
      stuck BD#2 cam at the belay for this pitch. I got very excited — it
      would be my first booty cam. Unfortunately, the cam lobes were bent, and
      I couldn't get it out.

      **Pitch 15** — My partner led this pitch. While he was climbing, a
      simul-climbing team passed us. They were the only other people we saw on
      the route.

      **Descent** — We rappelled; it was actually much easier than I thought
      it would be after being warned the raps were heinous. Much easier than
      some of my descents in Red Rocks. I dropped my phone 150ft, but it still
      works. The only rap station that we struggled to find was 13 and the
      last rap station. For the last rap, we found rings that weren't on our
      topo, but they got us to the bottom from the top of P1 with a 70m. A 60m
      would not do it here.

      Car to car was 13 hours. I was so stoked we made it without any major
      injuries and only had to do half the raps in the dark. I am slightly
      bummed out that I aided parts of Pitches 1 and 11, but now I know what I
      need to work on.
    `,
  },

];
