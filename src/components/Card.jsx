import clear from '../assets/imgs/1.svg'

export function Card({data}){
    return(
        <div className="container-card">
                <div className="info-temp">
                    <h2 className="temp">{parseInt(data.main.temp)}°</h2>
                    <div className="plus-info">
                    <h3 className='humidity'>Humedad: {data.main.humidity}%</h3>
                    <h3 className='wind'>Viento: {data.wind.speed} km/h</h3>
                    </div>
                    <div className="container-name">
                    <h2 className="name">{data.name}</h2>
                    <h3 className="weather">{data.weather[0].description}</h3>
                    </div>
                    <img src={clear} alt="" />
                </div>
        </div>
    )
}