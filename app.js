const suggestions = [
    "Compliment your partner today",
    "Plan a surprise date",
    "Send a sweet text message",
    "Give them their favorite snack",
    "Remind them of your first date"
];

function loadState() {
    const partner = JSON.parse(localStorage.getItem('partner')) || {};
    const journal = JSON.parse(localStorage.getItem('journal')) || [];
    const connections = parseInt(localStorage.getItem('connections') || '0');
    return { partner, journal, connections };
}

function saveState(state) {
    localStorage.setItem('partner', JSON.stringify(state.partner));
    localStorage.setItem('journal', JSON.stringify(state.journal));
    localStorage.setItem('connections', state.connections);
}

let state = loadState();

document.getElementById('savePartner').onclick = () => {
    state.partner.name = document.getElementById('partnerName').value;
    state.partner.language = document.getElementById('loveLanguage').value;
    saveState(state);
    alert('Partner info saved!');
};

document.getElementById('getSuggestion').onclick = () => {
    const rand = suggestions[Math.floor(Math.random() * suggestions.length)];
    document.getElementById('suggestionText').innerText = rand;
};

document.getElementById('saveJournal').onclick = () => {
    const entry = document.getElementById('journalEntry').value.trim();
    if(entry) {
        state.journal.push({ date: new Date().toLocaleDateString(), text: entry });
        saveState(state);
        renderJournal();
        document.getElementById('journalEntry').value = '';
    }
};

function renderJournal() {
    const list = document.getElementById('journalList');
    list.innerHTML = '';
    state.journal.forEach(j => {
        const li = document.createElement('li');
        li.textContent = `${j.date}: ${j.text}`;
        list.appendChild(li);
    });
}


document.getElementById('addConnection').onclick = () => {
    state.connections += 1;
    saveState(state);
    document.getElementById('connectionCount').innerText = state.connections;
};

window.onload = () => {
    if(state.partner.name) document.getElementById('partnerName').value = state.partner.name;
    if(state.partner.language) document.getElementById('loveLanguage').value = state.partner.language;
    document.getElementById('connectionCount').innerText = state.connections;
    renderJournal();
};
