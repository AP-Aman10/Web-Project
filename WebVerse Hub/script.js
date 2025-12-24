// Clock Script
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
}
setInterval(updateClock, 1000);
updateClock();

// Tab Switcher
function switchTab(tabId, btn) {
    document.querySelectorAll('.nav-icon').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.app-grid').forEach(g => g.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
    document.getElementById('searchInput').value = '';
}

// Global Search Script
const searchInput = document.getElementById('searchInput');
const allCards = Array.from(document.querySelectorAll('.card'));
const searchResultsGrid = document.getElementById('search-results');

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const grids = document.querySelectorAll('.app-grid');

    if (term.length > 0) {
        grids.forEach(g => g.classList.remove('active'));
        searchResultsGrid.classList.add('active');
        searchResultsGrid.innerHTML = '';

        const matches = allCards.filter(card =>
            card.dataset.name.toLowerCase().includes(term)
        );

        matches.forEach(card => {
            const clone = card.cloneNode(true);
            searchResultsGrid.appendChild(clone);
        });
    } else {
        searchResultsGrid.classList.remove('active');
        const activeTabId = document.querySelector('.nav-icon.active').getAttribute('onclick').match(/'([^']+)'/)[1];
        document.getElementById(activeTabId).classList.add('active');
    }
});

const root = document.documentElement;
const dots = document.querySelectorAll(".color-dot");

// Apply theme
function setTheme(hue) {
    root.style.setProperty("--hue", hue);
    localStorage.setItem("theme-hue", hue);

    dots.forEach(d => d.classList.remove("active"));
    document.querySelector(`.color-dot[data-hue="${hue}"]`)?.classList.add("active");
}

// Click
dots.forEach(dot => {
    dot.addEventListener("click", () => {
        setTheme(dot.dataset.hue);
    });

    // Live preview on hover
    dot.addEventListener("mouseenter", () => {
        root.style.setProperty("--hue", dot.dataset.hue);
    });

    dot.addEventListener("mouseleave", () => {
        const saved = localStorage.getItem("theme-hue") || 280;
        root.style.setProperty("--hue", saved);
    });
});

// Load saved theme
const savedHue = localStorage.getItem("theme-hue") || 280;
setTheme(savedHue);
