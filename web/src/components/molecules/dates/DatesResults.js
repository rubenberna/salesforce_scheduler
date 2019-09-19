import React, { Component } from 'react';
import CountUp from 'react-countup';

import HeaderDefault from '../../atoms/Header'
import Excel from '../excel/Excel'

class DatesResults extends Component {

  sumProcessed = () => {  
    const { dbData } = this.props
    if (dbData) {
      return <CountUp end={dbData.length}/> 
    } else return 0
  }

  render () { 
    return(
      <>
        <HeaderDefault size={'small'}>
          Processed records: {this.sumProcessed()}
        </HeaderDefault>
        <Excel records={ this.props.dbData } filename={this.props.filename}/>
      </>
    )
  }  
}

export default DatesResults