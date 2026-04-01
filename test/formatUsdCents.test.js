import assert from "node:assert/strict";
import test from "node:test";
import { formatUsdCents } from "../lib/formatUsdCents.js";

test("formats zero", () => {
  assert.equal(formatUsdCents(0), "$0.00");
});

test("formats positive cents", () => {
  assert.equal(formatUsdCents(1099), "$10.99");
});

test("formats negative cents (refunds)", () => {
  assert.equal(formatUsdCents(-50), "-$0.50");
});

test("rejects non-integer cents", () => {
  assert.throws(() => formatUsdCents(10.5), RangeError);
});

test("rejects NaN", () => {
  assert.throws(() => formatUsdCents(NaN), TypeError);
});
