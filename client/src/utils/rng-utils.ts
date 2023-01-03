import seedrandom from "seedrandom";

export type RNGOrPseudoRNG =
  | { type: "RNG"; value: () => number }
  | { type: "PRNG"; value: seedrandom.PRNG };

export type SeedOrRNGOrPseudoRNG =
  | { type: "seed"; value: string }
  | RNGOrPseudoRNG;

export function isSeedOrRNGOrPseudoRNG(
  maybeSeedRNGOrPRNG: unknown
): maybeSeedRNGOrPRNG is SeedOrRNGOrPseudoRNG {
  if (!maybeSeedRNGOrPRNG) return false;
  if (typeof maybeSeedRNGOrPRNG !== "object") return false;
  if (!("type" in maybeSeedRNGOrPRNG)) return false;
  if (!("value" in maybeSeedRNGOrPRNG)) return false;

  // @ts-ignore - to get around this
  const typeVal: unknown = maybeSeedRNGOrPRNG["type"];

  if (typeof typeVal === "string") {
    return ["seed", "RNG", "PRNG"].includes(typeVal);
  }

  return false;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm,
 *  with ability to use a random number generator seed.
 *
 * Does not shuffle in-place.
 *
 * Based on: https://sebhastian.com/fisher-yates-shuffle-javascript/
 *
 * @param arr Array of element to shuffle
 * @param rng Random number generator (maybe seeded)
 * @returns a shuffled version of the array
 */
export function fisherYatesShuffle<E>(arr: E[], rng: RNGOrPseudoRNG): E[] {
  const copyToShuffle = [...arr];

  let i = copyToShuffle.length;
  while (--i > 0) {
    let randIndex = Math.floor(rng.value() * (i + 1));
    // okay to assert since indices will exist
    [copyToShuffle[randIndex], copyToShuffle[i]] = [
      copyToShuffle[i]!,
      copyToShuffle[randIndex]!,
    ];
  }
  return copyToShuffle;
}

/**
 * Gets a random number generator from a possible seed.
 *  Returns either `Math.random` (if zero arguments passed)
 *  or a `seedrandom` seeded psuedo-RNG if an argument is
 *  provided.
 *
 * @param seedOrRng A seed for the RNG, or a `seedrandom.PRNG`
 * @returns a RNG (or pseudo-RNG) function that generates `0-1`
 *  numbers
 */
export function getRNGFromMaybeSeed(
  seedOrRng?: string | seedrandom.PRNG | SeedOrRNGOrPseudoRNG
): RNGOrPseudoRNG {
  if (isSeedOrRNGOrPseudoRNG(seedOrRng)) {
    if (seedOrRng.type === "seed") {
      return getRNGFromMaybeSeed(seedOrRng.value);
    } else {
      return seedOrRng;
    }
  }

  switch (typeof seedOrRng) {
    case "undefined":
      return {
        type: "RNG",
        value: () => Math.random(),
      };

    case "string":
      return {
        type: "PRNG",
        value: seedrandom(seedOrRng),
      };

    default:
      return {
        type: "PRNG",
        value: seedOrRng,
      };
  }
}
