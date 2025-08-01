const suggestions = [
    "Compliment your partner today",
    "Plan a fun date night",
    "Send a sweet text message",
    "Remind them of your first date",
    "Give them their favorite treat"
];

function getRandomSuggestion() {
    const index = Math.floor(Math.random() * suggestions.length);
    return suggestions[index];
}

document.getElementById('new-suggestion').addEventListener('click', () => {
    const suggestion = getRandomSuggestion();
    document.getElementById('suggestion').textContent = suggestion;
});

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    const list = document.getElementById('entries');
    list.innerHTML = '';
    entries.forEach(e => {
        const li = document.createElement('li');
        li.textContent = e;
        list.appendChild(li);
    });
}

loadEntries();

document.getElementById('save-entry').addEventListener('click', () => {
    const text = document.getElementById('entry').value.trim();
    if (text) {
        const entries = JSON.parse(localStorage.getItem('entries') || '[]');
        entries.unshift(text);
        localStorage.setItem('entries', JSON.stringify(entries));
        document.getElementById('entry').value = '';
        loadEntries();
    }
});
