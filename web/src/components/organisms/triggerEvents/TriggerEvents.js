import React, { Component } from 'react';

import './triggerEvents.scss'
import HeaderDefault from '../../atoms/Header'
import ButtonDefault from '../../atoms/Button'
import SegmentDefault from '../../atoms/Segment'
import IconDefault from '../../atoms/Icon'

class TriggerEvents extends Component {

  render() {
    const { headerMsg, btnMsg, runQuery } = this.props
    return (
      <div className='trigger-events'>
        <SegmentDefault placeholder={true} size={'large'}>
          <HeaderDefault icon={true}>
            <IconDefault name={'pdf file outline'}/>
            {headerMsg}
          </HeaderDefault>
          <ButtonDefault 
            primary={true}
            onClick={e => runQuery()}>
            {btnMsg}
          </ButtonDefault>
        </SegmentDefault>
      </div>
    )
  }
}

export default TriggerEvents