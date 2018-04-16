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
    this.velocity = this.size;
    if (this.size < .2 && this.size > 0) {
      this.size = .2
    }
    if (this.size > -.2 && this.size < 0) {
      this.size = .2
    }
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
        Math.floor(this.x) < 0 ||
        Math.floor(this.y) > this.canvas.height ||
        Math.floor(this.y) < 0
    ) {
      this.velocity = (this.velocity * -1) + .1;
    }
    if (this.x < this.canvas.width) {
      this.lastX = this.x;
      this.lastY = this.y;
      this.x += this.velocity;
      this.y = Math.floor((this.initY) * Math.sin(this.x * .01)) + (this.initY);
    }
    return true;
  }

  draw(x = this.x, y = this.x, lastX, lastY) {
    // console.log('drawing at', x, y)
    this.context.fillStyle = 'rgb(' + Math.floor((x - Math.abs(this.velocity))) % 255 + ', ' + Math.floor(y - Math.abs(this.velocity)) % 255 + ', ' + Math.floor(x - lastX) % 255 + ')';
    this.context.lineWidth = Math.abs(this.size * 100);
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.arc(x, y, this.context.lineWidth, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
  }
}

export default BubbleParty;
