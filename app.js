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

// page-1 functionality
const animPage1 = () => {
    gsap.from(".page-1 h1", {
        y: 10,
        opacity: 0,
        duration: .7,
        rotate: 6,
        delay: .3,
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
        }
    });
}

animPage1();

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

const animPage2 = () => {
    const tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
            trigger: ".page-2",
            scrub: 3,
            start: "top 70%",
            end: "top 50%",
        }
    });


    tl2.to("#main", {
        backgroundColor: "#fff",
        color: "#000",
    });

    tl2.to("header a", {
        color: "#000"
    });

    tl2.from(".page-2 h1", {
        y: 20,
        duration: 1,
        delay: 1.5,
        opacity: 0
    });

    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page-2 .left",
            scroller: "#main",
            start: "top 60%",
            end: "top 0%"
        }
    });

    tl3.from(".page-2 .left .col", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: .3,
        stagger: .5,
    });
    tl3.from(".page-2>div:last-child", {
        width: "70%",
        duration: .3,
    });
}

animPage2();

// page-2 functionality
const left = document.querySelector(".left");
const rightImage = document.querySelector(".right img");
let currentImage = null;
let id = null;
left.addEventListener("mousemove", (e) => {
    const elem = e.target;
    if (elem.classList.contains("col")) {
        let newSrc = elem.dataset.img;
        if (newSrc !== currentImage) {
            currentImage = newSrc;
            clearTimeout(id);
            gsap.fromTo(rightImage,
                { opacity: 0 },
                { opacity: 1, duration: .6, ease: "power2.out" }
            );
            id = setTimeout(() => {
                rightImage.src = newSrc;
            }, 500);
        }
    }
});

left.addEventListener("mouseenter", () => {
    customCursor.style.width = "30px";
    customCursor.style.height = "30px";
});

left.addEventListener("mouseleave", () => {
    customCursor.style.width = "20px";
    customCursor.style.height = "20px";
});

// page-3 functionality
const page3 = document.querySelector(".page-3");
page3.addEventListener("mousemove", (e) => {
    const elem = e.target;
    if (elem.tagName == "VIDEO" || elem.tagName == "IMG") {
        customCursor.textContent = "View";
        customCursor.style.width = "auto";
        customCursor.style.padding = "0px 6px";
    } else {
        customCursor.style.width = "20px";
        customCursor.style.height = "20px";
        customCursor.textContent = "";
    }
});