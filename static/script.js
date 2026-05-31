const diseaseDropdown = document.getElementById("disease");
const selectedDisease = document.getElementById("selectedDisease");
const trendText = document.getElementById("trendText");

const diseaseInfo = {
    "COVID-19": "COVID-19 cases are currently stable.",
    "Influenza": "Influenza cases usually increase during winter months.",
    "RSV": "RSV commonly affects infants and young children.",
    "Lyme Disease": "Lyme disease risk increases during warmer months when ticks are active."
};

diseaseDropdown.addEventListener("change", function() {
    const disease = diseaseDropdown.value;
    selectedDisease.textContent = "Selected Disease: " + disease;
    trendText.textContent = diseaseInfo[disease];
});