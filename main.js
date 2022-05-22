//---------------------------------- RETO 1---------------------------------------------

const urlR1 = "https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";
d3.json(urlR1).then(data => {
    const canvas = d3.select("#canvas");

    const widhtR1 = 700;
    const heightR1 = 500;
    const marginR1 = {top:10, left:90, bottom: 40, right: 10};
    const iwidthR1 = widhtR1 - marginR1.left - marginR1.right;
    const iheightR1 = heightR1 - marginR1.top - marginR1.bottom;
    
    const svgR1 = canvas.append("svg");
    svgR1.attr("width", widhtR1);
    svgR1.attr("height", heightR1);

    let R1 = svgR1
        .append("g").attr("transform", `translate(${marginR1.left}, ${marginR1.top})`);

    const bars = R1.selectAll("rect").data(data);

    const x1 = d3.scaleLinear() 
        .domain([0, 980000])
        .range([0, iwidthR1]);

    const y1 = d3.scaleBand() 
        .domain(data.map(d => d.name)) 
        .range([0, iheightR1])
        .padding(0.1); 

    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("fill", "purple")
        .attr("x", () => x1(0))
        .attr("y", (d) => y1(d.name))
        .attr("height", y1.bandwidth())
        .attr("width", d => x1(d.value));

    R1.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x1))
        .attr("transform", `translate(0, ${iheightR1})`); 
        
    R1.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y1));

    R1.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("x", 370)
        .attr("y", 15)
        .text("Number of refugees VS. Country of Origin");

    R1.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", 390)
        .attr("y", 485)
        .text("Number of Refugees");

    R1.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", -170)
        .attr("y", -70)
        .attr("transform", "rotate(-90)")
        .text("Country of Origin");
});

//---------------------------------- RETO 2---------------------------------------------

const urlR2 = "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json";

d3.json(urlR2).then(data => {
    const canvas = d3.select("#canvas");

    const widhtR2 = 800;
    const heightR2 = 600;
    const marginR2 = {top:10, left:50, bottom: 40, right: 10};
    const iwidthR2 = widhtR2 - marginR2.left - marginR2.right;
    const iheightR2 = heightR2 - marginR2.top - marginR2.bottom;

    const svgR2 = canvas.append("svg");
    svgR2.attr("width", widhtR2);
    svgR2.attr("height", heightR2);

    let R2 = svgR2
        .append("g").attr("transform", `translate(${marginR2.left}, ${marginR2.top})`);

    const circles = R2.selectAll("circle").data(data);

    const x2 = d3.scaleLinear() 
        .domain([0, 40000])
        .range([0, iwidthR2]);

    const y2 = d3.scaleLinear() 
        .domain([0, 100])
        .range([iheightR2, 0]);

    let arrayPopulations = []
    data.forEach((e) => {
        arrayPopulations.push(parseInt(e.population));
    });

    circles.enter().append("circle")
        .attr("class", "point")
        .attr("fill", "green")
        .attr("cx", (d) => x2(d.purchasingpower))
        .attr("cy", (d) => y2(d.lifeexpectancy))
        .attr("r", (d) => (d.population / Math.max.apply(null, arrayPopulations))*100);

    circles.enter().append("text")
        .attr("x", (d) => x2(d.purchasingpower) + 19)
        .attr("y", (d) => y2(d.lifeexpectancy) + 1)
        .style("font-size", "14px")
        .text((d) => d.country);

    R2.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x2))
        .attr("transform", `translate(0, ${iheightR2})`); 
        
    R2.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y2));

    R2.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("x", 370)
        .attr("y", 10)
        .text("Life Expectancy VS. Adquisition Power");

    R2.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", 420)
        .attr("y", 585)
        .text("Adquisition Power");

    R2.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .attr("x", -220)
        .attr("y", -32)
        .attr("transform", "rotate(-90)")
        .text("Life Expectancy");
});