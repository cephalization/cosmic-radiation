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
    this.handleFollowMode = this.handleFollowMode.bind(this);
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
    };
  }
  
  handleFollowMode(e) {
    this.followCosmicWaveGenerator(this.canvas.current, e.clientX, e.clientY)
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
    switch(this.state.clickMode) {
      case 'sin':
        this.cosmicSinGenerator(this.canvas.current, e.clientX, e.clientY, 100, 50);
        break;
      case 'circle':
        this.clickCosmicWaveGenerator(this.canvas.current, e.clientX, e.clientY)
        break;
      default:
        break;
    }
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
  
  followCosmicWaveGenerator(canvas, x, y) {
    const context = canvas.getContext('2d');
    const colorWidth = this.state.colorWidth;
    const penSize = this.state.penSize;

    context.fillStyle = 'rgb(' + Math.floor(x % colorWidth) + ', ' + Math.floor(y % colorWidth) + ', ' + Math.floor((x * y) % colorWidth) + ')';
    context.fillRect(x, y, penSize,penSize);
  }

  cosmicSinGenerator(canvas, x, y, xDelta, yDelta) {
    const context = canvas.getContext('2d');
    const colorWidth = this.state.colorWidth;
    const pixelSize = this.state.pixelSize;
    
    for (var i = y; i <= y + yDelta; i++) {
      for (var j = x; j <= x + xDelta; j++) {
        context.fillStyle = 'rgb(' + Math.floor(i % colorWidth) + ', ' + Math.floor(j % colorWidth) + ', ' + Math.floor((i * j) % colorWidth) + ')';
        context.fillRect(j, (i + 75 * Math.sin(j * .1)), 1, 1);
      }
    }
  }
  
  clickCosmicWaveGenerator(canvas, x, y) {
    const context = canvas.getContext('2d');
    const colorWidth = this.state.colorWidth;
    const pixelSize = this.state.pixelSize;
    const penSize = this.state.penSize;
    
    for (var i = 0; i < canvas.width; i++) {
      for (var j = 0; j < canvas.height; j++) {
        const distanceFromOrigin = (Math.sqrt((i-x)*(i-x) + ((j-y)*(j-y))));
        const distanceAfterChange = (Math.sqrt((i-x-penSize)*(i-x-penSize) + ((j-y)*(j-y))));
        const sinResult = Math.sin(distanceFromOrigin * .1);
        const blueVal = Math.floor(((sinResult * 255) / 2) + (255 / 2)) + distanceFromOrigin % colorWidth;
        const redVal = Math.floor(((Math.sin(distanceAfterChange * .1) * 255) / 2) + (255 / 2)) % colorWidth;
        const greenVal = Math.floor(distanceAfterChange) % colorWidth;
        const sWidth = window.innerWidth;
        
        context.fillStyle = 'rgb(' + Math.floor(redVal) + ', ' + Math.floor(greenVal) + ', ' + Math.floor(blueVal) + ')';
         
        context.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  
  render = ()  => (
    <div>
      <div id="selectors">
        <button type="button" onClick={this.handleStaticMode}>Square Tile Pattern</button>
        <button type="button" onClick={this.handleBlastMode}>Sin Blast Pattern</button>
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
