const $$window = window;
const $$navContainer = document.querySelector(".nav-container");
const $$responsiveMenu = document.getElementById("responsive-menu");
const $$verticalMenu = document.querySelector(".vertical-menu");
const $$listElementLink = document.querySelectorAll(".vertical-menu > ul > li");
const $$sliderImages = Array.from(document.querySelectorAll(".slide"));
const $$dotsList = Array.from(document.querySelectorAll(".dots"));
const $$arrowLeft = document.querySelector("#arrow-left");
const $$arrowRight = document.querySelector("#arrow-right");
var current = 0;
var currentDot = 0;
var isResponsive = false;
var countNumberOfClick = 0;

function main(){
    bindFunctions();
    screenSizeOnLoad();
    addMenu();
    startSlide();
}

function screenSizeOnLoad(){
    if ($$window.innerWidth <= 767){
        hide($$navContainer);
        show($$responsiveMenu);
        isResponsive = true;
    }
    else{
        hide($$responsiveMenu);
        show($$navContainer);
        isResponsive = false;
    }
}

function bindFunctions(){
    bindEventScreenResize($$window);
    bindEventClick($$responsiveMenu);
    $$listElementLink.forEach(function(element){
        element.addEventListener("click", handleEventClickLink);
    });
    bindEventClickLeftArrow($$arrowLeft);
    bindEventClickRightArrow($$arrowRight);
}

function reset(){
    for(let i = 0; i < $$sliderImages.length; i++){
        $$sliderImages[i].style.display = 'none';
    }
    
    for(let i = 0; i < $$dotsList.length; i++){
        $$dotsList[i].style.background = 'none';
    }
}

function startSlide(){
    reset();
    $$sliderImages[0].style.display = 'block';
    $$dotsList[0].style.background = '#fff';
}

function slideLeft(){
    reset();
    $$sliderImages[current - 1].style.display = 'block';
    current--;
    $$dotsList[currentDot - 1].style.background = '#fff';
    currentDot--;
}

function slideRight(){
    reset();
    $$sliderImages[current + 1].style.display = 'block';
    current++;
    $$dotsList[currentDot + 1].style.background = '#fff';
    currentDot++;
}

function bindEventClickLeftArrow(element){
    element.addEventListener('click', function(){
    if (current === 0){
        current = $$sliderImages.length;
    }
    if (currentDot === 0){
        currentDot = $$dotsList.length;
    }
    slideLeft();
    });
}

function bindEventClickRightArrow(element){
    element.addEventListener('click', function(){
    if (current === $$sliderImages.length - 1){
        current = -1;
    }
    if (currentDot === $$dotsList.length - 1){
        currentDot = -1;
    }
    slideRight();
    });
}

function bindEventScreenResize(element){
    element.addEventListener("resize", handleEventScreenResize);
}

function handleEventScreenResize(){
    
    if ($$window.innerWidth <= 767 && !isResponsive){
        if (countNumberOfClick % 2 != 0){
           $$verticalMenu.classList.add("show");
           $$verticalMenu.style.display = "block";
        }
        hide($$navContainer);
        show($$responsiveMenu);
        isResponsive = true;
    }
    
    else if ($$window.innerWidth > 767 && isResponsive){
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
        showOrHideMenu();
    }
}

function handleEventClick(){
    countNumberOfClick ++;
    showOrHideMenu();
}

function showOrHideMenu(){
 
    if (countNumberOfClick % 2 == 0){
        hide($$verticalMenu);
        toggleFromCloseToMenu();
    }
    
    else{
        show($$verticalMenu);
        toggleFromMenuToClose();
    }
}

function addMenu(){
    $$menu = document.createElement("div");
    $$menu.innerHTML = `
        <svg viewBox="0 0 396.667 396.667">
			<path d="M17,87.833h362.667c9.35,0,17-7.65,17-17s-7.65-17-17-17H17c-9.35,0-17,7.65-17,17C0,80.183,7.65,87.833,17,87.833z" fill="#FFFFFF"/>
			<path d="M17,215.333h362.667c9.35,0,17-7.65,17-17s-7.65-17-17-17H17c-9.35,0-17,7.65-17,17S7.65,215.333,17,215.333z" fill="#FFFFFF"/>
			<path d="M17,342.833h362.667c9.35,0,17-7.65,17-17s-7.65-17-17-17H17c-9.35,0-17,7.65-17,17S7.65,342.833,17,342.833z" fill="#FFFFFF"/>
		</svg>
    `;
    $$responsiveMenu.appendChild($$menu);
}

function toggleFromMenuToClose(){
    $$close = document.createElement("div");
    $$close.innerHTML = `
        <svg viewBox="0 0 22 22">
            <path d="M16.97025,5.70725 C17.36125,5.31725 17.36125,4.68325 16.97025,4.29325 C16.58025,3.90225 15.94725,3.90225 15.55625,4.29325 L10.63225,9.21725 L5.70725,4.29325 C5.31725,3.90225 4.68325,3.90225 4.29325,4.29325 C3.90225,4.68325 3.90225,5.31725 4.29325,5.70725 L9.21725,10.63225 L4.29325,15.55625 C3.90225,15.94725 3.90225,16.58025 4.29325,16.97025 C4.68325,17.36125 5.31725,17.36125 5.70725,16.97025 L10.63225,12.04625 L15.55625,16.97025 C15.94725,17.36125 16.58025,17.36125 16.97025,16.97025 C17.36125,16.58025 17.36125,15.94725 16.97025,15.55625 L12.04625,10.63225 L16.97025,5.70725 Z" fill="#fff"></path>
        </svg>`;
    $$responsiveMenu.removeChild($$menu);
    $$responsiveMenu.appendChild($$close);
}

function toggleFromCloseToMenu(){
    $$responsiveMenu.removeChild($$close);
    $$responsiveMenu.appendChild($$menu);
}

function show(element){
    element.style.display = 'block';
    setTimeout(() => element.classList.add("show"));
}

function hide(element){
    element.classList.remove("show");
    element.style.display = 'none';
}

main();