const session = require('express-session');
const Job = require('./Job');
const delighted = require('delighted')(process.env.DELIGHTED_API_KEY);
const db = require('../config/firebase/db')

// 1. Get all records who's next nps date is today
const q = "SELECT Id, Name, Email, AccountId, Next_NPS_date__c, Status__c, NPS_emails_sent__c FROM Contact WHERE (Next_NPS_date__c = TODAY AND Email != null) AND (Status__c = 'Geboekt' OR Status__c = 'On Hold' OR Status__c = 'Open') AND (Type__c != 'Sollicitant' OR Type__c != 'Strijkklant')"

// const q = "SELECT Id, Name, Email, Next_NPS_date__c, AccountId, Status__c, NPS_emails_sent__c FROM Contact WHERE Email = 'rubenmbernardes@gmail.com'"

class NpsJob extends Job {

  getQuery() { return q; };
  
  saveData(record) {
    record.processedDate = Date.now()
    db.addNpsData(record)
  }

  // 1. Query the account name of the record
  processRecord(record){    
    if (!record.AccountId) {
      record.accountName = 'unknown'
      this.sendToDelighted(record)
    }
    else {
      const accountQuery = `SELECT name FROM Account WHERE Id = '${record.AccountId}'`
      session.org.query(accountQuery, (err, result) => {
        if (err) console.log(err)
        record.accountName = result.records[0].Name
        this.sendToDelighted(record)
      })
    }
  }

  // 2. Send to Delighted
  sendToDelighted(record) {        
    delighted.person.create({
      email: record.Email,
      name: record.Name,
      properties: { "kantoor": record.accountName }
    }).then(person => {
        console.log(person.survey_scheduled_at)
        this.upateInSalesforce(record)
      }, error => console.log(error.type))
  }

  // 3. Update the record in Salesforce
  async upateInSalesforce(record) {
    let nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + 42)

    session.org.sobject("Contact").update({
      Id: record.Id,
      Next_NPS_date__c: nextDate,
      NPS_emails_sent__c: record.NPS_emails_sent__c === null ? 1 : record.NPS_emails_sent__c + 1
    }, (err, ret) => {
      if (err || !ret.success) { return console.error(err, ret); }
      this.saveData(record)
      console.log('Updated Successfully : ' + ret.id);
    })
  }
}

module.exports = NpsJob 