document.getElementById("title").addEventListener("focus", function () {
    this.innerHTML = "";
});
document.getElementById("desc").addEventListener("focus", function () {
    this.innerHTML = "";
});

// Array of colors for the circles
const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#FF4500', '#DA70D6', '#87CEEB'];

function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCircles(container, numCircles) {
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        // Random size, position, and color for each circle
        const size = Math.random() * 100 + 50; // Circle size between 50px and 150px
        const color = getRandomFromArray(colors);
        const xPos = Math.random() * 100; // Random X position (percent of container width)
        const yPos = Math.random() * 100; // Random Y position (percent of container height)

        // Apply the random styles to the circle
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = color;
        circle.style.left = `${xPos}%`;
        circle.style.top = `${yPos}%`;

        // Add the circle to the container
        container.appendChild(circle);

        // Animate the circle
        animateCircle(circle);
    }
}

function animateCircle(circle) {
    const duration = Math.random() * 20000 + 10000; // Random duration between 10-30 seconds
    const xDistance = Math.random() * 200 - 100; // Random X distance between -100px and 100px
    const yDistance = Math.random() * 200 - 100; // Random Y distance between -100px and 100px

    const animation = circle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xDistance}px, ${yDistance}px)` },
        { transform: 'translate(0, 0)' }
    ], {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });

    // Randomize the starting point of the animation
    animation.currentTime = Math.random() * duration;
}

function generateBackgrounds() {
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');

    const numOfCircles = Math.floor(Math.random() * 30 + 10);

    // Generate circles on both left and right sides
    generateCircles(left, numOfCircles);
    generateCircles(right, numOfCircles);
}

// Call the function to generate the circles when the page loads
window.addEventListener('load', generateBackgrounds);

let notif = new Audio("/notif.mp3");

const countdownHrsInput = document.getElementById('countdownHrs');
const countdownMinsInput = document.getElementById('countdownMins');
const countdownSecsInput = document.getElementById('countdownSecs');
const timerHrsInput = document.getElementById('timerHrs');
const timerMinsInput = document.getElementById('timerMins');
const timerSecsInput = document.getElementById('timerSecs');
const startBtn = document.getElementById('startBtn');
const display = document.getElementById('display');


let countdown, timer, interval;

function parseTime(hours, minutes, seconds) {
    hours = parseInt(hours) || 0;
    minutes = parseInt(minutes) || 0;
    seconds = parseInt(seconds) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
}

function updateDisplay(remainingSeconds, isCountdown) {
    if (remainingSeconds <= 0) {
        if (isCountdown) {
            notif.play();
            display.textContent = "Start!";
            setTimeout(() => {
                startTimer();
            }, 1000);
        } else {
            clearInterval(interval);
            notif.play();
            display.textContent = "Time's up!";
        }
    } else {
        display.textContent = formatTime(remainingSeconds);
    }
}

function startCountdown() {
    const countdownHours = parseInt(countdownHrsInput.value);
    const countdownMinutes = parseInt(countdownMinsInput.value);
    const countdownSeconds = parseInt(countdownSecsInput.value);
    countdown = parseTime(countdownHours, countdownMinutes, countdownSeconds);
    updateDisplay(countdown, true);
    interval = setInterval(() => {
        countdown--;
        updateDisplay(countdown, true);
    }, 1000);
}

function startTimer() {
    clearInterval(interval);
    const timerHours = parseInt(timerHrsInput.value);
    const timerMinutes = parseInt(timerMinsInput.value);
    const timerSeconds = parseInt(timerSecsInput.value);
    timer = parseTime(timerHours, timerMinutes, timerSeconds);
    updateDisplay(timer, false);
    interval = setInterval(() => {
        timer--;
        updateDisplay(timer, false);
    }, 1000);
}

startBtn.addEventListener('click', () => {
    clearInterval(interval);
    startCountdown();
});