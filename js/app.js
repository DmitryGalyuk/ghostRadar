function init() {
    app = {
            heading: 0, // angle
            scanPeriod: 6, // seconds
            ghosts: [], // array of ghosts
            ghostsNumber: 4, // number of ghosts
            radarDiameter: 100, // initial radar diameter in pixels
            selectorGhosts: ".radar .ghostsContainer", // selector of container elements storing ghosts
        }
        // initSensor(app);
    initGhosts(app);
    initUI(app);
    drawGhosts(app);
    console.log(app);
}

function initSensor(app) {
    let sensor = new AbsoluteOrientationSensor({ frequency: 5 });
    sensor.addEventListener('reading', function(e) {
        var q = e.target.quaternion;
        app.heading = Math.atan2(2 * q[0] * q[1] + 2 * q[2] * q[3], 1 - 2 * q[1] * q[1] - 2 * q[2] * q[2]) * (180 / Math.PI);
        if (heading < 0)
            heading = 360 + heading;
    });
    sensor.start();
}

function initGhosts(app) {
    for (let i = 0; i < app.ghostsNumber; i++) {
        let distance = Math.floor(Math.random() * 100);
        let angle = Math.floor(Math.random() * 360);
        let ghost = new Ghost(distance, angle);
        app.ghosts.push(ghost);
    }
}

function initUI(app) {
    let diameter = window.innerHeight < window.innerWidth ?
        window.innerHeight :
        window.innerWidth;
    diameter = Math.floor(diameter * 0.9); // some padding
    app.radarDiameter = diameter;
    document.body.style.setProperty("--radar-diameter", diameter + "px");
}

function drawGhosts(app) {
    let container = document.querySelector(app.selectorGhosts);
    container.replaceChildren();
    for (const ghost of app.ghosts) {
        let elem = document.createElement("svg");
        elem.setAttribute("src", "img/ghost.svg");
        elem.style.fill = "#AFA";
        elem.style.stroke = "F00";
        elem.style.top = ghost.top + "%";
        elem.style.left = ghost.left + "%";
        elem.style.animationDelay = ghost.animationDelay(app.scanPeriod) + "ms";
        container.appendChild(elem);
    }
}