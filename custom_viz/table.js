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
  
      // Create table headers
      var headerRow = this.table.insertRow(0);
      headerRow.insertCell(0).textContent = 'Column 1';
      headerRow.insertCell(1).textContent = 'Column 2';
      // Add more header cells as needed
  
      // Applying styling to the table
      this.table.style.width = '100%';
      this.table.style.borderCollapse = 'collapse';
      this.table.style.marginTop = '20px';
  
      // Fetch data and update the table
      this.updateAsync();
    },
  
    updateAsync: function(data, element, config, queryResponse, details, done) {
      // Extract data from Looker's query response
      var rows = data.map(function(row) {
        return [row[0].value, row[1].value];
        // Map additional columns as needed
      });
  
      // Clear existing rows
      while (this.table.rows.length > 1) {
        this.table.deleteRow(1);
      }
  
      // Populate the table with data
      for (var i = 0; i < rows.length; ++i) {
        var row = this.table.insertRow(i + 1);
        for (var j = 0; j < rows[i].length; ++j) {
          var cell = row.insertCell(j);
          cell.textContent = rows[i][j];
          // Customize cell content or styling as needed
        }
      }
  
      // Signal the completion of rendering
      done();
    }
  });
  