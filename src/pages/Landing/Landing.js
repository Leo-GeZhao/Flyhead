import React from 'react'
import { Link } from 'react-router-dom'
import LandingImg from '../../assets/images/Landing2.jpg'
import './landing.css'

export const Landing = () => {
  return (
    <div className='landing'>
      <div>
        <img className='Landing__img' src={LandingImg} alt="" />
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center mb-5'>
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1>FlyHead</h1>
            <Link className="mt-2" to="/map">Your Next Destination</Link>
            <Link className='mt-2' to="/event">Your Current Event</Link>
        </div>
      </div>
    </div>
  )
}
