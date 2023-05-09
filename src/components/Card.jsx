import { useState,useEffect } from 'react'
import clear from '../assets/imgs/1.svg'
import clouds from '../assets/imgs/2.svg'
import rain from '../assets/imgs/5.svg'
import drizzle from '../assets/imgs/6.svg'
import snow from '../assets/imgs/7.svg'
import wind from '../assets/imgs/8.svg'

export function Card({data}){

    const [imgWeather, setImgWeather] = useState(null) 
    let weather = data.weather[0].main

    useEffect(() => {
        if (weather === "Clear") {
            setImgWeather(clear)
        } else if (weather === "Clouds") {
            setImgWeather(clouds)
        } else if (weather === "Rain") {
            setImgWeather(rain)
        } else if (weather === "Drizzle") {
            setImgWeather(drizzle)
        } else if (weather === "Snow") {
            setImgWeather(snow)
        } else if (weather === "Wind") {
            setImgWeather(wind)
        }
    }, []);
    
    return(
        <div className="container-card">
                <div className="info-temp">
                    <h2 className="temp">{parseInt(data.main?.temp)}°</h2>
                    <div className="plus-info">
                    <h3 className='humidity'>Humedad: {data.main?.humidity}%</h3>
                    <h3 className='wind'>Viento: {data.wind?.speed} km/h</h3>
                    </div>
                    <div className="container-name">
                    <h2 className="name">{data.name}</h2>
                    <h3 className="weather">{data.weather[0].description}</h3>
                    </div>
                    <img src={imgWeather} alt="" />
                </div>
        </div>
    )
}