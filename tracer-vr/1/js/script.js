//   JavaScript

let vrScene = 0,
    notClick = 0;

function vrButton() {
  if (vrScene > 0) {
    window.location.href = "./scenes/index.html?vrScene=" + vrScene;
      
      // if (notClick < 1) {
      //   notClick = 1;

      //   let seconds = 10;
      //   const timerEl = document.getElementById("vr");

      //   timerEl.innerHTML = seconds < 10 ? "0" + seconds : seconds;
      //   seconds--;

      //   let interval = setInterval(timer, 1000);

      //   function timer() {
      //     let time = seconds;

      //     time = time < 10 ? "0" + seconds : seconds;

      //     timerEl.innerHTML = time;
      //     seconds--;
      //     if (seconds < 0) {
      //       timerEl.innerHTML = "VR";
      //       notClick = 0;
      //       clearInterval(interval);
      //       window.location.href = "./scenes/" + vrScene + "/index.html";
      //     }
      //   }
      // }
  }
}

function scene1Button() {
  if (notClick !== 1) {
    document.getElementById("scene1").classList.add("buttonON");
    document.getElementById("scene2").classList.remove("buttonON");
    document.getElementById("scene3").classList.remove("buttonON");
    document.getElementById("scene4").classList.remove("buttonON");

    vrScene = 1;
  }
}

function scene2Button() {
  if (notClick !== 1) {
    document.getElementById("scene1").classList.remove("buttonON");
    document.getElementById("scene2").classList.add("buttonON");
    document.getElementById("scene3").classList.remove("buttonON");
    document.getElementById("scene4").classList.remove("buttonON");

    vrScene = 2;
  }
}

function scene3Button() {
  if (notClick !== 1) {
    document.getElementById("scene1").classList.remove("buttonON");
    document.getElementById("scene2").classList.remove("buttonON");
    document.getElementById("scene3").classList.add("buttonON");
    document.getElementById("scene4").classList.remove("buttonON");

    vrScene = 3;
  }
}

function scene4Button() {
  if (notClick !== 1) {
    document.getElementById("scene1").classList.remove("buttonON");
    document.getElementById("scene2").classList.remove("buttonON");
    document.getElementById("scene3").classList.remove("buttonON");
    document.getElementById("scene4").classList.add("buttonON");

    vrScene = 4;
  }
}
