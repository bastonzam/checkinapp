var imgFile = "";
var showLatlong = document.getElementById("showLatlong");
var latlongLoading = document.getElementById("latlongLoading");

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

document.getElementById("cameraInput").addEventListener("change", function () {
  document
    .getElementById("showPicture")
    .setAttribute("src", window.URL.createObjectURL(this.files[0]));
  imgFile = this.files[0];
  getPicture();
});

document.getElementById("latlongInput").addEventListener("click", function () {
  latlongLoading.classList.remove("d-none");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      getPosError,
      options
    );
  } else {
    showLatlong.innerHTML = "Geolocation is not supported by this browser.";
    latlongLoading.classList.add("d-none");
  }
});

function showPosition(position) {
  latlongLoading.classList.add("d-none");
  showLatlong.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

function getPosError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

async function getPicture() {
  const file64 = imgFile;
  console.log(await toBase64(file64));
}
