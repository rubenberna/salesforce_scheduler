const session = require('express-session');

class Job {

  constructor(name){ 
    this.name = name
  }

  executeAsync(scheduler) { 
    setTimeout(() => { 
      this.execute(scheduler)
    }) 
  }

  splitIntoBatches(records){
    const size = 40
    let index = 0
    let batchesArray = []
    let id = 0

    while (index < records.length) {
      batchesArray.push({batchID: id, records: records.slice(index, size + index)})
      index += size
      id ++
    }   
    this.runSequenceBatches(batchesArray)    
  }

  runSequenceBatches(batchesArray) {   
    for(let i = 0; i < batchesArray.length; i++) {
      let k = i
      setTimeout(() => {
        console.log(`batch ${batchesArray[i].batchID}`)
        this.runSingleRecord(batchesArray[i])
      }, 5000 * (k + 1))
    }
  }

  runSingleRecord(batch) {   
    batch.records.forEach(record => {
      this.processRecord(record)
    });
  }

  async execute(scheduler){
    scheduler.addLog(Date.now() + ": started to execute " + this.name);
    await session.org.query(this.getQuery(), async (err, result) => {
      if(!err && result.records) { 
        scheduler.addLog(`Number of scheduled processes: ${result.records.length}`)
        await this.splitIntoBatches(result.records)
      }
    })
    scheduler.addLog(Date.now() + ": finished executing " + this.name);
  }
}

module.exports = Job