let data;
let cleanData = [];
let chartWidth = 800;
let chartHeight = 800;
let canvasWidth = 1000;
let canvasHeight = 1000;

let numBars;
let barWidth = 25;

//Colours
let axisColour = "#474747";
let backgroundColour = "#f7ff7f";  
let axisThickness = 3; 
let barColour = "#416096";

function preload() {
    data = loadTable('/data/Data.csv', 'csv', 'header');
}
 
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    for(let i=0;i<data.rows.length;i++){
        cleanData.push(data.rows[i].obj)  //pushing new obj in
    }

    numBars = cleanData.length;    //checks the for let loop to see how many objects are in the array and return an even amount of bars
}
 
function draw(){
    background(backgroundColour);       //calling the declared variables (2-11)

    transX = (canvasWidth - chartWidth) / 2;
    transY = (canvasHeight - chartHeight) / 2 + chartHeight;    //line 27-29 - centers the chart on the canvas
    translate(transX, transY);
    noFill();
    stroke(axisColour);
    strokeWeight(axisThickness);
    line(0,0,chartWidth,0);             //horizontal line
    line(0,0,0, -chartHeight,0);        //vertical line

    noStroke();
    fill(barColour);

    let barGap = (chartWidth - (numBars * barWidth)) / (numBars + 1);   // we add +1 because if i have 5 bars im going to need 6 gaps
    for(let i=0; i<numBars; i++){
        let jump = (barGap + (i+1)) + (barWidth * i);
        let colHeight = cleanData[i].Total
       rect(jump,0,barWidth,-colHeight/1700);      //this is the bars (-cleandata gives me the total of each obj) (change this for my pyrimid graph)
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





 
