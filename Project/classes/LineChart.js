class LineChart {
    constructor(obj) {
        //data values
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        //chart settings
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1.5;
        this.chartPosX = obj.chartPosX || 200;
        this.chartPosY = obj.chartPosY || 1200;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue])));
        this.maxValue = max(this.data.map((x) => x[this.yValue]));
        //colours
        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColor = color(30, 60, 120);
        this.axisTextColour = color(100);
        this.headingTextColour = color(0);
        //ticks and titles
        this.numTicks = 5;
        this.tickLength = 10;
        this.chartTitle = obj.chartTitle || "Line Chart";
        this.chartTitleY = obj.chartTitleY || "Population";
        this.chartTitleX = obj.chartTitleX || "County";
    }
 
    renderBars() {
            push();
            translate(this.chartPosX, this.chartPosY);
            translate(this.margin, 0);
       
            noFill();
            stroke(this.barColor);
            strokeWeight(3);
       
            beginShape();
            for (let i = 0; i < this.data.length; i++) {
                let xPos = (this.barWidth + this.gap) * i;
                vertex(xPos, -this.data[i][this.yValue]*this.scaler);    //places each data point along the graph. It uses negative scaling to invert Y-axis
                stroke(51, 153, 255);         //Draws a small blue circle (ellipse) at each data point to make them visible
                ellipse(xPos,-this.data[i][this.yValue]*this.scaler , 5, 5);
            }
            endShape();
            pop();
    }
 
    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Vertical line
        line(0, 0, this.chartWidth, 0); // Horizontal line
        pop();
    }
 
    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
 
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            fill(this.axisTextColour);
            noStroke();
            textAlign(LEFT, CENTER);
            textSize(10);
            push();
            translate(xPos + this.barWidth / 2, 20);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }
 
    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        fill(this.axisColour);
   
        let tickIncrement = this.chartHeight / this.numTicks;
   
        textSize(12);
        textAlign(RIGHT, CENTER);
   
        for (let i = 0; i <= this.numTicks; i++) {
            let y = -tickIncrement * i;
            line(0, y, -this.tickLength, y);  // Draw the tick lines
            line (0, y, this.chartWidth, y);
            let tickValue = (this.maxValue / this.numTicks) * i;
            // Adjust text position
            textAlign(RIGHT, CENTER);  // Align text to the right of the tick line
            push();
            // Position text a little to the left of the tick line
            translate(-this.tickLength - 5, y);  // Use 'y' directly for vertical positioning
            rotate(45);
            noStroke();
            fill(this.barColor)
            text(tickValue, 0, 0);  // Render the tick value
            pop();
        }
        pop();
    }

    renderTitle(){
        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight - 30);
        fill(this.barColor);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitle, 250, 0);
        pop();

        push();
        translate(-this.chartPosX, this.chartPosY - this.chartHeight +150);
        fill(this.barColor);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleY, 250, 0);
        pop();

        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight +480);
        fill(this.barColor);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleX, 250, 0);
        pop();
    }
}
