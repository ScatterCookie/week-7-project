import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use (express.json());
dotenv.config();

const db = new pg.Pool({connectionString: process.env.DB_URL})

app.get('/', (req, res) => res.send("root Route working"))

app.get('/movies', async (req, res) => {
    try{
        const movies = (await db.query("SELECT * FROM movies")).rows;
        res.status(200).json(movies)
    }
    catch{
        res.status(500).json({error: error.message})
    }
})

app.get('/genres', async (req, res) => {
    try{
        const genres = (await db.query("SELECT * FROM genres")).rows;
        res.status(200).json(genres)
    }
    catch{
        res.status(500).json({error: error.message})
    }
})

app.get('/movie/:id', async (req, res) => {
    const {includes_genres} = req.query;
    console.log(req.query);
    const {id} = req.params
    console.log(id);
    try{
        if (includes_genres == "true"){
            const movieInfoWithGenres = (await db.query(`
                SELECT movies.*, array_agg(genres.name) AS genres
                FROM movies
                LEFT JOIN
                movie_genres ON movies.id = movie_genres.movies_id
                LEFT JOIN
                genres ON movie_genres.genres_id = genres.id
                WHERE movies.id = $1
                GROUP BY movies.id
                `, [id])).rows[0]
                res.status(200).json(movieInfoWithGenres)
            return;
        }
        const movieInfo = (await db.query(`SELECT * FROM movies WHERE id = $1`, [id])).rows[0]
        res.status(200).json(movieInfo);
    }
    catch{
        res.status(500).json({error: error.message});
    }
})

app.post('/movies', async (req, res) => {
    const {title} = req.body;
    try
    {
        const newMovieData = (await db.query(`INSERT INTO movies(title) VALUES ($1)`, [title]))
        res.status(200).json(newMovieData);
    }
    catch
    {
        res.status(500).send({"message": "Not quite right"});
    }
})

app.delete('/movies/:id', async (req, res)=> {
    try 
    {
        const deleteMovie = (await db.query('DELETE FROM movies WHERE id = $1 RETURNING *', [req.params.id]))
        res.status(200).json({message: "Movie Deleted", movie: deleteMovie.rows[0]});
    }
    catch(err)
    {
        res.status(500).send({"message": "Not quite right"});
    }
})


app.listen(8080, () => console.log("Port 8080 is running!"))

