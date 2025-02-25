class LineChart {
    constructor(obj) {
        this.data2 = obj.data2;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 400;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 200;
        this.chartPosY = obj.chartPosY || 1200;
        this.gap = (this.chartWidth - (this.data2.length * this.barWidth) - (this.margin * 2)) / (this.data2.length - 1);
        this.scaler = this.chartHeight / (max(this.data2.map(row => row[this.yValue])));
        this.maxValue = max(this.data2.map((x) => x[this.yValue]));
        this.axisColour = color(50);
        this.axisTickColour = color(100);
        this.barColor = color(30, 60, 120);
        this.axisTextColour = color(0);
        this.headingTextColour = color(0);
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
            strokeWeight(2);
       
            beginShape();
            for (let i = 0; i < this.data2.length; i++) {
                let xPos = (this.barWidth + this.gap) * i;
       
                vertex(xPos, -this.data2[i][this.yValue]*this.scaler);
               
                stroke(51, 153, 255);
                ellipse(xPos,-this.data2[i][this.yValue]*this.scaler , 5, 5);
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
        for (let i = 0; i < this.data2.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
 
            fill(this.axisTextColour);
            noStroke();
            textAlign(LEFT, CENTER);
            textSize(12);
            push();
            translate(xPos + this.barWidth / 2, 20);
            rotate(45);
            text(this.data2[i][this.xValue], 0, 0);
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
   
            let tickValue = (this.maxValue / this.numTicks) * i;
           
            // Adjust text position
            textAlign(RIGHT, CENTER);  // Align text to the right of the tick line
            push();
            // Position text a little to the left of the tick line
            translate(-this.tickLength - 5, y);  // Use 'y' directly for vertical positioning
            rotate(45);
            noStroke();
            text(tickValue, 0, 0);  // Render the tick value
            pop();
        }
   
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
