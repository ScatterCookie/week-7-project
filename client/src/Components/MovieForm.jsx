import { useState } from "react";

export default function NewMovieForm() {

    const [movieData, setMovieData] = useState({})

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const result = await fetch(`https://week-7-project-2.onrender.com`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movieData)
            })
            const message = await result.json()
            console.log(message)
            if(result.status === 200)
                window.location.reload();
        } catch (error) {
            console.log(error)
            throw new Error('Something went wrong')
        }
    }

    function handleChange(event){
        setMovieData({...movieData, [event.target.name]: event.target.value})
        console.log(movieData)

    }
    return(
        <form onSubmit={handleSubmit}>
                <input name="title" placeholder="title" type="text" onChange={handleChange} required/>
                <button type="submit">Submit</button>
        </form>
    )
}