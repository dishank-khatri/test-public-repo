looker.plugins.visualizations.add({
    id: 'custom_sunburst',
    label: 'Custom Sunburst',
    options: {
      // Any options you want to expose to Looker users
    },

  create: function(element, config){
      this.ele = element.appendChild(document.createElement('div'))
  },

  updateAsync: function(data, element, config, queryResponse, details, done){
    console.log(queryResponse);
    this.ele.innerHTML = '';
    /*data =
    {
        "name": "root",
        "children": [{
          "name": "Bu1",
          "children": [{"name": "P1", "size": 2},
                 {"name": "P2", "size": 1},
                {"name": "P3", "size": 1}
                ]
          },
          {
          "name": "Bu2",
          "children": [{"name": "P1", "size": 2},
                 {"name": "P2", "size": 1}
                ]
          },
          {
          "name": "Bu3",
          "children": [{"name": "P1", "size": 2},
                 {"name": "P2", "size": 1},
                {"name": "P3", "size": 1}
                ]
          },
          {
          "name": "Bu4",
          "children": [{"name": "P1", "size": 2},
                 {"name": "P2", "size": 1}
                ]
          }]
    };*/
    var output = {
        "name":"Topic",
        "children": []
    }

    var dynamicMapping = {};

    data.forEach(function (entry) {
      var bu = entry[queryResponse.fields.dimension_like[0].name]].value;
      var project = entry[queryResponse.fields.dimension_like[1].name].value || "";

      if (!dynamicMapping[bu]) {
        dynamicMapping[bu] = {};
      }

      if (!dynamicMapping[bu][project]) {
        dynamicMapping[bu][project] = 0;
      }

      dynamicMapping[bu][project] += 1;
    });
    // Convert the dynamic mapping to the desired structure
    for (var bu in dynamicMapping) {
      var buChildren = {
        name: bu,
        children: []
      };

      for (var project in dynamicMapping[bu]) {
        buChildren.children.push({
          name: project,
          size: dynamicMapping[bu][project]
        });
      }

      output.children.push(buChildren);
    }

    data = output;

    console.log("Data", data);
        var width = 500;
        var height = 500;
        var radius = Math.min(width,height)/2;
        var color = d3.scaleOrdinal(d3.schemeCategory20b);

        var canvas = d3.select(this.ele).append('svg')
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

      var partition = d3.partition()
        .size([2*Math.PI, radius]);

      var root = d3.hierarchy(data)
        .sum(function (d) {
           return d.size
        });

      partition(root)

      var arc = d3.arc()
        .startAngle(function (d) {return d.x0})
        .endAngle(function (d) {return d.x1})
        .innerRadius(function (d) {return d.y0})
        .outerRadius(function (d) {return d.y1});

      // canvas.selectAll('path')
      //   .data(root.descendants())
      //   .enter()
      //   .append('path')
      //   .attr("display", function (d) { return d.depth ? null : "none"; })
      //   .attr('d',arc)
      //   .style('stroke', '#fff')
      //   .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });

      canvas.selectAll('g')  // <-- 1
        .data(root.descendants())
        .enter().append('g').attr("class", "node")  // <-- 2
        .append('path')  // <-- 2
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });

      // canvas.selectAll('text')
      //     .data(root.descendants())
      //     .enter().append('text')
      //     .attr('transform', d => `translate(${arc.centroid(d)})`)
      //     .attr('dy', '0.35em')
      //     .text(d => d.data.name)
      //     .style('text-anchor', 'middle');

      function computeTextRotation(d) {
        var angle = (d.x0 + d.x1) / Math.PI * 90;  // <-- 1

        // Avoid upside-down labels
        return (angle < 90 || angle > 270) ? angle : angle + 180;  // <--2 "labels aligned with slices"

        // Alternate label formatting
        //return (angle < 180) ? angle - 90 : angle + 90;  // <-- 3 "labels as spokes"
    }

      canvas.selectAll(".node")  // <-- 1
        .append("text")  // <-- 2
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; }) // <-- 3
        .attr("dx", "-20")  // <-- 4
        .attr("dy", ".5em")  // <-- 5
        .text(function(d) { return d.parent ? d.data.name : "" });  // <-- 6

    done()
  }
});
