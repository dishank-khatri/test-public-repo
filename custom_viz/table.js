// Use Looker's Visualization API
looker.plugins.visualizations.add({
    id: 'custom_table',
    label: 'Custom Table',
    options: {
      // Any options you want to expose to Looker users
    },
    create: function(element, config) {
      // Create a container for the table
      this.table = element.appendChild(document.createElement('table'));
      this.table.setAttribute('class', 'table');

      // Applying styling to the table
      this.table.style.width = '100%';
      this.table.style.borderCollapse = 'collapse';
      this.table.style.marginTop = '20px';

      // Fetch data and update the table
      this.updateAsync();
    },

    updateAsync: function(data, element, config, queryResponse, details, done) {

      // Create table headers
      var headerRow = this.table.insertRow(0);
      headerRow.insertCell(0).textContent = 'Product Name';
      headerRow.insertCell(1).textContent = 'Product Buy Price';
      headerRow.insertCell(2).textContent = 'Progress Bar';
      headerRow.insertCell(3).textContent = 'Sparkline';

      // Clear existing rows
      while (this.table.rows.length > 1) {
        this.table.deleteRow(1);
      }
      // Extract data from Looker's query response
      var col1 = queryResponse.fields.dimension_like[0].name;
      var col2 = queryResponse.fields.dimension_like[1].name;

      // Populate the table with data
      for (var i = 0; i < data.length; ++i) {
          var row = this.table.insertRow(i + 1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);

          // Use the correct field names based on your LookML model
          cell1.textContent = data[i][col1].value;
          cell2.textContent = data[i][col2].value;

          // Add a progress bar to the third column
          var progressBar = document.createElement('progress');
          progressBar.max = 100; // Set the maximum value for the progress bar
          progressBar.value = Math.random() * 100; // Set a random value for demonstration purposes
          cell3.appendChild(progressBar);

          function drawSparkline(canvas, data) {

              var ctx = canvas.getContext('2d');
              // ctx.strokeStyle = 'red';
              // ctx.beginPath();
              // ctx.moveTo(0, canvas.height / 2);
              // ctx.lineTo(canvas.width, canvas.height / 2);
              // ctx.stroke();

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              // // Determine the maximum value in the data array
              // var maxValue = Math.max(...data);

              // // Calculate the scaling factor for the sparkline
              // var scaleX = canvas.width / (data.length - 1);
              // var scaleY = canvas.height / maxValue;

              // // Start drawing the sparkline
              // ctx.beginPath();
              // ctx.moveTo(0, canvas.height - data[0] * scaleY);

              // for (var i = 1; i < data.length; i++) {
              //   ctx.lineTo(i * scaleX, canvas.height - data[i] * scaleY);
              // }

              // // Draw the line
              // ctx.strokeStyle = 'blue';
              // ctx.lineWidth = 2;
              // ctx.stroke();

              new Chart(ctx, {
                type: 'line',
                data: {
                  labels: data.map((_, index) => index + 1), // Labels as 1, 2, 3, ...
                  datasets: [
                    {
                      data: data,
                      borderColor: 'blue',
                      borderWidth: 2,
                      fill: false,
                      pointRadius: 0,
                    },
                  ],
                },
                options: {
                  responsive: false, // Disable responsiveness for simplicity
                  maintainAspectRatio: false, // Disable aspect ratio for simplicity
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false, // Do not display legend
                    },
                  },
                },
              });

          }

           // Add a sparkline to the fourth column
          var sparkline = document.createElement('canvas');
          sparkline.width = 100;
          sparkline.height = 20;
          cell4.appendChild(sparkline);

          // Draw the sparkline
          drawSparkline(sparkline, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

           // Function to handle the click event
          function openDashboard(productName) {
              var dashboardUrl = "https://crestdatabi.cloud.looker.com/embed/dashboards/test_mysql::redirection_dashboard"; // Replace with your actual dashboard URL
              // window.open(`${dashboardUrl}?Product+Name=${encodeURIComponent(productName)}`, '_blank');
              try{
                    console.log(productName);
                    const dataTosend = { type: 'productName', data: {name: productName, dashboardUrl: `${dashboardUrl}?Product+Name=${encodeURIComponent(productName)}`},};
                    window.parent.parent.postMessage(dataTosend, '*');
              } catch(error){
                  console.log(error);
              }
          }

          // Add a click event to the row to handle the link click
          row.style.cursor = 'pointer';
          row.onclick = (function (productName) {
              return function () {
                  openDashboard(productName);
              };
          })(data[i][col1].value);
      }

      // Signal the completion of rendering
      done();
    }
  });
