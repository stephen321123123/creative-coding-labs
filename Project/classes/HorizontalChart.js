class HorizontalChart {
    constructor(obj) {
        //data values
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        //chart settings
        this.chartHeight = obj.chartHeight || 200;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 15;
        this.margin = obj.margin || 15;
        this.axisThickness = obj.axisThickness || 2;
        this.chartPosX = obj.chartPosX || 200;
        this.chartPosY = obj.chartPosY || 1700;
        this.gap = (this.chartHeight - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.scaler = this.chartWidth / (max(cleanedData.map(row => row[this.yValue])));
        //colours
        this.axisColour = color(255,0,0);
        this.axisTickColour = color(100);
        this.barColour = color(99,155,163);
        this.axisTextColour = color(0);
        this.headingTextColour = color(0);
        this.strokeColour = color(255 ,255, 255);
        //nums and ticks
        this.numTicks = 5;
        this.tickLength = 10;
        this.chartTitle = obj.chartTitle || "Horizontal Chart";
        this.chartTitleY = obj.chartTitleY || "Population";
        this.chartTitleX = obj.chartTitleX || "County";
    }
    
 
    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        push();
        translate(this.gap, -5);
        for (let i = 0; i < this.data.length; i++) {
            let yPos = (this.barWidth + -this.gap) * i;                    //ypos determines vertical placement
            fill(this.barColour);
            rect(0, -yPos, this.data[i][this.yValue] * this.scaler, -this.barWidth);
        }

        pop();
        pop();
    }
 
    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Vertical axis
        line(0, 0, this.chartWidth, 0); // Horizontal axis
        pop();
    }
 
    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
 
        let tickIncrement = this.chartWidth / this.numTicks;
        let tickValueIncrement = max(this.data.map(row => row[this.yValue])) / this.numTicks;
 
        fill(this.axisColour);
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
            translate(this.data[i][this.yValue] * this.scaler - 10, -yPos + -this.barWidth);
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }
        pop();
        pop();
    }

    renderTitle(){
        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight - 30);
        fill(this.barColour);
        stroke(100);
        textSize(20);
        textAlign(RIGHT,CENTER);
        text(this.chartTitle, 250, 0);
        pop();

        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight +150);
        fill(this.barColour);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleY, 150, 100);
        pop();

        push();
        translate(this.chartPosX, this.chartPosY - this.chartHeight +100);
        fill(this.barColour);
        stroke(100);
        textSize(20);
        textAlign(CENTER,CENTER);
        text(this.chartTitleX, -50, 0);
        pop();
    }
}
