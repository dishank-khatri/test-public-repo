looker.plugins.visualizations.add({
    id: 'custom_table_pagination',
    label: 'Custom Table Pagination',
    options: {
      // Any options you want to expose to Looker users
    },
    create: function(element, config) {
      // Create a container for the table
      this.table = element.appendChild(document.createElement('table'));
      this.table.setAttribute('class', 'table');

      // Create a container for holding Previous button, Page numbers, and Next button
      this.controlsContainer = element.appendChild(document.createElement('div'));
      this.controlsContainer.style.display = 'flex'; 
      // this.controlsContainer.style.justifyContent = 'space-between'; // Optional: Adjust the space between the controls

      // Create a container for Previous button
      this.prevContainer = this.controlsContainer.appendChild(document.createElement('div'));
      this.prevContainer.style.marginTop = '10px';
      
      // Create a container for page numbers
      this.pageNumbersContainer = this.controlsContainer.appendChild(document.createElement('div'));
      this.pageNumbersContainer.style.marginTop = '10px';

      // Create a container for Next button
      this.nextContainer = this.controlsContainer.appendChild(document.createElement('div'));
      this.nextContainer.style.marginTop = '10px';

      // Applying styling to the table
      this.table.style.width = '100%';
      this.table.style.borderCollapse = 'collapse';
      this.table.style.marginTop = '20px';

      // Initialize page number
      this.currentPage = 1;

      this.rowsPerPage = 5;
    },

    paginate : function(queryResponse, data, desiredPage){
      console.log("Desired Page: ", desiredPage)
      if(desiredPage)
        this.currentPage = desiredPage;
      // Extract data from Looker's query response
      var col1 = queryResponse.fields.dimension_like[0].name;
      var col2 = queryResponse.fields.dimension_like[1].name;

      // Calculate the start and end indices based on the current page
      var startIndex = (this.currentPage - 1) * this.rowsPerPage;
      var endIndex = startIndex + this.rowsPerPage;

      // Clear existing rows and page numbers
      while (this.table.rows.length > 1) {
        this.table.deleteRow(1);
      }
      // Populate the table with data for the current page
      for (var i = startIndex; i < Math.min(endIndex, data.length); ++i) {
          // var row = this.table.insertRow(i+1);
          var row = this.table.insertRow(i-startIndex+1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);

          cell1.textContent = data[i][col1].value;
          cell2.textContent = data[i][col2].value;
      }
    },

    dynamic_page: function(){
      // Store the current styles
      let buttonStyles = [];
      document.querySelectorAll('button').forEach(el => {
        buttonStyles.push({
          id: el.id,
          backgroundColor: el.style.backgroundColor,
          color: el.style.color
        });
      });
      // Clear existing page number buttons
      this.pageNumbersContainer.innerHTML = "";          
      let start_page = Math.max(1, this.currentPage - Math.floor(this.fixedPage / 2));
      let end_page = Math.min(this.totalPages, start_page+this.fixedPage-1);
      // For last half number of fixed pages (5)
      if (start_page > this.totalPages-this.fixedPage+1)
          start_page = this.totalPages-this.fixedPage+1;
      console.log("Start:End", start_page, end_page);
      for (let page = start_page; page <= end_page; ++page) {
        var pageNumberElement = document.createElement('button');
      
        pageNumberElement.textContent = page;
        pageNumberElement.style.marginRight = '5px';
        pageNumberElement.style.cursor = 'pointer';
        pageNumberElement.id = page;
        // Find and apply the stored styles
        let storedStyle = buttonStyles.find(style => style.id === page.toString());
        if (storedStyle) {
          pageNumberElement.style.backgroundColor = storedStyle.backgroundColor;
          pageNumberElement.style.color = storedStyle.color;
        } else {
          // Apply default styles if not found (or set your default styles)
          pageNumberElement.style.backgroundColor = '#ffffff';
          pageNumberElement.style.color = '#000000';
        }
        pageNumberElement.onclick =  (evt) => {
          document.querySelectorAll('button').forEach(el => {
            el.style.backgroundColor = '#ffffff';
            el.style.color = '#000000';
          });
          // Apply styles to the clicked page number
          evt.target.style.backgroundColor = '#ffcccb';
          evt.target.style.color = '#000000';
          this.currentPage = evt.target.id;
          // 1st 2 conditions are when clicked on pg no's apart from 1st and last
          // last 2 conditions are opposite
          if (parseInt(this.currentPage) > 1) {
              this.btn.disabled=false;
          }
          if (parseInt(this.currentPage) < this.totalPages) {
              this.btn1.disabled=false;
          }
          if (parseInt(this.currentPage) === 1) {
              this.btn.disabled=true;
          }
          if (parseInt(this.currentPage) === this.totalPages) {
              this.btn1.disabled=true;
          }
          console.log('Clicked on page number: ', this.currentPage);
          this.paginate();
          this.dynamic_page();
      };
      this.pageNumbersContainer.appendChild(pageNumberElement);
    }
  },

    updateAsync: function(data, element, config, queryResponse, details, done) {
      this.pageNumbersContainer.innerHTML = '';
      var headerRow = this.table.insertRow(0);
      headerRow.insertCell(0).textContent = 'Order Number';
      headerRow.insertCell(1).textContent = 'Order Date';
      this.totalPages = Math.ceil(data.length / this.rowsPerPage);
      this.fixedPage = Math.min(this.totalPages, 10);

      this.paginate(queryResponse, data)

      this.btn = document.createElement("button");
      this.btn.innerHTML = "Prev";
      this.btn.id = "prev";
      this.btn.style.marginRight = '5px';
      this.btn.disabled = true;

      this.btn.onclick =  () => {
          // Remove styles from all page buttons
          document.querySelectorAll('button').forEach(el => {
            el.style.backgroundColor = '#ffffff';
            el.style.color = '#000000';
          });
          console.log("Current page",this.currentPage);
          // When clicked on prev and page is 1
          if (parseInt(this.currentPage) === 2) {
              this.btn.disabled=true;
          }
          else {
            this.btn.disabled=false;
            this.btn1.disabled=false;
          }
          document.getElementById(parseInt(this.currentPage)-1).style.backgroundColor = '#ffcccb';
          document.getElementById(parseInt(this.currentPage)-1).style.color = '#000000';

          this.paginate(queryResponse, data, parseInt(this.currentPage)-1);
          this.dynamic_page();
      };
      this.prevContainer.appendChild(this.btn);

      this.dynamic_page()

      // Highlight 1st page initially.
      document.getElementById(parseInt(this.currentPage)).style.backgroundColor = '#ffcccb';
      document.getElementById(parseInt(this.currentPage)).style.color = '#000000';

      this.btn1 = document.createElement("button");
      this.btn1.innerHTML = "Next";
      this.btn1.id = "next";
      this.btn1.onclick =  () => {
          // Remove styles from all page buttons
          document.querySelectorAll('button').forEach(el => {
            el.style.backgroundColor = '#ffffff';
            el.style.color = '#000000';
          });
          console.log("Current page",this.currentPage);
          // When clicked on next and page is last
          if (parseInt(this.currentPage) === totalPages-1) {
            this.btn1.disabled=true;
          }
          else{
            this.btn1.disabled=false;
            this.btn.disabled=false;
          }
          document.getElementById(parseInt(this.currentPage)+1).style.backgroundColor = '#ffcccb';
          document.getElementById(parseInt(this.currentPage)+1).style.color = '#000000';

          this.paginate(queryResponse, data, parseInt(this.currentPage) +1);
          this.dynamic_page();
      }
      this.nextContainer.appendChild(this.btn1);
      // Signal the completion of rendering
      done();
    }
  });
