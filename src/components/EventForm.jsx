import { useState } from "react"
import { validate } from "../utils/validators"

export default function EventForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    email: "",
    bitsId: ""
  })

  const [errors, setErrors] = useState({})
  const [suggestion, setSuggestion] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const fetchSuggestion = async () => {
    setIsLoading(true)
    setFetchError(null)
    try {
      const response = await fetch("https://apis.scrimba.com/bored/api/activity")
      if (!response.ok) throw new Error("Request failed")
      const data = await response.json()
      setSuggestion(data)
    } catch (err) {
      setFetchError("Could not load a suggestion. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onAdd({
      ...formData,
      activity: suggestion ? suggestion.activity : "No suggestion fetched",
      id: Date.now()
    })
    setFormData({ title: "", description: "", date: "", category: "", email: "", bitsId: "" })
    setErrors({})
    setSuggestion(null)
  }

  return (
        <form className="forum" onSubmit={handleSubmit}>

        <div className="groper" >
            <label className="labeller">Title</label>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="holder of places" />
            {errors.title && <p className="eroneus-shit">{errors.title}</p>}
        </div>

        <div className="groper">
            <label className="labeller">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="holder of places"/>
            {errors.description && <p className="eroneus-shit">{errors.description}</p>}
        </div>

        <div className="groper">
            <label className="labeller">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="holder of places"/>
            {errors.date && <p className="eroneus-shit">{errors.date}</p>}
        </div>

        <div className="groper">
            <label className="labeller">Category</label>
            <input name="category" value={formData.category} onChange={handleChange} placeholder="holder of places"/>
            {errors.category && <p className="eroneus-shit">{errors.category}</p>}
        </div>

        <div className="groper">
            <label className="labeller">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="holder of places"/>
            {errors.email && <p className="eroneus-shit">{errors.email}</p>}
        </div>

        <div className="groper">
            <label className="labeller">BITS ID</label>
            <input name="bitsId" value={formData.bitsId} onChange={handleChange} placeholder="holder of places"/>
            {errors.bitsId && <p className="eroneus-shit">{errors.bitsId}</p>}
        </div>

        <div className="form-actions">
            <button type="button" className="btn" onClick={fetchSuggestion} disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Suggestion"}
            </button>
            <button type="submit" className="btn">Add Event</button>
        </div>

        {fetchError && <p className="error">{fetchError}</p>}

        <div >    
            {suggestion && (
                <div className="suggma">
                    Suggestion: {suggestion.activity}
                </div>
            )}
        </div>
    </form>
  )
}