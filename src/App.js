import React, { Component } from 'react';
import Radiation, { Particles } from '../';
import './App.css';

const { Bubble } = Particles;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitState();
  }

  getInitState() {
    return {};
  }

  addBubbleParty(canvas) {
    const bubbles = [];
    for (let i = 0; i < 100; i++){
      bubbles.push(
        new Bubble(canvas, 2)
      )
    }

    return bubbles;
  }

  render = () => (
    <Radiation particles={[this.addBubbleParty]} />
  )
}

export default App;
