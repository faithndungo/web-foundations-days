const noteText = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');

// Initialize app
function init() {
    // Restore theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = 'Light mode';
    } else {
        themeToggle.textContent = 'Dark mode';
    }

    // Restore draft
    const savedDraft = localStorage.getItem('noteDraft');
    if (savedDraft) {
        noteText.value = savedDraft;
    }

    // Update counts initially
    updateCounts();
}

function updateCounts() {
    const text = noteText.value;
    const chars = text.length;
    
    // Word count calculation
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    charCount.textContent = `${chars} / 200 characters`;
    wordCount.textContent = `${words} words`;
    
    // Remove both classes first
    charCount.classList.remove('warning', 'over');
    
    if (chars > 200) {
        charCount.classList.add('over');
    } else if (chars > 180) {
        charCount.classList.add('warning');
    }
}

function saveDraft() {
    localStorage.setItem('noteDraft', noteText.value);
}

function clearNote() {
    noteText.value = '';
    localStorage.removeItem('noteDraft');
    updateCounts();
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Light mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Dark mode';
    }
}

// Event Listeners
noteText.addEventListener('input', () => {
    updateCounts();
    saveDraft();
});

noteText.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearNote();
    }
});

clearBtn.addEventListener('click', clearNote);

themeToggle.addEventListener('click', toggleTheme);

// Run init on load
init();
