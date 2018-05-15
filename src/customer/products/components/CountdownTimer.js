import React, {Component} from 'react';
import moment from 'moment';
import {Text} from 'react-native';

const COUNTDOWN_NOT_STARTED = 1;
const COUNTDOWN_STARTED = 2;
const COUNTDOWN_FINISHED = 3;
import PropTypes from 'prop-types';

export default class CountdownTimer extends Component {
  static propTypes = {
    // targetDate: PropTypes.instanceOf(Date).isRequired,
    interval: PropTypes.number,
    startDelay: PropTypes.number,
    onFinished: PropTypes.func,
    format: PropTypes.object,
    timeSeparator: PropTypes.string,
    leadingZero: PropTypes.bool,
  };

  static defaultProps = {
    interval: 1000,
    startDelay: 0,
    format: {
      day: true,
      hour: 'HH',
      minute: 'MM',
      second: 'SS',
    },
    timeSeparator: ' ',
    leadingZero: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      remainingTime: 0,
      status: COUNTDOWN_NOT_STARTED,
      intervalId: null,
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      let timer = setInterval(() => {
        this.tick();
      }, this.props.interval);

      this.setState({
        status: COUNTDOWN_STARTED,
        intervalId: timer,
      });

      this.tick();
    }, this.props.startDelay);
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };

  calculateRemainingTime = () => {
    return -1 * moment().diff(this.props.targetDate);
    // return -1 * moment().diff(this.props.targetDate);
  };

  addLeadingZero = value => {
    if (value < 10) {
      return '0' + value.toString();
    }
    return value;
  };

  tick = () => {
    this.setState({
      remainingTime: this.calculateRemainingTime(),
    });

    if (this.state.remainingTime <= 0) {
      this.setState({
        status: COUNTDOWN_FINISHED,
      });

      if (this.props.onFinished) {
        this.props.onFinished();
      }
      clearInterval(this.state.intervalId);
    }
  };

  renderRemainingTime = () => {
    let html = [];
    let {format, leadingZero, timeSeparator} = this.props;
    let {remainingTime} = this.state;

    if (format.day) {
      let days = moment.duration(remainingTime).get('days');
      if (leadingZero) {
        days = this.addLeadingZero(days);
      }

      if (days !== '00') {
        html.push(
          <Text className="react-cntdwn-day" key="day">
            {days}
            {timeSeparator}
          </Text>,
        );
      }
    }

    if (format.hour) {
      let hours = moment.duration(remainingTime).get('hours');
      if (leadingZero) {
        hours = this.addLeadingZero(hours);
      }
      html.push(
        <Text className="react-cntdwn-hour" key="hour">
          {hours}
          {timeSeparator}
        </Text>,
      );
    }

    if (format.minute) {
      let minutes = moment.duration(remainingTime).get('minutes');
      if (leadingZero) {
        minutes = this.addLeadingZero(minutes);
      }
      html.push(
        <Text className="react-cntdwn-minute" key="minute">
          {minutes}
          {timeSeparator}
        </Text>,
      );
    }

    if (format.second) {
      let seconds = moment.duration(remainingTime).get('seconds');
      if (leadingZero) {
        seconds = this.addLeadingZero(seconds);
      }
      html.push(
        <Text className="react-cntdwn-second" key="second">
          {seconds}
        </Text>,
      );
    }

    return html;
  };

  render = () => {
    if (this.state.status !== COUNTDOWN_NOT_STARTED) {
      return <Text>{this.renderRemainingTime()}</Text>;
    }

    return null;
  };
}
