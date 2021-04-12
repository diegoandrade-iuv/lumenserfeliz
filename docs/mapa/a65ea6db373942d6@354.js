// https://observablehq.com/@diegoandrade-iuv/membros-ser-feliz-por-unidade-de-federacao@354
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Novos membros ser feliz por estado`
)});
  main.variable(observer("buildvis")).define("buildvis", ["d3","DOM","topojson","br","colorScale","ufMap","showTooltip","hideTooltip"], function(d3,DOM,topojson,br,colorScale,ufMap,showTooltip,hideTooltip)
{
  const width = 600
  const height = 600
  const svg = d3.select(DOM.svg(width, height))
  let path = d3.geoPath()
  var projection = d3.geoMercator()
	  .scale(815)
	  .center([-52, -15])
	  .translate([width / 2 + 18, height / 2 + 20]);

	path = d3.geoPath().projection(projection);
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(br, br.objects.estados).features)
    .enter().append("path")       
      .attr("fill", d => colorScale(Math.log(ufMap.get(d.id))))
      .attr("d", path)
  .on("mouseover", function(d){
    console.log(d)      
    d3.select(this)
            .style("cursor", "pointer")
            .attr("stroke-width", 2)
            .attr("stroke", "#DB9D15");
          
          const rect = this.getBoundingClientRect();
          showTooltip(d.id, rect.x, rect.y);
      })
      .on("mouseout", function(d){
          d3.select(this)
            .style("cursor", "default")
            .attr("stroke-width", 0)
            .attr("stroke", "none");
      
            hideTooltip();
      })

  svg.append("path")
      .datum(topojson.mesh(br, br.objects.estados, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path)
  
  return svg.node()
}
);
  main.variable(observer("tooltip")).define("tooltip", ["d3"], function(d3)
{
   d3.select("#tooltip").remove();
   let node = d3.select("body")
                .append("div")
                .attr("id","tooltip")
                .attr("class", "hidden")
                .append("p")
                .html("<b><span id='nomeEstado'></span></b> </br>")
                .append("p")
                .html("Quantidade de Cadastros: <span id='taxa'></span>")
   return node;
}
);
  main.variable(observer("showTooltip")).define("showTooltip", ["d3","ufMap","ConverterEstados","width"], function(d3,ufMap,ConverterEstados,width){return(
function showTooltip(county_id, x, y) {
  console.log(county_id)
  const offset = 10;
  const t = d3.select("#tooltip");
  t.select("#taxa").text(ufMap.get(county_id)==null?0:ufMap.get(county_id));
  t.select("#nomeEstado").text(ConverterEstados(county_id));
  t.classed("hidden", false);
  const rect = t.node().getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  if (x + offset + w > width) {
    x = x - w;
  }  
  t.style("left", x + offset + "px").style("top", y - h + "px");
}
)});
  main.variable(observer("ConverterEstados")).define("ConverterEstados", function(){return(
function(val) {
	var data;

	switch (val.toUpperCase()) {
		/* UFs */
		case "AC" :	data = "Acre";					break;
		case "AL" :	data = "Alagoas";				break;
		case "AM" :	data = "Amazonas";				break;
		case "AP" :	data = "Amapá";					break;
		case "BA" :	data = "Bahia";					break;
		case "CE" :	data = "Ceará";					break;
		case "DF" :	data = "Distrito Federal";		break;
		case "ES" :	data = "Espírito Santo";		break;
		case "GO" :	data = "Goiás";					break;
		case "MA" :	data = "Maranhão";				break;
		case "MG" :	data = "Minas Gerais";			break;
		case "MS" :	data = "Mato Grosso do Sul";	break;
		case "MT" :	data = "Mato Grosso";			break;
		case "PA" :	data = "Pará";					break;
		case "PB" :	data = "Paraíba";				break;
		case "PE" :	data = "Pernambuco";			break;
		case "PI" :	data = "Piauí";					break;
		case "PR" :	data = "Paraná";				break;
		case "RJ" :	data = "Rio de Janeiro";		break;
		case "RN" :	data = "Rio Grande do Norte";	break;
		case "RO" :	data = "Rondônia";				break;
		case "RR" :	data = "Roraima";				break;
		case "RS" :	data = "Rio Grande do Sul";		break;
		case "SC" :	data = "Santa Catarina";		break;
		case "SE" :	data = "Sergipe";				break;
		case "SP" :	data = "São Paulo";				break;
		case "TO" :	data = "Tocantíns";				break;
		
		/* Estados */
		case "ACRE" :					data = "AC";	break;
		case "ALAGOAS" :				data = "AL";	break;
		case "AMAZONAS" :				data = "AM";	break;
		case "AMAPÁ" :					data = "AP";	break;
		case "BAHIA" :					data = "BA";	break;
		case "CEARÁ" :					data = "CE";	break;
		case "DISTRITO FEDERAL" :		data = "DF";	break;
		case "ESPÍRITO SANTO" :			data = "ES";	break;
		case "GOIÁS" :					data = "GO";	break;
		case "MARANHÃO" :				data = "MA";	break;
		case "MINAS GERAIS" :			data = "MG";	break;
		case "MATO GROSSO DO SUL" :		data = "MS";	break;
		case "MATO GROSSO" :			data = "MT";	break;
		case "PARÁ" :					data = "PA";	break;
		case "PARAÍBA" :				data = "PB";	break;
		case "PERNAMBUCO" :				data = "PE";	break;
		case "PIAUÍ" :					data = "PI";	break;
		case "PARANÁ" :					data = "PR";	break;
		case "RIO DE JANEIRO" :			data = "RJ";	break;
		case "RIO GRANDE DO NORTE" :	data = "RN";	break;
		case "RONDÔNIA" : 				data = "RO";	break;
		case "RORAIMA" :				data = "RR";	break;
		case "RIO GRANDE DO SUL" :		data = "RS";	break;
		case "SANTA CATARINA" :			data = "SC";	break;
		case "SERGIPE" :				data = "SE";	break;
		case "SÃO PAULO" :				data = "SP";	break;
		case "TOCANTÍNS" :				data = "TO";	break;
	}

	return data;
}
)});
  main.variable(observer("hideTooltip")).define("hideTooltip", ["d3"], function(d3){return(
function hideTooltip(){
  d3.select("#tooltip")
  .classed("hidden", true)
}
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3","ufGroup"], function(d3,ufGroup){return(
d3.scaleQuantile()
                .domain([0,Math.log(ufGroup.top(1)[0].value)])
                .range(d3.schemeBlues[6])
)});
  main.variable(observer("ufMap")).define("ufMap", ["ufGroup"], function(ufGroup)
{
    let map = new Map()
    ufGroup.all().forEach(function(data){
      map.set(data.key,data.value)  
    })
return map
}
);
  main.variable(observer("br")).define("br", ["d3"], function(d3){return(
d3.json('https://gist.githubusercontent.com/ruliana/1ccaaab05ea113b0dff3b22be3b4d637/raw/196c0332d38cb935cfca227d28f7cecfa70b412e/br-states.json')
)});
  main.variable(observer("cadastros")).define("cadastros", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/diegoandrade-iuv/lumenserfeliz/main/Cadastros%202020.csv").then(function (data) {
  let parseData  = d3.timeParse('%d/%m/%Y %H:%M')
  data.forEach(function(d) {
    d['Dt Inclusão'] = parseData(d['Dt Inclusão']);
  })
  return data
})
)});
  main.variable(observer("facts")).define("facts", ["crossfilter","cadastros"], function(crossfilter,cadastros){return(
crossfilter(cadastros)
)});
  main.variable(observer("ufGroup")).define("ufGroup", ["ufDim"], function(ufDim){return(
ufDim.group()
)});
  main.variable(observer("ufDim")).define("ufDim", ["facts"], function(facts){return(
facts.dimension(d =>d.UF)
)});
  main.variable(observer()).define(["html"], function(html){return(
html`Esta célula contém os estilos da visualização.
<html lang="pt-br">
<style>

		.counties {
		  fill: WhiteSmoke;
      stroke: #eee;
		  stroke-linejoin: round;
      border: solid 1px black;
		}

		.states {
		  fill: none;
		  stroke: #eee;
		  stroke-linejoin: round;
      border: solid 1px black;
		}

   #tooltip {
      position: absolute;
      width: auto;
      height: auto;
      padding: 10px;
      border: solid 1px darkgray;
      background-color: white;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      pointer-events: none;
   }

  #tooltip.hidden {
     display: none;
  }

  #tooltip p {
      margin: 0;
      font-family: sans-serif;
      font-size: 16px;
      line-height: 20px;
  }

	</style>`
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require('crossfilter2')
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
