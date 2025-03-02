CREATE TABLE IF NOT EXISTS movies(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT
)

CREATE TABLE IF NOT EXISTS genres(
  id INT PRIMARY KEY GENERATED ALWAYS AS identity,
  name TEXT
)

CREATE TABLE IF NOT EXISTS movie_genres(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genres_id INT references genres(id),
  movies_id INT references movies(id)
)

INSERT INTO movies(title) VALUES 
('The Hobbit'),
('Bullet Train'),
('Blade Runner')

INSERT INTO genres(name) VALUES 
('Horror'),
('Fantasy'),
('Sci-Fi'),
('Action'),
('Fiction'),
('Crime'),
('Thriller')

INSERT INTO movie_genres(genres_id, movies_id) VALUES
(2, 1),
(7, 2),
(3, 3)

SELECT movies.*, array_agg(genres.name) AS genres
FROM movies
LEFT JOIN
movie_genres ON movies.id = movie_genres.movies_id
LEFT JOIN
genres ON movie_genres.genres_id = genres.id
WHERE movies.id = 1
GROUP BY movies.id