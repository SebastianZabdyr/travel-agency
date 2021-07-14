import React from 'react';
import PropTypes from 'prop-types';

import {formatTime} from '../../../utils/formatTime.js';

import styles from './HappyHourAd.scss';

class HappyHourAd extends React.Component {
  constructor() {
    super();

    setInterval( () => {
      this.forceUpdate();
    }, 1000);
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));

    if(currentTime.getUTCHours() === 12) {
      return 'happy hour';
    } else {
      if(currentTime.getUTCHours() >= 12){
        nextNoon.setUTCDate(currentTime.getUTCDate()+1);
      }
      return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
    }
  }

        static propTypes = {
          title: PropTypes.string,
        }

        render(){
          const {title} = this.props;
          return (
            <div className={styles.component}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.countdown}>{formatTime(this.getCountdownTime())}</div>
            </div>
          );
        }
}

export default HappyHourAd;
