function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellationMap1(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _dataWithConstellationNames(data,constellationMap1){return(
data.map(item => ({
  ...item,
  Constellation: constellationMap1[item.Constellation],
}))
)}

function _countByConstellationAndGender(data){return(
data.reduce((acc, curr) => {
  const key = `${curr.Constellation}_${curr.Gender}`;
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {})
)}

function _plotData(countByConstellationAndGender){return(
Object.keys(countByConstellationAndGender).map(key => {
  const [constellation, gender] = key.split('_');
  return {
    Constellation: constellation,
    Gender: gender,
    count: countByConstellationAndGender[key]
  };
})
)}

function _constellationOrder(){return(
{
  "0": 1,
  "1": 2,
  "2": 3,
  "3": 4,
  "4": 5,
  "5": 6,
  "6": 7,
  "7": 8,
  "8": 9,
  "9": 10,
  "10": 11,
  "11": 12,
}
)}

function _sortedConstellations(constellationOrder){return(
Object.keys(constellationOrder).sort((a, b) => constellationOrder[a] - constellationOrder[b])
)}

function _PlotData(sortedConstellations,countByConstellationAndGender){return(
sortedConstellations.flatMap(constellation => {
  return [
    { Constellation: constellation, Gender: '女', count: countByConstellationAndGender[`${constellation}_男`] || 0 },
    { Constellation: constellation, Gender: '男', count: countByConstellationAndGender[`${constellation}_女`] || 0 }
  ];
})
)}

function _constellationname(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _mappedPlotData(PlotData,constellationname){return(
PlotData.map(d => {
  return {
    ...d,
    Constellation: constellationname[parseInt(d.Constellation, 10)],
  };
})
)}

function _sortedPlotData(PlotData){return(
PlotData.map(item => ({
  ...item,
  Constellation: parseInt(item.Constellation),
}))
)}

function _13(Plot,constellationname,sortedPlotData){return(
Plot.plot({
  
  grid: true,
  y: {label: "count"},
  x: {label: "constellation",  tickFormat: (d) => constellationname [d]},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(sortedPlotData, {x: "Constellation", y: "count", tip: true , fill:"Gender",title: d => `Count: ${d.count}\nConstellation: ${constellationname[d.Constellation]}\nGender: ${d.Gender}`}),
  ]
})
)}

function _14(Plot,constellationname,data){return(
Plot.plot({ 
  y: { grid: true, label: "count" },  
  x: { label: "constellation", ticks: 12, tickFormat: (d) => constellationname[d] },
  marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true,
                                          title: d => `Constellation: ${constellationname[d.Constellation]}\nGender: ${d.Gender == "male" ? "男":"女"}`})),    
		Plot.gridY({stroke: "white", strokeOpacity:0})
	 ]
})
)}

function _mappedData2(sortedPlotData,constellationname){return(
sortedPlotData.map((item) => ({
  ...item,
  constellation: constellationname[item.Constellation],
}))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellationMap1")).define("constellationMap1", _constellationMap1);
  main.variable(observer("dataWithConstellationNames")).define("dataWithConstellationNames", ["data","constellationMap1"], _dataWithConstellationNames);
  main.variable(observer("countByConstellationAndGender")).define("countByConstellationAndGender", ["data"], _countByConstellationAndGender);
  main.variable(observer("plotData")).define("plotData", ["countByConstellationAndGender"], _plotData);
  main.variable(observer("constellationOrder")).define("constellationOrder", _constellationOrder);
  main.variable(observer("sortedConstellations")).define("sortedConstellations", ["constellationOrder"], _sortedConstellations);
  main.variable(observer("PlotData")).define("PlotData", ["sortedConstellations","countByConstellationAndGender"], _PlotData);
  main.variable(observer("constellationname")).define("constellationname", _constellationname);
  main.variable(observer("mappedPlotData")).define("mappedPlotData", ["PlotData","constellationname"], _mappedPlotData);
  main.variable(observer("sortedPlotData")).define("sortedPlotData", ["PlotData"], _sortedPlotData);
  main.variable(observer()).define(["Plot","constellationname","sortedPlotData"], _13);
  main.variable(observer()).define(["Plot","constellationname","data"], _14);
  main.variable(observer("mappedData2")).define("mappedData2", ["sortedPlotData","constellationname"], _mappedData2);
  return main;
}
