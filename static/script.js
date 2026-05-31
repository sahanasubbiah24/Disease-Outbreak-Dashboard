const diseaseDropdown = document.getElementById("disease");
const selectedDisease = document.getElementById("selectedDisease");

diseaseDropdown.addEventListener("change", function() {
    selectedDisease.textContent = "Selected Disease: " + diseaseDropdown.value;
});