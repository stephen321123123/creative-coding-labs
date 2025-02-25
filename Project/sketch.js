let data;
let cleanedData = [];
let cleanedData2 = [];
let charts = [];

 
function preload(){
    data = loadTable('./data/Data.csv', 'csv', 'header');
    data2 = loadTable('./data/Data01.csv', 'csv', 'header');
}
 
function setup() {
    createCanvas(2000,2000);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    //barchart for total population 
    charts.push(new BarChart({
        data:cleanedData,
        xValue:"County",
        yValue:"Total",
    }));

// Horizontal total population
charts.push(new HorizontalChart({
    data: cleanedData,
    xValue: "County",  
    yValue: "Total",   
   
    }));

    // StackedBarChart of male/ female population
    charts.push(new StackedBarChart({
        data: cleanedData,
        xValue: "County",  
        yValue: ["Male", "Female"] 
    }));

    // second barchart of male/ female population
    charts.push(new ClusteredBarChart({
        data: cleanedData,
        xValue: "County",  
        yValue: "Female",
        zValue: "Male"
    }));

    // pyramid chart of male/ female population
    charts.push(new PyramidChart({
        data: cleanedData,
        xValue: "County",  
        yValue: ["Male", "Female"]   
    }));

     // pyramid chart of male/ female population
     charts.push(new LineChart({
        data2: cleanedData,
        xValue: "County",  
        yValue: "Male",
    }));
}
 
function draw(){
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
    for (let i = 0; i < data.rows.length; i++) {
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





 
