class SinBeam {
  constructor(x = 0, y = 0, canvas) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.lastX = this.x;
    this.lastY = this.y;
    this.initY = this.y;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.size = 100;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  update() {
    const x = this.x; const y = this.y; const lastX = this.lastX; const lastY = this.lastY;
    this.draw(x, y, lastX, lastY);

    if (this.x < this.canvas.width) {
      this.lastX = this.x;
      this.lastY = this.y;
      this.x += Math.floor(this.size);
      this.y = Math.floor((this.initY) * Math.sin(this.x * .1)) + (this.initY);
      return true;
    }

    return false;
  }

  draw(x = this.x, y = this.x, lastX, lastY) {
    console.log('drawing at', x, y)
    this.context.fillStyle = '#000';
    this.context.moveTo(lastX, lastY);
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}

export default SinBeam;
