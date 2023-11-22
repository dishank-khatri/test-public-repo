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
      headerRow.insertCell(0).textContent = queryResponse.fields.dimension_like[0].name;
      headerRow.insertCell(1).textContent = queryResponse.fields.dimension_like[1].name;

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
          // var cell3 = row.insertCell(2);

          // Use the correct field names based on your LookML model
          cell1.textContent = data[i][col1].value;
          cell2.textContent = data[i][col2].value;
          // Customize cell content or styling as needed
          // Add a link or button for each row
          // var dashboardUrl = 'https://4e8cbc7f-de3f-4e85-b308-1d06a77bfb07.looker.app/dashboards/8'; // Replace with your actual dashboard URL
          // var link = document.createElement('a');

           // Function to handle the click event
          function openDashboard(productName) {
              var dashboardUrl = 'https://4e8cbc7f-de3f-4e85-b308-1d06a77bfb07.looker.app/dashboards/8'; // Replace with your actual dashboard URL
              window.open(`${dashboardUrl}?Product+Name=${encodeURIComponent(productName)}`, '_blank');
          }

          // link.textContent = 'View Dashboard';

          // link.href = `${dashboardUrl}?Product+Name=${encodeURIComponent(data[i][col1].value)}`;
          // link.target = '_blank'; // Open in a new tab/window

          // cell3.appendChild(link);

          // Add a click event to the row to handle the link click
          row.style.cursor = 'pointer';
          // row.onclick = function() {
          //   window.open(link.href, '_blank');
          // };
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
