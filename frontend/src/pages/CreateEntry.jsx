import { useState } from "react"
import { useNavigate } from 'react-router'
import { createNewEntry } from "../services/entryService"
function CreateEntry() {
    const [formData, setFormData] = useState({
        title: "", entryBody: "", isPublic: false
    })
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, type, value, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }
    async function handleSubmit(event) {
        event.preventDefault()

        await createNewEntry(formData)
        navigate('/my-entries')
    }




  return (
    <div>
      <h1>Create Entry</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title"
      onChange={handleChange} value={formData.title}
      />

      <label htmlFor="entryBody">Entry Body:</label>
      <input type="text" name="entryBody" id="entryBody"
        onChange={handleChange} value={formData.entryBody}
      />
      <label htmlFor="isPublic">Is Public:</label>
      <input type="checkbox" name="isPublic" id="isPublic" checked={formData.isPublic} 
      onChange={handleChange}/>

      <button>Create Entry</button>

    </form>
    </div>
  )
}

export default CreateEntry
