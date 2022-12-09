function init() {
    app = {
            heading: 0, // angle
            scanPeriod: 3, // seconds
            ghosts: [], // array of ghosts
            ghostsNumber: 4, // number of ghosts
            selectorGhosts: ".radar .ghostsContainer", // selector of container elements storing ghosts
        }
        // initSensor(app);
    initUI(app);
    initGhosts(app);
    drawGhosts(app);
    console.log(app);
}

function initSensor(app) {
    let sensor = new AbsoluteOrientationSensor({ frequency: 5 });
    sensor.addEventListener('reading', function(e) {
        var q = e.target.quaternion;
        let heading = Math.atan2(2 * q[0] * q[1] + 2 * q[2] * q[3], 1 - 2 * q[1] * q[1] - 2 * q[2] * q[2]) * (180 / Math.PI);
        if (heading < 0)
            heading = 360 + heading;
        app.heading = heading;
    });
    sensor.start();
}

function initGhosts(app) {
    // app.ghosts.push(new Ghost(0,0));
    // app.ghosts.push(new Ghost(50,90));
    // // app.ghosts.push(new Ghost(0,0));
    // // app.ghosts.push(new Ghost(0,0));
    // // app.ghosts.push(new Ghost(0,0));
    // // app.ghosts.push(new Ghost(0,0));
    // // app.ghosts.push(new Ghost(0,0));
    // // app.ghosts.push(new Ghost(0,0));
    // return;
    
    for (let i = 0; i < app.ghostsNumber; i++) {
        let distance = Math.floor(Math.random() * 100);
        let angle = Math.floor(Math.random() * 360);
        let ghost = new Ghost(distance, angle);
        app.ghosts.push(ghost);
    }
}

function initUI(app) {
    document.querySelector(':root').style.setProperty("--radar-scan-period", app.scanPeriod + "s");
    window.onresize = resizeRadar;
    resizeRadar();
}

function resizeRadar() {
    let varRoot = document.querySelector(":root");
    let size;
    if (window.innerHeight < window.innerWidth) {
        size = window.innerHeight;
     } else {
        size = window.innerWidth;
    }
    size = Math.floor(size*0.8);
    varRoot.style.setProperty("--radar-height", size);
    varRoot.style.setProperty("--radar-width", size);
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