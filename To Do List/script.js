let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));

const updateStats = () => {
    const done = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    document.getElementById('numbers').innerText = `${done} / ${total}`;
    document.getElementById('progress').style.width =
        total ? `${(done / total) * 100}%` : "0%";

    if (total && done === total) blaskconfetti();
};

const render = () => {
    const list = document.getElementById('task-list');
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="Image/edit.png">
          <img src="Image/bin.png">
        </div>
      </div>
    `;

        li.querySelector('input').onchange = () => {
            task.completed = !task.completed;
            save(); render(); updateStats();
        };

        li.querySelectorAll('img')[0].onclick = () => {
            taskInput.value = task.text;
            tasks.splice(index, 1);
            save(); render(); updateStats();
        };

        li.querySelectorAll('img')[1].onclick = () => {
            tasks.splice(index, 1);
            save(); render(); updateStats();
        };

        list.appendChild(li);
    });
};

document.getElementById('newTask').onclick = e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        save(); render(); updateStats();
    }
};

const blaskconfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 30,
            scalar: 1.2,
            shapes: ["circle", "square"],
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        });

        confetti({
            ...defaults,
            particleCount: 20,
            scalar: 2,
            shapes: ["emoji"],
            shapeOptions: {
                emoji: {
                    value: ["👑", "🦁", "🐯", "🐘", "💵", "💎", "☠️", "🐄", "🦣", "🐉", "🐧", "🦋", "🕷️", "🦚", "🐦‍🔥", "🌈"],
                },
            },
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}

render();
updateStats();


function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();
