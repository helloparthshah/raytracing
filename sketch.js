let walls = [];
let ray;
let particle;
let fov = 60;

const sceneW = window.innerWidth / 2;
const sceneH = window.innerHeight;

function setup() {
    createCanvas(sceneW * 2, sceneH);

    for (let i = 0; i < 5; i++) {
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);
        walls[i] = new Wall(x1, y1, x2, y2);
    }

    walls.push(new Wall(0, 0, sceneW, 0));
    walls.push(new Wall(sceneW, 0, sceneW, sceneH));
    walls.push(new Wall(sceneW, sceneH, 0, sceneH));
    walls.push(new Wall(0, sceneH, 0, 0));
    particle = new Particle(fov);
    particle.update(sceneW / 2, sceneH / 2);
}

function draw() {

    if (keyIsDown(65)) particle.rotate(-0.1); //left
    if (keyIsDown(68)) particle.rotate(0.1); //right
    if (keyIsDown(87)) particle.move(4); //up
    if (keyIsDown(83)) particle.move(-4); //down

    background(0);
    for (let wall of walls)
        wall.show();
    // particle.update(mouseX, mouseY);
    particle.show();

    const scene = particle.look(walls);
    const w = sceneW / scene.length;

    push();
    translate(sceneW, 0);


    for (let i = 0; i < scene.length; i++) {
        // noStroke();
        const b = map(scene[i] * scene[i], 0, sceneW * sceneW, 255, 0);
        // const h = map(scene[i], 0, sceneW, sceneH, 0);
        const h = sceneH * fov / scene[i];
        fill(0, 0, b);
        stroke(0, 0, b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2, w, h);
        // rect(i * w + w / 2, sceneH / 2, w, 100 * h / scene[i]);
    }
    pop();
}