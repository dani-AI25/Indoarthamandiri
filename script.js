
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if(window.scrollY > 50){
        navbar.style.background = 'rgba(0,0,0,0.85)';
    }else{
        navbar.style.background = 'rgba(0,0,0,0.4)';
    }
});


const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        formNote.textContent = 'Thank you. Your message has been prepared. Please connect this form to your email service before publishing.';
        contactForm.reset();
    });
}


// Professional auto-changing hero background slider
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

function changeHeroSlide(){
    if(!heroSlides.length) return;

    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
}

setInterval(changeHeroSlide, 4500);


// Clickable homepage: click anywhere on hero to go to target section.
// Buttons/links inside hero remain normally clickable.
const clickableHome = document.querySelector('.clickable-home');

if(clickableHome){
    clickableHome.addEventListener('click', function(e){
        if(e.target.closest('a') || e.target.closest('button')) return;

        const targetSelector = clickableHome.getAttribute('data-click-target') || '#projects';
        const target = document.querySelector(targetSelector);

        if(target){
            target.scrollIntoView({
                behavior:'smooth',
                block:'start'
            });
        }
    });
}


// Draggable WhatsApp floating button
const whatsappFloat = document.getElementById('whatsappFloat');

if (whatsappFloat) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let hasMoved = false;

    function getPosition(e) {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }

    function startDrag(e) {
        isDragging = true;
        hasMoved = false;

        const pos = getPosition(e);
        const rect = whatsappFloat.getBoundingClientRect();

        startX = pos.x;
        startY = pos.y;
        initialX = rect.left;
        initialY = rect.top;

        whatsappFloat.style.right = 'auto';
        whatsappFloat.style.bottom = 'auto';
        whatsappFloat.style.left = initialX + 'px';
        whatsappFloat.style.top = initialY + 'px';
    }

    function drag(e) {
        if (!isDragging) return;

        const pos = getPosition(e);
        const dx = pos.x - startX;
        const dy = pos.y - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasMoved = true;
        }

        let newX = initialX + dx;
        let newY = initialY + dy;

        const maxX = window.innerWidth - whatsappFloat.offsetWidth - 10;
        const maxY = window.innerHeight - whatsappFloat.offsetHeight - 10;

        newX = Math.max(10, Math.min(newX, maxX));
        newY = Math.max(10, Math.min(newY, maxY));

        whatsappFloat.style.left = newX + 'px';
        whatsappFloat.style.top = newY + 'px';

        e.preventDefault();
    }

    function endDrag(e) {
        isDragging = false;
    }

    whatsappFloat.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    whatsappFloat.addEventListener('touchstart', startDrag, { passive:false });
    document.addEventListener('touchmove', drag, { passive:false });
    document.addEventListener('touchend', endDrag);

    whatsappFloat.addEventListener('click', function(e) {
        if (hasMoved) {
            e.preventDefault();
            hasMoved = false;
        }
    });
}


// Draggable Business Profile cards
const businessCards = document.querySelectorAll('.business-feed-card');

businessCards.forEach(card => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let offsetX = 0;
    let offsetY = 0;

    function pointerPosition(e){
        if(e.touches && e.touches.length){
            return { x:e.touches[0].clientX, y:e.touches[0].clientY };
        }
        return { x:e.clientX, y:e.clientY };
    }

    function start(e){
        isDragging = true;
        card.classList.add('dragging');

        const pos = pointerPosition(e);
        startX = pos.x - offsetX;
        startY = pos.y - offsetY;
    }

    function move(e){
        if(!isDragging) return;

        const pos = pointerPosition(e);
        currentX = pos.x - startX;
        currentY = pos.y - startY;

        offsetX = currentX;
        offsetY = currentY;

        card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(0deg) scale(1.03)`;
        e.preventDefault();
    }

    function end(){
        if(!isDragging) return;

        isDragging = false;
        card.classList.remove('dragging');
    }

    card.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);

    card.addEventListener('touchstart', start, { passive:false });
    document.addEventListener('touchmove', move, { passive:false });
    document.addEventListener('touchend', end);
});


// Draggable cards for vision mission section
const draggableCards = document.querySelectorAll('.draggable-card');

draggableCards.forEach(card => {
    let isDragging = false;
    let startX, startY, initialX = 0, initialY = 0;

    const getPos = (e) => {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    };

    const startDrag = (e) => {
        isDragging = true;
        card.classList.add('dragging');

        const pos = getPos(e);
        startX = pos.x - initialX;
        startY = pos.y - initialY;
    };

    const drag = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        const pos = getPos(e);
        initialX = pos.x - startX;
        initialY = pos.y - startY;

        card.style.transform = `translate(${initialX}px, ${initialY}px) rotate(0deg) scale(1.02)`;
    };

    const stopDrag = () => {
        isDragging = false;
        card.classList.remove('dragging');
    };

    card.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    card.addEventListener('touchstart', startDrag, { passive:false });
    document.addEventListener('touchmove', drag, { passive:false });
    document.addEventListener('touchend', stopDrag);
});


// Draggable Our Capabilities cards
const capabilityCards = document.querySelectorAll('.draggable-capability');

capabilityCards.forEach(card => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let offsetX = 0;
    let offsetY = 0;

    function getPointer(e){
        if(e.touches && e.touches.length){
            return { x:e.touches[0].clientX, y:e.touches[0].clientY };
        }
        return { x:e.clientX, y:e.clientY };
    }

    function startDrag(e){
        isDragging = true;
        card.classList.add('dragging');

        const pos = getPointer(e);
        startX = pos.x - offsetX;
        startY = pos.y - offsetY;
    }

    function drag(e){
        if(!isDragging) return;

        const pos = getPointer(e);
        currentX = pos.x - startX;
        currentY = pos.y - startY;
        offsetX = currentX;
        offsetY = currentY;

        card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(0deg) scale(1.04)`;
        e.preventDefault();
    }

    function stopDrag(){
        isDragging = false;
        card.classList.remove('dragging');
    }

    card.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    card.addEventListener('touchstart', startDrag, { passive:false });
    document.addEventListener('touchmove', drag, { passive:false });
    document.addEventListener('touchend', stopDrag);
});


// Manual draggable horizontal homepage photo strip
const homePhotoStrip = document.getElementById('homePhotoStrip');

if(homePhotoStrip){
    let isDown = false;
    let startX;
    let scrollLeft;

    homePhotoStrip.addEventListener('mousedown', (e) => {
        isDown = true;
        homePhotoStrip.classList.add('dragging');
        startX = e.pageX - homePhotoStrip.offsetLeft;
        scrollLeft = homePhotoStrip.scrollLeft;
    });

    homePhotoStrip.addEventListener('mouseleave', () => {
        isDown = false;
        homePhotoStrip.classList.remove('dragging');
    });

    homePhotoStrip.addEventListener('mouseup', () => {
        isDown = false;
        homePhotoStrip.classList.remove('dragging');
    });

    homePhotoStrip.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - homePhotoStrip.offsetLeft;
        const walk = (x - startX) * 1.35;
        homePhotoStrip.scrollLeft = scrollLeft - walk;
    });
}


// Homepage cinematic background slider
const cinematicSlides = document.querySelectorAll('.homepage-cinematic-hero .hero-slide');
let cinematicIndex = 0;

function changeCinematicSlide(){
    if(!cinematicSlides.length) return;
    cinematicSlides[cinematicIndex].classList.remove('active');
    cinematicIndex = (cinematicIndex + 1) % cinematicSlides.length;
    cinematicSlides[cinematicIndex].classList.add('active');
}

setInterval(changeCinematicSlide, 4500);


// Touch-friendly draggable centered mini photo strip
const miniPhotoStrip = document.getElementById('homePhotoStrip');

if(miniPhotoStrip && !miniPhotoStrip.dataset.dragReady){
    miniPhotoStrip.dataset.dragReady = "true";
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const getX = (e) => e.touches ? e.touches[0].pageX : e.pageX;

    const start = (e) => {
        isDown = true;
        startX = getX(e) - miniPhotoStrip.offsetLeft;
        scrollLeft = miniPhotoStrip.scrollLeft;
    };

    const move = (e) => {
        if(!isDown) return;
        const x = getX(e) - miniPhotoStrip.offsetLeft;
        const walk = (x - startX) * 1.3;
        miniPhotoStrip.scrollLeft = scrollLeft - walk;
        e.preventDefault();
    };

    const stop = () => {
        isDown = false;
    };

    miniPhotoStrip.addEventListener('mousedown', start);
    miniPhotoStrip.addEventListener('mousemove', move);
    miniPhotoStrip.addEventListener('mouseup', stop);
    miniPhotoStrip.addEventListener('mouseleave', stop);

    miniPhotoStrip.addEventListener('touchstart', start, {passive:false});
    miniPhotoStrip.addEventListener('touchmove', move, {passive:false});
    miniPhotoStrip.addEventListener('touchend', stop);
}


// Final cinematic homepage slider
const finalSlides = document.querySelectorAll('.homepage-final-cinematic .hero-slide');

if(finalSlides.length){
    let finalIndex = 0;

    setInterval(() => {

        finalSlides[finalIndex].classList.remove('active');

        finalIndex = (finalIndex + 1) % finalSlides.length;

        finalSlides[finalIndex].classList.add('active');

    }, 4200);
}


// Fixed homepage background slideshow
document.addEventListener('DOMContentLoaded', function(){
    const bgSlides = document.querySelectorAll('.homepage-final-cinematic .bg-slide');
    let bgIndex = 0;

    if(bgSlides.length){
        setInterval(function(){
            bgSlides[bgIndex].classList.remove('active');
            bgIndex = (bgIndex + 1) % bgSlides.length;
            bgSlides[bgIndex].classList.add('active');
        }, 3800);
    }

    const strip = document.getElementById('homePhotoStrip');
    if(strip){
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        const getX = (e) => e.touches ? e.touches[0].pageX : e.pageX;

        const start = (e) => {
            isDown = true;
            startX = getX(e) - strip.offsetLeft;
            scrollLeft = strip.scrollLeft;
        };

        const move = (e) => {
            if(!isDown) return;
            const x = getX(e) - strip.offsetLeft;
            const walk = (x - startX) * 1.25;
            strip.scrollLeft = scrollLeft - walk;
            e.preventDefault();
        };

        const stop = () => { isDown = false; };

        strip.addEventListener('mousedown', start);
        strip.addEventListener('mousemove', move);
        strip.addEventListener('mouseup', stop);
        strip.addEventListener('mouseleave', stop);
        strip.addEventListener('touchstart', start, {passive:false});
        strip.addEventListener('touchmove', move, {passive:false});
        strip.addEventListener('touchend', stop);
    }
});


// Smooth Vision/Mission background slideshow
const visionSlides = document.querySelectorAll('.vision-bg');
let visionIndex = 0;

if(visionSlides.length){
    setInterval(() => {
        visionSlides[visionIndex].classList.remove('active');
        visionIndex = (visionIndex + 1) % visionSlides.length;
        visionSlides[visionIndex].classList.add('active');
    }, 5200);
}
