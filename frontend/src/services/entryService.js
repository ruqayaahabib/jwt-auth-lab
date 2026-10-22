import api from "./api"

// create entry
async function createNewEntry(entryBody){
    const response = await api.post("/entries",entryBody)
    return response.data
}


// all public entries
async function getAllPublicEntries() {
    const response = await api.get("/entries")
    return response.data
}
// my entries
async function getAllMyEntries() {
    const response = await api.get("/entries/my-entries")
    return response.data
}



export{
    createNewEntry, getAllPublicEntries, getAllMyEntries
    
}
