project_name: "test_mysql"

# # Use local_dependency: To enable referencing of another project
# # on this instance with include: statements
#
# local_dependency: {
#   project: "name_of_other_project"
# }
visualization: {
  id: "donut_viz"
  label: "donut_viz"
  file: "custom_viz/donut.js"
  dependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.utils.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.min.js",
  ]
}

visualization: {
  id: "table_viz"
  label: "table_viz"
  file: "custom_viz/table.js"
  dependencies: [
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/helpers.min.js",
  ]
}

visualization: {
  id: "pagination_viz"
  label: "pagination_viz"
  file: "custom_viz/pagination.js"
}

visualization: {
  id: "jquery_table"
  label: "jquery_table"
  file: "custom_viz/jquery_pagination.js"
  dependencies: [
   "https://code.jquery.com/jquery-3.7.0.js",
   "https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"
  ]
}