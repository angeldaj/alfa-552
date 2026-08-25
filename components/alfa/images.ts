// Verified aviation photography (Unsplash direct CDN URLs, open license).
// Each ID was HTTP-checked (200) and visually confirmed for subject accuracy.
// The redesign runs a single-chroma system: the hero is the one full-colour
// aspirational moment; every other photo is rendered monochrome via the
// `.alfa-photo` treatment in alfa.css, leaving gold as the page's only accent.

const U = (id: string, w = 1600, q = 68) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const IMG = {
  heroJet: U("1474302770737-173ee21bab63", 2400, 74), // biz jet, sunrise tarmac
  // Mission/Vision panels only: these are large, full-bleed and drift on scroll,
  // so we bake the monochrome look into the CDN URL (imgix `sat=-100`) instead of
  // paying for a CSS `filter: grayscale()` re-raster every scroll frame.
  wingClouds: U("1436491865332-7a61a109cc05", 2000) + "&sat=-100", // wing over clouds, desaturated at source
  airlinerSky: U("1499063078284-f78f7d89616a", 1400), // airliner, dramatic sky
  turbine: U("1540575861501-7cf05a4b125a", 1600), // turbine intake
  cockpit: U("1518566107615-f7267099eced", 1600), // analog instrument panel
  hangar: U("1773213165821-e12923fa36e8", 1800), // hangar + widebody
  cabinCrew: U("1615561776627-449e68725b57", 1200), // cabin crew, uniform
  planeBlueSky: U("1570127787282-74ec255f816f", 1200), // aircraft, high blue sky
  planeSunset: U("1627679489817-73f9be6f0c50", 1200) + "&sat=-100", // aircraft at sunset, desaturated at source
} as const;

// The exact URL preloaded in <head> for LCP — must match Hero's <img src>.
export const HERO_SRC = IMG.heroJet;
