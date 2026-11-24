import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-sentence satirical roast for make.fun's "The Long Roast: Lawmakers
// and the File They Cannot Convert".
// The turn: a senator grilling a tech CEO on how to regulate AI — peak
// legislative authority — is undercut by his own aide whispering that the
// Print-to-PDF button is not a metaphor. The punch lands on the last few
// words: the lawmaker's workaround is to print the email, scan the paper,
// and fax it to his own iPhone — a Rube Goldberg machine built to avoid a
// single button. Specific, unexpected, and aimed squarely at the people
// who write the rules, not at random abuse.
const ENTRY =
  "Senator Whitaker grilled a tech CEO on how to regulate AI while his aide, three feet away, whispered, \"Sir, the Print-to-PDF button isn't a metaphor \u2014 stop printing the email, scanning it, and faxing it to your own iPhone.\"";

// Gate: the brief requires a single sentence of 1-320 characters.
if (ENTRY.length < 1 || ENTRY.length > 320) {
  throw new Error(
    `entry must be 1-320 characters (char-count rule), got ${ENTRY.length}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single sentence (single-sentence rule)");
}
// One sentence means one terminator: strip the closing `."` of the quoted
// whisper, then no other sentence-ending mark may remain.
const body = ENTRY.replace(/\."$/, "");
if (/[.!?]/.test(body)) {
  throw new Error("entry must be a single sentence (extra terminator found)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
