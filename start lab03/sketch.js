let data;
let cleanedData = [];
let charts = [];
// let femaleScores;
// let ageGroups;
// let chartHeight = 300;
// let chartWidth = 300;    //properties of a bar chart
// let barWidth = 15;
// let margin = 15;
// let gap = 300;
// let scaler;
// let axisThickness = 1;
// let chartPosX = 100;
// let chartPosY = 400;
// let axisColour;
// let barColour;
// let axisTextColour;
 
function preload(){
    data = loadTable('./data/Data.csv', 'csv', 'header')
}
 
function setup() {
    createCanvas(1000,1000);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    //barchart for total population 
    charts.push(new BarChart({
        data:cleanedData,
        xValue:"County",
        yValue:"Female",
        chartHeight: 200,            //wrapping values in an object
        chartWidth: 350,
        barWidth: 10,
        margin: 15,
        axisThickness: 2,
        xPos: 50,
        yPos: 250
}));

charts.push(new BarChart({
    data:cleanedData,
    xValue:"County",
    yValue:"Male",
    chartHeight: 200,            //wrapping values in an object
    chartWidth: 350,
    barWidth: 10,
    margin: 15,
    axisThickness: 2,
    xPos: 500,
    yPos: 250
}));

charts.push(new BarChart({
    data:cleanedData,
    xValue:"County",
    yValue:"Total",
    chartHeight: 200,            //wrapping values in an object
    chartWidth: 350,
    barWidth: 10,
    margin: 15,
    axisThickness: 2,
    xPos: 50,
    yPos: 500
}));
}
 
function draw(){
    background(200);
    charts.forEach(chart => {
        chart.renderBars();
        chart.renderLabels();
        chart.renderAxis();
        chart.renderTicks();
});
  
}

function cleanData(){
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj)
    }

    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female)
        cleanedData[i].Male = parseInt(cleanedData[i].Male)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)
    }
}
 






















//  class Friend {
//     constructor(){                                //step1 
//         this.name = "Stephen";
//         this.number = 239;
//     }
// }

// class Friend {
//     constructor(_name, _number){                     //step2 class with variables that are passed by parameters
//         this.name = _name;
//         this.number = _number;
//     }

//     report(){
//         console.log(this.name, this.number)
//     }
// }

// let friends = [];
// friends.push(new Friend("Dave", 289));
// friends.push(new Friend("Roger", 139));

// console.log(friends)   





 
