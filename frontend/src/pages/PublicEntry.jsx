import { getAllPublicEntries } from '../services/entryService'
import { useState, useEffect } from 'react'

function PublicEntry() {
    // send get request to get all entries from the api 
    // set the state 
    // map through all the public entries 
    const [entries, setEntries] = useState([])

    async function getEntries() {
        const response = await getAllPublicEntries()
        setEntries(response)
    }

    useEffect(()=>{
        getEntries()
    },[])
  return (
    <div>
        <h1>Public Enries</h1>
      {entries.map((oneEntry)=>
    <div key={oneEntry._id}>
        <h1>Title: {oneEntry.title}</h1>
    </div>)}
    </div>
  )
}

export default PublicEntry
