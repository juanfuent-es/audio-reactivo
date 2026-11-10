import Circle from './components/Circle.js';

const CIRCLE_A = new Circle({
    x: 100,
    y: 100
}); // esto es una instancia
const CIRCLE_B = new Circle({
    x: 500,
    y: 500
}); // esto es otra instancia

new p5(p => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
        p.background(0);
        CIRCLE_A.draw(p);
        CIRCLE_B.draw(p);
    }
});