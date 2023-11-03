//   JavaScript


document.querySelector("a-scene").addEventListener("loaded", function () {
    let scene = this;

    // Detect the VR display and enter VR mode
    scene.canvas.addEventListener("click", function () {
        if (AFRAME.utils.device.checkHeadsetConnected()) {
            scene.enterVR();
        }
    });
});

let button = document.querySelector(".a-enter-vr-button");

let interval = setInterval(timer, 1000);

function timer() {
    let seconds = 2;

    seconds--;
    if (seconds < 0) {
        clearInterval(interval);
        button.click();
    }
}
