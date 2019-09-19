const  firebase = require ('../firebase/firebaseInit')

const fetchContractsData = async () => {
  const snapshot = await firebase.contracts.get()
  return snapshot.docs.map(doc => doc.data())
}

const fetchNpsData = async () => {
  const snapshot = await firebase.nps.get()
  return snapshot.docs.map(doc => doc.data())
}

const addContractsData = (data) => {
  firebase.contracts.add(data)
}

const addNpsData = (data) => {
  firebase.nps.add(data)
}

module.exports = {
  fetchContractsData,
  fetchNpsData,
  addContractsData,
  addNpsData
}