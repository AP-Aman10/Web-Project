const face = document.getElementById("face");
for (let i = 1; i <= 60; i++) {
    const mn = document.createElement("div");
    mn.className = "marker";
    mn.style.transform = `rotate(${i * 6}deg)`;
    mn.style.height = i % 5 === 0 ? "20px" : "8px";
    mn.style.width = i % 5 === 0 ? "4px" : "1px";
    face.appendChild(mn);
}

const hr = document.getElementById("hour");
const mn = document.getElementById("minute");
const sc = document.getElementById("second");
const digital = document.getElementById("digital");
const dateEl = document.getElementById("date");
const tick = document.getElementById("tickSound");

function runClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    digital.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    dateEl.textContent = now.toDateString();

    hr.style.transform = `translateX(-50%) rotate(${(now.getHours() % 12) * 30 + minutes / 2}deg)`;
    mn.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
    sc.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;

    tick.currentTime = 0;
    tick.play();
}

setInterval(runClock, 1000);
runClock();

/* DAY / NIGHT MODE */
document.getElementById("modeBtn").onclick = () => {
    document.body.classList.toggle("light");
    modeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};

/* 3D PARALLAX */
document.addEventListener("mousemove", e => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    document.getElementById("clock").style.transform =
        `rotateY(${-x}deg) rotateX(${y}deg)`;
});
