

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

    // BONUS: Build the Gauge Chart
    buildGauge(result.wfreq);
  });
}
const url="./samples.json"
var names = [];
var metadata = [];
var samples = [];
var myMetaData = [];
var mySampleData = [];
var outputMetaData = [];
function buildMetaData (id) {
  var MetaData = metadata.filter(
        d => {return d.id == id});
  return MetaData[0];
  };

// Return an array of sample data about tested individual    
function buildSample(id) {
  var Sample = samples.filter(
        d => {return d.id == id});
  return Sample[0];
  }; 
// create function to load data to #sample-metadata
function loadData(data) {
    var tbody = d3.select("#sample-metadata");
    tbody.html("");
    var row = tbody.append("tr"); 
    Object.entries(data).forEach(([key,value]) => {
        var cell1 = row.append("td");
        var cell2 = row.append("td");
                
        cell1.text(key);
        cell2.text(value);
    })

};    
function optionChanged() {
    
  id = d3.select("#selDataset").property("value");
    MetaData = buildMetaData(id);
    
    Sample = buildSample(id);


    loadData(metadata);
    buildbar(Sample)
    }
function input_Dropdown(id, obs) {
  var selector = d3.select(id) 
  selector.html("");
  
    obs.forEach((value) => {
    var cell = selector.append("option")
    cell.text(value);

    });

  optionChanged();  

  };
function buildObject(){
    d3.json(url).then(function(data){
      const names=data.names;
      const metadata=data.metadata;
      const samples=data.samples;
      input_Dropdown("selDataset",names)
    });
}
  buildObject();




  function buildbar() {
    d3.json(url).then(function(data) {
      
      // Grab values from the data json object to build the plots
      var otu_ids=data.samples.otu_ids;
      var otu_labels =data.samples.otu_labels;
      var sample_values=data.samples.sample_values;
      
      var trace1 = {
        type: "bar",
        name: otu_labels,
        x: otu_ids,
        y: sample_values,
        line: {
          color: "#17BECF"
        }
      };
  
      var data = [trace1];
  
      var layout = {
        title: "Test Subject ID: " + data.id,
        xaxis: {title:"Sample Value"}
      };
  
      Plotly.plot("plot", data, layout);
  
    });
  }
  
//   buildbar();
// // Creat function to plot bar, pie and bubble chart
// function buildCharts(){
// // Create the barChart
//  // d3 to grab data from samples
//  d3.json(url).then((data)=>{

//   var otu_ids=data.samples.otu_ids;
//   var otu_labels =data.samples.otu_labels;
//   var sample_values=data.samples.sample_values;
//   sortedSampleValues=samples.sort((a,b) => b.sample_values-a.sample_values);
//   top10 = sortedSampleValues.slice(0,10);

//   // data
//   var bar_data = {
//     x: data.sample_values,
//     y: data.otu_ids,
//     text: data.otu_labels,
//     name: "OTU",
//     type: "bar",
//     orientation: "h",
//     marker: {color: "blue"} 
// };
//   // Apply the group bar mode to the layout
//   var layout = {
//       title: "Test Subject ID: " + data.id,
//       xaxis: {title:"Sample Value"},
//       height: 0.6,
//       margin: {
//           l: 100},
//       font: {family: "Lucida Handwriting"}
//   };

// // Render the plot to the div tag with id "bar"
//   Plotly.newPlot("bar", bar_data, layout);
 
//   // plot bubble chart
//   bubble={
//     mode:"markers",
//     marker:{
//       size:sample_values,
//       color:otu_ids,
//       colorscale:"Jet"
//     },
//     x:otu_ids,
//     y:sample_values,
//     text:otu_labels,
//   };
//   bubble_layout = {
//     hovermode: "closests",
//     xaxis: {title:"OTU ID"},
//     margin: {t:0}
//   };
//   Plotly.plot("bubble",bubble,bubble_layout);
//   // plot pie chart
//   // sortedSampleValues=samples.sort((a,b) => b.sample_values-a.sample_values);
//   // top10 = sortedSampleValues.slice(0,10);
//   // pie={
//   //   type:"pie",
//   //   values:top10.map(object => object.sample_values),
//   //   labels:top10.map(object => object.otu_ids),
//   //   hovertext: top10.map(object => object.otu_labels),
//   //   hoverinfo: "hovertext"
//   // };
//   // pie_layout={
//   //   margin: {
//   //     t:0,
//   //     l:0
//   //   }
//   // };
//   // Plotly.plot("pie",pie,pie_layout);
// });
// }
// // function init() {
// //   var selector =d3.select("#selDataset");
// //   // Grab values from the Names of samples to populate the Selection Options
// //   d3.json(url).then((data)=>{
// //     var names=data.names;
// //     names.forEach((id)=>{
// //       selector.append("option")
// //       .text(id)
// //       .propetry("value",id);
// //     })
// //     // Grab the first sample to build initial plots
// //     const sample1=names[0];
// //     buildCharts(sample1);
// //     buildMetadata(sample1);
// //   })
// // }
// // init();
// buildCharts();