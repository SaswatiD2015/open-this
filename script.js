const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const noButtonContainer = document.querySelector('.no-btn-container');
const mainText = document.getElementById('main-text');
const secondaryText = document.getElementById('secondary-text');
const proposalImage = document.getElementById('proposal-image');
const buttonsContainer = document.getElementById('buttons-container');
const proposalContainer = document.getElementById('proposal-container'); 

const noButtonStates = [
    { main: "i know you love me,Mo Sambeet?", secondary: "Please think again! Remember our beautiful moments? 😥", emoji: "😟" },
    { main: "This better be a joke, my love...", secondary: "Don't break my heart! 💔 (It's not worth it!)", emoji: "😭" },
    { main: "Ek aur baar Soch lo! 🥺", secondary: "kyu aisa kar rahe ho, mo dhana? 😢", emoji: "🥺" },
    { main: "You can't escape this, my love!", secondary: "Baby, Man jao na! I'll buy you bahut sara khana! 😠", emoji: "😠" },
    { main: "I will cry. I am warning you.", secondary: "Is this how our story ends? Don't be silly! 🤡", emoji: "🥺" },
    { main: "The button knows you love me!", secondary: "You know you want to click yes. Just do it! 😉", emoji: "😏" },
    { main: "Stop chasing the button!", secondary: "I'll make you your favoritechicken biriyani,puri upma,baigana masala,chicken masala forever!", emoji: "🥞" },
    { main: "My heart is literally in pieces right now!", secondary: "I promise unlimited cuddles and movie nights! 🍿", emoji: "😰" },
    { main: "This is a trap! It's a trick question!", secondary: "My proposal is not complete without you saying YES! 💍", emoji: "🤔" },
    { main: "I'm calling your mummy!", secondary: "She said you have to say yes to me. 😉", emoji: "📞" },
    { main: "Seriously, just click YES.", secondary: "This is getting embarrassing for the 'No' button. Look how fast it's running! 🏃", emoji: "😅" },
    { main: "You are the love of my life.", secondary: "Let's be stupid together forever. ❤️", emoji: "💖" },
    { main: "One more attempt and I give up...", secondary: "Just kidding, I'll never give up on you! Now click YES! 😤", emoji: "😇" },
    { main: "I love you the most in this world!", secondary: "Click it. Click it. Click it. Click it.", emoji: "😍" },
];

let noInteractionCount = 0;
let lastMove = 0;

function createHeartParticles() {
    const heartEmojis = ["💖", "❤️", "💕", "✨"];
    const containerRect = proposalContainer.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;

        const randomX = (Math.random() - 0.5) * 400; 
        const randomY = Math.random() * -500 - 100;  
        const randomRotate = (Math.random() - 0.5) * 720; 
        const randomDelay = Math.random() * 0.5;

        heart.style.setProperty('--x', `${randomX}px`);
        heart.style.setProperty('--y', `${randomY}px`);
        heart.style.setProperty('--r', `${randomRotate}deg`);
        heart.style.animationDelay = `${randomDelay}s`;

        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}


function handleYesClick() {
    
    mainText.textContent = 'HE SAID YES!';
    secondaryText.textContent = 'Sambeet bas moro tame i love you so much 🥂'; 
    secondaryText.classList.add('text-gray-700', 'text-xl');
    mainText.classList.add('text-pink-700');

    
    createHeartParticles();

    proposalImage.textContent = '💍';
    proposalImage.classList.add('animate-bounce');
    document.body.style.backgroundColor = '#ff80ab'; 
    document.body.classList.add('success-bg');

    
    buttonsContainer.innerHTML = `
        <button class="yes-btn text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl focus:outline-none w-auto">
            Okay, I love you too!
        </button>
    `;

    noButton.removeEventListener('mouseover', handleNoHover);
    noButton.removeEventListener('click', handleNoHover);
    yesButton.classList.remove('yes-btn-shake');
}

function handleNoHover() {
    const now = Date.now();
    if (now - lastMove < 100) {
        return;
    }
    lastMove = now;

    const stateIndex = noInteractionCount % noButtonStates.length;
    const state = noButtonStates[stateIndex];
    
    mainText.textContent = state.main;
    secondaryText.textContent = state.secondary;
    proposalImage.textContent = state.emoji;

    proposalImage.classList.remove('animate-bounce');

    const targetMainText = "I love you the most in this world!";
    const isTargetState = state.main === targetMainText;
    
    noInteractionCount++;

    if (isTargetState) {
        
        yesButton.classList.add('yes-btn-shake');
        
        const boundingBox = proposalContainer.getBoundingClientRect();
        const containerWidth = boundingBox.width;
        const containerHeight = boundingBox.height;

        const buttonWidth = noButton.clientWidth;
        const buttonHeight = noButton.clientHeight;

        const maxX = containerWidth - buttonWidth - 50;
        const maxY = containerHeight - buttonHeight - 100;

        const containerOffsetTop = noButtonContainer.offsetTop;
        const containerOffsetLeft = noButtonContainer.offsetLeft;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noButton.style.left = `${randomX - containerOffsetLeft}px`;
        noButton.style.top = `${randomY - containerOffsetTop}px`; 
        noButton.style.transform = 'none';

    } else {
        
        noButton.style.left = '50%';
        noButton.style.top = '50%';
        noButton.style.transform = 'translate(-50%, -50%)';
        yesButton.classList.remove('yes-btn-shake');
    }
}

yesButton.addEventListener('click', handleYesClick);
noButton.addEventListener('mouseover', handleNoHover);
noButton.addEventListener('click', (event) => {
    event.preventDefault();
    handleNoHover(); 
});
