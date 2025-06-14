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
        markers: true,
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

const video = document.querySelector(".page-1 video");
video.addEventListener("mouseenter", (e) => {
    if (video.muted) {
        customCursor.textContent = "Sound On";
    } else {
        customCursor.textContent = "Sound Off";
    }

    // customCursor.className = "custom-cursor-in-video";
    customCursor.style.width = "auto";
    customCursor.style.padding = "0 6px";
    customCursor.color = "#fff";
});

video.addEventListener("click", () => {
    if (video.muted) {
        video.muted = false;
        customCursor.textContent = "Sound off"
    } else {
        video.muted = true;
    }
});
video.addEventListener("mouseleave", (e) => {
    customCursor.textContent = "";

});



