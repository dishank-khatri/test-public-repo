- dashboard: cross_filtering_functionality
  title: Cross Filtering Functionality
  layout: newspaper
  preferred_viewer: dashboards-next
  crossfilter_enabled: true
  description: ''
  preferred_slug: EVgNbNBR3E0HcbOAKvN2pE
  elements:
  - title: Customer names
    name: Customer names
    model: test_mysql
    explore: customers
    type: looker_pie
    fields: [customers.customer_name, customers.count]
    sorts: [customers.count desc 0]
    limit: 20
    column_limit: 50
    value_labels: labels
    label_type: lab
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    y_axis_tick_density_custom: 5
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_scale_mode: linear
    x_axis_reversed: false
    y_axis_reversed: false
    plot_size_by_field: false
    trellis: ''
    stacking: ''
    limit_displayed_rows: false
    legend_position: center
    point_style: none
    show_value_labels: false
    label_density: 25
    x_axis_scale: auto
    y_axis_combined: true
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 1
    listen: {}
    row: 0
    col: 0
    width: 12
    height: 8
  - title: Contact and Address Details
    name: Contact and Address Details
    model: test_mysql
    explore: customers
    type: looker_grid
    fields: [customers.customer_name, customers.contact_last_name, customers.contact_first_name,
      customers.address_line1, customers.address_line2]
    sorts: [customers.customer_name]
    limit: 20
    column_limit: 50
    show_view_names: false
    show_row_numbers: true
    transpose: false
    truncate_text: true
    hide_totals: false
    hide_row_totals: false
    size_to_fit: true
    table_theme: white
    limit_displayed_rows: false
    enable_conditional_formatting: false
    header_text_alignment: left
    header_font_size: 12
    rows_font_size: 12
    conditional_formatting_include_totals: false
    conditional_formatting_include_nulls: false
    defaults_version: 1
    row: 8
    col: 0
    width: 24
    height: 7
  - title: Customer Details
    name: Customer Details
    model: test_mysql
    explore: customers
    type: looker_grid
    fields: [customers.customer_name, customers.phone, customers.customer_number]
    sorts: [customers.customer_name]
    limit: 500
    column_limit: 50
    show_view_names: false
    show_row_numbers: true
    transpose: false
    truncate_text: true
    hide_totals: false
    hide_row_totals: false
    size_to_fit: true
    table_theme: white
    limit_displayed_rows: false
    enable_conditional_formatting: false
    header_text_alignment: left
    header_font_size: 12
    rows_font_size: 12
    conditional_formatting_include_totals: false
    conditional_formatting_include_nulls: false
    defaults_version: 1
    row: 0
    col: 12
    width: 12
    height: 8
  - title: Region Details
    name: Region Details
    model: test_mysql
    explore: customers
    type: looker_google_map
    fields: [customers.customer_name, customers.city, customers.state, customers.country]
    sorts: [customers.customer_name]
    limit: 500
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    row: 15
    col: 0
    width: 24
    height: 7
