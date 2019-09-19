import React, { Component } from 'react';
import moment from 'moment'

import './timer.scss'
import HeaderDefault from '../../atoms/Header'

class Timer extends Component {

  sort = (array) => {
    array.sort((a, b) => moment(a).diff(b))
    return moment(array[0]).fromNow()
  }

  showTimer = () => {
    const schedules = this.props.schedules()
    let currTime = moment()
    let nextScheduleToday = []
    schedules.forEach(schedule => {
      if (schedule.diff(currTime) > 0) {
        nextScheduleToday.push(new Date(schedule))
      }
    })
    if (nextScheduleToday.length) {
      return this.sort(nextScheduleToday)
    } else {
      let tomorrowArray = []
      schedules.forEach(schedule => tomorrowArray.push(schedule.add(1, 'days')))
      return this.sort(tomorrowArray)
    }
  }

  componentDidMount() {
    this.showTimer()
  }

  render () {
    return (
      <div className='timer'>
        <HeaderDefault size={'medium'}>
          {`Next process is ${this.showTimer()} `}
        </HeaderDefault>
      </div>
    )
  }
}

export default Timer