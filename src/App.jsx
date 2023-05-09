import axios from 'axios';
import { useState,useEffect, Children } from 'react'
import './App.css'
import { Card } from './components/Card'

function App() {

  const[data, setData] = useState([]);
  const[dataApi, setDataApi] = useState([]);
  const[units, setUnits] = useState("metric")

  let apiKey = "7a31bc476a0b55b4ff7f39dde7a30a0c"

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }


  const error = (error) => console.log(error);

  const getPosition  = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setData(position.coords);
    }, error, options);
  };

  const getApiData = async() => {
    const apidata = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&lang=es&appid=${apiKey}&units=${units}`).then(res => setDataApi(res.data))
  }
  


  useEffect(() => {
    getPosition();
    getApiData();
  }, [])

  useEffect(() => {
    getApiData();
  }, [units])

  return (
    <>
    <main>
      <section className='section-main'>
      <Card data={dataApi} />
      <button className='btn-change' onClick={() => {
        units === "metric" ? 
        setUnits("imperial") : setUnits("metric");
      }}>{units === "metric" ? "Cambiar a F°" : "Cambiar a C°"}</button>
      </section>
    </main>
    </>
  )
}

export default App
