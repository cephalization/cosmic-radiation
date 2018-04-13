import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = this.getInitState();
    // Setup a reference to DOM
    this.canvas = React.createRef();
    
    this.handleStaticMode = this.handleStaticMode.bind(this);
    this.handleBlastMode = this.handleBlastMode.bind(this);
    this.handleWipeMode = this.handleWipeMode.bind(this);
    this.handleFollowMode = this.handleFollowMode.bind(this);
    this.handleWavePoolMode = this.handleWavePoolMode.bind(this);
    this.handleClearCanvas = this.handleClearCanvas.bind(this);
    this.handleClickCanvas = this.handleClickCanvas.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handlePixelChange = this.handlePixelChange.bind(this);
    this.handlePenChange = this.handlePenChange.bind(this);
    this.handleClickModeChange = this.handleClickModeChange.bind(this);
  }
  
  getInitState() {
    return {
      mode: null,
      colorWidth: 255,
      pixelSize: 1,
      penSize: 10,
      clickMode: 'sin',
      running: 0,
      maxRunning: 10,
      randomWaveGenerator: () => {},
    };
  }

  generateRandomX() {
    return Math.floor(Math.random() * this.canvas.current.width);
  }

  generateRandomY(){ 
    return Math.floor(Math.random() * this.canvas.current.height);
  }

  handleWavePoolMode(e, start) {
    e.persist();

    if (start) {
      this.setState(
        {
          mode: 'waves',
          randomWaveGenerator: setInterval(
            this.cosmicCircleWaveGenerator.bind(this),
            500,
            this.canvas.current, 
            null,
            null,
            this.canvas.current.width, 
            this.canvas.current.height,
            true
          )
        }
      );
    } else {
      this.setState({mode: null},
        () => clearInterval(this.state.randomWaveGenerator)
      );
    }
  }
  
  handleFollowMode(e) {
    e.persist();
      this.setState(
        {running: this.state.running + 1},
        () => {
          switch(this.state.clickMode) {
            case 'sin':
              this.cosmicSinGenerator(this.canvas.current, e.clientX, e.clientY, 100, 50);
              break;
            case 'circle':
              this.cosmicCircleWaveGenerator(this.canvas.current, e.clientX, e.clientY, this.canvas.current.width, this.canvas.current.height);
              break;
            default:
              this.cosmicSquareGenerator(this.canvas.current, e.clientX, e.clientY);
          }
        }
      )
  }

  handleWipeMode() {
    this.setState({mode: 'wipe'}, () => {
      const canvas = this.canvas.current;
      const context = canvas.getContext('2d');
      const mode = this.state.mode;
      let x = 0;
      let y = 0;
  
      const timer = setInterval(
        frame,
        1000 / 60,
        this.state.penSize * 10
      );
  
      function frame(wipeSize) {
        const canRun = mode === 'wipe';
  
        if (!canRun) {
          clearInterval(timer);
        } else {
          if (x <= canvas.width && canRun) {
            context.fillStyle = '#FFFFFF';
            context.fillRect(x, y, wipeSize, wipeSize);
            x += wipeSize;
          }
          if (x > canvas.width && y <= canvas.height && canRun) {
            x = 0;
            y += wipeSize;
            context.fillStyle = '#FFFFFF';
            context.fillRect(x, y, wipeSize, wipeSize);
          }
          if (y > canvas.height) {
            clearInterval(timer);
          }
        }
      };
    });
  }
  
  handleStaticMode() {
    this.setState({mode: 'static'},
      this.staticCosmicWaveGenerator(this.canvas.current)
    );
  }
  
  handleBlastMode(e) {
    e.persist();
    this.setState({mode: 'blast'},
      () => {
        const canvas = this.canvas.current;
        for (var x = 0; x < canvas.width; x++) {
          for (var y = 0; y < canvas.height; y++) {
            this.cosmicSinGenerator(canvas, x, y, 0, 0);
          }
        }
      }
    );
  }
  
  handleClearCanvas() {
    this.setState(this.getInitState(),
      this.canvas.current.getContext('2d').clearRect(
      0,
      0,
      this.canvas.current.width,
      this.canvas.current.height
    ))
  }
  
  handleClickCanvas(e) {
    e.persist();
    this.setState({mode: 'click', running: true},
    () => {
      switch(this.state.clickMode) {
        case 'sin':
          this.cosmicSinGenerator(this.canvas.current, e.clientX, e.clientY, 100, 50);
          break;
        case 'circle':
          this.cosmicCircleWaveGenerator(this.canvas.current, e.clientX, e.clientY, this.canvas.current.width, this.canvas.current.height);
          break;
        default:
          break;
      }
    }
  )
  }
  
  handleWidthChange(e) {
    this.setState({colorWidth: e.target.value});
  }
  
  handlePixelChange(e) {
    this.setState({pixelSize: e.target.value});
  }
  
  handlePenChange(e) {
    this.setState({penSize: e.target.value});
  }
  
  handleClickModeChange(e) {
    this.setState({clickMode: e.target.value});
  }
  
  staticCosmicWaveGenerator(canvas) {
    const context = canvas.getContext('2d');
    const colorWidth = this.state.colorWidth;
    const pixelSize = this.state.pixelSize;

    for (var i = 0; i < canvas.height; i++) {
      for (var j = 0; j < canvas.width; j++) {
        context.fillStyle = 'rgb(' + Math.floor(i % colorWidth) + ', ' + Math.floor(j % colorWidth) + ', ' + Math.floor((i * j) % colorWidth) + ')';
        context.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  
  cosmicSquareGenerator(canvas, x, y) {
    const context = canvas.getContext('2d');
    const colorWidth = this.state.colorWidth;
    const penSize = this.state.penSize;

    context.fillStyle = 'rgb(' + Math.floor(x % colorWidth) + ', ' + Math.floor(y % colorWidth) + ', ' + Math.floor((x * y) % colorWidth) + ')';
    context.fillRect(x, y, penSize,penSize);
  }

  cosmicSinGenerator(canvas, x, y, xDelta, yDelta) {
    const context = canvas.getContext('2d');
    const colorWidth = this.state.colorWidth;
    
    for (var i = y; i <= y + yDelta; i++) {
      for (var j = x; j <= x + xDelta; j++) {
        context.fillStyle = 'rgb(' + Math.floor(i % colorWidth) + ', ' + Math.floor(j % colorWidth) + ', ' + Math.floor((i * j) % colorWidth) + ')';
        context.fillRect(j, (i + 75 * Math.sin(j * .1)), 1, 1);
      }
    }
  }
  
  cosmicCircleWaveGenerator(canvas, x, y, width, height, random = false) {
    const react = this;
    const context = canvas.getContext('2d');
    var i = 0;
    var j = 0;

    if (random) {
      x = react.generateRandomX();
      y = react.generateRandomY();
    }
    
    function drawCircle() {
      const colorWidth = react.state.colorWidth;
      const penSize = Number(react.state.penSize);
      const pixelSize = Number(react.state.pixelSize);
      const batchSize = Math.floor((width / 2) + (height / 2));
      const canRun = react.state.mode !== null;

      if (i > width && j <= height) {
       i = 0;
       j += penSize;
      }
      if (i <= width && canRun) {
        for (let batch = 0; batch < batchSize; batch++) {
          const distanceFromOrigin = (Math.sqrt((i-x)*(i-x) + ((j-y)*(j-y))));
          const distanceAfterChange = (Math.sqrt((i-x)*(i-x) + ((j-y)*(j-y))) * pixelSize);
          const sinResult = Math.sin(distanceFromOrigin * .1);
          const blueVal = Math.floor(((sinResult * 255) / 2) + (255 / 2)) + distanceFromOrigin % colorWidth;
          const redVal = Math.floor(((Math.sin(distanceAfterChange * .1) * 255) / 2) + (255 / 2)) % colorWidth;
          const greenVal = Math.floor(distanceAfterChange) % colorWidth;
          
          context.fillStyle = 'rgb(' + Math.floor(redVal) + ', ' + Math.floor(greenVal) + ', ' + Math.floor(blueVal) + ')';
          
          context.fillRect(i, j, penSize, penSize);
          i += penSize;
        }
        requestAnimationFrame(drawCircle);
      }
    }
    
    requestAnimationFrame(drawCircle);
  }
  
  render = ()  => (
    <div>
      <div id="selectors">
        <button type="button" onClick={this.handleStaticMode}>Square Tile Pattern</button>
        <button type="button" onClick={this.handleBlastMode}>Sin Blast Pattern</button>
        <button type="button" onClick={this.handleWipeMode}>Non-Blocking Wipe</button>
        <button type="button" onClick={(e) => this.handleWavePoolMode(e, true)}>Enable Wave Pool</button>
        <button type="button" onClick={(e) => this.handleWavePoolMode(e, false)}>Disable Wave Pool</button>
        <button type="button" onClick={() => this.setState({mode: 'follow'})}>Follow Mouse</button>
        <label> Click mode: {this.state.clickMode}
          <input type="radio" value="sin" checked={'sin' === this.state.clickMode} onChange={this.handleClickModeChange} />
          <input type="radio" value="circle" checked={'circle' === this.state.clickMode} onChange={this.handleClickModeChange} />
        </label>
        <button type="button" onClick={this.handleClearCanvas}>Clear</button>
        <label> Color Width: {this.state.colorWidth}
          <input type="range" step="1" value={this.state.colorWidth} min="0" max="255" onChange={this.handleWidthChange}></input>
        </label>
        <label> Pixel Size: {this.state.pixelSize}
          <input type="range" step=".1" value={this.state.pixelSize} min="1" max="10" onChange={this.handlePixelChange}></input>
        </label>
        <label> Pen Size: {this.state.penSize}
          <input type="range" step="1" value={this.state.penSize} min="1" max="100" onChange={this.handlePenChange}></input>
        </label>
      </div>
      <canvas
        id="canvas"
        ref={this.canvas}
        height={window.innerHeight + 'px'}
        width={window.innerWidth + 'px'}
        onClick={this.handleClickCanvas}
        onMouseMove={
          this.state.mode === 'follow'
            ? (e) => this.handleFollowMode(e)
            : () => {}
        }
      ></canvas>
    </div>
  )
}

export default App;
