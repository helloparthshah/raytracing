const increment = 0.1;

class Particle {
    constructor(fov) {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.direction = 0;
        this.fov = fov;

        for (let a = -this.fov / 2; a < this.fov / 2; a += increment) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    rotate(angle) {
        this.direction += angle;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += increment) {
            this.rays[index].setAngle(this.direction + radians(a));
            index++;
        }
    }

    move(dist) {
        const vel = p5.Vector.fromAngle(this.direction);
        vel.setMag(dist);
        this.pos.add(vel);
    }


    update(x, y) {
        this.pos.set(x, y);
    }

    look(walls) {
        const scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let rec = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - this.direction;
                    d *= cos(a);
                    if (d < rec) {
                        rec = d;
                        closest = pt;
                    }
                }

            }
            if (closest) {
                stroke(150, 0, 0);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            scene[i] = rec;
        }
        return scene;
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);

        for (let ray of this.rays) {
            ray.show();
        }
    }
}