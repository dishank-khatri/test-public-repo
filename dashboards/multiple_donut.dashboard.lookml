- dashboard: multiple_donut_chart
  title: Multiple Donut Chart
  layout: newspaper
  preferred_viewer: dashboards-next
  preferred_slug: u2dSEEz0eTIeKWEbrZksOs
  elements:
  - title: Multiple Donut Chart
    name: Multiple Donut Chart
    model: test_mysql
    explore: customers
    type: test_mysql::donut_viz
    fields: [customers.country, customers.count, count_of_city]
    sorts: [customers.count desc]
    limit: 10
    column_limit: 50
    dynamic_fields:
    - measure: count_of_customer_name
      based_on: customers.customer_name
      expression: ''
      label: Count of Customer Name
      type: count_distinct
      _kind_hint: measure
      _type_hint: number
    - measure: count_of_city
      based_on: customers.city
      expression: ''
      label: Count of City
      type: count_distinct
      _kind_hint: measure
      _type_hint: number
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    show_value_labels: true
    font_size: 5
    charts_across:
    hidden_pivots: {}
    defaults_version: 0
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
    listen: {}
    row: 0
    col: 0
    width: 24
    height: 12
