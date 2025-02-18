let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth=30;
let margin = 15;
let gap;
let scaler;
let axisThickness=5;
let chartPosX = 50;
let chartPosY = 350;
let axisColour;
let barColour;
let axisTextColour;
let yValues = ["Male","Female"];
let xValue = "Age_Group";
let yValueTotal = "Total";
let barColours = [];

function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
}

function setup(){
    createCanvas(500,500);
    angleMode(DEGREES);
    noLoop();
    cleanData();
   
    barColours.push(color(125,34,56));
    barColours.push(color(225,34,56));

    gap = (chartWidth - (cleanedData.length * barWidth) - (margin*2))/(cleanedData.length-1)
    scaler = chartHeight/(max(cleanedData.map(row => row[yValueTotal])));

   axisColour = color(255, 204, 0);
   barColour = color(0,200,50)
   axisTextColour = color(125)
}

function draw(){
   background(200);

   push()
   translate(chartPosX,chartPosY)
   noFill()
   stroke(axisColour);
   strokeWeight(axisThickness)
   line (0,0,0,-chartHeight)
   line (0,0,chartWidth,0)
   
   push()
   translate(margin,0)
   for(let i=0; i<cleanedData.length; i++){
        let xPos = (barWidth + gap)*i;
        push()
        translate(xPos,0)
        
        push()
        for(let j=0; j<yValues.length; j++){
            fill(barColours[j]);
            noStroke();
           
            rect (0,0,barWidth, -cleanedData[i][yValues[j]]*scaler);
            translate(0,-cleanedData[i][yValues[j]]*scaler - 1)
        }
        pop()
        pop()

        fill(axisTextColour);
        noStroke();
        textAlign(LEFT,CENTER);
        textSize(8);
        push()
        translate(xPos + (barWidth/2),10)
        rotate(60)
        text (cleanedData[i][xValue], 0, 0);
        pop()
    }
   pop()

   pop()
   

}

function cleanData(){
    for(let i=0; i<data.rows.length; i++ ){
        cleanedData.push(data.rows[i].obj)
   }

   for(let i=0; i<cleanedData.length; i++ ){
        cleanedData[i].Female = parseInt(cleanedData[i].Female)
        cleanedData[i].Male = parseInt(cleanedData[i].Male)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)
    }

}


