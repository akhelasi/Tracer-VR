//      JavaScript      //

let model1Visible = false;
let model2Visible = false;

const model1 = document.getElementById("magnetModel");
const model2 = document.getElementById("solenoidModel");
const marker1 = document.getElementById("marker1");
const marker2 = document.getElementById("marker2");

marker1.addEventListener("markerFound", () => {
  if (!model2Visible) {
    model1Visible = true;
    model1.setAttribute("visible", true);
  }
});

marker1.addEventListener("markerLost", () => {
  model1Visible = false;
  model1.setAttribute("visible", false);
});

marker2.addEventListener("markerFound", () => {
  if (!model1Visible) {
    model2Visible = true;
    model2.setAttribute("visible", true);
  }
});

marker2.addEventListener("markerLost", () => {
  model2Visible = false;
  model2.setAttribute("visible", false);
});
