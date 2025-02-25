let data;
let cleanedData = [];
let cleanedData2 = [];    //initializing variables
let charts = [];

function preload(){
    data = loadTable('./data/Data.csv', 'csv', 'header');
    data2 = loadTable('./data/Data01.csv', 'csv', 'header');    //loads csv file
}
 
function setup() {
    createCanvas(2000,2000);      //initializes the canvas for visualisation and creates charts based on the unproccessed data
    angleMode(DEGREES);
    noLoop();
    cleanData();
 
charts.push(new BarChart({
        data:cleanedData,
        xValue:"County",
        yValue:"Total",
    }));

charts.push(new HorizontalChart({
    data: cleanedData,
    xValue: "County",  
    yValue: "Total",   
   
    }));

    charts.push(new StackedBarChart({
        data: cleanedData,
        xValue: "County",  
        yValue: ["Male", "Female"] 
    }));

    charts.push(new ClusteredBarChart({
        data: cleanedData,
        xValue: "County",  
        yValue: "Female",
        zValue: "Male"
    }));

    charts.push(new PyramidChart({
        data: cleanedData,
        xValue: "County",  
        yValue: ["Male", "Female"]   
    }));

     charts.push(new LineChart({
        data: cleanedData,
        xValue: "County",  
        yValue: "Male",
    }));
}
 
function draw(){   //p5 sketch renders charts onto canvas
    background(200);
    charts.forEach(chart => {
        chart.renderBars();
       chart.renderLabels();
       chart.renderAxis();
    chart.renderTicks();
    chart.renderTitle();
     
});
}

function cleanData(){
    for (let i = 0; i < data.rows.length; i++) {       //used to proccess the raw data loaded from csv
        cleanedData.push(data.rows[i].obj)
    }
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData2.push(data.rows[i].obj)
    }

    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female)
        cleanedData[i].Male = parseInt(cleanedData[i].Male)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)
    }
    for (let i = 0; i < cleanedData2.length; i++) {
        cleanedData2[i].Female = parseInt(cleanedData2[i].Female)
        cleanedData2[i].Male = parseInt(cleanedData2[i].Male)
        cleanedData2[i].Total = parseInt(cleanedData2[i].Total)
    }
}
