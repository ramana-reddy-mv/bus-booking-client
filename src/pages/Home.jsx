import { useState } from 'react'
import { cities } from '../data/mockBuses.js'
import { searchBuses } from '../services/busService.js'

function getToday() {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  return new Date(today.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

function BusMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 16V6.8C5 5.25 6.25 4 7.8 4h8.4C17.75 4 19 5.25 19 6.8V16" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 16h16v2a1 1 0 0 1-1 1h-1v1h-2v-1H8v1H6v-1H5a1 1 0 0 1-1-1v-2Z" fill="currentColor" />
        <path d="M7.5 7h9v5h-9zM7 15h.01M17 15h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Home() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState(getToday)
  const [buses, setBuses] = useState(null)
  const [message, setMessage] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  async function handleSearch(event) {
    event.preventDefault()
    setMessage('')

    if (from === to) {
      setBuses(null)
      setMessage('Choose two different cities to search for buses.')
      return
    }

    setIsSearching(true)
    const matches = await searchBuses({ from, to, date })
    setBuses(matches)
    setIsSearching(false)
  }

  function swapCities() {
    setFrom(to)
    setTo(from)
    setBuses(null)
    setMessage('')
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Bus Bookin g home">
          <BusMark />
          <span>Bus Booking</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#why-bus-booking">Why Bus Booking</a>
          <a href="#search">Help</a>
          <a className="sign-in" href="#search">Sign in</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="search">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">A better way to get there</p>
              <h1>Your next journey<br />starts <span>here.</span></h1>
              <p>Find your ride, pick your seat, and enjoy the journey.</p>
            </div>

            <form className="search-card" onSubmit={handleSearch}>
              <div className="search-fields">
                <label className="field">
                  From
                  <select required value={from} onChange={(event) => setFrom(event.target.value)}>
                    <option value="" disabled>Select city</option>
                    {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </label>

                <button className="swap-button" type="button" onClick={swapCities} aria-label="Swap departure and destination">
                  ⇄
                </button>

                <label className="field">
                  To
                  <select required value={to} onChange={(event) => setTo(event.target.value)}>
                    <option value="" disabled>Select city</option>
                    {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </label>

                <label className="field">
                  Travel date
                  <input required type="date" min={getToday()} value={date} onChange={(event) => setDate(event.target.value)} />
                </label>
              </div>

              {message && <p className="form-message" role="alert">{message}</p>}
              <button className="search-button" type="submit" disabled={isSearching}>
                {isSearching ? 'Searching…' : 'Search buses'}
              </button>
            </form>

            <div className="trust-row" aria-label="Booking benefits">
              <span><strong aria-hidden="true">✓</strong> Trusted operators</span>
              <span><strong aria-hidden="true">✓</strong> Secure booking</span>
              <span><strong aria-hidden="true">✓</strong> Easy cancellations</span>
            </div>
          </div>
        </section>

        {buses !== null && (
          <section className="content-section results-section" aria-live="polite">
            <div className="results-heading">
              <div>
                <h2>{from} to {to}</h2>
                <p>{buses.length} {buses.length === 1 ? 'bus' : 'buses'} found</p>
              </div>
              <p className="results-date">{new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}</p>
            </div>

            {buses.length > 0 ? (
              <div className="bus-list">
                {buses.map((bus) => (
                  <article className="bus-card" key={bus.id}>
                    <div>
                      <div className="bus-operator">{bus.operator}</div>
                      <p className="bus-type">{bus.type}</p>
                    </div>
                    <div>
                      <div className="bus-time">{bus.departure} — {bus.arrival}</div>
                      <p className="bus-duration">{bus.duration}</p>
                    </div>
                    <p className="bus-seats">{bus.seatsAvailable} seats available</p>
                    <div className="bus-price">₹{bus.fare.toLocaleString('en-IN')}<p className="bus-duration">per seat</p></div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-results">No buses are listed for this route yet. Try another city pair.</p>
            )}
          </section>
        )}

        <section className="content-section benefits" id="why-bus-booking" aria-label="Why travel with Bus Booking">
          <article className="benefit">
            <span className="benefit-icon" aria-hidden="true">⌕</span>
            <div><h2>Find your perfect ride</h2><p>Compare trusted operators and travel options in one place.</p></div>
          </article>
          <article className="benefit">
            <span className="benefit-icon" aria-hidden="true">▦</span>
            <div><h2>Your seat, your choice</h2><p>Choose the seat that makes your journey feel just right.</p></div>
          </article>
          <article className="benefit">
            <span className="benefit-icon" aria-hidden="true">♡</span>
            <div><h2>Travel with peace of mind</h2><p>Simple booking details and support when you need it.</p></div>
          </article>
        </section>
      </main>

      <footer className="site-footer">© {new Date().getFullYear()} Bus Booking. Your journey, made simple.</footer>
    </div>
  )
}

export default Home
