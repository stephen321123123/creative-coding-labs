class SecondBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;  // An array of values to cluster (e.g., ['Male', 'Female'])
        this.chartHeight = obj.chartHeight || 200;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.barHeight = obj.barHeight || 10;
        this.margin = obj.margin || 15;
        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue[0]] + row[this.yValue[1]])));
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.xPos || 150;
        this.chartPosY = obj.yPos || 500;

        this.axisColour = color(255, 100, 100);
        this.axisTickColour = color(155, 100, 100);
        this.barColour = color(255);
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
    
        // Loop through each data entry (e.g., county)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i; // Position for each group of bars
            
            // Loop through each segment (e.g., Male, Female) and render bars side by side
            for (let j = 0; j < this.yValue.length; j++) {
                let barHeight = this.data[i][this.yValue[j]] * this.scaler;
                
                // Ensure the bar starts at y=0 (x-axis)
                fill(j == 0 ? color(25, 205, 0) : color(255, 0, 0));  // Different colors for Male and Female
                noStroke();
                
                // Render each bar side by side
                let offsetX = (this.barWidth + -this.gap) * j;  // Offset for each segment to place them side by side
                rect(xPos + offsetX, 0, this.barWidth, -barHeight);  // Draw each segment of the cluster
            }
    
            // Draw the label at the bottom of the cluster
            push();
            translate(xPos + (this.barWidth * this.yValue.length) / 2, 10);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);  // Label for the county or data entry
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
        line(0, 0, 0, -this.chartHeight); // Vertical axis
        line(0, 0, this.chartWidth, 0); // Horizontal axis
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
            let xPos = (this.barWidth + this.gap) * i;
            noFill();
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(6);

            // Place label for each data point under the cluster of bars
            push();
            translate(xPos + (this.barWidth * this.yValue.length) / 2, 10);
            rotate(45);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }
}
