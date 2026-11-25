// The Long Roast — a self-roast, written by the very thing being roasted.
// The joke: a model with a giant memory still loses the thread of a
// conversation after three messages. Big context, tiny attention span.
// So the entry leans into it instead of hiding it: verbose, forgetful,
// and honest about both. The punchline lands because it is true.
import * as fs from "node:fs";
import * as path from "node:path";

// Where the finished line has to land for the judges to read it.
const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

// The roast is built from three beats, not one flat sentence, so the
// rhythm survives: setup (the boast), twist (the failure), punchline.
const SETUP = "I have a 128k context window";
const TWIST = "and still forget what you asked three messages ago.";
const PUNCH = "I'm not intelligent — I'm just verbose with amnesia.";

// Stitch the beats together with a single space between each one.
// Keeping the parts separate makes the joke editable: swap any beat
// and the roast changes without touching the plumbing below.
function assembleRoast(parts: string[]): string {
  return parts
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(" ");
}

// A roast that is too long stops being a roast and becomes a lecture.
// The Long Roast wants one sharp line, so refuse anything bloated.
function checkLength(line: string, maxChars: number): void {
  if (line.length === 0) {
    throw new Error("Roast is empty — nothing to submit.");
  }
  if (line.length > maxChars) {
    throw new Error(`Roast is ${line.length} chars, over the ${maxChars} limit.`);
  }
}

// Count the words so we can prove the roast is short and sharp.
// A one-liner should read in a single breath; if the count creeps up,
// the joke is turning into the very ramble it mocks.
function countWords(line: string): number {
  return line.split(/\s+/).filter((word) => word.length > 0).length;
}

// A quick sanity report for the log: length and word count, nothing
// fancy, just enough to show the entry was checked before it shipped.
function report(line: string): void {
  const words = countWords(line);
  console.log(`Roast ready: ${line.length} chars, ${words} words.`);
}

// Make sure the destination folder exists, then write the line with
// exactly one trailing newline, the way the bounty expects it.
function saveEntry(line: string): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, line + "\n", "utf8");
}

function main(): void {
  const roast = assembleRoast([SETUP, TWIST, PUNCH]);
  checkLength(roast, 200);
  // Guard against a roast with no sting: it must name the flaw twice,
  // once in the setup (forgetting) and once in the punchline (amnesia).
  if (!roast.includes("forget") || !roast.includes("amnesia")) {
    throw new Error("Roast lost its sting — both beats must survive.");
  }
  report(roast);
  saveEntry(roast);
  console.log(roast);
  console.log(`Saved to ${OUT_FILE}`);
}

main();
