"use client"

import { useState, useEffect } from "react"

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => num.toString().padStart(2, "0")

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="text-center space-y-10">
        <h1
          className="text-2xl md:text-3xl uppercase tracking-widest"
          style={{
            color: "#000000",
            fontFamily: "'DotGothic16', monospace",
          }}
        >
          NEXT REGISTER PLEASE
        </h1>

        {/* Bloc compteur */}
{/* Bloc compteur + pied */}
<div className="flex flex-col items-center space-y-2">
  <div
    className="px-18 py-12 border-20 border-gray-600 bg-black inline-block"
    style={{
      fontFamily: "'DotGothic16', monospace",
    }}
  >
    <span
      className="text-6xl md:text-8xl"
      style={{
        color: "#00FF00",
        textShadow: "0 0 3px #00FF00",
      }}
    >
      {formatNumber(timeLeft.days)}:
      {formatNumber(timeLeft.hours)}:
      {formatNumber(timeLeft.minutes)}:
      {formatNumber(timeLeft.seconds)}
    </span>
  </div>

  {/* Pied du support */}
  <div className="w-8 h-16 bg-gray-600"></div> {/* Tige */}
  <div className="w-24 h-6 bg-gray-600 rounded-b-md"></div> {/* Base élargie */}
</div>

      </div>
    </section>
  )
}
