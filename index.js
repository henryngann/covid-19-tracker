//https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics/details

//  Set ChartOption Globally to change whenever
//  When updating chart, you pass in an object then update it.

var chartOption = {
  type: "bar",
  data: {
    labels: ["Confirmed Cases", "Deaths", "Recovered"],
    datasets: [
      {
        label: null,
        data: [5, 5, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};
async function retrieveData(country) {
  let apiUrl = country
    ? `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country}`
    : `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=`;

  let response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "bf3c0cd05dmshca02c4356f6cd7dp11a393jsnc30e15927811",
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    },
  });

  let data = await response.json();
  return data;
}

async function renderChart(chartData) {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, chartOption);
}

async function updateChartOnChange() {
  var x = document.getElementById("mySelect").value;

  let obtained = await retrieveData(x);
  updateChart(obtained);
}

async function init() {
  let covidData = await retrieveData();
  chartOption.data.datasets[0].label = covidData.data.location;
  console.log(chartOption.data.datasets[0].data);
  chartOption.data.datasets[0].data = [
    covidData.data.confirmed,
    covidData.data.deaths,
    covidData.data.recovered,
  ];
  renderChart(covidData);
}

function updateChart(data) {
  console.log(chartOption);
  chartOption.data.datasets[0].label = data.data.location;
  chartOption.data.datasets[0].data = [
    data.data.confirmed,
    data.data.deaths,
    data.data.recovered,
  ];
  myChart.update();
}

init();

//How this works.
//
