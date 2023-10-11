//   JavaScript

let vrScene = 0, drone = 0, notClick = 0;

function vrButton() {
    if (vrScene > 0) {
        if (drone > 0) {
            if (notClick < 1) {
                notClick = 1;

                let seconds = 10;
                const timerEl = document.getElementById("vr");

                let interval = setInterval(timer, 1000);

                function timer() {

                    let timer = seconds;

                    timer = timer < 10 ? '0' + seconds : seconds;

                    timerEl.innerHTML = timer;
                    seconds--;
                    if (seconds < 0) {
                        timerEl.innerHTML = "VR";
                        notClick = 0;
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function scene1Button() {
    document.getElementById("scene1").classList.add("buttonON");
    document.getElementById("scene2").classList.remove("buttonON");
    document.getElementById("scene3").classList.remove("buttonON");
    document.getElementById("scene4").classList.remove("buttonON");

    vrScene = 1;
}

function scene2Button() {
    document.getElementById("scene1").classList.remove("buttonON");
    document.getElementById("scene2").classList.add("buttonON");
    document.getElementById("scene3").classList.remove("buttonON");
    document.getElementById("scene4").classList.remove("buttonON");

    vrScene = 2;
}

function scene3Button() {
    document.getElementById("scene1").classList.remove("buttonON");
    document.getElementById("scene2").classList.remove("buttonON");
    document.getElementById("scene3").classList.add("buttonON");
    document.getElementById("scene4").classList.remove("buttonON");

    vrScene = 3;
}

function scene4Button() {
    document.getElementById("scene1").classList.remove("buttonON");
    document.getElementById("scene2").classList.remove("buttonON");
    document.getElementById("scene3").classList.remove("buttonON");
    document.getElementById("scene4").classList.add("buttonON");

    vrScene = 4;
}

function filmDron() {
    document.getElementById("film").classList.remove("droneON");
    document.getElementById("circle").classList.add("droneON");
    document.getElementById("helix").classList.add("droneON");
    document.getElementById("rocket").classList.add("droneON");

    drone = 1;
}

function circleDron() {
    document.getElementById("film").classList.add("droneON");
    document.getElementById("circle").classList.remove("droneON");
    document.getElementById("helix").classList.add("droneON");
    document.getElementById("rocket").classList.add("droneON");

    drone = 2;
}

function helixDron() {
    document.getElementById("film").classList.add("droneON");
    document.getElementById("circle").classList.add("droneON");
    document.getElementById("helix").classList.remove("droneON");
    document.getElementById("rocket").classList.add("droneON");

    drone = 3;
}

function rocketDron() {
    document.getElementById("film").classList.add("droneON");
    document.getElementById("circle").classList.add("droneON");
    document.getElementById("helix").classList.add("droneON");
    document.getElementById("rocket").classList.remove("droneON");

    drone = 4;
}

