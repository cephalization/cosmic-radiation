import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Radiation.css';

class Radiation extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitState();
    this.renderQueue = [];
    this.canvas = React.createRef();

    this.handleClearCanvas = this.handleClearCanvas.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.eventLoop = this.eventLoop.bind(this);
    this.toggleEventLoop = this.toggleEventLoop.bind(this)
  }

  componentDidMount() {
    // Attach window resize handler to ensure particles are responsive
    window.addEventListener('resize', this.handleWindowResize);

    // Parse renderable particles from props and add them to event loop queue
    let renderables = [];
    this.props.particles.forEach(
      particleConstructor => renderables = [...renderables, ...particleConstructor(this.canvas.current)]
    );
    this.renderQueue = [...renderables];

    // Start the Event loop, will read from the class property renderQueue
    this.toggleEventLoop();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  /**
   * Generate initial state object
   *
   * @returns initial state object
   */
  getInitState() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * At maximimum once every frame, update the state with the window's dimensions
   */
  handleWindowResize() {
    requestAnimationFrame(
      () => this.setState({
        height: window.innerHeight,
        width: window.innerWidth
      })
    );
  }

  /**
   * Reset the state, clear the renderQueue, and reset the canvas
   */
  handleClearCanvas() {
    this.setState(this.getInitState(),
      () => {
        this.renderQueue = [];
        this.canvas.current.getContext('2d').clearRect(
          0,
          0,
          this.canvas.current.width,
          this.canvas.current.height
        );
      })
  }

  /**
   * Toggle animation event loop
   * Run the event loop in anticipation of a frame, 60 times a second
   * If it is already running, disable it.
   */
  toggleEventLoop() {
    if (this.eventInterval == null) {
      this.eventInterval = setInterval(
        requestAnimationFrame,
        1000 / 60,
        this.eventLoop
      )
    } else {
      clearInterval(this.eventInterval);
      this.eventInterval = null;
    }
  }

  /**
   * Trigger every particle in renderQueue's update method
   * Put it back in the renderQueue if the update method returns truthy
   */
  eventLoop() {
    const context = this.canvas.current.getContext('2d');
    context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)

    // Clone the queue and pre-render one update for each item
    const queue = [...this.renderQueue];

    // Clear out the class queue here, it will now only contain new user items
    this.renderQueue = [];
    const nextUpdates = [];

    let renderEvent = queue.pop();
    while(renderEvent) {
      if(renderEvent && renderEvent.update()) {
        // Add the event to the new queue, it has more work to do next time
        nextUpdates.push(renderEvent);
      }
      renderEvent = queue.pop();
    }

    // Combine the current class queue and the 'new' queue
    this.renderQueue = [...this.renderQueue, ...nextUpdates];
  }

  render = ({particles, ...props} = this.props) => (
      <canvas
        id="canvas"
        ref={this.canvas}
        height={`${this.state.height}px`}
        width={`${this.state.width}px`}
        {...props}
      >
      </canvas>
  )
}

Radiation.propTypes = {
  /**
   * An array of Particle functions as defined in ./drawables
   */
  particles: PropTypes.arrayOf(PropTypes.func)
};

Radiation.defaultProps = {
  particles: []
}

export default Radiation;
