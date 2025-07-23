// Website state management
let currentStep = 0;
const steps = ['lights', 'decorate', 'cake', 'celebrate'];

// DOM elements
const blackScreen = document.getElementById('blackScreen');
const mainContent = document.getElementById('mainContent');
const lightsBtn = document.getElementById('lightsBtn');
const decorateBtn = document.getElementById('decorateBtn');
const cakeBtn = document.getElementById('cakeBtn');
const actionButtons = document.getElementById('actionButtons');
const balloonsContainer = document.getElementById('balloonsContainer');
const cakeContainer = document.getElementById('cakeContainer');
const imagesContainer = document.getElementById('imagesContainer');
const confettiContainer = document.getElementById('confettiContainer');
const birthdayMusic = document.getElementById('birthdayMusic');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    createLights();
    setupEventListeners();
    
    // Preload audio
    birthdayMusic.load();
});

// Create SVG lights
function createLights() {
    const lightsContainer = document.querySelector('.lights-container');
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'pink'];
    
    // Create 12 lights for better visual effect
    for (let i = 0; i < 12; i++) {
        const light = document.createElement('div');
        light.className = `light ${colors[i % colors.length]}`;
        light.style.animationDelay = `${i * 0.2}s`;
        lightsContainer.appendChild(light);
    }
}

// Setup event listeners
function setupEventListeners() {
    lightsBtn.addEventListener('click', handleLightsClick);
    decorateBtn.addEventListener('click', handleDecorateClick);
    cakeBtn.addEventListener('click', handleCakeClick);
    
    // Add touch event support for mobile
    lightsBtn.addEventListener('touchstart', handleLightsClick);
    decorateBtn.addEventListener('touchstart', handleDecorateClick);
    cakeBtn.addEventListener('touchstart', handleCakeClick);
}

// Handle lights button click
function handleLightsClick() {
    if (currentStep !== 0) return;
    
    // Fade out black screen
    blackScreen.classList.add('fade-out');
    
    setTimeout(() => {
        blackScreen.style.display = 'none';
        mainContent.classList.add('visible');
        
        // Show decorate button after lights animation
        setTimeout(() => {
            decorateBtn.classList.remove('hidden');
            currentStep = 1;
        }, 1000);
    }, 1000);
    
    // Add extra sparkle effects
    createSparkles();
}

// Handle decorate button click
function handleDecorateClick() {
    if (currentStep !== 1) return;
    
    decorateBtn.style.display = 'none';
    
    // Launch balloons
    launchBalloons();
    
    // Show cake button after balloon animation
    setTimeout(() => {
        cakeBtn.classList.remove('hidden');
        currentStep = 2;
    }, 2000);
}

// Handle cake button click
function handleCakeClick() {
    if (currentStep !== 2) return;
    
    cakeBtn.style.display = 'none';
    
    // Show cake
    cakeContainer.classList.remove('hidden');
    
    // Start music
    startMusic();
    
    // Show images after a delay
    setTimeout(() => {
        imagesContainer.classList.remove('hidden');
        currentStep = 3;
        
        // Start continuous celebration effects
        startCelebration();
    }, 3000);
}

// Launch balloons animation
function launchBalloons() {
    const balloonEmojis = ['🎈', '🎉', '🎊', '🎀', '🎁', '🌟', '⭐', '💫'];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#a55eea'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.left = Math.random() * 90 + '%';
            balloon.style.color = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDelay = `${Math.random() * 0.5}s`;
            balloon.style.animationDuration = `${3 + Math.random() * 2}s`;
            
            balloonsContainer.appendChild(balloon);
            
            // Remove balloon after animation
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, 5000);
        }, i * 200);
    }
}

// Start music with user interaction handling
function startMusic() {
    // Modern browsers require user interaction to play audio
    const playPromise = birthdayMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Music started successfully!');
            })
            .catch(error => {
                console.log('Autoplay prevented:', error);
                // Show a play button if autoplay fails
                showPlayButton();
            });
    }
}

// Show play button if autoplay fails
function showPlayButton() {
    const playBtn = document.createElement('button');
    playBtn.className = 'action-btn';
    playBtn.innerHTML = '<span class="btn-text">🎵 Play Music</span><div class="btn-glow"></div>';
    playBtn.style.position = 'fixed';
    playBtn.style.top = '20px';
    playBtn.style.right = '20px';
    playBtn.style.zIndex = '1000';
    
    playBtn.addEventListener('click', () => {
        birthdayMusic.play();
        playBtn.remove();
    });
    
    document.body.appendChild(playBtn);
}

// Create sparkle effects
function createSparkles() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '20';
            sparkle.style.animation = 'sparkleAnimation 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Start celebration effects
function startCelebration() {
    // Continuous confetti
    setInterval(createConfetti, 500);
    
    // Periodic balloon launches
    setInterval(() => {
        if (currentStep >= 3) {
            launchBalloons();
        }
    }, 10000);
    
    // Periodic sparkles
    setInterval(() => {
        if (currentStep >= 3) {
            createSparkles();
        }
    }, 5000);
}

// Create confetti
function createConfetti() {
    for (let i = 0; i < 5; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
}

// Add CSS animations for sparkles
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Handle mobile responsiveness
function handleResize() {
    // Adjust balloon sizes for mobile
    if (window.innerWidth <= 768) {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            balloon.style.fontSize = '2rem';
        });
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', e => e.preventDefault());

// Handle visibility change to pause/resume effects
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        birthdayMusic.pause();
    } else if (currentStep >= 2) {
        birthdayMusic.play().catch(console.log);
    }
});

// Add some extra birthday wishes
const birthdayWishes = [
    "🎉 Happy Birthday Deeksha Raj! 🎉",
    "🎂 May all your dreams come true! 🎂",
    "🌟 Wishing you joy and happiness! 🌟",
    "🎈 Have a wonderful birthday! 🎈",
    "💝 You deserve all the best! 💝"
];

function showRandomWish() {
    if (currentStep >= 3) {
        const wish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
        const wishElement = document.createElement('div');
        wishElement.innerHTML = wish;
        wishElement.style.position = 'fixed';
        wishElement.style.top = '50%';
        wishElement.style.left = '50%';
        wishElement.style.transform = 'translate(-50%, -50%)';
        wishElement.style.fontSize = 'clamp(1.5rem, 4vw, 2.5rem)';
        wishElement.style.color = '#fff';
        wishElement.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
        wishElement.style.zIndex = '25';
        wishElement.style.textAlign = 'center';
        wishElement.style.pointerEvents = 'none';
        wishElement.style.animation = 'wishAnimation 4s ease-in-out forwards';
        
        document.body.appendChild(wishElement);
        
        setTimeout(() => {
            if (wishElement.parentNode) {
                wishElement.parentNode.removeChild(wishElement);
            }
        }, 4000);
    }
}

// Add wish animation CSS
const wishStyle = document.createElement('style');
wishStyle.textContent = `
    @keyframes wishAnimation {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(wishStyle);

// Show random wishes periodically
setInterval(showRandomWish, 15000);
