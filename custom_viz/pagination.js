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

      // Create a container for page numbers
      this.pageNumbersContainer = element.appendChild(document.createElement('div'));
      this.pageNumbersContainer.style.marginTop = '10px';

      // Applying styling to the table
      this.table.style.width = '100%';
      this.table.style.borderCollapse = 'collapse';
      this.table.style.marginTop = '20px';

      // Initialize page number
      this.currentPage = 1;

      // Fetch data and update the table
      this.updateAsync();
    },

    updateAsync: function(data, element, config, queryResponse, details, done) {
      // ... (existing code)

      // Extract data from Looker's query response
      var col1 = queryResponse.fields.dimension_like[0].name;
      var col2 = queryResponse.fields.dimension_like[1].name;

      // Define the number of rows per page
      var rowsPerPage = 10;

      // Calculate the start and end indices based on the current page
      var startIndex = (this.currentPage - 1) * rowsPerPage;
      var endIndex = startIndex + rowsPerPage;

      // Clear existing rows and page numbers
      while (this.table.rows.length > 1) {
        this.table.deleteRow(1);
      }
      this.pageNumbersContainer.innerHTML = '';

      // Populate the table with data for the current page
      for (var i = startIndex; i < Math.min(endIndex, data.length); ++i) {
        // ... (existing code)
      }

      // Add page numbers
      var totalPages = Math.ceil(data.length / rowsPerPage);
      for (var page = 1; page <= totalPages; page++) {
        var pageNumberElement = document.createElement('span');
        pageNumberElement.textContent = page;
        pageNumberElement.style.marginRight = '5px';
        pageNumberElement.style.cursor = 'pointer';
        pageNumberElement.onclick = (function (pageNum) {
          return function () {
            this.currentPage = pageNum;
            this.updateAsync();
          }.bind(this);
        })(page);
        this.pageNumbersContainer.appendChild(pageNumberElement);
      }

      // Signal the completion of rendering
      done();
    }
  });
