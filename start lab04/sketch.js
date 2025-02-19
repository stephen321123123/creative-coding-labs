let data;

function preload(){
    data = loadTable('/data/Combined.csv', 'csv', 'header');
}

function setup(){
    createCanvas(500,500);
}

function draw(){
    background(220);
}