import React, { useState, useEffect } from 'react';
import './Searchbar.css';
import { Container } from "@material-ui/core";
import UserLocation from '../UserLocation/UserLocation'
import DisplayData from '../DisplayData/DisplayData'

const Searchbar = () => {
  const [cityData, setCityData] = useState([])
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const location = UserLocation()
  const [searchLocation, setSearchLocation] = useState({
    loading: false,
    coordinates: {
      lat: "",
      lon: ""
    }
  })

  const Api_key = {"give your-api-key"}
  useEffect(() => {
    setLoading(true)
    if (location.coordinates.lng && location.coordinates.lat) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&appid=${Api_key}`)
        .then(res => res.json())
        .then((data) => {
          setCityData(data)
          setLoading(false)
        })
        .catch((err) => console.log(err));
    }
  }, [location])

  useEffect(() => {
    setLoading(true)
    if (searchLocation.coordinates.lng && searchLocation.coordinates.lat) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${searchLocation.coordinates.lat}&lon=${searchLocation.coordinates.lng}&appid=${Api_key}`)
        .then(res => res.json())
        .then((data) =>{ 
          setCityData(data)
          setLoading(false)
        })
        .catch((err) => console.log(err));
    }
  }, [searchLocation, city])

  const handleChange = (e) => {
    const { value } = e.target
    setCity(value)
  }

  function handleClick() {
    setLoading(false)
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${Api_key}&q=${city}`)
      .then(res => res.json())
      .then((data) => data)
      .then(data=>{
        setSearchLocation({
          loaded: true,
          coordinates: {
            lat: data.coord.lat,
            lng: data.coord.lon,
          },
        })
      })
      .catch((err) => console.log(err));

  }

  if (!location.loaded) {
    return <div className="loader"></div>;
  }

  return (
    <Container fixed>
      <div className="searchbar">
        <div className="searchbar-header">
        </div>
        <div className="searchbar-search">
          <div className="searchbar-searchContainer">
          <i className="material-icons">location_on</i>
            <input placeholder="Search by location" onChange={(e) => handleChange(e)} value={city} type="text" />
            <div><i className="fa fa-search"  onClick={handleClick}></i></div>
          </div>
        </div>
        <div className="mt-2">
          {cityData.length !== 0 ? cityData && <DisplayData data={cityData} loading={loading} /> : null}
        </div>
      </div>
    </Container>
  )
};

export default Searchbar;