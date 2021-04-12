// https://observablehq.com/@mathiascb/visualizacoes-lumen-ser-feliz@846
import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./b2bbebd2f186ed03@1080.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Visualizações Lumen Ser Feliz`
)});
  main.variable(observer("buildcomposite")).define("buildcomposite", ["md","container","dc","width","mesDim","xScale","yScale","nomeMes","parseReal","TotalGroup","MembrosGroup","CadastradosGroup","AvulsasGroup","d3"], function(md,container,dc,width,mesDim,xScale,yScale,nomeMes,parseReal,TotalGroup,MembrosGroup,CadastradosGroup,AvulsasGroup,d3)
{
  let view = md`${container('chart1', 'Valores por mês em 2020')}`  
  let compositeChart = dc.compositeChart(view.querySelector("#chart1")) 
   compositeChart.width(width)
               .height(400) 
               .margins({top: 50, right: 50, bottom: 25, left: 100})
               .dimension(mesDim)                        
               .x(xScale)
               .y(yScale)
               .renderHorizontalGridLines(true)
               .legend(dc.legend().x(width-350).y(5).itemHeight(13).gap(5))
               .brushOn(false)
               .title(function(d) { return nomeMes[d.key.getMonth()] + ": " + parseReal(d.value); })
               .compose([
                   dc.lineChart(compositeChart)
                     .group(TotalGroup, 'Total')
                     .ordinalColors(['#DBCB2C']),
                   dc.lineChart(compositeChart)
                     .group(MembrosGroup, 'Doações de Membros da Comunidade')
                     .ordinalColors(['#DB9D15']),
                  dc.lineChart(compositeChart)
                     .group(CadastradosGroup, 'Doações de Cadastrados Ser Feliz')
                     .ordinalColors(['#68B7E1']),
                  dc.lineChart(compositeChart)
                     .group(AvulsasGroup, 'Doações Pontuais')
                     .ordinalColors(['#0F415C'])
                ])
  compositeChart.yAxis().tickFormat(parseReal) 
  compositeChart.xAxis().tickFormat(d3.timeFormat("%B"))
  dc.renderAll()
  return view      
}
);
  main.variable(observer("BuildBar")).define("BuildBar", ["md","container","dc","width","xScale2","nomeMes","percentFormat","mesDim","pcFixosGroup","pcPontualGroup","pcMembrosGroup"], function(md,container,dc,width,xScale2,nomeMes,percentFormat,mesDim,pcFixosGroup,pcPontualGroup,pcMembrosGroup)
{
  let view = md`${container('test', 'Percetual por mês para os tipos de doação em 2020')}`
  const chart = new dc.BarChart(view.querySelector('#test'));
            chart
              .width(width)
              .height(400)
              .x(xScale2)
              .margins({left: 50, top: 50, right: 50, bottom: 50})
              .brushOn(false)
              .title(function(d) { return nomeMes[d.key.getMonth()] + ": " + percentFormat(d.value)+"%"; })
              //ap(10)
              //.clipPadding(100)              
              .dimension(mesDim)
              .centerBar(true)
              .yAxisLabel("%")
              .group(pcFixosGroup, "Cadastrados Ser Feliz" );
              chart.stack(pcPontualGroup, 'Doações Pontuais');
              chart.stack(pcMembrosGroup,'Membros da Comunidade');
            chart.xUnits(function(){return 15;})
            chart.legend(dc.legend().horizontal(true).x(20).y(20).itemHeight(13).itemWidth(200).legendWidth( 600));
            
            chart.ordinalColors(["#68B7E1","#0F415C", "#DB9D15"])
            chart.render();
            dc.renderAll();
  return view
 }
);
  main.variable(observer("buildBarLines2")).define("buildBarLines2", ["md","container","dc","width","mesDim","xScale2","nomeMes","MembrosQntGroup","MembrosPercaptaGroup","d3","parseReal"], function(md,container,dc,width,mesDim,xScale2,nomeMes,MembrosQntGroup,MembrosPercaptaGroup,d3,parseReal)
{
  let view = md`${container('percapta2', 'Percapta Membros')}`  
  let compositeChart = dc.compositeChart(view.querySelector("#percapta2")) 
     
  compositeChart
              .width(width)
              .height(400)
              .margins({top: 50, right: 60, bottom: 25, left: 40})
              .dimension(mesDim)
              .x(xScale2)
              .xUnits(function(){return 15;})
              .title(function(d) { return nomeMes[d.key.getMonth()] + ": "+ d.value; })
              .renderHorizontalGridLines(true)
              .legend(dc.legend().x(width-350).y(5).itemHeight(13).gap(5))
              .brushOn(false)    
              .compose([
                  dc.barChart(compositeChart)
                    .group(MembrosQntGroup, 'Quantidade de Membros')
                    .centerBar(true)
                    .ordinalColors(['#DB9D15']),
    
                  dc.lineChart(compositeChart)
                    .group(MembrosPercaptaGroup, 'Valor percapta')
                    .ordinalColors(['#048562'])
                    .useRightYAxis(true),
                  ])
  compositeChart.xAxis().tickFormat(d3.timeFormat("%B"))
  compositeChart.rightYAxis().tickFormat(parseReal)
  dc.renderAll()
  return view      
}
);
  main.variable(observer("buildBarLines1")).define("buildBarLines1", ["md","container","dc","width","mesDim","xScale2","nomeMes","fixosQntGroup","fixosPercaptaGroup","d3","parseReal"], function(md,container,dc,width,mesDim,xScale2,nomeMes,fixosQntGroup,fixosPercaptaGroup,d3,parseReal)
{
  let view = md`${container('percapta1', 'Percapta Doadores Fixos')}`  
  let compositeChart = dc.compositeChart(view.querySelector("#percapta1")) 
   compositeChart
              .width(width)
              .height(400)
              .margins({top: 50, right: 50, bottom: 25, left: 40})
              .dimension(mesDim)
              .x(xScale2)
              .xUnits(function(){return 15;})
              .title(function(d) { return nomeMes[d.key.getMonth()] + ": "+ d.value; })
              .renderHorizontalGridLines(true)
              .legend(dc.legend().x(width-350).y(5).itemHeight(13).gap(5))
              .brushOn(false)    
              .compose([                  
                  dc.barChart(compositeChart)
                    .group(fixosQntGroup, 'Quantidade de doadores fixos')
                    .ordinalColors(['#68B7E1'])
                    .centerBar(true),
     
                  dc.lineChart(compositeChart)
                    .group(fixosPercaptaGroup, 'Valor percapta')
                    .ordinalColors(['#048562'])
                    .useRightYAxis(true)
                ])
  compositeChart.xAxis().tickFormat(d3.timeFormat("%B"))
  compositeChart.rightYAxis().tickFormat(parseReal)
  
  dc.renderAll()
  return view      
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`# Novos Cadastros por UF`
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
        .attr("id", d => d.id)
  .on("mouseover", function(d){
          //console.log(d.target.id)
          d3.select(this)
            .style("cursor", "pointer")
            .attr("stroke-width", 2)
            .attr("stroke", "#DB9D15");
    
          const rect = this.getBoundingClientRect();
          showTooltip(d.target.id, rect.x, rect.y);
      }, false)
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
  main.variable(observer()).define(["md"], function(md){return(
md`# Casas Lumen e Acolhidos `
)});
  main.variable(observer("view")).define("view", ["md","container"], function(md,container){return(
md`${container('mapid', 'mapa')}`
)});
  main.variable(observer("viewof a3")).define("viewof a3", ["slider"], function(slider){return(
slider({
  min: 1, 
  max: 12, 
  step: 1, 
  value: 1, 
  title: "Mês", 
  description: ""
})
)});
  main.variable(observer("a3")).define("a3", ["Generators", "viewof a3"], (G, _) => G.input(_));
  main.variable(observer("yScale")).define("yScale", ["d3","TotalGroup"], function(d3,TotalGroup){return(
d3.scaleLinear().domain([0,TotalGroup.top(1)[0].value]).nice()
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
  main.variable(observer("MembrosQntGroup")).define("MembrosQntGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d['Qnt Membros'])
)});
  main.variable(observer("MembrosPercaptaGroup")).define("MembrosPercaptaGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d['Membros Percapta'])
)});
  main.variable(observer("percentFormat")).define("percentFormat", ["d3"], function(d3){return(
d3.format(".2f")
)});
  main.variable(observer("fixosQntGroup")).define("fixosQntGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d['Qnt Doadores Fixos'])
)});
  main.variable(observer("fixosPercaptaGroup")).define("fixosPercaptaGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d['Fixos Percapta'])
)});
  main.variable(observer("pcFixosGroup")).define("pcFixosGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d.fixos_pc)
)});
  main.variable(observer("pcPontualGroup")).define("pcPontualGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d.pontual_pc)
)});
  main.variable(observer("pcMembrosGroup")).define("pcMembrosGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d.membros_pc)
)});

main.variable(observer("showTooltip")).define("showTooltip", ["d3","ufMap","ConverterEstados","width"], function(d3,ufMap,ConverterEstados,width){return(
function showTooltip(county_id, x, y) {  
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

	switch (val) {
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
  main.variable(observer("ufGroup")).define("ufGroup", ["ufDim"], function(ufDim){return(
ufDim.group()
)});
  main.variable(observer("ufDim")).define("ufDim", ["facts2"], function(facts2){return(
facts2.dimension(d =>d.UF)
)});
  main.variable(observer("facts2")).define("facts2", ["crossfilter","cadastros"], function(crossfilter,cadastros){return(
crossfilter(cadastros)
)});
  main.variable(observer("map")).define("map", ["view","L"], function(view,L)
{
  view;
  let mapInstance = L.map('mapid').setView([-5.3382816,-40.2900247], 6)
   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 17
    }).addTo(mapInstance)
  //mapInstance.on('moveend', updateFilters)
  return mapInstance
}
);
  main.variable(observer("circleScale")).define("circleScale", ["d3"], function(d3){return(
d3
  .scaleLinear()
  .domain([0, 34])
  .range([0, 5000])
)});
  main.variable(observer("circles")).define("circles", ["circlesLayer","dataset2","L","circleScale","dataset3","a3"], function(circlesLayer,dataset2,L,circleScale,dataset3,a3)
{
  circlesLayer.clearLayers()
  dataset2.forEach( function(d) {
    let circle = L.circle([d.lat, d.lon], circleScale(dataset3[a3-1][d.Casa]), {
      color: '#fd8d3c',
      weight: 2,
      fillColor: '#fecc5c',
      fillOpacity: 0.5
    });
  
  circle.bindPopup("Casa: "+d.Casa +"<br>Mes: "+a3+"<br>Acolhidos:"+dataset3[a3-1][d.Casa] )
  circlesLayer.addLayer(circle) })
}
);
  main.variable(observer("circlesLayer")).define("circlesLayer", ["L","map"], function(L,map){return(
L.layerGroup().addTo(map)
)});
  main.variable(observer("parseReal")).define("parseReal", ["locale"], function(locale){return(
locale.format('$,.2f')
)});
  main.variable(observer("facts")).define("facts", ["crossfilter","dataset"], function(crossfilter,dataset){return(
crossfilter(dataset)
)});
  main.variable(observer()).define(["TotalGroup"], function(TotalGroup){return(
TotalGroup.all()
)});
  main.variable(observer("mesDim")).define("mesDim", ["facts"], function(facts){return(
facts.dimension(d => d.Mes)
)});
  main.variable(observer("timeDomain")).define("timeDomain", ["d3","mesDim"], function(d3,mesDim){return(
[
  d3.timeMonth.offset(mesDim.bottom(1)[0].Mes, -1), 
  d3.timeMonth.offset(mesDim.top(1)[0].Mes, 1)]
)});
  main.variable(observer("xScale2")).define("xScale2", ["d3","timeDomain"], function(d3,timeDomain){return(
d3.scaleTime().domain(timeDomain).nice()
)});
  main.variable(observer("xScale")).define("xScale", ["d3","mesDim"], function(d3,mesDim){return(
d3.scaleTime().domain([mesDim.bottom(1)[0].Mes,mesDim.top(1)[0].Mes]).nice()
)});
  main.variable(observer("MembrosGroup")).define("MembrosGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d['Valores Membros'])
)});
  main.variable(observer("CadastradosGroup")).define("CadastradosGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d['Valores Doadores fixos'])
)});
  main.variable(observer("AvulsasGroup")).define("AvulsasGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d['Doacoes Pontuais'])
)});
  main.variable(observer("TotalGroup")).define("TotalGroup", ["mesDim"], function(mesDim){return(
mesDim.group().reduceSum(d=> d.Total)
)});
  main.variable(observer("container")).define("container", function(){return(
function container(id, title) { 
  return `
<div class='container'>
<div class='content'>
<div class='container'>
<div class='row'>
    <div class='span12' id='${id}'>
      <h4>${title}</h4>
    </div>
  </div>
</div>
</div>
</div>`
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Datasets`
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
  main.variable(observer("br")).define("br", ["d3"], function(d3){return(
d3.json('https://gist.githubusercontent.com/ruliana/1ccaaab05ea113b0dff3b22be3b4d637/raw/196c0332d38cb935cfca227d28f7cecfa70b412e/br-states.json')
)});
  main.variable(observer("dataset")).define("dataset", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/diegoandrade-iuv/lumenserfeliz/main/colecaoMeses.csv").then(function(data){ 
  let parseDate = d3.timeParse('%m/%Y');  
  data.forEach(function(d){
    d.Mes = parseDate(d.Mes);    
  });
  return data;
})
)});
  main.variable(observer("dataset2")).define("dataset2", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/diegoandrade-iuv/lumenserfeliz/main/casas_geo.csv").then(function(data){
  data.forEach(function(d){
    d.lat = +d.lat;    
    d.lon = +d.lon;
  });
  return data;
})
)});
  main.variable(observer("dataset3")).define("dataset3", ["d3"], function(d3){return(
d3.tsv("https://raw.githubusercontent.com/diegoandrade-iuv/lumenserfeliz/main/acolhidos_total.csv").then(function(data){
  let parseDate = d3.timeParse('%Y-%m-%d'); 
  data.forEach(function(d){
    d.Mes = parseDate(d[""])
  });
  return data;
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Inicializações e importações`
)});
  main.variable(observer("nomeMes")).define("nomeMes", function(){return(
["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
)});
  main.variable(observer("locale")).define("locale", ["d3"], function(d3){return(
d3.formatLocale({
        decimal: ",",
        thousands: ".",
        grouping: [3],
        currency: ["R$ ", ""],
        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
      })
)});
  main.variable(observer("ptbr")).define("ptbr", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/d3/d3-time-format/master/locale/pt-BR.json')
)});
  main.variable(observer()).define(["d3","ptbr"], function(d3,ptbr){return(
d3.timeFormatDefaultLocale(ptbr)
)});
  main.variable(observer()).define(["html"], function(html){return(
html`Esta célula contém os estilos da visualização.
<html lang="pt-br">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
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

  path.line {
           fill: none;
           stroke-width: 4px;
  }

  path.line {
    fill: none;
    stroke-width: 4px;
  }

  #mapid {
    width: 650px;
    height: 480px;
  }
	</style>`
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define2);
  main.import("rangeSlider", child2);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("L")).define("L", ["require"], function(require){return(
require('leaflet@1.6.0')
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require('crossfilter2')
)});
  main.variable(observer("dc")).define("dc", ["require"], function(require){return(
require('dc')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
