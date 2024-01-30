looker.plugins.visualizations.add({
    id: 'jquery_table_pagination',
    label: 'Jquery Table Pagination',
    options: {
      // Any options you want to expose to Looker users
    },
    create: function(element, config) {
      // Create a container for the table
      this.table = element.appendChild(document.createElement('table'));
      this.table.setAttribute('class', 'display');
      this.table.setAttribute('id', 'example')
      this.table.style.width = '100%';
      this.table.style.borderCollapse = 'collapse';
      this.table.style.marginTop = '20px';

      const styleElement = document.createElement('style');
      styleElement.textContent = '@import url("https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css");';
      element.appendChild(styleElement);

    },

    updateAsync: function(data, element, config, queryResponse, details, done) {
        this.table.innerHTML = "";
        // console.log(queryResponse);
        const thead = document.createElement('thead');
        const headerRow = thead.insertRow();
        headerRow.innerHTML = '<th>Name</th>' +
                              '<th>Vendor</th>' +
                              '<th>Code</th>' +
                              '<th>MSRP</th>';

        this.table.appendChild(thead);

        // Create the table body
        this.tbody = document.createElement('tbody');
        this.table.appendChild(this.tbody);

        // Create the table footer
        const tfoot = document.createElement('tfoot');
        const footerRow = tfoot.insertRow();
        footerRow.innerHTML = '<th>Name</th>' +
                              '<th>Vendor</th>' +
                              '<th>Code</th>' +
                              '<th>MSRP</th>';

        this.table.appendChild(tfoot);

        // Iterate over the data and create table rows
        data.forEach(item => {
          const row = this.tbody.insertRow();
          row.innerHTML = '<td>' + item['products.product_name']['value'] + '</td>' +
                          '<td>' + item['products.product_vendor']['value'] + '</td>' +
                          '<td>' + item['products.product_code']['value'] + '</td>' +
                          '<td>' + item['products.msrp']['value'] + '</td>';
        });


        // headerRow.insertCell(i).textContent = queryResponse.fields.dimensions[i].label_short;

        $('#example').DataTable({
          pagingType: 'full_numbers'
        });

        done();
    }
});
