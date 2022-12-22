import React from 'react'
import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api'
import GoogleMapReact from 'google-map-react';
import {useMediaQuery} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import {IoLocationOutline} from 'react-icons/io5'
import {CiSearch} from 'react-icons/ci'
import './map.css'

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClick}) => {
  const isDesktop = useMediaQuery('(min-width:400px)');

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat, lng})
  }

  return (
    <div className='d-flex flex-column align-items-end'>
          <div>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <form class="d-flex" role="search">
                      <input class="form-control" type="search" placeholder="Your Next Destination" aria-label="Search"/>
                      <button class="btn border-0" disabled><CiSearch className='search__btn'/></button>
                    </form>
            </Autocomplete>
          </div> 
          <div className="map__container mt-2">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={''}
            onChange={(e)=> {
              setCoordinates({lat:e.center.lat, lng:e.center.lng})
              setBounds({ne:e.marginBounds.ne, sw:e.marginBounds.sw})
            }}
            onChildClick={(child) => setChildClick(child)}
            >
            {places?.map((place,i)=>(
              <div 
              className="marker__container"
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              >
              {
                !isDesktop?(
                  <IoLocationOutline/>
                )
                :
                (
                  <div className='card border-0 px-2'>
                    <div className='card-subtitle text-center mt-1'>
                      {place.name}
                    </div>
                      <img 
                      src={place.photo? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} 
                      alt={place.name} 
                      className="card-top-img my-1"/>
                      <Rating name="read-only" size="small" value={Number(place.rating)} readOnly/>
                  </div>
                )
              } 
              </div>
            ))}
          </GoogleMapReact>
        </div>
    </div>
  )
}

export default Map

