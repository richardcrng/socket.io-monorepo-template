import seedrandom from "seedrandom";

export function getRNGFromMaybeSeed(
  seedOrRng?: string | seedrandom.PRNG
): seedrandom.PRNG {
  const seedIsNotRng =
    typeof seedOrRng === "string" || typeof seedOrRng === "undefined";
  const rng = seedIsNotRng ? seedrandom(seedOrRng) : seedOrRng;
  return rng;
}
