import axios from 'axios';
import { useState,useEffect, Children } from 'react'
import './App.css'
import { Card } from './components/Card'
import { Loading } from './components/Loading';

function App() {

  const[data, setData] = useState({});
  const[dataApi, setDataApi] = useState({});
  const[units, setUnits] = useState("metric")
  const[unitsForName, setUnitsForName] = useState("metric")
  const[isloading, setLoading] = useState(true)
  const [valueInput, setValueInput] = useState("")

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
      setTimeout(() => {
        setLoading(false)
      }, 200)
    }, error, options);
  };

  const getApiData = async() => {
    let apidata = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data?.latitude}&lon=${data?.longitude}&lang=es&appid=${apiKey}&units=${units}`).then(res => setDataApi(res.data))

  }

  const getApiDataForName = async() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${valueInput}&lang=es&units=metric&appid=${apiKey}`).then(res => setDataApi(res.data))
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      getApiDataForName()
    }
  }

  const changeUnits = () => {

    if (units === "metric") {
      setUnits("imperial")
    } else {
      setUnits("metric");
    };
  }



  useEffect(() => {
    getPosition();
  }, [])

  useEffect(() => {
    getApiData();
  }, [data])

  useEffect(() => {
    getApiData()
  }, [units])

  useEffect(() => {
    getApiDataForName();
  }, [unitsForName])

  return (
    <>
    <header>
      <nav>
        <input className='input-search' onKeyDown={handleKeyDown} onChange={(e) => setValueInput(e.target.value)} type="text" placeholder='Type your city' />
      </nav>
    </header>
    <main>
      <section className='section-main'>
        {isloading ? <Loading /> : <Card data={dataApi} /> }
      <button className='btn-change' onClick={changeUnits}>{units || unitsForName === "metric" ? "Cambiar a F°" : "Cambiar a C°"}</button>
      </section>
    </main>
    </>
  )
}

export default App
