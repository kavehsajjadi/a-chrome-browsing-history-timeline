let chart;

const granularity = 24;

const query = {
  text: '',
  maxResults: 0,
  startTime: undefined,
  endTime: undefined,
};

let history = [];

function init() {
  document.addEventListener('change', e => {
    if (e.target.id === 'endTime') {
      handleEndTime(e);
    }
    if (e.target.id === 'startTime') {
      handleStartTime(e);
    }
  });
  search();
}

function handleStartTime(e) {
  const value = inputToTime(e.target.value);
  query.startTime = value;
  search();
}

function handleEndTime(e) {
  const value = inputToTime(e.target.value);
  query.endTime = value;
  search();
}

function inputToTime(date) {
  return new Date(date).getTime();
}

function search() {
  const data = chrome.history.search(query, updateData);
}

function updateData(historyResults) {
  history = historyResults;
  updateChart(history);
}

function updateChart(items) {
  const labels = items.map(item => new Date(item.lastVisitTime));
  const visitCounts = items.map(item => item.visitCount);
  const dataSet = {
    label: 'Visit Count',
    data: visitCounts,
  };
  const timeFormat = 'MM/DD/YYYY HH:mm';
  const options = {
    title: {
      text: 'Chart.js Time Scale',
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            parser: timeFormat,
            // round: 'day'
            tooltipFormat: 'll HH:mm',
            displayFormats: {
              hour: 'hA ddd',
            },
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'value',
          },
        },
      ],
    },
  };
  const config = {
    type: 'scatter',
    data: {
      labels,
      datasets: [dataSet],
    },
    options,
  };
  if (chart) {
    chart.destroy();
  }
  const ctx = document.getElementById('canvas').getContext('2d');
  chart = new Chart(ctx, config);
}

(function() {
  init();
})();
