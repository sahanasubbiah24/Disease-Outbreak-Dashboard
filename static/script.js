const diseaseDropdown = document.getElementById("disease");
const selectedDisease = document.getElementById("selectedDisease");
const trendText = document.getElementById("trendText");
const cases = document.getElementById("cases");
const risk = document.getElementById("risk");

const diseaseData = {
    "COVID-19": {
        trend: "COVID-19 cases are currently stable.",
        cases: "Cases: 12,450",
        risk: "Risk Level: Medium"
    },
    "Influenza": {
        trend: "Influenza cases usually increase during winter months.",
        cases: "Cases: 8,120",
        risk: "Risk Level: High"
    },
    "RSV": {
        trend: "RSV commonly affects infants and young children.",
        cases: "Cases: 4,500",
        risk: "Risk Level: Medium"
    },
    "Lyme Disease": {
        trend: "Lyme disease risk increases during warmer months.",
        cases: "Cases: 2,100",
        risk: "Risk Level: Low"
    }
};

diseaseDropdown.addEventListener("change", function() {
    const disease = diseaseDropdown.value;

    selectedDisease.textContent = "Selected Disease: " + disease;
    trendText.textContent = diseaseData[disease].trend;
    cases.textContent = diseaseData[disease].cases;
    risk.textContent = diseaseData[disease].risk;
});