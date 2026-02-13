const questionScreen = document.getElementById("questionScreen");
const letterScreen = document.getElementById("letterScreen");
const memoryScreen = document.getElementById("memoryScreen");

const startBtn = document.getElementById("startBtn");
const letterContent = document.getElementById("letterContent");
const memoriesBtn = document.getElementById("memoriesBtn");
const backToLetterBtn = document.getElementById("backToLetterBtn");

const bubbleArea = document.getElementById("bubbleArea");
const viewer = document.getElementById("viewer");

/* Hearts */
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 25 + 15 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}, 400);



const music = new Audio("./music.mp3");
music.loop = true;

startBtn.onclick = async () => {
    try {
        await music.play();
        music.volume = 0;

        let v = 0;
        const fade = setInterval(() => {
            v += 0.05;
            music.volume = v;
            if (v >= 0.9) clearInterval(fade);
        }, 200);
    } catch (e) {
        console.log("Music blocked:", e);
    }

    questionScreen.classList.add("hidden");
    letterScreen.classList.remove("hidden");

    try {
        const res = await fetch("letter.txt");
        letterContent.innerText = await res.text();
    } catch {
        letterContent.innerText = "My love,\n\n(Write your letter in letter.txt)";
    }
};

/* Letter → Memories */
memoriesBtn.onclick = () => {
    letterScreen.classList.add("hidden");
    memoryScreen.classList.remove("hidden");
    bubbleArea.innerHTML = "";
    createBubbles();
};

/* Create bubbles with faded photos */
function createBubbles() {
    for (let i = 1; i <= 6; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";

        const size = Math.random() * 60 + 60;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        bubble.style.top = Math.random() * 350 + "px";
        bubble.style.left = Math.random() * 80 + "%";

        bubble.style.backgroundImage = `url('images/images${i}.jpeg')`;
        bubble.style.backgroundSize = "cover";
        bubble.style.backgroundPosition = "center";

        bubble.onclick = () => {
            viewer.src = `images/images${i}.jpeg`;
            viewer.classList.add("show");
        };

        bubbleArea.appendChild(bubble);
    }
}

/* Back */
backToLetterBtn.onclick = () => {
    memoryScreen.classList.add("hidden");
    letterScreen.classList.remove("hidden");
};

/* Close image viewer */

viewer.onclick = () => viewer.classList.remove("show");

