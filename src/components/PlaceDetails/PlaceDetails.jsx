import React, {useState} from 'react'
import Rating from '@material-ui/lab/Rating'
import {HiLocationMarker} from 'react-icons/hi'
import {BsTelephoneFill} from 'react-icons/bs'
import AddEventModal from '../AddEventModal/AddEventModal'
import * as eventApi from '../../utilities/api/event'
import { useNavigate } from 'react-router-dom'

import './placeDetails.css'

const PlaceDetails = ({place, selected, refProp}) => {

  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const [modalOpen, setModalOpen] = useState(false);


  const navigate = useNavigate()
  
  const onEventAdded = event => {
    console.log(event)
      event.backgroundColor = event.color
      eventApi.createEvent(event)
      navigate('/event')
}
  
  return (
        <div className='card border-light p-2'>
          <img src={place.photo? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} className='card-img-top' alt="" />
          <h4 class="card-title">{place.name}</h4>
          <div className='card-text d-flex justify-content-between mt-1'>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <div>
              <span className='review__num'>{place.num_reviews}</span> review{place.num_reviews > 1 && 's'}
            </div>
            
          </div>
          <div className='card-text d-flex justify-content-start mt-2'>
            <div className='price'>
              Price
            </div> 
            <div className='ms-2'>
              {place.price_level}
            </div>
          </div>
          <div className='card-text d-flex justify-content-start mt-2'>
            <div className='price'>
              Ranking
            </div> 
            <div className='ms-2'>
              {place.ranking}
            </div>
          </div>
          <div className='mt-1'>
            {place?.cuisine?.map(({name}) => (
              <div className='cuisin__name mb-2 me-2 px-2 py-1 rounded-pill'>{name}</div>
            ))}
          </div>
            {place?.address && (
              <div className='mt-1 card-text'>
              <HiLocationMarker className='location__icon'/> {place.address}
              </div>
            )}
            {place?.phone && (
              <div className='mt-1 card-text'>
                <BsTelephoneFill className='phone__icon'/> {place.phone}
              </div>
            )}
            <div className='mt-2 ms-1'>
              <button className='btn btn-blue'><a className="website__link" href={place.website} target="_blank" rel="noopener noreferrer">Website</a></button>
            </div>
            <div>
              <button onClick={()=> setModalOpen(true)} className="btn btn-blue mt-2 ms-1">Add Event</button>
              <AddEventModal 
              isOpen={modalOpen}
              onClose={()=> setModalOpen(false)}
              onEventAdded={place => onEventAdded(place)}
              place={place}
              placeName = {place.name}
            />
            </div>
        </div>
  );
}

export default PlaceDetails