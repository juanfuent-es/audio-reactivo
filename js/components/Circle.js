export default class Circle {
    constructor(props = {}) {
        this.fill = props.fill || false;
        this.stroke = props.stroke || "pink";
        this.strokeWeight = props.strokeWeight || 2;
        this.radio = props.radio || 10;
        this.x = props.x || 50;
        this.y = props.y || 40;
        this.alpha = 255;
    }
    resize() {
        this.radio = random(10,50);
    }
    draw(p) {
        if (this.fill) { p.fill(this.fill);
        } else { p.noFill(); }
        if (this.stroke) { p.stroke(this.stroke); }
        else { p.noStroke(); }
        p.strokeWeight(this.strokeWeight);
        p.circle(this.x, this.y, this.radio);
    }
}