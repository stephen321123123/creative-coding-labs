class PyramidChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;   // Array of segments to stack (e.g., ['Male', 'Female'])
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barHeight = obj.barHeight || 20;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 40;
        this.scaler = this.chartWidth / (max(this.data.map(row => row[this.yValue[0]] + row[this.yValue[1]])));
        this.gap = (this.chartHeight - (this.data.length * this.barHeight) - (this.margin * 2)) / (this.data.length - 1);
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.xPos || 500;
        this.chartPosY = obj.yPos || 950;

        this.axisColour = color(255, 100, 100);
        this.axisTickColour = color(155, 100, 100);
        this.femaleBarColour = color(0,0,0);
        this.maleBarColour = color(255,255,255);
        this.axisTextColour = color(255, 0, 0);
        this.numTicks = 5;
        this.tickLength = 10;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY); // Move to chart position
        
        noFill();
        stroke(200, 0, 0);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Vertical axis
        line(0, 0, this.chartWidth, 0);   // Horizontal axis
    
        push();
        translate(this.margin, 0); // Apply margin for x-axis
    
        // Loop through each data entry (county)
        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barWidth + -this.gap) * i;
            let stackedWidth = -200;  // Start stacking from 0 (center of pyramid)
    
            // Loop through each segment (Male, Female)
            for (let j = 0; j < this.yValue.length; j++) {
                let barWidth = this.data[i][this.yValue[j]] * this.scaler;
    
                // Ensure the bar starts from the center
                fill(j == 0 ? color(this.femaleBarColour) : color(this.maleBarColour));  // Different colors for Male and Female
                noStroke();
                
                // Draw the stacked bar segment (extend symmetrically from the center)
                let leftPos = stackedWidth - barWidth ; // Calculate position for the pyramid effect
                rect(leftPos, -yPos, barWidth, this.barWidth); 
                stackedWidth += barWidth;  // Update stacked width for the next segment
            }
    
            // Draw the label at the bottom of the bar
            push();
            translate(0, -yPos + this.barWidth / 2);
            text(this.data[i][this.xValue], 0, 0);  // County name
            pop();
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
        let tickIncrement = this.chartHeight / 5;
        for (let i = 0; i <= this.numTicks; i++) {
            line(0, -tickIncrement * i, -this.tickLength, -tickIncrement * i);
        }
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);

        push();
        translate(this.margin, 0)
        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barHeight + this.gap) * i;
            noFill();
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(6);

            push();
            translate(0, -yPos + this.barHeight / 2);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0); // County name
            pop();
        }
        pop();
        pop();
    }
}
