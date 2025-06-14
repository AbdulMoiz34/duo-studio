const init = () => {
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        lerp: 0.01
    });

    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
init();

const customCursor = document.getElementById("custom-cursor");
const main = document.getElementById("main");
main.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.x}px`;
    customCursor.style.top = `${e.y}px`;
});


const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-1 .f-h1",
        scroller: "#main",
        start: "top 30%",
        end: "top 0",
        scrub: 3,
        pin: ".page-1 .text-box",
    }
});

tl.to(".page-1 .f-h1", {
    x: -80,
    duration: 2,
}, "anim");

tl.to(".page-1 .s-h1", {
    x: 80,
    duration: 2,
}, "<");


gsap.to(".page-1 video", {
    width: "85%",
    duration: 2,
    scrollTrigger: {
        trigger: ".page-1 video",
        scroller: "#main",
        scrub: 2,
        start: "top 30%",
        end: "top 0",
        markers: true,
    }
});


const tl2 = gsap.timeline({
    scrollTrigger: {
        scroller: "#main",
        trigger: ".page-2",
        scrub: 3,
        start: "top 70%",
        end: "top 50%",
        markers: true
    }
});

tl2.to("#main", {
    backgroundColor: "#fff",
    color: "#000",
});

const video = document.querySelector(".page-1 video");
const updateCursorLabel = () => {
    customCursor.textContent = video.muted ? "Sound On" : "Sound Off";
}

video.addEventListener("mouseenter", () => {
    updateCursorLabel();

    customCursor.style.width = "auto";
    customCursor.style.padding = "0 6px";
    customCursor.style.color = "#fff";
    customCursor.style.display = "block";
});

video.addEventListener("click", () => {
    video.muted = !video.muted;
    updateCursorLabel();
});

video.addEventListener("mouseleave", () => {
    customCursor.textContent = "";

    customCursor.style.width = "20px";
});


// services
const images = {
    branding: "./assets/services/services__branding@1152.webp",
    websites: "./assets/services/services__websites@1152.webp",
    content: "./assets/services/services__content@1152.webp"
};


