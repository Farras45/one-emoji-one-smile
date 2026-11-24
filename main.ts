// one-emoji-one-smile
// Writes exactly one emoji (U+1F60A, SMILING FACE WITH SMILING EYES)
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output), as UTF-8 with
// no trailing newline and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "😊"; // U+1F60A

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");

// Self-check: the file must be exactly the 4 UTF-8 bytes of U+1F60A
// (f0 9f 98 8a), one character, no trailing newline, nothing else.
const bytes = readFileSync(outFile);
const expected = Buffer.from(ENTRY, "utf8");
if (!bytes.equals(expected) || [...ENTRY].length !== 1) {
  throw new Error(`entry.txt is not exactly one emoji: ${bytes.toString("hex")}`);
}
console.log(`wrote ${outFile} (${bytes.length} bytes): ${ENTRY}`);
