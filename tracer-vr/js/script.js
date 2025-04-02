//   JavaScript


document.addEventListener("DOMContentLoaded", function() {

  let tablet = document.getElementById("tablet");
  let scenesContainer = document.getElementById("scenesContainer");
  let infoButton = document.getElementById("info-button");
  
  // ვრთავთ Fullscreen რეჟიმს (თუ მხარდაჭერილია)
  function enterFullscreen() {
    let elem = document.documentElement; // სრულეკრანული რეჟიმისთვის მთლიანი დოკუმენტი
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox მხარდაჭერა
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari და Opera მხარდაჭერა
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge მხარდაჭერა
      elem.msRequestFullscreen();
    }
  }
  
  function updateOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      tablet.classList.add("vertical-text");
      scenesContainer.classList.add("scenesContainer-portrait");
      infoButton.classList.add("info-button-1");
    } else {
      tablet.classList.remove("vertical-text");
      scenesContainer.classList.remove("scenesContainer-portrait");
      infoButton.classList.remove("info-button-1");
    }
  }
  
  // როცა მომხმარებელი შეეხება ეკრანს, ჩავრთოთ fullscreen და landscape lock
  document.addEventListener("click", function() {
    if (!(document.fullscreenElement)) {
      enterFullscreen();
    }
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(function(error) {
          console.log("Orientation lock failed:", error);
      });
    }
  }, { once: false }); // ეს მოვლენა ბევრჯერ შესრულდება
  

  // პირველად რომ ჩაიტვირთოს სწორი მიმართულებით
  enterFullscreen();
  updateOrientation();

  // როდესაც ეკრანის მიმართულება შეიცვლება
  window.addEventListener("resize", updateOrientation);
  window.addEventListener("orientationchange", updateOrientation);
});


let vrScene = 0, notClick = 0;

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
