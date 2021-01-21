let scrollnav_bar = document.getElementById("scrollnav_bar");
let nav = document.getElementsByClassName("nav")[0];
let nav_bars = nav.getElementsByTagName("a");
let curr_bar = nav_bars[0];

let slide_container = document.getElementById("slides");
let slides = slide_container.getElementsByTagName("li");
let curr_slide = slides[0];

let mobile_menu = document.getElementById("mobile_menu");
let exit_menu = document.getElementById("exit_menu");

let sc_player = null;

mobile_menu.addEventListener("click", () => {nav.style.top = "0"; });
exit_menu.addEventListener("click", () => {nav.style.top = "-100vh"; });

Array.from(nav_bars).forEach(function (element, i) {
    element.onclick = () => { 
        clickActionGUI(element);
        // Actual movement...
        scrollSlide(i);
    };
});

function createScrollNavBar() {
    let top = curr_bar.getBoundingClientRect().top - 5;
    let left = curr_bar.getBoundingClientRect().left;
    let right = curr_bar.getBoundingClientRect().right;
    let rect_height = 5;
    let tri_height = 6;
    let width = 7;
    let color = "rgb(211, 199, 255)";
    let center = (right - left) / 2;
    let tricorner = (center - width);
    scrollnav_bar.setAttribute("d", "m10 " + top + " l" + 
        "0 -" + rect_height + " l" + width + " 0 l0 " + rect_height + " l" +
        (width / 2) + " 0 l-" + width + " " + tri_height + "l-" + width + " -" + 
        tri_height + " l-" + tricorner + " 0 z");
    scrollnav_bar.setAttribute("fill", color);
}

function scrollBar() {
    let svg = 
        document.getElementsByClassName("scrollnav")[0];
    svg.style.left = curr_bar.getBoundingClientRect().left +
        curr_bar.getBoundingClientRect().width / 2 - 
        scrollnav_bar.getBoundingClientRect().width / 2 + 5;
}

function scrollSlide(i) {
    curr_slide = slides[i];
    let old_left = slide_container.scrollLeft;
    let new_left = curr_slide.getBoundingClientRect().left - 
        curr_slide.parentElement.getBoundingClientRect().left;
    slide_container.scrollLeft += (new_left - old_left) + 1;
}

function clickActionGUI(element) {
    curr_bar.classList.remove("nav_selected");
    curr_bar = element; 
    curr_bar.classList.add("nav_selected");
    scrollBar(); 
}

function handleResize() {
    slide_container.style.scrollBehavior = "auto";
    curr_bar.click();
    slide_container.style.scrollBehavior = "smooth";
}

window.addEventListener("resize", () => handleResize());

createScrollNavBar();
clickActionGUI(curr_bar);