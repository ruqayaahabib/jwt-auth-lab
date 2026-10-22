import { getAllMyEntries } from '../services/entryService'
import { useState, useEffect } from 'react'

function MyEntries() {
    const [entries, setEntries] = useState([])

    async function myEntries() {
        const response = await getAllMyEntries()
        setEntries(response)
    }
    useEffect(()=>{
        myEntries()
    },[])
  return (
    <div>
        <h1>My entries</h1>
        {entries.map((oneEntries)=>
            <div key={oneEntries._id}>
                <h2>Title: {oneEntries.title}</h2>
            </div>
        )}
    </div>
  )
}

export default MyEntries
