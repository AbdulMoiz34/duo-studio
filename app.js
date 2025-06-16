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
document.addEventListener("mousemove", (e) => {
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
    customCursor.style.padding = "0 8px";
    customCursor.style.color = "#fff";
    customCursor.style.display = "block";
    customCursor.style.borderRadius = "8px"
});

video.addEventListener("click", () => {
    video.muted = !video.muted;
    updateCursorLabel();
});

video.addEventListener("mouseleave", () => {
    customCursor.textContent = "";
    customCursor.style.width = "20px";
    customCursor.style.borderRadius = ""
});

// page-2 functionality
const animPage2 = () => {
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page-2",
            scroller: "#main",
            scrub: 3,
            start: "top 70%",
            end: "top 50%",
        }
    });


    tl2.to("#main", {
        backgroundColor: "#fff",
        color: "#000",
    });

    tl2.to("header", {
        color: "#000"
    });

    tl2.to("header .circle", {
        backgroundColor: "#000"
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
const animPage3 = () => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".page-3",
            scroller: "#main",
            start: "top 30%",
            end: "top 0%",
            scrub: true
        }
    });
    tl.from(".page-3 h1", {
        opacity: 0,
        y: 10,
        rotate: 10,
        duration: .4,
        delay: .3
    });

    ScrollTrigger.batch(".page-3>div>div", {
        scroller: "#main",
        start: "top 50%",
        onEnter: batch => {
            gsap.from(batch, {
                opacity: 0,
                y: 70,
                stagger: .5,
                duration: 1,
                ease: "power2.out"
            });
        },
        once: true
    });
}

const page3 = document.querySelector(".page-3");
page3.addEventListener("mousemove", (e) => {
    const elem = e.target;
    if (elem.tagName == "VIDEO" || elem.tagName == "IMG") {
        customCursor.textContent = "View";
        customCursor.style.width = "auto";
        customCursor.style.padding = "0px 8px";
        customCursor.style.borderRadius = "8px";
    } else {
        customCursor.style.width = "20px";
        customCursor.style.height = "20px";
        customCursor.textContent = "";
        customCursor.style.borderRadius = "50%";

    }
});

// page-4 functionality
const animPage4 = () => {
    ScrollTrigger.create({
        trigger: ".page-4",
        scroller: "#main",
        start: "top 60%",
        end: "top 0%",
        markers: true,

        onEnter: () => {
            main.style.backgroundColor = "#000";
            main.style.color = "#fff";
            document.querySelector("header").style.color = "#fff";
            document.querySelector("header .circle").style.backgroundColor = "#fff";
            document.querySelector(".page-3 .line").style.backgroundColor = "#fff";
        },
        onLeaveBack: () => {
            main.style.backgroundColor = "#fff";
            main.style.color = "#000";
            document.querySelector("header").style.color = "#000";
            document.querySelector("header .circle").style.backgroundColor = "#000";
            document.querySelector(".page-3 .line").style.backgroundColor = "#000";
        }
    });
}

// page-5 functionality
const boxes = document.querySelectorAll(".page-5 .box");
boxes.forEach(box => {
    box.addEventListener("mouseenter", () => {
        customCursor.style.mixBlendMode = "unset";
        customCursor.style.backgroundImage = `url('${box.dataset.img}')`;
        customCursor.style.width = "470px";
        customCursor.style.height = "370px";
        customCursor.style.borderRadius = "0px";
    });
    box.addEventListener("mouseleave", function () {
        box.style.backgroundColor = "transparent"
        customCursor.style.width = "20px"
        customCursor.style.height = "20px"
        customCursor.style.borderRadius = "50%"
        customCursor.style.backgroundImage = `none`
    })
});


animPage3();
animPage4();