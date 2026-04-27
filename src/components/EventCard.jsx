import { useRef } from 'react'
import gsap from 'gsap'

export default function EventCard({ event, onDelete }) {
    const cardRef = useRef(null)

    const handleDelete = () => {
        gsap.to(cardRef.current, {
        opacity: 0,
        height: 0,
        padding: 0,
        margin: 0,
        duration: 2,
        ease: "power2.in",
        onComplete: () => onDelete(event.id)
        })
    }

    return (
        <div className="card" ref={cardRef}>
            <button className="delete-btn" onClick={handleDelete}>x</button>
            <h3>{event.title}</h3>
            <p className="meta">{event.date} · {event.category}</p>
            <p className="description">{event.description}</p>
            <p className="meta">{event.email}</p>
            <p className="meta">{event.bitsId}</p>
            {event.activity && (
                <span className="activity-badge">💡 {event.activity}</span>
            )}
        </div>
  )
}