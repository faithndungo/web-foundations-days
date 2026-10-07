let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  const lowerWord = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(lowerWord));
}

function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) => {
    return current.text.length > longest.text.length ? current : longest;
  });
}

function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

function getSummary() {
  const count = notes.length;
  const word = count === 1 ? "note" : "notes";
  const counts = countByCategory();
  const categoryStrings = [];
  for (const cat in counts) {
    categoryStrings.push(`${counts[cat]} ${cat}`);
  }
  return `${count} ${word}: ${categoryStrings.join(", ")}.`;
}

function isDuplicate(text) {
  const trimmedLower = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === trimmedLower);
}

function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  
  if (typeof text !== "string" || text.length < 1 || text.length > 200) {
    console.log("Failed to add: Note must be between 1 and 200 characters.");
    return false;
  }
  
  if (!validCategories.includes(category)) {
    console.log("Failed to add: Invalid category.");
    return false;
  }
  
  if (isDuplicate(text)) {
    console.log("Failed to add: Duplicate note.");
    return false;
  }
  
  const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text, category });
  return true;
}

// --- Tests ---

console.log("--- searchNotes ---");
// Normal case
console.log(searchNotes("day")); // Expected output: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]
// Edge case: no results
console.log(searchNotes("xyz")); // Expected output: []

console.log("--- longestNote ---");
// Normal case
console.log(longestNote()); // Expected output: { id: 3, text: "Email the project report to Grace", category: "work" }
// Edge case: empty notes array
let originalNotes = [...notes];
notes = [];
console.log(longestNote()); // Expected output: null
notes = [...originalNotes];

console.log("--- countByCategory ---");
// Normal case
console.log(countByCategory()); // Expected output: { personal: 2, study: 2, work: 1 }
// Edge case: adding a new note updates the count
notes.push({ id: 6, text: "Another work task", category: "work" });
console.log(countByCategory()); // Expected output: { personal: 2, study: 2, work: 2 }
notes.pop(); // revert

console.log("--- getSummary ---");
// Normal case (multiple notes)
console.log(getSummary()); // Expected output: "5 notes: 2 personal, 2 study, 1 work."
// Edge case (exactly 1 note)
originalNotes = [...notes];
notes = [{ id: 1, text: "Single note", category: "personal" }];
console.log(getSummary()); // Expected output: "1 note: 1 personal."
notes = [...originalNotes];

console.log("--- isDuplicate ---");
// Normal case (not duplicate)
console.log(isDuplicate("Cook dinner")); // Expected output: false
// Edge case (duplicate with extra spaces and mixed case)
console.log(isDuplicate("  call MUM   ")); // Expected output: true

console.log("--- addNote ---");
// Normal case
console.log(addNote("Learn Node.js", "study")); // Expected output: true
// Edge cases
console.log(addNote("Call mum", "personal")); // Expected output: false (logs "Failed to add: Duplicate note.")
console.log(addNote("", "work")); // Expected output: false (logs "Failed to add: Note must be between 1 and 200 characters.")
console.log(addNote("Gym", "health")); // Expected output: false (logs "Failed to add: Invalid category.")
