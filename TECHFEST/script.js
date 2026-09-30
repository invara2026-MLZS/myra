/* =========================================
   TECHFEST INTERACTIVE BACKGROUND
========================================= */

const canvas = document.getElementById("techCanvas");

const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null,
    radius: 140
};


/* =========================================
   CANVAS SIZE
========================================= */

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    createParticles();
}

window.addEventListener("resize", resizeCanvas);


/* =========================================
   PARTICLE
========================================= */

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.5;

        this.speedY =
            (Math.random() - 0.5) * 0.5;

        this.opacity =
            Math.random() * 0.7 + 0.2;
    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        /* Screen wrapping */

        if (this.x < 0)
            this.x = canvas.width;

        if (this.x > canvas.width)
            this.x = 0;

        if (this.y < 0)
            this.y = canvas.height;

        if (this.y > canvas.height)
            this.y = 0;


        /* Mouse interaction */

        if (mouse.x !== null) {

            let dx = this.x - mouse.x;

            let dy = this.y - mouse.y;

            let distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                let force =
                    (mouse.radius - distance)
                    / mouse.radius;

                this.x +=
                    (dx / distance) *
                    force * 2;

                this.y +=
                    (dy / distance) *
                    force * 2;
            }
        }
    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${this.opacity})`;

        ctx.fill();
    }
}


/* =========================================
   CREATE PARTICLES
========================================= */

function createParticles() {

    particles = [];

    let amount =
        Math.min(
            120,
            Math.floor(
                (canvas.width * canvas.height)
                / 12000
            )
        );

    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );
    }
}


/* =========================================
   CONNECT PARTICLES
========================================= */

function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            let dx =
                particles[a].x -
                particles[b].x;

            let dy =
                particles[a].y -
                particles[b].y;

            let distance =
                Math.sqrt(
                    dx * dx + dy * dy
                );


            if (distance < 110) {

                let opacity =
                    1 - distance / 110;

                ctx.strokeStyle =
                    `rgba(255,255,255,${opacity * 0.12})`;

                ctx.lineWidth = 0.5;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}


/* =========================================
   ANIMATION
========================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();
        }
    );


    connectParticles();


    requestAnimationFrame(
        animate
    );
}


/* =========================================
   MOUSE TRACKING
========================================= */

window.addEventListener(
    "mousemove",
    function(event) {

        mouse.x = event.clientX;

        mouse.y = event.clientY;


        const cursorGlow =
            document.querySelector(
                ".cursor-glow"
            );

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";
    }
);


/* =========================================
   REMOVE MOUSE EFFECT
========================================= */

window.addEventListener(
    "mouseleave",
    function() {

        mouse.x = null;

        mouse.y = null;
    }
);


/* =========================================
   START
========================================= */

resizeCanvas();

animate();
/* =========================================
   TECH OBJECT PARALLAX
========================================= */

const techObjects =
    document.querySelectorAll(".tech-object");

window.addEventListener("mousemove", (event) => {

    const mouseX =
        (event.clientX / window.innerWidth) - 0.5;

    const mouseY =
        (event.clientY / window.innerHeight) - 0.5;


    techObjects.forEach((object, index) => {

        const strength =
            (index + 1) * 8;

        const moveX =
            mouseX * strength;

        const moveY =
            mouseY * strength;


        object.style.marginLeft =
            `${moveX}px`;

        object.style.marginTop =
            `${moveY}px`;

    });

});