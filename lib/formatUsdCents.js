const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * Format a whole-number cents value as a USD display string.
 * Rejects non-integers and values outside safe integer range.
 *
 * @param {number} cents
 * @returns {string}
 */
export function formatUsdCents(cents) {
  if (typeof cents !== "number" || Number.isNaN(cents)) {
    throw new TypeError("cents must be a number");
  }
  if (!Number.isInteger(cents)) {
    throw new RangeError("cents must be an integer (avoid float drift)");
  }
  if (cents < Number.MIN_SAFE_INTEGER || cents > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("cents out of safe integer range");
  }
  return usd.format(cents / 100);
}
