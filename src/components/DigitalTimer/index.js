import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerValue: 25,
    seconds: 0,
    isStarted: false,
    newTimer: 25,
  }

  timerIncrement = () => {
    const {timerValue} = this.state
    this.setState({newTimer: timerValue + 1})
    this.setState(prevState => ({timerValue: prevState.timerValue + 1}))
  }

  timerDecrement = () => {
    const {timerValue} = this.state
    this.setState({newTimer: timerValue - 1})
    if (timerValue > 1) {
      this.setState(prevState => ({timerValue: prevState.timerValue - 1}))
    }
  }

  startTimer = () => {
    const {isStarted} = this.state

    this.setState({isStarted: !isStarted})
    this.intervalId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timerValue, seconds} = this.state
    let newSeconds = seconds
    let minutes = timerValue
    if (newSeconds === 0 && minutes > 0) {
      newSeconds = 59
      this.setState({seconds: newSeconds})
      minutes -= 1
      this.setState({timerValue: minutes})
    } else if (newSeconds === 0 && minutes === 0) {
      this.setState({isStarted: false, timerValue: 25, seconds: 0})
      clearInterval(this.intervalId)
    } else {
      newSeconds -= 1
      this.setState({seconds: newSeconds})
    }
  }

  pauseTimer = () => {
    const {isStarted} = this.state
    this.setState({isStarted: !isStarted})
    clearInterval(this.intervalId)
  }

  onClickResetButton = () => {
    this.setState({isStarted: false, timerValue: 25, seconds: 0})
    clearInterval(this.intervalId)
    this.setState({newTimer: 25})
  }

  render() {
    const {timerValue, seconds, isStarted, newTimer} = this.state

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="large-cont">
          <div className="container-1">
            <div className="digital-timer-bg">
              <div className="bg-white-container">
                <h1 className="timer-in-numbers">
                  {timerValue < 10 ? `0${timerValue}` : timerValue}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
                <p className="paused">
                  {isStarted === false ? 'Paused' : 'Running'}
                </p>
              </div>
            </div>
          </div>
          <div className="container-2">
            <div className="start-stop-container">
              <div className="sub-pause-start-cont">
                {isStarted === false ? (
                  <button
                    type="button"
                    className="start-reset-button start-heading"
                    onClick={this.startTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="play-icon-image"
                    />
                    Start
                  </button>
                ) : (
                  <button
                    type="button"
                    className="start-reset-button start-heading"
                    onClick={this.pauseTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                      className="play-icon-image"
                    />
                    Pause
                  </button>
                )}
              </div>
              <div className="sub-pause-start-cont">
                <button
                  type="button"
                  className="start-reset-button start-heading"
                  onClick={this.onClickResetButton}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-icon-image"
                  />
                  Reset
                </button>
              </div>
            </div>
            <div className="centers">
              <p className="set-timer-name">Set Timer Limit</p>
            </div>
            <div className="buttons-container">
              <div className="buttons-container">
                <button
                  type="button"
                  className="button"
                  onClick={
                    isStarted === false ? this.timerDecrement : undefined
                  }
                  disabled={isStarted}
                >
                  -
                </button>
                <div className="time-setter">
                  <p className="set-timer-value">{newTimer}</p>
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={
                    isStarted === false ? this.timerIncrement : undefined
                  }
                  disabled={isStarted}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
