import React, { Component } from 'react';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Excel extends Component {

  render() {
    const { records, filename } = this.props    
    
    return (
      <ExcelFile element={<button className='ui button'>Export</button>} filename={filename}>
        <ExcelSheet data={records} name="Email List">
          <ExcelColumn label="Name" value="Name" />
          <ExcelColumn label="Email" value="Email" />
          <ExcelColumn label="Processed Date" value="processedDate" />
        </ExcelSheet>
      </ExcelFile>
    )
  }
}

export default Excel