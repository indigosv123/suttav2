import { useState } from 'react'
import EventForm from './components/EventForm'
import Timeline from './components/Timeline'
import './App.css'

function App() {
  const [events, setEvents] = useState([])

  const addEvent = (event) => {
    setEvents(prev => [...prev, event])
  }

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="app">
      <h1>Event Timeline</h1>
      <EventForm onAdd={addEvent} />
      <Timeline events={events} onDelete={deleteEvent} />
    </div>
  )
}

export default App