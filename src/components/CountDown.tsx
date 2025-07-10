import { useState, useEffect } from "react"

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-07-26T00:00:00")

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
    <section className="w-full flex items-center justify-center">
      <div className="text-center space-y-10">
        <div className="flex flex-col items-center space-y-2">
          <div
            className="px-12 py-12 inline-block"
            style={{
              fontFamily: "DotMatrix, sans-serif",
            }}
          >
            <span
              className="text-6xl md:text-9xl text-sky-300"
            >
              {formatNumber(timeLeft.days)}:
              {formatNumber(timeLeft.hours)}:
              {formatNumber(timeLeft.minutes)}:
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
