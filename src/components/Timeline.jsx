import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import EventCard from './EventCard'

export default function Timeline({ events, onDelete }) {
    const cardsRef = useRef([])

    const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))

    useEffect(() => {
    const cards = cardsRef.current.filter(el => el !== null)
    if (cards.length === 0) return

    gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out"
    })
    }, [events])

    return (
        <div className="timeline">
        {sorted.map((event, index) => (
            <div
            key={event.id}
            ref={el => cardsRef.current[index] = el}
            >
            <EventCard event={event} onDelete={onDelete} />
            </div>
        ))}
        </div>
    )
    }