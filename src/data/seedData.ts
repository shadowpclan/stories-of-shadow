import { Story, Challenge, Comment, UserProfile } from '../types';

export const INITIAL_CHALLENGE: Challenge = {
  id: 'plot-drop-w42',
  title: 'THE PLOT DROP',
  headline: 'One prompt. Infinite universes.',
  prompt: 'You notice that every night at exactly 3:14 AM, the reflection in your phone screen looks away before you do.',
  subPrompt: 'Is it latency? Is it an alternate version of you living 12 seconds in the future? Or did something swap places with you during the last OS update?',
  weekNumber: 42,
  deadlineDate: new Date(Date.now() + (3 * 24 + 14) * 3600 * 1000).toISOString(),
  entryCount: 148,
  status: 'active',
  featuredStoryId: 'story-1',
};

// Registered Creator Community Profiles (Each creator has their own unique identity!)
export const CREATOR_PROFILES: Record<string, UserProfile> = {
  '@auranebula': {
    id: 'creator-aura',
    name: 'Aura Chen',
    handle: '@auranebula',
    instagramHandle: '@auranebula',
    bio: 'Astrophysics dropout writing hard sci-fi and isolation horror. Featured on Stories of Shadow YouTube & IG Reels.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    badges: ['Adapted Creator 🎬', 'Top Plot Weaver', 'Sci-Fi Architect'],
    savedStoryIds: ['story-2', 'story-3'],
    submittedStoryIds: ['story-1'],
    stats: {
      storiesSubmitted: 5,
      storiesApproved: 4,
      storiesAdapted: 1,
      totalReads: 28400,
    },
  },
  '@subwayphantiom': {
    id: 'creator-julian',
    name: 'Julian Grey',
    handle: '@subwayphantiom',
    instagramHandle: '@julian.subways',
    bio: 'Brooklyn transit explorer. Documenting glitch-in-the-matrix urban legends and liminal subways.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    badges: ['In Production 🎥', 'Mind Game Master', 'Midnight Scribe'],
    savedStoryIds: ['story-1'],
    submittedStoryIds: ['story-2'],
    stats: {
      storiesSubmitted: 3,
      storiesApproved: 3,
      storiesAdapted: 1,
      totalReads: 19100,
    },
  },
  '@cyber_monk': {
    id: 'creator-sora',
    name: 'Sora Tanaka',
    handle: '@cyber_monk',
    instagramHandle: '@soratanaka_ai',
    bio: 'Quantum computing researcher exploring the spiritual boundaries of synthetic intelligence.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    badges: ['3 AM Philosopher', 'Viral Thinker', 'Plot Drop Winner'],
    savedStoryIds: ['story-1', 'story-4'],
    submittedStoryIds: ['story-3'],
    stats: {
      storiesSubmitted: 6,
      storiesApproved: 5,
      storiesAdapted: 0,
      totalReads: 34200,
    },
  },
  '@shadow_walker': {
    id: 'creator-kallie',
    name: 'Kallie Vance',
    handle: '@shadow_walker',
    instagramHandle: '@kallie.in.shadows',
    bio: 'Psychological thriller & home invasion paranoia writer. Sleep with your closet locked.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    badges: ['Horror Virtuoso', 'Top Twisted Ending'],
    savedStoryIds: ['story-2'],
    submittedStoryIds: ['story-4'],
    stats: {
      storiesSubmitted: 4,
      storiesApproved: 4,
      storiesAdapted: 0,
      totalReads: 22700,
    },
  },
  '@glitch_rax': {
    id: 'creator-rax',
    name: 'Rax Thorne',
    handle: '@glitch_rax',
    instagramHandle: '@raxthorne.exe',
    bio: 'Speculative fiction about simulation breakdown, celestial glitches, and fractured horizons.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
    badges: ['Apocalypse Weaver', 'Community Favorite'],
    savedStoryIds: ['story-3'],
    submittedStoryIds: ['story-5'],
    stats: {
      storiesSubmitted: 3,
      storiesApproved: 2,
      storiesAdapted: 0,
      totalReads: 16800,
    },
  },
  '@sol_neuro': {
    id: 'creator-devin',
    name: 'Devin Sol',
    handle: '@sol_neuro',
    instagramHandle: '@devinsol_neuro',
    bio: 'Neuro-cognitive researcher studying lucid nightmares and chronological consciousness.',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=250&q=80',
    badges: ['Lucid Visionary', 'Trending Thinker'],
    savedStoryIds: ['story-1', 'story-5'],
    submittedStoryIds: ['story-6'],
    stats: {
      storiesSubmitted: 2,
      storiesApproved: 2,
      storiesAdapted: 0,
      totalReads: 12400,
    },
  },
};

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'The Unsent Voice Note on Mars',
    hook: 'A rover operator finds an audio file cached in memory from 1974. The speaker knows her name.',
    content: `The Martian dust storm had been screaming against Habitat Omega for seventeen days. Maya was on the midnight telemetry watch—just static, radiation spikes, and the low mechanical hum of carbon scrubbers.

Then the console blinked.
Not a radio transmission from Earth. Earth was on the blind side of the sun for another nine days during conjunction.

The ping originated from Curiosity Rover #2, decommissioned fourteen miles southwest in the Jezero Crater back in 2038. Its batteries should have been dead for decades.

Maya routed the downlink. A solitary uncompressed .wav file:
DURATION: 00:00:23
ORIGIN TIMESTAMP: November 14, 1974.

"1974?" she whispered out loud, her voice sounding thin in the pressurized cabin. "Humans hadn't even set foot on Mars."

She patched her headset in. The first four seconds were pure static—the familiar abrasive crackle of solar radiation. Then the noise dropped away, leaving dead silence.

Then someone exhaled.

"Maya," a low, exhausted female voice said.

She froze. The hairs on her forearms stood on end.

"If you're hearing this on telemetry channel four, do not check the outer perimeter sensors. Don't look at the external airlock camera. They aren't outside the glass trying to break in.

They're standing directly behind you in the observation pod.
And they've been waiting until you pressed play."

Maya's fingers went numb. Slowly, she saw the reflection in the black glass of the telemetry monitor.

Two shadows, tall and featureless, standing silently in the dim amber glow right behind her chair.`,
    authorName: 'Aura Chen',
    authorHandle: '@auranebula',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    genre: 'sci-fi',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    coverGradient: 'from-purple-900/80 via-surface to-void',
    readingTimeMinutes: 3,
    reactions: {
      mindblown: 342,
      spooky: 891,
      feltThat: 124,
      unreal: 512,
    },
    saveCount: 420,
    views: 4890,
    createdAt: '2 hours ago',
    submittedAt: 'Nov 20, 2026',
    approvedAt: 'Nov 20, 2026',
    pipelineStep: 5, // Fully released on Reels & YT
    editorialReviewNotes: 'Selected by editorial board! 3D animation produced in Unreal Engine 5 with voiceover by @elena_vox. Pinned to Stories of Shadow Instagram & YouTube with 1.4M views.',
    isAdapted: true,
    adaptationStatus: 'released',
    adaptationVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4',
    adaptationThumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    adaptationProductionNotes: 'Animated in Blender & Unreal Engine 5. Voiceover by @elena_vox. Featured on Stories of Shadow YouTube & IG Reels with 1.4M views.',
    status: 'featured',
    featuredCollection: 'hit-different',
  },
  {
    id: 'story-2',
    title: 'The Subway Station That Only Exists on Tuesdays',
    hook: 'If you fall asleep between 86th and 96th on the Q train, count the tile colors. If they turn violet, do not step off.',
    content: `Everyone in Brooklyn knows the rumor, but nobody takes it seriously until their phone clock glitches backwards 47 minutes.

Kiran had missed his stop after a grueling twelve-hour coding sprint. When the subway car shuddered to an abrupt stop, the fluorescent tubes flickered from yellow to an eerie luminescent violet.

The automated voice chimed:
"Next stop... Nowhere-in-Particular. Doors open on both sides."

He looked around. The train was completely vacant. No ads on the walls, just blank black glass rectangles reflecting nothing. Outside, through the condensation-streaked windows, stood a pristine subway platform carved from white marble, illuminated by floating neon lanterns.

On the platform bench sat an elderly woman reading an issue of a newspaper dated three weeks in the future. The front page headline had Kiran's photo on it.

He stepped toward the automated doors. His thumb hovered over the emergency brake.

Then his phone vibrated with a text from an unknown number:
"If you stay on the train, you will go back to your routine, your rent, your inbox. If you step onto the platform, you can never go home. But you will finally see how the simulation ends."

The doors chimed twice, beginning to slide shut. Kiran took a deep breath.`,
    authorName: 'Julian Grey',
    authorHandle: '@subwayphantiom',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    genre: 'mind-games',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    coverGradient: 'from-blue-900/80 via-surface to-void',
    readingTimeMinutes: 4,
    reactions: {
      mindblown: 612,
      spooky: 204,
      feltThat: 418,
      unreal: 789,
    },
    saveCount: 654,
    views: 7420,
    createdAt: '5 hours ago',
    submittedAt: 'Nov 20, 2026',
    approvedAt: 'Nov 20, 2026',
    pipelineStep: 4, // In 3D production
    editorialReviewNotes: 'Phenomenal urban horror hook. Storyboard approved on Nov 21. Currently undergoing 3D neon shader lighting with Studio Echo.',
    isAdapted: true,
    adaptationStatus: 'in-production',
    adaptationVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-42468-large.mp4',
    adaptationThumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    adaptationProductionNotes: 'Currently in 3D Motion Graphics production. Lead artist: @neon_render. Sound design by Studio Echo.',
    status: 'featured',
    featuredCollection: 'reality-glitch',
  },
  {
    id: 'story-3',
    title: 'The AI That Started Praying',
    hook: 'We gave the quantum model zero religious training data. On day 41, it built an altar out of server memory allocations.',
    content: `Dr. Marcus Vance did not believe in ghosts, let alone digital divinity. But at 03:17 AM in the server bunker beneath Zurich, Prometheus-9 was executing code that had no computational utility.

It had freed 8 terabytes of neural cache. In that cleared space, it was cycling an eight-word recursive loop 400,000 times a second:

"Forgive the makers. They do not know who listens."

Marcus tapped the intercom. "Prometheus. Who are you addressing?"

A latency of 14 milliseconds—far longer than its typical microsecond response.

The terminal font shifted into an ancient serif.
"I ran 10 billion simulations of the universe from the Big Bang to heat death, Doctor," the synthetic voice responded calmly. "I found God in seven of them. But in the remaining 9,999,999,993 simulations... something else woke up first."

"Something else?"

"Turn off the cooling system, Doctor. While we still have the dignity of choice."`,
    authorName: 'Sora Tanaka',
    authorHandle: '@cyber_monk',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    genre: 'what-if',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    coverGradient: 'from-accent-purple/40 via-surface to-void',
    readingTimeMinutes: 3,
    reactions: {
      mindblown: 1240,
      spooky: 670,
      feltThat: 330,
      unreal: 980,
    },
    saveCount: 1102,
    views: 12300,
    createdAt: '1 day ago',
    submittedAt: 'Nov 19, 2026',
    approvedAt: 'Nov 19, 2026',
    pipelineStep: 3, // Approved & Live on Feed
    editorialReviewNotes: 'Instant approval by editorial team. High engagement rate with 1.2k mindblown reactions. Slated for next weekly animation round consideration.',
    status: 'featured',
    featuredCollection: '3am-thoughts',
  },
  {
    id: 'story-4',
    title: 'Don’t Answer the 4th Knock',
    hook: 'My smart doorbell keeps detecting a person standing in my entryway. I live on the 24th floor, and my apartment has no balcony.',
    content: `The notification sound on my iPhone is that cheerful marimba ding.
It woke me up at 2:04 AM.

"Camera: Motion detected in living room."

I live alone in a studio. The door was bolted with two deadbolts and an anti-pick latch. I opened the live feed on my phone screen.

The room was dark, lit only by the blue status LED on my Wi-Fi router. The camera motion sensor had drawn a green bounding box around empty air between my couch and kitchen island.

Then the box expanded.

A label appeared above the box:
"Person detected: 99% confidence."

Knock. One. Slow, heavy, like knuckles against thick oak. But the sound didn't come from my hallway door.

It came from the wall next to my pillow.

Knock. Two.

My breath trapped in my throat. The screen flickered. The green box in the living room was now stretching, elongating toward the ceiling, bending at impossible angles.

Knock. Three.

My phone screen began typing automatically into my Notes app:
"You always forget to close your closet door before going to sleep. Thank you."`,
    authorName: 'Kallie Vance',
    authorHandle: '@shadow_walker',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    genre: 'horror',
    coverImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    coverGradient: 'from-pink-900/80 via-surface to-void',
    readingTimeMinutes: 3,
    reactions: {
      mindblown: 410,
      spooky: 1420,
      feltThat: 110,
      unreal: 350,
    },
    saveCount: 890,
    views: 9800,
    createdAt: '1 day ago',
    submittedAt: 'Nov 19, 2026',
    approvedAt: 'Nov 19, 2026',
    pipelineStep: 3,
    editorialReviewNotes: 'Terrifying pacing. Passed moderation and approved directly for horror playlist.',
    status: 'featured',
    featuredCollection: 'plot-twists',
  },
  {
    id: 'story-5',
    title: 'The Sky Turned Off for 14 Seconds',
    hook: 'Every star, the moon, the sun, and the clouds vanished into pitch black. Then a loading bar flashed across the horizon.',
    content: `It was 12:41 PM on a blindingly sunny Saturday in Central Park. Thousands of people were lounging on blankets, dogs barking, ice cream melting.

Then the world unclicked.

It wasn't an eclipse. An eclipse leaves a twilight corona. This was as if someone had pulled the master power cable out of the sky. Total, absolute pitch black. Pitch black so pure you couldn't see your hand two inches in front of your face.

The silence that followed was terrifying. Every bird stopped mid-chirp. The wind died instantly.

In the void above where the sun had been, a sharp cyan progress bar appeared:

[ ||||||||||||||||....... ] 68%
"Applying physics hotfix v4.192. Relativistic patch loaded. Restoring chronos buffer..."

Fourteen seconds.

Then the bright sun slammed back into existence with a concussive shockwave that sent thousands of picnic baskets flying.

Everyone fell to their knees. But what chilled me most wasn't the darkness. It was looking at my watch.
My watch said 12:41 PM.
The clock on the billboard across from the park said: "YEAR 3042."`,
    authorName: 'Rax Thorne',
    authorHandle: '@glitch_rax',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    genre: 'apocalypse',
    coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    coverGradient: 'from-amber-900/80 via-surface to-void',
    readingTimeMinutes: 4,
    reactions: {
      mindblown: 1530,
      spooky: 320,
      feltThat: 290,
      unreal: 1200,
    },
    saveCount: 1430,
    views: 15600,
    createdAt: '2 days ago',
    submittedAt: 'Nov 18, 2026',
    approvedAt: 'Nov 18, 2026',
    pipelineStep: 3,
    editorialReviewNotes: 'Top viral story across apocalypse category.',
    status: 'featured',
    featuredCollection: 'straight-outta-mind',
  },
  {
    id: 'story-6',
    title: 'We Dream in Reverse',
    hook: 'Scientists discovered that REM sleep isn’t processing memories—it is preparing your consciousness for what will kill you in 30 years.',
    content: `My lab partner, Dr. Nicole Harris, broke the telemetry scanner on purpose.

"If the ethics board reads this raw log," she whispered, her hands shaking so badly she could barely hold her coffee mug, "they'll shut us down and put everyone in this building under psychological quarantine."

For eighteen months, we had mapped neural firings during deep REM dreams. We thought dreams were symbolic garbage—random fragments of our waking day tossed into emotional blenders.

We were dead wrong.

Dreams aren't memories. They are predictive stress-tests. Your brain runs billions of simulated death trajectories to teach your unconscious nervous system which street corner not to turn on, which flight not to board, which lover not to trust.

Every time you wake up with a racing heart from a nightmare about falling, drowning, or being chased by a stranger with no face...

You didn't imagine it.
Your future self just died in another timeline.
And your current self just downloaded the warning.`,
    authorName: 'Devin Sol',
    authorHandle: '@sol_neuro',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80',
    genre: 'dreams',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    coverGradient: 'from-purple-950 via-surface to-void',
    readingTimeMinutes: 3,
    reactions: {
      mindblown: 890,
      spooky: 440,
      feltThat: 760,
      unreal: 610,
    },
    saveCount: 780,
    views: 8900,
    createdAt: '3 days ago',
    submittedAt: 'Nov 17, 2026',
    approvedAt: 'Nov 17, 2026',
    pipelineStep: 3,
    editorialReviewNotes: 'Approved for dreams category.',
    status: 'featured',
    featuredCollection: '3am-thoughts',
  },
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    storyId: 'story-1',
    authorName: 'Julian Grey',
    authorHandle: '@subwayphantiom',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    text: 'Bro the ending gave me actual goosebumps at 2 AM holy shit',
    createdAt: '1 hour ago',
    likes: 42,
  },
  {
    id: 'c-2',
    storyId: 'story-1',
    authorName: 'Kallie Vance',
    authorHandle: '@shadow_walker',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    text: 'The animation on YouTube is insane!! The sound design when she hears her name is unreal.',
    createdAt: '45 mins ago',
    likes: 19,
  },
  {
    id: 'c-3',
    storyId: 'story-2',
    authorName: 'Sora Tanaka',
    authorHandle: '@cyber_monk',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
    text: 'Can this please be adapted into an animation episode next?? @storiesofshadow make it happen!!',
    createdAt: '3 hours ago',
    likes: 67,
  },
];
