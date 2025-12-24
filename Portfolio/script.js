document.addEventListener("DOMContentLoaded", () => {
    const typed = new Typed(".typing", {
        strings: [
            "Web Developer 💻",
            "Machine Learning Enthusiast 🤖",
            "Software Engineer ⚙️",
            "YouTuber 🎥"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1200,
        startDelay: 500,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: "|"
    });
});
