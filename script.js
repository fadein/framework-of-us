const suggestions = [
  "Compliment your partner today",
  "Plan a small surprise this week",
  "Write a two-line poem",
  "Give them their favorite snack",
  "Remind them of your first date"
];

function loadConnectionCount() {
  const count = localStorage.getItem('connectionCount') || '0';
  document.getElementById('connection-count').innerText = count;
}

function addConnection() {
  let count = parseInt(localStorage.getItem('connectionCount') || '0', 10);
  count++;
  localStorage.setItem('connectionCount', count);
  document.getElementById('connection-count').innerText = count;
}

function showRandomSuggestion() {
  const index = Math.floor(Math.random() * suggestions.length);
  document.getElementById('suggestion-text').innerText = suggestions[index];
}

function saveJournal() {
  const text = document.getElementById('journal-input').value.trim();
  if (!text) return;
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  const date = new Date().toLocaleDateString();
  entries.push({ date, text });
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  document.getElementById('journal-input').value = '';
  renderJournal();
}

function renderJournal() {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  const container = document.getElementById('journal-entries');
  container.innerHTML = '';
  entries.slice().reverse().forEach(e => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `<strong>${e.date}</strong>: ${e.text}`;
    container.appendChild(div);
  });
}

window.addEventListener('load', () => {
  loadConnectionCount();
  renderJournal();
  document.getElementById('suggestion-btn').addEventListener('click', showRandomSuggestion);
  document.getElementById('add-connection-btn').addEventListener('click', addConnection);
  document.getElementById('save-journal-btn').addEventListener('click', saveJournal);
});
