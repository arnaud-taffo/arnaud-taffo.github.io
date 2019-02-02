const $$window = window;
//const $$screenSize = $$window.innerWidth;
const $$navContainer = document.querySelector(".nav-container");
const $$navBar = document.getElementById("navigation-bar");
const $$responsiveMenu = document.getElementById("responsive-menu");
const $$verticalMenu = document.querySelector(".vertical-menu");
/*const $$styleElementNavBar = document.createElement("style");
const $$styleElementNavContainer = document.createElement("style");
const $$styleElementButton = document.createElement("style");*/
const $$listElementLink = document.querySelectorAll(".vertical-menu > ul > li");
let sliderImages = Array.from(document.querySelectorAll(".slide"));
let dotsList = Array.from(document.querySelectorAll(".dots"));
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
const $$close = document.querySelector("#close");
const $$menu = document.querySelector("#menu");
var current = 0;
var currentDot = 0;
var isResponsive = false;
var countNumberOfClick = 0;

function main(){
    
    bindEventScreenResize($$window);
    bindEventClick($$responsiveMenu);
    $$listElementLink.forEach(function(element){
        element.addEventListener("click", handleEventClickLink);
    });
    
    if ($$window.innerWidth <= 767){
        hide($$navContainer);
        show($$responsiveMenu);
        hide($$close);
        isResponsive = true;
    }
    else{
        hide($$responsiveMenu);
        show($$navContainer);
        isResponsive = false;
    }
    
    bindEventClickLeftArrow(arrowLeft);
    bindEventClickRightArrow(arrowRight);
    
    startSlide();
}

function reset(){
    for(let i = 0; i < sliderImages.length; i++){
        sliderImages[i].style.display = 'none';
    }
    
    for(let i = 0; i < dotsList.length; i++){
        dotsList[i].style.background = 'none';
    }
}

function startSlide(){
    reset();
    sliderImages[0].style.display = 'block';
    dotsList[0].style.background = '#fff';
}

function slideLeft(){
    reset();
    sliderImages[current - 1].style.display = 'block';
    current--;
    dotsList[currentDot - 1].style.background = '#fff';
    currentDot--;
}

function slideRight(){
    reset();
    sliderImages[current + 1].style.display = 'block';
    current++;
    dotsList[currentDot + 1].style.background = '#fff';
    currentDot++;
}

function bindEventClickLeftArrow(element){
    element.addEventListener('click', function(){
    if (current === 0){
        current = sliderImages.length;
    }
    if (currentDot === 0){
        currentDot = dotsList.length;
    }
    slideLeft();
    });
}

function bindEventClickRightArrow(element){
    element.addEventListener('click', function(){
    if (current === sliderImages.length - 1){
        current = -1;
    }
    if (currentDot === dotsList.length - 1){
        currentDot = -1;
    }
    slideRight();
    });
}

function bindEventScreenResize(element){
    element.addEventListener("resize", handleEventScreenResize);
}

function handleEventScreenResize(event){
    
    if (event.target && $$window.innerWidth <= 767 && isResponsive == false){
        hide($$navContainer);
        show($$responsiveMenu);
        hide($$close);
        show($$menu);
        isResponsive = true;
    }
    
    else if (event.target && $$window.innerWidth > 767 && isResponsive == true){
        hide($$responsiveMenu);
        hide($$verticalMenu);
        show($$navContainer);
        isResponsive = false;
    }
}

function bindEventClick(element){
    element.addEventListener("click", handleEventClick);
}

function handleEventClickLink(){
    countNumberOfClick ++;
    if (isResponsive){
        hide($$verticalMenu);
        hide($$close);
        show($$menu);
    }
}

function handleEventClick(){
    countNumberOfClick ++;
    showMenu();
}

function showMenu(){
 
    if (countNumberOfClick % 2 == 0){
       hide($$verticalMenu);
       hide($$close);
       show($$menu);
    }
    
    else{
        show($$verticalMenu);
        hide($$menu);
        show($$close);
    }
}

function show(element){
    element.style.display = 'block';
    setTimeout(() => element.classList.add("show"));
}

function hide(element){
    setTimeout(() => element.classList.remove("show"));
    element.style.display = 'none';
    //setTimeout(() => element.style.display = 'none');
    //if (element.id == "menu" || element.id == "close" || element.id == "responsive-menu") {
    //    element.style.display = 'none';
    //}
}

main();