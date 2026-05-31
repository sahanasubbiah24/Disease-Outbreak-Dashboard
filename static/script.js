
const diseaseData = {
  "COVID-19": {
    trend:     "Cases are currently stable with a slow downward trajectory across most reporting regions. Monitoring continues for new variant emergence.",
    cases:     "12,450",
    risk:      "Medium",
    riskClass: "medium",
    chartData: [1200, 1400, 1800, 1600, 1500, 1300],
    chartColor:"#3264a0"
  },
  "Influenza": {
    trend:     "Influenza cases are surging sharply this season. Current activity is classified as widespread across multiple states. Peak expected in coming weeks.",
    cases:     "8,120",
    risk:      "High",
    riskClass: "high",
    chartData: [500, 700, 1200, 1800, 2200, 2500],
    chartColor:"#c0392b"
  },
  "RSV": {
    trend:     "RSV primarily affects infants and young children. Peak season is underway. Hospitalization rates in the under-2 age group are elevated.",
    cases:     "4,500",
    risk:      "Medium",
    riskClass: "medium",
    chartData: [300, 500, 800, 1000, 900, 700],
    chartColor:"#b45309"
  },
  "Lyme Disease": {
    trend:     "Lyme disease risk is elevated in the Northeast and Upper Midwest. Tick activity is at seasonal peak. Range continues to expand westward.",
    cases:     "2,100",
    risk:      "Low",
    riskClass: "low",
    chartData: [50, 150, 400, 700, 600, 300],
    chartColor:"#166534"
  }
};

const stateCodes = {
  "Alabama":"AL","Alaska":"AK","Arizona":"AZ","Arkansas":"AR","California":"CA",
  "Colorado":"CO","Connecticut":"CT","Delaware":"DE","Florida":"FL","Georgia":"GA",
  "Idaho":"ID","Illinois":"IL","Indiana":"IN","Iowa":"IA","Kansas":"KS",
  "Kentucky":"KY","Louisiana":"LA","Maine":"ME","Maryland":"MD","Massachusetts":"MA",
  "Michigan":"MI","Minnesota":"MN","Mississippi":"MS","Missouri":"MO","Montana":"MT",
  "Nebraska":"NE","Nevada":"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM",
  "New York":"NY","North Carolina":"NC","North Dakota":"ND","Ohio":"OH","Oklahoma":"OK",
  "Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC",
  "South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Vermont":"VT",
  "Virginia":"VA","Washington":"WA","West Virginia":"WV","Wisconsin":"WI","Wyoming":"WY"
};


const ctx = document.getElementById("caseChart").getContext("2d");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Cases",
      data: diseaseData["COVID-19"].chartData,
      borderColor: "#3264a0",
      backgroundColor: "rgba(50,100,160,0.06)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#3264a0",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a1a18",
        titleColor: "#9a9a92",
        bodyColor: "#ffffff",
        borderColor: "#e2e2dc",
        borderWidth: 1,
        padding: 12,
        titleFont: { family: "'DM Mono', monospace", size: 10 },
        bodyFont: { family: "'DM Mono', monospace", size: 13 },
        callbacks: {
          label: ctx => ` ${ctx.raw.toLocaleString()} cases`
        }
      }
    },
    scales: {
      x: {
        grid: { color: "#f0f0ec", drawBorder: false },
        ticks: {
          color: "#9a9a92",
          font: { family: "'DM Mono', monospace", size: 11 },
          padding: 8
        },
        border: { display: false }
      },
      y: {
        grid: { color: "#f0f0ec", drawBorder: false },
        ticks: {
          color: "#9a9a92",
          font: { family: "'DM Mono', monospace", size: 11 },
          padding: 8,
          callback: val => val.toLocaleString()
        },
        border: { display: false }
      }
    }
  }
});


function setField(id, val) {
  const el = document.getElementById(id);
  el.classList.remove("data-update");
  void el.offsetWidth;
  el.classList.add("data-update");
  el.textContent = val;
}

function selectDisease(disease) {
  const d = diseaseData[disease];


  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.disease === disease);
  });

  setField("selectedDisease", disease);
  setField("casesText", d.cases);
  setField("trendText", d.trend);


  const badge = document.getElementById("riskBadge");
  badge.classList.remove("data-update");
  void badge.offsetWidth;
  badge.classList.add("data-update");
  badge.textContent = d.risk;
  badge.className = `risk-badge ${d.riskClass} data-update`;


  const dot = document.getElementById("legendDot");
  dot.style.background = d.chartColor;


  chart.data.datasets[0].data        = d.chartData;
  chart.data.datasets[0].borderColor = d.chartColor;
  chart.data.datasets[0].backgroundColor = d.chartColor + "0f";
  chart.data.datasets[0].pointBorderColor = d.chartColor;
  chart.update("active");
}


document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => selectDisease(btn.dataset.disease));
});

function initMap(data) {
  const filtered = data.filter(item => item.state !== "District of Columbia");

  const locations  = filtered.map(item => stateCodes[item.state]);
  const caseCounts = filtered.map(item => item.cases_2023);
  const stateNames = filtered.map(item => item.state);

  const mapData = [{
    type: "choropleth",
    locationmode: "USA-states",
    locations,
    z: caseCounts,
    text: stateNames.map((s, i) =>
      `<b>${s}</b><br>2023 Cases: ${caseCounts[i].toLocaleString()}`
    ),
    hoverinfo: "text",
    colorscale: [
      [0.0, "#dce8f4"],
      [0.1, "#b5cfe8"],
      [0.3, "#7aaad3"],
      [0.6, "#3d7fb8"],
      [1.0, "#1a3a5c"]
    ],
    colorbar: {
      title: {
        text: "Cases",
        font: { color: "#5a5a54", family: "DM Mono", size: 11 }
      },
      tickfont: { color: "#9a9a92", family: "DM Mono", size: 10 },
      thickness: 12,
      bgcolor: "rgba(0,0,0,0)",
      borderwidth: 0,
      len: 0.6,
      x: 1
    },
    marker: {
      line: { color: "#ffffff", width: 1.5 }
    }
  }];

  const layout = {
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor:  "rgba(0,0,0,0)",
    geo: {
      scope:        "usa",
      bgcolor:      "rgba(0,0,0,0)",
      lakecolor:    "#f5f5f2",
      showlakes:    true,
      showland:     true,
      landcolor:    "#f0f0ec",
      subunitcolor: "#ffffff",
      subunitwidth: 1.5,
    },
    margin: { t: 0, b: 0, l: 0, r: 30 },
    hoverlabel: {
      bgcolor:     "#1a1a18",
      bordercolor: "#3264a0",
      font: { family: "DM Mono", color: "#ffffff", size: 12 }
    }
  };

  Plotly.newPlot("usMap", mapData, layout, {
    responsive: true,
    displayModeBar: false
  });
}

fetch("/map-data")
  .then(res => res.json())
  .then(data => initMap(data))
  .catch(() => {
    const fallback = [
      {state:"Alabama",cases_2023:36},{state:"Alaska",cases_2023:2},
      {state:"Arizona",cases_2023:16},{state:"Arkansas",cases_2023:5},
      {state:"California",cases_2023:109},{state:"Colorado",cases_2023:32},
      {state:"Connecticut",cases_2023:3239},{state:"Delaware",cases_2023:349},
      {state:"Florida",cases_2023:271},{state:"Georgia",cases_2023:18},
      {state:"Idaho",cases_2023:11},{state:"Illinois",cases_2023:372},
      {state:"Indiana",cases_2023:257},{state:"Iowa",cases_2023:212},
      {state:"Kansas",cases_2023:12},{state:"Kentucky",cases_2023:120},
      {state:"Louisiana",cases_2023:15},{state:"Maine",cases_2023:2942},
      {state:"Maryland",cases_2023:2470},{state:"Massachusetts",cases_2023:9715},
      {state:"Michigan",cases_2023:1152},{state:"Minnesota",cases_2023:2938},
      {state:"Mississippi",cases_2023:4},{state:"Missouri",cases_2023:16},
      {state:"Montana",cases_2023:11},{state:"Nebraska",cases_2023:5},
      {state:"Nevada",cases_2023:14},{state:"New Hampshire",cases_2023:1573},
      {state:"New Jersey",cases_2023:7224},{state:"New Mexico",cases_2023:11},
      {state:"New York",cases_2023:22173},{state:"North Carolina",cases_2023:228},
      {state:"North Dakota",cases_2023:15},{state:"Ohio",cases_2023:1307},
      {state:"Oklahoma",cases_2023:3},{state:"Oregon",cases_2023:61},
      {state:"Pennsylvania",cases_2023:16671},{state:"Rhode Island",cases_2023:2852},
      {state:"South Carolina",cases_2023:55},{state:"South Dakota",cases_2023:7},
      {state:"Tennessee",cases_2023:50},{state:"Texas",cases_2023:27},
      {state:"Utah",cases_2023:16},{state:"Vermont",cases_2023:1445},
      {state:"Virginia",cases_2023:1747},{state:"Washington",cases_2023:25},
      {state:"West Virginia",cases_2023:3242},{state:"Wisconsin",cases_2023:6283},
      {state:"Wyoming",cases_2023:2}
    ];
    initMap(fallback);
  });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("navDate").textContent =
  new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });