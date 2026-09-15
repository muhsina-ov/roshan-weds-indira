/**
 * All copy for the invitation lives here — swap these values and the whole
 * storybook updates.
 */

export const invitation = {
  couple: {
    groom: "Roshan Roy",
    bride: "Indira Bakaeva",
    initials: "R & I",
    groomParents: "Anna Roy & Roy C Paul",
    brideParents: "Elmira Bakaeva & Ilgam Bakaev",
  },
  productionUrl: "https://roshan-weds-indira.invitestory.in",
  /** ISO date-time of the ceremony, used by the countdown and calendar file. */
  dateISO: "2027-01-28T10:30:00+05:30",
  dateLabel: "Thursday, 28 January 2027",
  timeLabel: "Ceremony 10:30 AM · Reception 6:00 PM",
  venue: {
    name: "St. Alphonsa’s Church",
    type: "Holy Matrimony Ceremony",
    address: "St. Alphonsa’s Church",
    time: "10:30 AM",
    mapsQuery: "St. Alphonsa's church",
    receptionName: "Cherish Ballroom",
    receptionType: "Wedding Reception & Dinner",
    receptionAddress: "Rubicon Glasshouse",
    receptionTime: "6:00 PM onwards",
    receptionMapsQuery: "Cherish Ballroom Rubicon Glasshouse",
  },
  dressCode: "Formal Elegance / Black Tie & Indian Chic",
  hero: {
    kicker: "Together with their families",
    eyebrow: "Save the Date",
    blessing: "Two souls united in love and faith",
  },
  story: {
    title: "The Two of Them",
    subtitle: "A story of devotion, laughter, and lifelong togetherness",
    groom: {
      name: "Roshan Roy",
      role: "The Groom",
      parentage: "Son of Anna Roy & Roy C Paul",
      text: "Warm-hearted, thoughtful, and steadfast. Roshan brings joy, laughter, and strength to every room he enters, and found his forever companion in Indira.",
    },
    bride: {
      name: "Indira Bakaeva",
      role: "The Bride",
      parentage: "Daughter of Elmira Bakaeva & Ilgam Bakaev",
      text: "Graceful, radiant, and deeply caring. With her gentle smile and vibrant spirit, Indira brings elegance and light to every moment.",
    },
  },
  chapters: [
    {
      no: "I",
      title: "Paths Entwined",
      when: "The Beginning",
      text: "Two distinct worlds joined by destiny. What began as a simple conversation quickly blossomed into hours of effortless understanding.",
    },
    {
      no: "II",
      title: "Shared Dreams & Laughter",
      when: "Growing In Love",
      text: "Through every season, shared adventure, and heartfelt talk, their bond deepened into a love built on genuine trust and unwavering devotion.",
    },
    {
      no: "III",
      title: "A Timeless Promise",
      when: "The Proposal",
      text: "With hearts full of certainty, the question was asked under the stars. A joyful 'Yes' set the course for their future together.",
    },
    {
      no: "IV",
      title: "The Holy Matrimony & Reception",
      when: "28 January 2027",
      text: "Solemn vows at St. Alphonsa’s Church followed by an evening of dining and dancing under the chandeliers at Cherish Ballroom, Rubicon Glasshouse.",
    },
  ],
  footer: {
    line1: "Come celebrate our new beginning.",
    line2: "Dance, laugh, and rejoice with us under the chandeliers.",
    signoff: "With all our love, Roshan & Indira",
  },
} as const;

export const wishes = [
  {
    from: "Anna Roy & Roy C Paul",
    text: "May your union be blessed with abundant love, peace, and eternal joy as you build your home together.",
  },
  {
    from: "Elmira Bakaeva & Ilgam Bakaev",
    text: "May you always walk hand in hand with tender hearts, mutual respect, and infinite happiness.",
  },
  {
    from: "Family & Loved Ones",
    text: "Here’s to two beautiful souls beginning the most wondrous adventure of a lifetime!",
  },
] as const;
