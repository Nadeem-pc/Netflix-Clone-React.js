import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, category}) => {

    const[apiData, setApiData] = useState([])
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGNmYTlhMDE5YzFlZDVjOTU1ZTUwM2Q4MDliY2U4NyIsIm5iZiI6MTc0MzY2MTAxMC42MzkwMDAyLCJzdWIiOiI2N2VlMjdkMmI1YjFjNWE0YzNhN2E1ZjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ytc46X3-QWQ39mymQLV-MBDFL0K9GiZAMszKO54QsEM'
        }
    };
      
    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel)
    },[])
 
  return (
    <div className='titleCards'>
        <h2>{title ? title: "Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card, index) => {
                return <div className="card" key={index}>
                    <img src= {`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default TitleCards