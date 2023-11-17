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

    // Create a container for the text line
    // this.textContainer = element.appendChild(document.createElement("div"));
    // this.textContainer.setAttribute("id", "text-line-container");
    // this.textContainer.style.fontSize = "16px";
    // this.textContainer.style.textAlign = "center";
    // this.textContainer.style.padding = "5px";
    // this.textContainer.style.fontFamily = "Arial";


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
    // var threatcolumn = queryResponse.fields.measure_like[0].name
    // // Calculate the count value from the data
    // const count = data.length;
    // let list=[]
    // let list1=[]
    // for (var i of queryResponse.fields.measures) {
    //   var th = document.createElement('th');
    //   list.push(i.name);
    // }
    // data.forEach(function (row) {
    //   Object.keys(row).forEach(function (key) {
    //     list1.push(row[key].value);
    //   });
    // });
    // Calculate the percentage value based on the available count
    // const estimatedTotalItems = 100;
    // const threat_count = count ? data[0][threatcolumn].value:0;
    // var threat1_count = 0;
    // if (count != 1 && count != 0) {
    //     threat1_count = data[1][threatcolumn].value
    // }
    // const threat_count_difference = count ? threat_count - threat1_count:0
    // var percentage = 0
    // if (count != 1 && count != 0) {
    //     percentage = count ? ((threat_count_difference / threat1_count) * estimatedTotalItems):0;
    // }
    // const arrowIcon = percentage > 0 ? '➚' : '➘';

    // var color;
    // if (percentage <= 0) {
    //   color = 'green';
    // }
    // else {
    //   color = 'red';
    // }

    // Display the count and percentage value in the container
    // this.container.innerHTML = `
    //   <div style="display: flex; align-items: center;">
    //     <div style="font-size: 60px; font-family: Arial, Helvetica, sans-serif;">1</div>
    //     <div style="display: flex; flex-direction: column; align-items: flex-start;">
    //       <div style="font-size: 30px; font-family: Arial, Helvetica, sans-serif;">2</div>
    //       <div style="font-size: 20px; text-align: right; font-family: Arial, Helvetica, sans-serif;">3</div>
    //     </div>
    //   </div>
    // `;

    // Display the text line below the count value
    // this.textContainer.textContent = "Today vs Yesterday";
    // this.textContainer.style.fontSize = "12px";
    // this.textContainer.style.fontFamily = "Arial, Helvetica, sans-serif";

    // Extract data from Looker's query response
    // var labels = [];
    var labels = ["Label 1", "Label 2", "Label 3"]
    var datasets = [30, 40, 30];

    // var xField = queryResponse.fields.dimension_like[0].name;
    // var yField = queryResponse.fields.measure_like[0].name;

    // Populate labels and datasets based on your data model
    // data.forEach(function(row) {
    //   datasets.push(row[yField].value ? row[yField].value : 0);
    //   labels.push(row[xField].value);
    // });

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
            data: datasets,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
          }],
        },
        options: {
          cutoutPercentage: 50, // Adjust as needed
          responsive: true,
          maintainAspectRatio: false, // Adjust as needed
        },
      });

    this.chart.canvas.style.height = '250px';
    this.chart.canvas.style.width = '200px';
    // Update the chart
    this.chart.update();

    // Signal the completion of rendering
    done();
  }
});
