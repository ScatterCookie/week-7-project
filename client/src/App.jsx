import {Routes, Route, Link} from "react-router-dom"
import MoviesPage from "./Pages/MoviePage"
import IndividualMoviePage from "./Pages/IndividualMoviePage"
import NavBar from "./Components/NavBar"
import NewMovieForm from "./Components/MovieForm"

export default function App() {
    return(
        <main>
            <NavBar />
            <NewMovieForm />
            <Routes>
                <Route path={'/'} element={<p>Home</p>}></Route>
                <Route path={'/movies'} element={<MoviesPage />}></Route>
                <Route path={'/movie/:id'} element={<IndividualMoviePage />}></Route>
            </Routes>
        </main>
    )
}