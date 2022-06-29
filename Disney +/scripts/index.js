const API_KEY = 'd727d54c8332440dd1380a50e879ce22'
const API_LANGUAGE = 'pt-br'
const LIST_MOVIES = ['tt4520988']

function getUrlMovie(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

//Script para inicializar os dados do filme principal
fetch(getUrlMovie(LIST_MOVIES[0]))
.then(response => response.json())
.then(data => {
    console.log(data)
    const app = document.getElementById('app')

    const title = document.querySelector('.movie h1')
    const info = document.querySelector('.movie span')
    const description = document.querySelector('.movie p')
    const rating = document.querySelector('.rating strong')

    const yearRelease = data.release_date.split('-')[0]

    title.innerHTML = data.title
    description.innerHTML = data.overview
    rating.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Filme'

    const image = `https:image.tmdb.org/t/p/original${data.backdrop_path}`
    app.style.backgroundImage = `linear-gradient(90.18deg, rgb(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`
})
