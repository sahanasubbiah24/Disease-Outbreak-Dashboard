const diseaseDropdown = document.getElementById("disease");
const selectedDisease = document.getElementById("selectedDisease");
const trendText = document.getElementById("trendText");
const cases = document.getElementById("cases");
const risk = document.getElementById("risk");

const diseaseData = {
    "COVID-19": {
        trend: "COVID-19 cases are currently stable.",
        cases: "Cases: 12,450",
        risk: "Risk Level: Medium",
        chartData: [1200, 1400, 1800, 1600, 1500, 1300]
    },

    "Influenza": {
        trend: "Influenza cases usually increase during winter months.",
        cases: "Cases: 8,120",
        risk: "Risk Level: High",
        chartData: [500, 700, 1200, 1800, 2200, 2500]
    },

    "RSV": {
        trend: "RSV commonly affects infants and young children.",
        cases: "Cases: 4,500",
        risk: "Risk Level: Medium",
        chartData: [300, 500, 800, 1000, 900, 700]
    },

    "Lyme Disease": {
        trend: "Lyme disease risk increases during warmer months.",
        cases: "Cases: 2,100",
        risk: "Risk Level: Low",
        chartData: [50, 150, 400, 700, 600, 300]
    }
};

const ctx = document.getElementById("caseChart").getContext("2d");

const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Cases",
            data: diseaseData["COVID-19"].chartData
        }]
    }
});

diseaseDropdown.addEventListener("change", function() {

    const disease = diseaseDropdown.value;

    selectedDisease.textContent =
        "Selected Disease: " + disease;

    trendText.textContent =
        diseaseData[disease].trend;

    cases.textContent =
        diseaseData[disease].cases;

    risk.textContent =
        diseaseData[disease].risk;

    chart.data.datasets[0].data =
        diseaseData[disease].chartData;

    chart.update();
});