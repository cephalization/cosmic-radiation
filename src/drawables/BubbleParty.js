import { scaleBetween, distance } from '../Util';

class BubbleParty {
  constructor(x = 0, y = 0, canvas) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.lastX = this.x;
    this.lastY = this.y;
    this.initY = this.y;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.size = Math.random() - .5;
    this.velocity = this.size * 2;
    if (this.size === 0) {
      this.size = .5;
    }

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  update() {
    const x = this.x; const y = this.y; const lastX = this.lastX; const lastY = this.lastY;
    this.draw(x, y, lastX, lastY);

    if (Math.floor(this.x) > this.canvas.width ||
        Math.floor(this.x) < 0
    ) {
      this.velocity = ((this.velocity) * -.8);
      this.x = lastX;
    }

    this.lastX = this.x;
    this.lastY = this.y;
    this.x += this.velocity;
    this.y = Math.floor((this.initY) * Math.sin(this.x * .01)) + (this.initY);

    return true;
  }

  draw(x = this.x, y = this.x, lastX, lastY) {
    // console.log('drawing at', x, y)
    const red = x <= (this.canvas.width / 3)
      ? scaleBetween(x, 100, 255, 0, this.canvas.width / 3)
      // : 0;
      // : 255 - Math.abs(x - (this.canvas.width / 3)) % 255; TODO: Implement smooth distance based grading
      : distance(255, distance(x, (this.canvas.width / 3)), false);
    const green = (x >= (this.canvas.width / 3) && x <= (this.canvas.width * (2/3)))
      ? scaleBetween(x, 100, 255, (this.canvas.width / 3), (this.canvas.width * (2/3)))
      // : 0;
      // : 255 - Math.abs(x - (this.canvas.width * (2/3))) % 255; TODO: Implement smooth distance based grading
      : distance(255, distance((this.canvas.width * (2/3)), x), false);
    const blue = x >= (this.canvas.width * (2/3))
      ? scaleBetween(x, 150, 255, (this.canvas.width * (2/3)), this.canvas.width)
      : 0;
      // : 255 - Math.abs(x - (this.canvas.width * (2/3))) % 255; TODO: Implement smooth distance based grading
      // : distance(255, distance(x, this.canvas.width), false);

    this.context.fillStyle = 'rgb(' + Math.floor(red) + ', ' + Math.floor(green) + ', ' + Math.floor(blue) + ')';
    this.context.globalCompositeOperation = 'lighter';
    this.context.lineWidth = Math.abs(this.size * 100);
    this.context.beginPath();
    this.context.moveTo(Math.floor(x), Math.floor(y));
    this.context.arc(Math.floor(x), Math.floor(y), this.context.lineWidth, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  }
}

export default BubbleParty;
