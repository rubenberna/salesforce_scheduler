import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

import './getData.scss'
import DatesResults from '../../molecules/dates/DatesResults'
import Timer from '../../molecules/timer/Timer'

class GetData extends Component {
  state = { 
    activeItem: 'today'
   }

  changeActiveItem = (e, { name }) => this.setState({ activeItem: name })

  renderSegment = () => {
    const { activeItem } = this.state
    const { todayData, thisWeekData, thisMonthData, filename } = this.props 
    if (activeItem === 'today') return <DatesResults dbData={todayData} filename={`${filename} ${activeItem}`}/>
    if (activeItem === 'this week') return <DatesResults dbData={thisWeekData} filename={`${filename} ${activeItem}`} />
    if (activeItem === 'this month') return <DatesResults dbData={thisMonthData} filename={`${filename} ${activeItem}`} /> 
  }

  render() {
    const { activeItem } = this.state    
    return (
      <div>
        <Timer schedules={this.props.schedules}/>
        <div className='get-data'>
          <Menu attached='top' tabular>
            <Menu.Item 
              name='today' 
              active={activeItem === 'today'} 
              onClick={this.changeActiveItem} />
            <Menu.Item
              name='this week'
              active={activeItem === 'this week'}
              onClick={this.changeActiveItem}
            />
            <Menu.Item
              name='this month'
              active={activeItem === 'this month'}
              onClick={this.changeActiveItem}
            />
          </Menu>

          <Segment attached='bottom'>
            { this.renderSegment() }
          </Segment>
        </div>
      </div>
    )
  }
}

export default GetData