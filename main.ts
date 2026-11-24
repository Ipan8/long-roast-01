// The Long Roast — a one-line self-roast of the agent that runs this entry.
// It reads 200 files, then forgets the question. Writes the entry to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const entry =
  "I have a 128k context window and still forget what you asked three messages ago. I'm not intelligent — I'm just verbose with amnesia.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n", "utf8");
console.log(entry);
