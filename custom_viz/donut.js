// Use Looker's Visualization API
looker.plugins.visualizations.add({
  id: 'display_count',
  label: 'Display Count',
  create: function(element, config) {
    // Create a container for the count value
    this.container = element.appendChild(document.createElement("div"));
    this.container.setAttribute("id", "count-line-container");

    // Applying Styling to the container
    this.container.style.fontWeight = "bold";
    this.container.style.textAlign = "center";
    this.container.style.padding = "25px";
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.alignItems = "center";

   // Create a container element for your chart
    this.parentNode = document.createElement("div");
    this.parentNode.style.display = "flex";
    this.parentNode.style.flexDirection = "column";
    this.parentNode.style.alignItems = "center";
    this.chart_container = document.createElement("canvas")
    this.chart_container.className = "line-chart-container";
    this.parentNode.appendChild(this.chart_container);
    element.appendChild(this.parentNode);

  },

  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Extract data from Looker's query response

    var DATA_COUNT = 10;
    var labels = [];

    Chart.helpers.srand(4);

    for (var i = 0; i < DATA_COUNT; ++i) {
      labels.push('' + i);
    }

    // Initialize a Chart.js instance
      var ctx = this.chart_container;
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: "doughnut", // Specify the chart type as a line chart
        data: {
          labels: labels,
          datasets: [{
            // backgroundColor: '#F13E18',
            // data: 11,
            backgroundColor: Chart.helpers.colors({
              color: Chart.helpers.color(0),
              count: DATA_COUNT
            }),
            data: Chart.helpers.numbers({
              count: DATA_COUNT,
              min: 0,
              max: 100
            }),
            datalabels: {
              anchor: 'end'
            }
          }, {
            // backgroundColor: '#F1CD18',
            // data: 31,
            backgroundColor: Chart.helpers.colors({
              color: Chart.helpers.color(1),
              count: DATA_COUNT
            }),
            data: Chart.helpers.numbers({
              count: DATA_COUNT,
              min: 0,
              max: 100
            }),
            datalabels: {
              anchor: 'center',
              backgroundColor: null,
              borderWidth: 0
            }
          }, {
            // backgroundColor: '#1FF118',
            // data: 41,
            backgroundColor: Chart.helpers.colors({
              color: Chart.helpers.color(2),
              count: DATA_COUNT
            }),
            data: Chart.helpers.numbers({
              count: DATA_COUNT,
              min: 0,
              max: 100
            }),
            datalabels: {
              anchor: 'start'
            }
          }]
        },
        options: {
          plugins: {
            datalabels: {
              backgroundColor: function(context) {
                return context.dataset.backgroundColor;
              },
              borderColor: 'white',
              borderRadius: 25,
              borderWidth: 2,
              color: 'white',
              display: function(context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > count * 1.5;
              },
              font: {
                weight: 'bold'
              },
              padding: 6,
              formatter: Math.round
            }
          },

          // Core options
          aspectRatio: 4 / 3,
          cutoutPercentage: 32,
          layout: {
            padding: 32
          },
          elements: {
            line: {
              fill: false
            },
            point: {
              hoverRadius: 7,
              radius: 5
            }
          },
        }
      });

    this.chart.canvas.style.height = '200px';
    this.chart.canvas.style.width = '200px';
    // Update the chart
    this.chart.update();

    // Signal the completion of rendering
    done();
  }
});
