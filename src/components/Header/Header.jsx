import React, {useState} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import {CiSearch} from 'react-icons/ci'
import './header.css'


const Header = ({setCoordinates}) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat, lng})
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <a className='navbar-brand ps-3' href="/">FlyHead</a>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Your Next Destination" aria-label="Search"/>
              <button class="btn border-0" disabled><CiSearch className='search__btn'/></button>
            </form>
          </Autocomplete>
        </div>
      </nav>
    </>
  )
}

export default Header