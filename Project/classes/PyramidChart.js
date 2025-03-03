class PyramidChart {
    constructor(obj) {
        //data values
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;   
        //cahrt settings
        this.chartHeight = obj.chartHeight || 200;
        this.chartWidth = obj.chartWidth || 300;
        this.barHeight = obj.barHeight || 21;
        this.barWidth = obj.barWidth || 15;
        this.margin = obj.margin || -15;
        this.scaler = this.chartWidth / (max(this.data.map(row => row[this.yValue[0]] + row[this.yValue[1]])));
        this.gap = (this.chartHeight - (this.data.length * this.barHeight) - (this.margin * 2)) / (this.data.length - 1);
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.xPos || 1000;
        this.chartPosY = obj.yPos || 1700;
        this.stackedWidth = obj.stackedWidth || 150;
        //colours
        this.axisColour = color(255, 100, 100);
        this.axisTickColour = color(155, 100, 100);
        this.femaleBarColour = color(132,93,191);
        this.maleBarColour = color(78,22,147);
        this.axisTextColour = color(78,22,147);
        this.headingTextColour = color(0);
        //ticks and titles
        this.numTicks = 10;
        this.tickLength = 10;
        this.chartTitle = obj.chartTitle || "Pyramid Chart";
        this.chartTitleY = obj.chartTitleY || "Population";
        this.chartTitleX = obj.chartTitleX || "County";
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY); // Move to chart position
    
        push();
        translate(this.margin, 0); // Apply margin for x-axis
        
        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barWidth + -this.gap) * i;
            let stackedWidth = this.stackedWidth;  // Start stacking from 0 (center of pyramid)
    
            for (let j = 0; j < this.yValue.length; j++) {
                let barWidth = this.data[i][this.yValue[j]] * this.scaler;
                // Ensure the bar starts from the center
                fill(j == 0 ? color(this.femaleBarColour) : color(this.maleBarColour));  // Different colors for Male and Female
                stroke(255,255,255);
                // Draw the stacked bar segment (extend symmetrically from the center)
                let leftPos = stackedWidth - barWidth ; // Calculate position for the pyramid effect
                rect(leftPos, -yPos, barWidth, -this.barWidth); 
                stackedWidth += barWidth;  // Update stacked width for the next segment
            }
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
        fill(this.axisColour);
        strokeWeight(this.axisThickness);
 
        let tickIncrement = this.chartWidth / this.numTicks;
        let tickValueIncrement = max(this.data.map(row => row[this.yValue])) / this.numTicks;
 
        for (let i = 0; i <= this.numTicks; i++) {
            let x = tickIncrement * i;
            line(x, 0, x, this.tickLength);
        }
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
        push();
        translate(this.margin, 0);
        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barWidth + -this.gap) * i;
            fill(this.axisTextColour);
            noStroke();
            textAlign(LEFT, CENTER);
            textSize(12);
            push();
            translate(this.stackedWidth - 205, -yPos + this.barHeight /120);
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
        textAlign(RIGHT,CENTER);
        text(this.chartTitle, 250, 0);
        pop();

        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight +150);
        fill(this.headingTextColour);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleY, 100, 100);
        pop();

        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight +100);
        fill(this.headingTextColour);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleX, -130, 0);
        pop();
    }
}
