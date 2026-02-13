export interface Journey {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export interface Place {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export interface Day {
  date: string;
  title: string;
  description: string;
  content: string;
}

export const journeys: Journey[] = [
  {
    slug: "a-quiet-morning",
    title: "A Quiet Morning",
    description: "The stillness before the day begins. When thoughts arrive slowly, and nothing demands your attention.",
    content: "Some mornings arrive differently. The light is softer. The air feels patient. You wake without urgency, and the day hasn't yet asked anything of you.\n\nThis is the kind of morning where you might notice small things: the way steam rises from your cup, the particular quiet of an empty room, the feeling of time moving at its own pace.\n\nMomentBook understands these mornings. It doesn't ask you to be productive or optimized. It simply creates space for what you notice, when you notice it.\n\nNothing is required. The app is there if the moment feels worth remembering."
  },
  {
    slug: "returning-home",
    title: "Returning Home",
    description: "The familiar path back. The recognition of spaces that know you, and the quiet relief of arrival.",
    content: "There's something particular about returning to a place that holds your rhythms. The door opens the same way. The light falls through the same windows. The air carries a familiar weight.\n\nReturning home isn't always dramatic. Sometimes it's just the end of a day, the close of a loop, the moment when movement stops and stillness begins.\n\nMomentBook notices these transitions. Not to catalog them, but to honor the small recognitions that shape a life.\n\nYou might record the moment, or you might not. Either way, the app remains quiet, undemanding, simply present."
  },
  {
    slug: "ordinary-tuesday",
    title: "Ordinary Tuesday",
    description: "The middle of the week. No celebration, no crisis. Just the steady texture of a regular day.",
    content: "Not every day announces itself. Some simply unfold without occasion, carrying the weight of routine and the subtle variations that make each day unrepeatable.\n\nTuesday doesn't ask for attention. It doesn't promise transformation. It just is—a container for whatever arises, whether significant or mundane.\n\nMomentBook sees these days clearly. It doesn't privilege excitement over quietness, achievement over observation. It treats the ordinary as worthy of gentle attention.\n\nIf something in the day feels worth noting, the space is there. If not, nothing is lost."
  }
];

export const places: Place[] = [
  {
    slug: "familiar-spaces",
    title: "Familiar Spaces",
    description: "The rooms and corners you return to. The places that hold your presence without asking for it.",
    content: "There are spaces you inhabit without thinking. The chair you sit in. The corner of the room where light arrives in the afternoon. The path you walk without deciding to walk it.\n\nThese places don't demand recognition. They simply hold your patterns, your pauses, your presence.\n\nMomentBook understands the quiet significance of familiar spaces. It doesn't ask you to photograph them or describe them perfectly. It creates room for the feeling of being somewhere that knows you.\n\nThe app doesn't turn observation into performance. It allows places to remain themselves, while giving you space to notice them."
  },
  {
    slug: "in-between",
    title: "In Between",
    description: "The spaces of transition. Not quite here, not quite there. The hallways and thresholds of daily movement.",
    content: "Much of life happens in the gaps between destinations. The walk from one room to another. The moment in a doorway. The pause before entering.\n\nThese in-between spaces rarely get attention, yet they shape the texture of days more than we realize.\n\nMomentBook doesn't require you to be anywhere in particular. It recognizes that sometimes the most honest moments occur in transition—when you're not performing a role, not pursuing a goal, just moving through space.\n\nThe app meets you where you are, even when where you are is nowhere specific."
  }
];

export const days: Day[] = [
  {
    date: "2024-03-15",
    title: "A Day Like Others",
    description: "March 15th. No particular occasion. Just another rotation of the earth, holding whatever it holds.",
    content: "If you looked at this day from the outside, you might see nothing remarkable. The hours passed. Tasks were completed or postponed. Meals happened. Thoughts arose and dissipated.\n\nBut no day is truly ordinary when attended to. Even the most unremarkable Friday contains moments that will never repeat: a particular quality of light, a fleeting mood, a small recognition.\n\nMomentBook doesn't ask you to make days special. It simply creates space for noticing what's already there.\n\nSome days you'll remember. Some you won't. The app doesn't judge either outcome."
  },
  {
    date: "2024-06-21",
    title: "Longest Light",
    description: "The summer solstice. When daylight stretches, and evening arrives reluctantly.",
    content: "On the longest day of the year, time seems to expand. The sun lingers. Shadows stretch and soften. The day doesn't want to end.\n\nYou might notice this, or you might not. The solstice doesn't announce itself unless you're paying attention.\n\nMomentBook understands that marking time isn't about celebration or ritual. Sometimes it's just about noticing that today felt different from yesterday, that the light arrived at a new angle.\n\nThe app holds space for these observations without requiring them to mean something more than they are."
  },
  {
    date: "2024-11-03",
    title: "After the Shift",
    description: "The day after clocks change. When time becomes strange and the body remembers yesterday's rhythms.",
    content: "The hour you lost or gained changes nothing and everything. The day arrives at the wrong time. Your body expects light when darkness arrives, or wakefulness when sleep still calls.\n\nThese disorienting days reveal how much we live by rhythm rather than decision.\n\nMomentBook doesn't try to fix or optimize these feelings. It simply acknowledges that some days feel off-kilter, and that's information worth noticing.\n\nYou're allowed to feel out of sync. The app doesn't ask you to be any other way."
  }
];

export function getJourney(slug: string): Journey | undefined {
  return journeys.find(j => j.slug === slug);
}

export function getPlace(slug: string): Place | undefined {
  return places.find(p => p.slug === slug);
}

export function getDay(date: string): Day | undefined {
  return days.find(d => d.date === date);
}
