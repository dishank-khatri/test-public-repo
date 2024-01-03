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

      // Applying styling to the table
      this.table.style.width = '100%';
      this.table.style.borderCollapse = 'collapse';
      this.table.style.marginTop = '20px';

    },

    updateAsync: function(data, element, config, queryResponse, details, done) {
        var headerRow = this.table.insertRow(0);
        headerRow.insertCell(0).textContent = 'Order Number';
        headerRow.insertCell(1).textContent = 'Order Date';

        done();
    }
});
