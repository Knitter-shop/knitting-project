const productSelect = document.getElementById("productSelect");
const productPrice = document.getElementById("productPrice");
const patternSelect = document.getElementById("patternSelect");
const patternPrice = document.getElementById("patternPrice");
const kitSelect = document.getElementById("kitSelect");
const kitPrice = document.getElementById("kitPrice");
const videoSelect = document.getElementById("videoSelect");
const videoTutorial = document.getElementById("videoTutorial");

productSelect.addEventListener("change", productSelectChange);
patternSelect.addEventListener("change", patternSelectChange);
kitSelect.addEventListener("change", kitSelectChange);
videoSelect.addEventListener("change", videoSelectChange);

function productSelectChange(event) {
  if (event.target.value === "si") {
    productPrice.style.display = "block";
  } else {
    productPrice.style.display = "none";
  }
}

function patternSelectChange(event) {
  if (event.target.value === "si") {
    patternPrice.style.display = "block";
  } else {
    patternPrice.style.display = "none";
  }
}

function kitSelectChange(event) {
  if (event.target.value === "si") {
    kitPrice.style.display = "block";
  } else {
    kitPrice.style.display = "none";
  }
}

function videoSelectChange(event) {
  if (event.target.value === "si") {
    videoTutorial.style.display = "block";
  } else {
    videoTutorial.style.display = "none";
  }
}