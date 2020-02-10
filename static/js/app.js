
const url="./samples.json"
// function buildObject(){
//   d3.json(url).then(function(data){
//     const names=data.names;
//     const metadata=data.metadata;
//     const samples=data.samples;
//     (function (id, obs) {
//       var selector = d3.select(id) 
//       selector.html(" ");
      
//         obs.forEach((value) => {
//         var cell = selector.append("option")
//         cell.text(value);
    
//         });

//       optionChanged();  
  
//       });
//   });
// }
// buildObject();
// function optionChanged() {
    
//   var id = d3.select("#selDataset").property("value");
//     outputMetaData = getMetaData(choosenId);
//     console.log("MetaData");
//     console.log(outputMetaData);
//     outputSampleData = getSampleData(choosenId);
//     console.log("Sample Data");
//     console.log(outputSampleData);

//     loadSampleMetadata(outputMetaData);
//     createBubble(outputSampleData);
//     createGauge(outputMetaData)
//     createBar(outputSampleData);
//     }

function buildMetadata(data){
  // Grab values from the data json object to build the metadata panel
  d3.json(url).then((data)=>{
    // d3 to select the id of `#sample-metadata`
      var panel=d3.select("#sample-metadata");
    // Clear content
    panel.html("");
    // Add key and value to the panel
    Object.defineProperties(data).forEach((i,v)=>{
      panel.append("tbody").text(`${i}:${v}`);
    })
    buildGaugeChart(data.WFREQ);
  });
}

// Creat function to plot bar, pie and bubble chart
function buildCharts(){

  // d3 to grab data from samples
  d3.json(url).then((data)=>{
  var names=data.names;
  var metadata=data.metadata;
  var samples=data.samples;
  var otu_ids=samples.otu_ids;
  var otu_labels =samples.otu_labels;
  var sample_values=samples.sample_values;
  // plot bubble chart
  bubble_layout = {
    hovermode: "closests",
    xaxis: {title:"OTU ID"},
    margin: {t:0}
  }
  bubble={
   
    mode:"markers",
    marker:{
      size:sample_values,
      color:otu_ids,
      colorscale:"Jet"
    },
    x:otu_ids,
    y:sample_values,
    text:otu_labels,
  }
  Plotly.plot("bubble",bubble,bubble_layout);
  // plot pie chart
  // sortedSampleValues=samples.sort((a,b) => b.sample_values-a.sample_values);
  // top10 = sortedSampleValues.slice(0,10);
  // pie={
  //   type:"pie",
  //   values:top10.map(object => object.sample_values),
  //   labels:top10.map(object => object.otu_ids),
  //   hovertext: top10.map(object => object.otu_labels),
  //   hoverinfo: "hovertext"
  // };
  // pie_layout={
  //   margin: {
  //     t:0,
  //     l:0
  //   }
  // };
  // Plotly.plot("pie",pie,pie_layout);
}
  )};
function init() {
  var selector =d3.select("#selDataset");
  // Grab values from the Names of samples to populate the Selection Options
  d3.json(url).then((data)=>{
    var names=data.names;
    names.forEach((id)=>{
      selector.append("option")
      .text(id)
      .propetry("value",id);
    })
    // Grab the first sample to build initial plots
    const sample1=names[0];
    buildCharts(sample1);
    buildMetadata(sample1);
  })
}
init();
buildCharts();