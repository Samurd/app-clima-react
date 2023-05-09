import axios from 'axios';
import { useState,useEffect, Children } from 'react'
import './App.css'
import { Card } from './components/Card'
import { Loading } from './components/Loading';

function App() {

  const[data, setData] = useState({});
  const[dataApi, setDataApi] = useState({});
  const[units, setUnits] = useState("metric")
  const[isloading, setLoading] = useState(true)

  let apiKey = "7a31bc476a0b55b4ff7f39dde7a30a0c"

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 5,
  }


  const error = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setLoading(true)
        break;
    }
  };

  const getPosition  = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setData(position?.coords);
      setLoading(false)
    }, error, options);
  };

  const getApiData = async() => {
    let apidata = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data?.latitude}&lon=${data?.longitude}&lang=es&appid=${apiKey}&units=${units}`).then(res => setDataApi(res.data))
  }



  useEffect(() => {
    getPosition();
  }, [])

  useEffect(() => {
    getApiData();
    console.log(dataApi)
  }, [data])

  useEffect(() => {
    getApiData();
  }, [units])

  return (
    <>
    <main>
      <section className='section-main'>
        {isloading ? <Loading /> : <Card data={dataApi} /> }
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
