/* ========================================
   BIRTHDAY WISH - JavaScript Animations
   Balloons, Confetti, Sparkles, Poppers
   ======================================== */

// ---- Balloon Emojis & Colors ----
const BALLOON_EMOJIS = ['🎈', '🩷', '🎀', '💖', '💗', '🩵', '💜', '❤️'];
const CONFETTI_COLORS = [
    '#ff1493', '#ff69b4', '#ffb6c1', '#ff00ff',
    '#ffd700', '#ff6347', '#ff4500', '#da70d6',
    '#ba55d3', '#ff1493', '#ffffff', '#ffc0cb'
];

// ---- Create Balloons ----
function createBalloons(containerId, count = 12) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = BALLOON_EMOJIS[Math.floor(Math.random() * BALLOON_EMOJIS.length)];

        const left = Math.random() * 90 + 5;
        const duration = Math.random() * 5 + 6;
        const delay = Math.random() * 8;
        const size = Math.random() * 1.2 + 1.8;

        balloon.style.left = `${left}%`;
        balloon.style.fontSize = `${size}rem`;
        balloon.style.setProperty('--duration', `${duration}s`);
        balloon.style.setProperty('--delay', `${delay}s`);

        container.appendChild(balloon);
    }
}

// ---- Create Confetti ----
function createConfetti(containerId, count = 40) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const left = Math.random() * 100;
        const size = Math.random() * 8 + 4;
        const fallDuration = Math.random() * 4 + 4;
        const delay = Math.random() * 6;
        const drift = (Math.random() - 0.5) * 60;
        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        const rotation = Math.random() * 360;

        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = color;
        confetti.style.setProperty('--size', `${size}px`);
        confetti.style.setProperty('--fall-duration', `${fallDuration}s`);
        confetti.style.setProperty('--delay', `${delay}s`);
        confetti.style.setProperty('--drift', `${drift}px`);
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

        container.appendChild(confetti);
    }
}

// ---- Create Sparkles ----
function createSparkles(containerId, count = 25) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 1.5;
        const delay = Math.random() * 4;
        const size = Math.random() * 3 + 2;

        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.setProperty('--duration', `${duration}s`);
        sparkle.style.setProperty('--delay', `${delay}s`);

        // Random sparkle colors
        const sparkleColors = ['#ffd700', '#ff69b4', '#ffffff', '#ff1493', '#da70d6'];
        const sparkleColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        sparkle.style.background = sparkleColor;
        sparkle.style.boxShadow = `0 0 6px ${sparkleColor}, 0 0 12px ${sparkleColor}`;

        container.appendChild(sparkle);
    }
}

// ---- Confetti Burst (on popper pop) ----
function burstConfetti(x, y, count = 30) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${Math.random() * 8 + 4}px`;
        particle.style.height = `${Math.random() * 8 + 4}px`;
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        particle.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        particle.style.zIndex = '100';
        particle.style.pointerEvents = 'none';
        document.body.appendChild(particle);

        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 150;
        const gravity = 400;
        const rotSpeed = Math.random() * 720 - 360;

        let startTime = null;
        function animateParticle(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000;

            const posX = x + vx * elapsed;
            const posY = y + vy * elapsed + 0.5 * gravity * elapsed * elapsed;
            const rotation = rotSpeed * elapsed;
            const opacity = Math.max(0, 1 - elapsed / 2);

            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.transform = `rotate(${rotation}deg)`;
            particle.style.opacity = opacity;

            if (elapsed < 2 && opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }

        requestAnimationFrame(animateParticle);
    }
}

// ---- Typewriter Effect ----
function typeWriter(elementId, text, speed = 80) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ---- Page Navigation ----
function goToPage2() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const btnStart = document.getElementById('btnStart');

    // Haptic feedback (if supported)
    if (navigator.vibrate) navigator.vibrate(50);

    // Button press effect
    btnStart.style.transform = 'scale(0.9)';

    // Fire confetti burst from button position
    const rect = btnStart.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top);

    setTimeout(() => {
        // Slide page 1 out
        page1.classList.remove('active');
        page1.classList.add('slide-out-left');

        // Slide page 2 in
        page2.style.visibility = 'visible';
        page2.style.opacity = '1';
        page2.classList.add('active', 'slide-in-right');

        // Initialize page 2 animations
        createBalloons('balloons-container-2', 10);
        createConfetti('confetti-container-2', 30);
        createSparkles('sparkle-overlay-2', 20);

        // Typewriter for title
        setTimeout(() => {
            typeWriter('waveText', 'Ready for a trip? 🚀', 90);
        }, 400);

    }, 300);
}

function goToPage1() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');

    if (navigator.vibrate) navigator.vibrate(50);

    page2.classList.remove('active', 'slide-in-right');
    page2.classList.add('slide-out-right');

    setTimeout(() => {
        page1.classList.remove('slide-out-left');
        page1.classList.add('active', 'slide-in-left');

        page2.style.visibility = 'hidden';
        page2.style.opacity = '0';
        page2.classList.remove('slide-out-right');
    }, 300);
}

// ---- Popper Burst on Load ----
function triggerPoppers() {
    const popperLeft = document.getElementById('popperLeft');
    const popperRight = document.getElementById('popperRight');

    setTimeout(() => {
        if (popperLeft) {
            const rectL = popperLeft.getBoundingClientRect();
            burstConfetti(rectL.left + rectL.width / 2, rectL.top, 20);
        }
        if (popperRight) {
            const rectR = popperRight.getBoundingClientRect();
            burstConfetti(rectR.left + rectR.width / 2, rectR.top, 20);
        }
    }, 2000);
}

// ---- Touch Sparkle Effect ----
function addTouchSparkles() {
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createTouchSparkle(touch.clientX, touch.clientY);
    });

    document.addEventListener('click', (e) => {
        createTouchSparkle(e.clientX, e.clientY);
    });
}

function createTouchSparkle(x, y) {
    for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.width = '4px';
        spark.style.height = '4px';
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '200';

        const colors = ['#ff1493', '#ffd700', '#ff69b4', '#ffffff'];
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        spark.style.boxShadow = `0 0 6px ${spark.style.backgroundColor}`;

        document.body.appendChild(spark);

        const angle = (i / 6) * 360 * (Math.PI / 180);
        const dist = Math.random() * 40 + 20;

        spark.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            {
                transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        }).onfinish = () => spark.remove();
    }
}

// ---- Journey Button Click Handlers ----
function setupJourneyButtons() {
    const btnYes = document.getElementById('btnYes');
    const btnSurprise = document.getElementById('btnSurprise');

    if (btnYes) {
        btnYes.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
            const rect = btnYes.getBoundingClientRect();
            burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
            
            // Pulse animation
            btnYes.animate([
                { transform: 'scale(1)', boxShadow: '0 4px 30px rgba(255,20,147,0.15)' },
                { transform: 'scale(1.05)', boxShadow: '0 8px 50px rgba(255,20,147,0.4)' },
                { transform: 'scale(1)', boxShadow: '0 4px 30px rgba(255,20,147,0.15)' }
            ], { duration: 500 });
        });
    }

    if (btnSurprise) {
        btnSurprise.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate([50, 50, 100]);
            const rect = btnSurprise.getBoundingClientRect();
            burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);

            btnSurprise.animate([
                { transform: 'scale(1)', boxShadow: '0 4px 30px rgba(255,215,0,0.1)' },
                { transform: 'scale(1.05)', boxShadow: '0 8px 50px rgba(255,215,0,0.4)' },
                { transform: 'scale(1)', boxShadow: '0 4px 30px rgba(255,215,0,0.1)' }
            ], { duration: 500 });
        });
    }
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
    // Page 1 animations
    createBalloons('balloons-container', 14);
    createConfetti('confetti-container', 45);
    createSparkles('sparkle-overlay', 30);
    triggerPoppers();

    // Touch sparkles
    addTouchSparkles();

    // Journey button handlers
    setupJourneyButtons();
});
