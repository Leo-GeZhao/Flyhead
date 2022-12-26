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
      <div className=''>
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1 className='landing__title'>FlyHead</h1>
            <Link className="mt-2 landing__link" to="/map">Next Destination</Link>
            <Link className='mt-2 landing__link' to="/event">Current Event</Link>
            <Link className='mt-2 landing__link' to="/spending">Spending</Link>
        </div>
      </div>
    </div>
  )
}
