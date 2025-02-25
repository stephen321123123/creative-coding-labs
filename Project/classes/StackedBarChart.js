class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue; // An array of values to stack (e.g., ['Male', 'Female'])
        this.chartHeight = obj.chartHeight || 200;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 20;
        this.margin = obj.margin || 10;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.xPos || 600;
        this.chartPosY = obj.yPos || 250;
 
        this.axisColour = color(255, 100, 100);
        this.axisTickColour = color(255,0,0);
        this.femaleBarColour = color(255);
        this.maleBarColour = color(255,0,0);
        this.axisTextColour = color(100, 100, 100);
        this.numTicks = 10;
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
 
        // Loop through each data entry (e.g., counties)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            let stackedHeight = 0;  // Start stacking from 0 (x-axis)
 
            // Calculate the total sum of the stacked values for this bar
            let total = this.yValue.reduce((sum, key) => sum + this.data[i][key],0);
 
            // Loop through each segment (Male, Female, etc.)
            for (let j = 0; j < this.yValue.length; j++) {
                let percentage = (this.data[i][this.yValue[j]] / total); // Convert to percentage
                let barHeight = percentage * this.chartHeight; // Scale it to 100% height
 
                // Assign different colors for different segments
                fill(j == 0 ? color(this.femaleBarColour) : color(this.maleBarColour));  
                noStroke();
               
                // Draw the bar segment
                rect(xPos, -stackedHeight, this.barWidth, -barHeight);
                stackedHeight += barHeight;  // Update stacked height for next segment
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
            fill(this.axisTextColour);
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
 
 
 
 
}
 