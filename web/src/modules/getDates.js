import moment from 'moment'

const getToday = (data) => {
  let array = []
  const today = moment().format("MMM Do YY"); 
  data.forEach(element => {   
    if (moment(element.processedDate).format("MMM Do YY") === today) {
      array.push(element)   
    }
  });
  return array
}

const getThisWeek = (data) => {
  const thisWeek = moment().week()
  let array = []
  data.forEach(element => {
    if (moment(element.processedDate).week() === thisWeek) {
      array.push(element)
    }
  });
  return array
}

const getThisMonth = (data) => {
  const thisMonth = moment().format('M YY')
  let array = []
  data.forEach(element => {    
    if (moment(element.processedDate).format('M YY') === thisMonth) { 
      array.push(element)
    }
  });
  return array
}

export default  {
  getToday,
  getThisWeek,
  getThisMonth
}