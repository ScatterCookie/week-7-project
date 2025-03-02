import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function IndividualMoviePage() {
    const [movieInfo, setMovieInfo] = useState('')

    const {id} = useParams();

    useEffect(() => {
        async function fetchMovie(){
            const res = await fetch(`http://localhost:8080/movie/${id}?includes_genres=true`)
            const data = await res.json()
            console.log(data.genres.length)
            setMovieInfo(data)
        }
        fetchMovie();
    }, [])
console.log(movieInfo);
    return(
        <div>
            <p>individual Movie</p>
            <h2>{movieInfo.title}</h2>
            {movieInfo?.genres ? <p>{movieInfo.genres.join(", ")}</p> : <p>loading</p>}
            <button type="delete">Delete Movie</button>
        </div>
    )
}