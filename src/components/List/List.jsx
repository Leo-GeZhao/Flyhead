import React, {useState, useEffect, createRef} from 'react'
import { CircularProgress} from '@material-ui/core'
import PlaceDetails from '../PlaceDetails/PlaceDetails'
import './list.css'

const List = ({places,childClick, isLoading, type, setType, rating, setRating}) => {


const [elRefs, setElRefs] = useState([])

useEffect(()=> {
  const refs = Array(places?.length).fill().map((_, i)=> elRefs[i] || createRef())
  setElRefs(refs)
},[places])
  
  return (
    <div className='classes.container'>
      <div className='border-bottom border-dark'>
        <h3>
          Restaurents, Hotels & Attractions
        </h3>
      </div>
      {isLoading ? (
        <div className='loding__circle'>
          <CircularProgress size="5rem"/>
        </div>
      ) : (
        <>
      <div className='d-flex justify-content-between'>
        <div className='mt-3'>
          <label htmlFor="type" className='fs-6'>Type</label>
          <select className='form-select mt-2' name="type" value={type} onChange={(e)=> setType(e.target.value)}>
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </select>
        </div>
        <div className='mt-3'>
          <label htmlFor="rating" className='fs-6'>Rating</label>
          <select className='form-select mt-2' name="type" value={rating} onChange={(e)=> setRating(e.target.value)}>
            <option value={0}>All</option>
            <option value={3}>Not Bad</option>
            <option value={4}>Good</option>
            <option value={4.5}>Excellent</option>
          </select>
        </div>
      </div>

      <div className="mt-4 ">
        {places?.map((place,i)=>(
            <div className='mt-3'>
              <PlaceDetails 
                place={place}
                selected={Number(childClick) === i}
                refProp = {elRefs[i]}
                />
            </div>
          ))}
      </div>
        </>
      )}
    </div>
  )
}

export default List