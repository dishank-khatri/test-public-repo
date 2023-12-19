view: sunburst {
  sql_table_name: classicmodels.sunburst ;;
  drill_fields: [id]

  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }
  dimension: name {
    type: string
    sql: ${TABLE}.name ;;
  }
  dimension: parent_id {
    type: number
    sql: ${TABLE}.parent_id ;;
  }
  measure: size {
    type: number
    sql: ${TABLE}.size ;;
  }
  measure: count {
    type: count
    drill_fields: [id, name]
  }
}
