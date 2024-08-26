document.addEventListener("DOMContentLoaded", function () {
    const videoElement = document.getElementById('ball-video');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const resultElement = document.getElementById('result');
    const timerElement = document.getElementById('timer');
    const restartButton = document.getElementById('restart-button');

    const videos = [
        { direction: 'left', file: 'videos/left.mp4' },
        { direction: 'right', file: 'videos/right.mp4' }
    ];

    let startTime;
    let correctDirection;

    function playRandomVideo() {
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        correctDirection = randomVideo.direction;
        videoElement.src = randomVideo.file;
        videoElement.play();
        startTime = new Date().getTime();
    }

    function startCountdown() {
        let countdown = 3;  // Countdown-Zeit in Sekunden
        timerElement.textContent = countdown;

        const countdownInterval = setInterval(() => {
            countdown--;
            timerElement.textContent = countdown;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                timerElement.textContent = '';
                leftButton.disabled = false;
                rightButton.disabled = false;
                playRandomVideo();
            }
        }, 1000);  // Intervall von 1 Sekunde
    }

    function checkReaction(direction) {
        const reactionTime = new Date().getTime() - startTime;
        if (direction === correctDirection) {
            resultElement.textContent = `Richtig! Reaktionszeit: ${reactionTime} ms`;
        } else {
            resultElement.textContent = 'Falsch! Versuchen Sie es erneut.';
        }
        leftButton.disabled = true;
        rightButton.disabled = true;
    }

    function restartTest() {
        resultElement.textContent = '';
        videoElement.pause();
        videoElement.currentTime = 0;
        leftButton.disabled = true;
        rightButton.disabled = true;
        startCountdown();
    }

    leftButton.addEventListener('click', () => checkReaction('left'));
    rightButton.addEventListener('click', () => checkReaction('right'));
    restartButton.addEventListener('click', restartTest);

    // Start the first countdown when the page loads
    startCountdown();
});
