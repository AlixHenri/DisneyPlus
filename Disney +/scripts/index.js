const API_KEY = 'd727d54c8332440dd1380a50e879ce22'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
    original:'https://image.tmdb.org/t/p/original',
    small: 'https://image.tmdb.org/t/p/w500'}

const LIST_MOVIES = ['tt12801262', 'tt4823776' ,'tt2096673', 'tt5109280', 'tt7146812', 'tt2948372', 'tt2953050', 'tt3521164', 'tt2380307', 'tt8097030']

const moviesList = document.getElementById('movies_list')

function getUrlMovie(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

//Script para inicializar os dados do filme principal
function setMainMovie(movieId){
    console.log('estou selecionando o filme', movieId)

    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    console.log(data)
    const appImage = document.querySelector('.app_image img')

    const title = document.querySelector('.movie h1')
    const info = document.querySelector('.movie span')
    const description = document.querySelector('.movie p')
    const rating = document.querySelector('.rating strong')

    const yearRelease = data.release_date.split('-')[0]

    title.innerHTML = data.title
    description.innerHTML = data.overview
    rating.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Filme'

    const image = BASE_URL_IMAGE.original.concat(data.backdrop_path)
    appImage.setAttribute('src', image)
})
}

function createButtonMovie(movieId){
    const button = document.createElement('button')
    button.setAttribute('onclick', `setMainMovie('${movieId}')`)
    button.innerHTML = '<img src="assets/icon-play-button.png" alt="Icone butão play">'
    return button
}

function createMovie(movieId){
    fetch(getUrlMovie(movieId))
    .then(response => response.json())
    .then(data => {
        const movie = document.createElement('li')
        const genre = `<span>${data.genres[0].name}</span>`
        const title = `<strong>${data.title}</strong>`
        const image = BASE_URL_IMAGE.small.concat(data.backdrop_path)

        movie.innerHTML =  genre + title 
        movie.appendChild(createButtonMovie(movieId))
        movie.style.backgroundImage = `linear-gradient(90.18deg, rgb(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`
        moviesList.appendChild(movie)
    })
}

function loadListMovies(){
    LIST_MOVIES.map(createMovie)
}

loadListMovies()

setMainMovie(LIST_MOVIES[0])