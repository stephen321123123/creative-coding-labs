class BarChart {
    constructor(obj){
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 300;   //default value
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.scaler = this.chartHeight/(max(cleanedData.map(row => row[this.yValue])));
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2))/(this.data.length - 1);
        this.axisThickness = obj.axisThickness || 1;
        this.axisTickThickness = 1;
        this.chartPosX = obj.xPos || 50;
        this.chartPosY = obj.yPos || 350;

        this.axisColour = color(255,100,100);
        this.axisTickColour = color(155,100,100);
        this.barColour = color(255);
        this.axisTextColour = color(255);
        this.numTicks = 5;
        this.tickLength = 10;
    }


renderBars(){
    
    push();
   
    translate(this.chartPosX,this.chartPosY);
    noFill();
    stroke(200, 0, 0);
    strokeWeight(this.axisThickness);
    line (0, 0, 0, -this.chartHeight);      //vertical
    line (0, 0, this.chartWidth, 0);       //horizontal 
    // pop(); 

    push();
    translate(this.margin, 0)
    for(let i=0; i<this.data.length; i++) {
        let xPos = (this.barWidth + this.gap)*i;         //so each length has its own starting position   
        fill (this.barColour);        
        fill(color(25,205,0))
        noStroke();
        rect(xPos,0,this.barWidth, -this.data[i][this.yValue]*this.scaler)
  

        push();
        translate (xPos + (this.barWidth/2),10)
        rotate (45)
        text(this.data[i][this.xValue],0,0);
        pop();   
   } 
   pop();
   pop();
}




renderAxis(){
    
    push();
 
    translate(this.chartPosX,this.chartPosY);
    noFill();
    stroke(200, 0, 0);
    strokeWeight(this.axisThickness);
    line (0, 0, 0, -this.chartHeight);      //vertical
    line (0, 0, this.chartWidth, 0);       //horizontal 
   
   pop();
}




renderTicks(){
    
    push();
 
    translate(this.chartPosX,this.chartPosY);
    noFill();
    stroke(200, 0, 0);
    strokeWeight(this.axisThickness);

    let tickIncrement = this.chartHeight / 5;
    for(let i=0; i<= this.numTicks; i++){
           line (0, -tickIncrement*i, -this.tickLength, -tickIncrement*i) 
    };
    
    
   
   pop();
}






renderLabels(){
    
    push();
    
    translate(this.chartPosX,this.chartPosY);
   

    push();
    translate(this.margin, 0)
    for(let i=0; i<this.data.length; i++) {
        let xPos = (this.barWidth + this.gap)*i;         //so each length has its own starting position   
       
  
        fill(this.axisTextColour)        
        noStroke();
        textAlign(LEFT, CENTER) 
        textSize(6);
        // pop();

        push();
        translate (xPos + (this.barWidth/2),10)
        rotate (45)
        text(this.data[i][this.xValue],0,0);
        pop();   
   } 
   pop();
   pop();
}
}

  




//     push ();
// ;       translate(300,300);
//         rotate (-45)
//         fill(255,0,0);
//         stroke(0,0,0);
//         rect(0,0,100,100);
//     pop ();

//     push();
//         translate(150,150);
//         rotate (30)
//         fill(255,0,255);
//         stroke(0,0,0);
//         rect(0,0,100,100);
//     pop();

//     let femaleAges = []
//     [0,0,13,10....]
//     for(let i=0; i<cleanedData.length; i++){       //mapping female ages method 1
//         //console.log(i);
//         femaleAges.push(cleanedData[i].Female)
//         console.log(femaleAges);
//     }

//     cleanedData.forEach(
//         function(row){
//             femaleAges.push(row.Female)              //foreach loop method 2
//         }   
//     )                                               
//       console.log(femaleAges)      
    
//     cleanedData.forEach(
//         row => {femaleAges.push(row.Female) }        //forEach loop method 2A
//     );

//         console.log(femaleAges)
// }