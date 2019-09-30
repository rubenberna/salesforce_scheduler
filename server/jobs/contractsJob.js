const session = require('express-session');
const Job = require('./Job');
const db = require('../config/firebase/db')

const q = "SELECT Id, Name, Email, Reminders__c FROM Contact WHERE (Next_contract_attempt_date__c = TODAY AND Signed_Contract__c = FALSE AND Email != null AND Reminders__c <= 2 AND Type__c != 'Sollicitant') AND (Status__c = 'Geboekt' OR Status__c = 'On Hold' OR Status__c = 'Open')"
// const q = "SELECT Id, Name, Email, Reminders__c FROM Contact WHERE (Next_contract_attempt_date__c = TODAY AND Signed_Contract__c = FALSE AND Email = 'rubenmbernardes@gmail.com')"

class ContractJob extends Job {

  getQuery() { return q; };

  saveData(record) {
    record.processedDate = Date.now()
    // db.addContractsData(record)
  }

  processRecord(record){
    session.org.sobject("Contact").update({
      Id: record.Id,
      Reminders__c: record.Reminders__c === null || 0 ? 1 : record.Reminders__c + 1,
    }, (err, ret) => {
        if (err || !ret.success) { return console.error(err, ret); }
        this.saveData(record)
        console.log('Updated Successfully : ' + ret.id);
    })
  }
}

module.exports = ContractJob
