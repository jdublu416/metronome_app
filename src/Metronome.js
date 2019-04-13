import React, { Component } from "react";
import "./Metronome.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

class Metronome extends Component {
  constructor(props) {
    super(props);
    // setting the initial state, beats per measure is static at this point
    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };
    //have to make an instance/object with the Audio files to be able to use them
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  /*this handles the slide value of bpm to change the state, 
  also manages timer/bpm if user manipulates slider while playing is true*/
  handleBpmChange = event => {
    const bpm = event.target.value;
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  };

  /*operates the button onClick, starts a timer and changes the value of playing
when toggles false the timer is reset, when true timer runs with seconds divided by this.state.bpm *1000ms
This calculation sets the click sound to bpm*/
  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({ playing: false });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({ count: 0, playing: true }, this.playClick);
    }
  };

  /*this function keeps count and changes the sound file to coincide with the beginning
  of the measure*/
  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm } = this.state;
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
      </div>
    );
  }
}

export default Metronome;
