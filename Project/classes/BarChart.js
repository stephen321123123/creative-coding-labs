class BarChart {
    constructor(obj){              //initializes properties for the chart
        this.data = obj.data;      //holds data passed through obj
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.barWidth = obj.barWidth || 20;
        this.margin = obj.margin || 10;
        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue]))); //largest value in this.yValue = max height of the chart
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.xPos || 200;
        this.chartPosY = obj.yPos || 500;
        
        this.axisColour = color(100);
        this.axisTickColour = color(100,100);
        this.barColour = color(157,155,189);
        this.axisTextColour = color(100);
        this.headingTextColour = color(0);
        this.numTicks = 5;
        this.tickLength = 10;
        this.chartTitle = obj.chartTitle || "Bar Chart";
        this.chartTitleY = obj.chartTitle || "Population";
        this.chartTitleX = obj.chartTitle || "County";
    }

    //methods
    renderBars() {     //function that draws the bars and labels for the chart
        push();         //saves the drawing state
        translate(this.chartPosX, this.chartPosY); //starting xpos and ypos from sketch.js
       
        push();     //saves the drawing state again

        translate(this.margin, 0)
        for (let i = 0; i < this.data.length; i++) {     //iterates through the array to render eachbar
            let xPos = (this.barWidth + this.gap) * i; //calculates the horizontal pos of each bar
            fill(this.barColour ); // bar color
           stroke(100,100,100)     
            rect(xPos, 0, this.barWidth, -this.data[i][this.yValue] * this.scaler);  //draws each bar at xpos, width = this.barWidth and a height from the scaler

            
        }
        pop();

        
        pop();
    }

    renderAxis() { 
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke( this.axisColour );
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // vertical axis
        line(0, 0, this.chartWidth, 0); // horizontal axis
        pop();
    }

    // renderTicks() {
    //     push();
    //     translate(this.chartPosX, this.chartPosY);
    //     noFill();
    //     stroke( this.axisTickColour);
    //     strokeWeight(this.axisThickness);
    //     let tickIncrement = this.chartHeight / 5;
    //         for (let i = 0; i <= this.numTicks; i++) {
    //         line(0, -tickIncrement * i, -this.tickLength, -tickIncrement * i);
    //     }
    //     pop();
    // }


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
            console.log("Tick", i, ":", value, "at y =", y);
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
            fill(this.axisTextColour)
            noStroke();
            textAlign(LEFT, CENTER);
            textSize(10);

            push();
            translate(xPos + (this.barWidth / 2), 10);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }

    renderTitle(){
        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight - 30);
        fill(this.headingTextColour);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitle, 250, 0);
        pop();

        push();
        translate(-this.chartPosX, this.chartPosY - this.chartHeight +150);
        fill(this.headingTextColour);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleY, 250, 0);
        pop();

        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight +480);
        fill(this.headingTextColour);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleX, 250, 0);
        pop();
    }
}

