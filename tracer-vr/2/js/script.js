//   JavaScript

// ავტომატურად ვრთავთ Fullscreen რეჟიმს (თუ მხარდაჭერილია)
document.addEventListener("DOMContentLoaded", function() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
      elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
  }
  
//   let container = document.getElementById("container");
//   let tablet = document.getElementById("tablet");
  
//   function rotateScreen() {
//     // შეამოწმე, ეკრანი portrait-შია თუ არა
//       if (window.matchMedia("(orientation: portrait)").matches) {
//           let containerWidth = container.clientWidth;
//           let containerHeight = container.clientHeight;
//           tablet.style.transform = "rotate(90deg)";
//           tablet.style.transformOrigin = "center center";
//           tablet.style.width = "calc(100vh - 44px)";
//           tablet.style.height = "calc(100vw- 44px)";
//           tablet.style.overflow = "hidden";
//           tablet.style.position = "fixed";
//       } else {
//           tablet.style.transform = "none";
//           tablet.style.width = "calc(100vw - 44px)";
//           tablet.style.height = "calc(100vh - 44px)";
//       }
//   }
  
//   // ეშვება საიტის ჩატვირთვისას
//   window.addEventListener("load", rotateScreen);
  
//   // ეშვება მაშინაც, თუ მომხმარებელი ტელეფონს ატრიალებს
//   window.addEventListener("resize", rotateScreen);
  
});

// როცა მომხმარებელი პირველად შეეხება ეკრანს, ჩავრთოთ landscape lock
document.addEventListener("click", function() {
  if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(function(error) {
          console.log("Orientation lock failed:", error);
      });
  }
}, { once: true }); // ეს მოვლენა მხოლოდ ერთხელ შესრულდება

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
