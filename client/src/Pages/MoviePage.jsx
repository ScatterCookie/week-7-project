import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import './MoviePage.css'

export default function MoviesPage() {
    const [movies, setMovies] = useState([])

    async function handleDelete(id) {
        try {
            const result = await fetch(`http://localhost:8080/movie/${id}`, {
                method: "DELETE", 
            })
            const message = await result.json()
            console.log(message)
            if(message.message === "Movie Deleted")
                window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error('Something went wrong')
        }
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8080/movies`)
            const data = await res.json()
            setMovies(data)
        }
        fetchData()
    }, [])
    return(
        <div>
            {movies.map(movie => (
                <div key={movie.id} className="movie-container">
                    <Link to={`/movie/${movie.id}?includes_genres=true`}>
                    <h2>{movie.title}</h2>
                    </Link>
                    <button onClick={() => {console.log(movie); handleDelete(movie.id)}}>X</button>
                </div>
            ))}
        </div>
    )
}