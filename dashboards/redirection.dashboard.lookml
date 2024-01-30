- dashboard: redirection_dashboard
  title: Redirection Dashboard
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: YcqU9VuQbOxBWFEqUO2bpv
  elements:
  - title: Untitled
    name: Untitled
    model: test_mysql
    explore: products
    type: looker_grid
    fields: [products.product_name, products.product_description, products.product_code]
    sorts: [products.product_name]
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
    listen:
      Product Name: products.product_name
    row: 0
    col: 9
    width: 15
    height: 6
  - title: Untitled
    name: Untitled (2)
    model: test_mysql
    explore: products
    type: looker_line
    fields: [products.product_name, products.quantity_in_stock]
    sorts: [products.product_name]
    limit: 500
    column_limit: 50
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
    show_null_points: true
    interpolation: linear
    ordering: none
    show_null_labels: false
    show_totals_labels: false
    show_silhouette: false
    totals_color: "#808080"
    defaults_version: 1
    listen:
      Product Name: products.product_name
    row: 6
    col: 0
    width: 24
    height: 6
  - title: Untitled
    name: Untitled (3)
    model: test_mysql
    explore: products
    type: looker_pie
    fields: [products.product_name, products.count]
    sorts: [products.product_name]
    limit: 20
    column_limit: 50
    value_labels: legend
    label_type: labPer
    defaults_version: 1
    listen:
      Product Name: products.product_name
    row: 0
    col: 0
    width: 9
    height: 6
  filters:
  - name: Product Name
    title: Product Name
    type: field_filter
    default_value: ''
    allow_multiple_values: false
    required: false
    ui_config:
      type: advanced
      display: popover
    model: test_mysql
    explore: products
    listens_to_filters: []
    field: products.product_name
