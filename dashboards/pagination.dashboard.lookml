- dashboard: pagination
  title: Pagination
  layout: newspaper
  preferred_viewer: dashboards-next
  description: ''
  preferred_slug: SXvXrypbj3EZB0TkCYXRBB
  elements:
  - title: Pagination
    name: Pagination
    model: test_mysql
    explore: orders
    type: test_mysql::pagination_viz
    fields: [orders.order_number, orders.order_date]
    sorts: [orders.order_date desc]
    limit: 50
    column_limit: 50
    hidden_fields: []
    hidden_points_if_no: []
    series_labels: {}
    show_view_names: true
    defaults_version: 0
    listen: {}
    row: 0
    col: 0
    width: 24
    height: 12
