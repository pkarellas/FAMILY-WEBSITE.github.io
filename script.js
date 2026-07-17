
const addEventOnElements = function (elements, eventType, callback){
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function() {
    loadingElement.classList.add("loaded");
    document.body.classList.remove("active");
});

//movbile nav//

const[ navTogglers, navLinks, navbar, overlay ] = [
    document.querySelectorAll("[data-nav-toggler]"),
   document.querySelectorAll("[data-nav-link]"),
   document.querySelector("[data-navbar]"),
   document.querySelector("[data-overlay]"),
];

const toggleNav = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
}


addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function(){
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav);

//HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function(){
    if (window.scrollY > 50) {
        header.classList.add("active");
    }else{
        header.classList.remove("active");
    }
}

window.addEventListener("scroll" , activeElementOnScroll);

//text animation //

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {


  for (let i = 0; i < letterBoxes.length; i++) {
   
    let letterAnimationDelay = 0;

  
    const letters = letterBoxes[i].textContent.trim();
    
    letterBoxes[i].textContent = "";

  
    for (let j = 0; j < letters.length; j++) {

      
      const span = document.createElement("span");

    
      span.style.animationDelay = `${letterAnimationDelay}s`;

    
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      
      span.textContent = letters[j];

     
      if (letters[j] === " ") span.classList.add("space");

    
      letterBoxes[i].appendChild(span);

     
      if (j >= letters.length - 1) break;
     
      letterAnimationDelay += 0.05;

    }

    
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

   
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

  
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 800) + 3000);

}


window.addEventListener("load", setLetterEffect);





//SCROLL REVEAL
 //

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();

/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});


const hoverActive = function () { cursor.classList.add("hovered"); }


const hoverDeactive = function () { cursor.classList.remove("hovered"); }


addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);


document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});


document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});


//carousel
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activecar", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " activecar";
  setTimeout(showSlides, 5500); 
}


//experimental slider carousel

 const total = 6;
  let current = 0;
  let timer;

  const track  = document.getElementById('slides-track');
  const thumbs = document.querySelectorAll('.thumb');

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
    resetTimer();
  }

  function changeSlide(dir) { goTo(current + dir); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => changeSlide(1), 5000);
  }

  resetTimer();


//changing of div sayings with array


 const sayings = [
  "'GUS STOP!'",
  "'MIIIIIIIIIIA!!!'",
  "'JETT LEAVE ME ALONE!'",
  "'JEN STOP ANNOYING ME!'",
  "'I WILL HIT EVIE!'"
];

const quoteBox = document.getElementById("angrysayings");

let index = 0;

function changeQuote() {
  quoteBox.textContent = sayings[index];

  index++;

  if (index >= sayings.length) {
    index = 0; 
  }
}


changeQuote();


setInterval(changeQuote, 4000);


//sound

