class Particle {
  constructor(x = 0, y = 0, canvas) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.size = 100;

    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
  }

  /**
   * Call the draw() function and then iterate coordinates if possible
   * 
   * @returns boolean if the particle coordinates have changed and should be updated again
   */
  update() {
    // Clone and draw the particle at the current coordinates
    // We have to clone these because this.x and this.y can change
    // before the particle is drawn
    const x = this.x; const y = this.y;
    requestAnimationFrame(() => this.draw(x, y));

    if (this.x < window.innerWidth - this.size) {
      // Increment the X position of the particle if it can still fit
      // on the display
      this.x += this.size;
      return true;
    }
    return false;
  }

  /**
   * Render out this particle to its canvas' context
   * 
   * @param {number} x the x coordinate to draw out to
   * @param {number} y the y coordinate to draw out to
   */
  draw(x = this.x, y = this.y) {
    this.context.fillStyle = '#000';
    this.context.fillRect(x, y, this.size, this.size);
  }
}

export default Particle;
