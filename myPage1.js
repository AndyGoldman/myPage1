					var width = 1280,
    					height = 120,
							i = -1,
    					θ = 0,
    					δθ = .03,
    					n = 2000,
    					k = 10; // samples to replace per frame

					var randomX = d3.random.normal(width / 2, 80),
							randomY = d3.random.normal(height / 2, 80),
    					points = d3.range(n).map(function() { return [randomX(), randomY()]; });

					var color = d3.scale.linear()
    					.domain([0, 20])
    					.range(["white", "steelblue"])
    					.interpolate(d3.interpolateLab);

					var hexbin = d3.hexbin()
    					.size([width, height])
    					.radius(20);

					var svg = d3.select("header").append("svg")
    					.attr("width", width)
    					.attr("height", height);

					var hexagon = svg.append("g")
    					.attr("class", "hexagons")
  						.selectAll("path")
    					.data(hexbin(points))
  						.enter().append("path")
    					.attr("d", hexbin.hexagon(19.5))
    					.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    					.style("fill", function(d) { return color(d.length); });

					d3.timer(function() {
  					θ += δθ;
  					randomX = d3.random.normal(width / 2 + 80 * Math.cos(θ), 80),
  					randomY = d3.random.normal(height / 2 + 80 * Math.sin(θ), 80);

  					for (var j = 0; j < k; ++j) {
    				i = (i + 1) % n;
						points[i][0] = randomX();
    				points[i][1] = randomY();
  					}

  					hexagon = hexagon
      			.data(hexbin(points), function(d) { return d.i + "," + d.j; });

  					hexagon.exit().remove();

  					hexagon.enter().append("path")
      			.attr("d", hexbin.hexagon(19.5))
      			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  					hexagon
      			.style("fill", function(d) { return color(d.length); });
						});