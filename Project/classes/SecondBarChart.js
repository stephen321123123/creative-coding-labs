class SecondBarChart {
    constructor(obj){              //initializes properties for the chart
        this.data = obj.data;      //holds data passed through obj
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.zValue = obj.zValue;
        this.chartHeight = obj.chartHeight || 200;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue]))); //largest value in this.yValue = max height of the chart
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.xPos || 600;
        this.chartPosY = obj.yPos || 600;
        this.chartPosZ = obj.ZPos || 455;
        
        this.axisColour = color(255, 100, 100);
        this.axisTickColour = color(155, 100, 100);
        this.femaleBarColour = color(255,0,0);
        this.axisTextColour = color(255);
        this.numTicks = 5;
        this.tickLength = 10;
    }

    //methods
    renderBars() {     //function that draws the bars and labels for the chart
        push();         //saves the drawing state
        translate(this.chartPosX, this.chartPosY); //starting xpos and ypos from sketch.js
        noFill();
        noStroke();
        push();     //saves the drawing state again

        translate(this.margin, 0)
        for (let i = 0; i < this.data.length; i++) {     //iterates through the array to render eachbar
            let xPos = (this.barWidth + this.gap) * i; //calculates the horizontal pos of each bar
            fill(color(this.femaleBarColour)); // bar color
            stroke(0,0,0);         
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);  //draws each bar at xpos, width = this.barWidth and a height from the scaler

            push();
            translate(xPos + (this.barWidth / 2), 10);  //moves the text to needed location
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);      // draws the label using this.xValue
            pop();
        }
        pop();

        push();     //saves the drawing state again

        translate(this.margin, 0)
        for (let i = 0; i < this.data.length; i++) {  //iterates through the array to render eachbar
            let xPos = (this.barWidth + this.gap) * i; //calculates the horizontal pos of each bar
            fill(color(25, 205, 0)); // bar color
            stroke(0,0,0);         
            rect(xPos, 0, -this.barWidth, -this.data[i][this.zValue] * this.scaler);  //draws each bar at xpos, width = this.barWidth and a height from the scaler

           
        }
        pop();
        pop();
    }

  

    renderAxis() { 
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(200, 0, 0);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // vertical axis
        line(0, 0, this.chartWidth, 0); // horizontal axis
        pop();
    }

    renderTicks() {
       
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(200, 0, 0);
        strokeWeight(this.axisThickness);
 
        let tickIncrement = this.chartHeight / this.numTicks;
        let tickValueIncrement = max(this.data.map(d => d[this.yValue])) / this.numTicks;
 
        
 
        for (let i = 0; i <= this.numTicks; i++) {
            let y = -tickIncrement * i;
            let value = (tickValueIncrement * i).toFixed(2);
           
            stroke(this.axisTickColour);
            line(0, y, -this.tickLength, y);
            noStroke();
            fill(this.axisTextColour);
            textAlign(RIGHT, CENTER);
            text(value, -this.tickLength - 5, y);
        }
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        push();
        translate(this.margin, 0)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            noFill();
            noStroke();
            textAlign(LEFT, CENTER);
            textSize(6);

            push();
            translate(xPos + (this.barWidth / 2), 10);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }
}

