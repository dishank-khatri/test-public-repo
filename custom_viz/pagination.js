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

      var headerRow = this.table.insertRow(0);
      headerRow.insertCell(0).textContent = 'Category Name';
      headerRow.insertCell(1).textContent = 'Category ID';

      // Initialize page number
      this.currentPage = 1;

      // Fetch data and update the table
      this.updateAsync();
    },

    updateAsync: function(data, element, config, queryResponse, details, done) {
      // ... (existing code)
      console.log('Function Called..')

      // Extract data from Looker's query response
      var col1 = queryResponse.fields.dimension_like[0].name;
      var col2 = queryResponse.fields.dimension_like[1].name;

      // Define the number of rows per page
      var rowsPerPage = 4;
      console.log(this.currentPage);
      // Calculate the start and end indices based on the current page
      var startIndex = (this.currentPage - 1) * rowsPerPage;
      var endIndex = startIndex + rowsPerPage;

      // Clear existing rows and page numbers
      while (this.table.rows.length > 1) {
        this.table.deleteRow(1);
      }
      this.pageNumbersContainer.innerHTML = '';
      // console.log("Data Length: ", data.length);
      console.log(startIndex,endIndex);
      // Populate the table with data for the current page
      for (var i = startIndex; i < Math.min(endIndex, data.length); ++i) {
        // ... (existing code)
          // var row = this.table.insertRow(i+1);
          var row = this.table.insertRow(i-startIndex+1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);

          cell1.textContent = data[i][col1].value;
          cell2.textContent = data[i][col2].value;
      }

      // Add page numbers
      var totalPages = Math.ceil(data.length / rowsPerPage);
      // console.log("Total Pages", totalPages);
      for (var page = 1; page <= totalPages; page++) {
        var pageNumberElement = document.createElement('span');
        pageNumberElement.textContent = page;
        pageNumberElement.style.marginRight = '5px';
        pageNumberElement.style.cursor = 'pointer';
        pageNumberElement.onclick = (function (pageNum) {
          return function () {
            console.log('Clicked on page number:', pageNum);
            this.currentPage = pageNum;
            console.log('Updated currentPage:', this.currentPage);
            this.updateAsync();
          }.bind(this);
        })(page);
        // pageNumberElement.onclick = (pageNum) => {
        //   console.log('Clicked on page number:', pageNum);
        //   this.currentPage = pageNum;
        //   console.log('Updated currentPage:', this.currentPage);
        //   this.updateAsync();
        // };
        this.pageNumbersContainer.appendChild(pageNumberElement);
      }

      // Signal the completion of rendering
      done();
    }
  });
