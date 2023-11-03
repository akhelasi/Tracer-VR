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

// Trigger a click event on the button
button.click();