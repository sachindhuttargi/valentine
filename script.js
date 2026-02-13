const questionScreen = document.getElementById("questionScreen");
const letterScreen = document.getElementById("letterScreen");
const memoryScreen = document.getElementById("memoryScreen");

const startBtn = document.getElementById("startBtn");
const letterContent = document.getElementById("letterContent");
const memoriesBtn = document.getElementById("memoriesBtn");
const backToLetterBtn = document.getElementById("backToLetterBtn");

const viewer = document.getElementById("viewer");

/* 🎵 Music (works on mobile after click) */
const music = new Audio("music.mp3");
music.loop = true;
music.volume = 0;

/* Start → Letter + Music */
startBtn.onclick = async () => {
    music.play().catch(()=>{});
    let v = 0;
    const fade = setInterval(() => {
        v += 0.05;
        music.volume = v;
        if (v >= 0.9) clearInterval(fade);
    }, 200);

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
};

/* Back */
backToLetterBtn.onclick = () => {
    memoryScreen.classList.add("hidden");
    letterScreen.classList.remove("hidden");
};

/* Photo viewer */
const photos = document.querySelectorAll(".photo");

photos.forEach(photo => {
    photo.onclick = () => {
        viewer.src = photo.src;
        viewer.classList.add("show");
    };
});

viewer.onclick = () => viewer.classList.remove("show");
