setTimeout(() =>{
    Swal.fire('These are the best rated movies of 2022',
                'Press on a poster to view information about the movie')
},500)
const input = document.getElementById("input")
input.addEventListener("input",(e)=>{
    const value = e.target.value.toLowerCase()
    content.forEach(cont => {
        const isVisible = cont.title.toLowerCase().includes(value) || cont.overview.toLowerCase().includes(value)
        cont.element.classList.toggle("hide", !isVisible)
    })
})
let content = []
const url = "https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
const imgpath = "https://image.tmdb.org/t/p/w300/"
async function load() {
    const response = await fetch(url)
    const data = await response.json()
    const savior = data.results;
    content = savior.map(element => {
        const div = document.createElement("div")
        const div2 = document.createElement("div")
        div.classList.add("gothrough")
        const img = `${imgpath}${element.poster_path}` 
        div.classList.add("movies")
        div.innerHTML = `<img src=${img}></img>`;
        div2.appendChild(div)
        document.body.appendChild(div2)
        div.value = element.id
        return {title: element.original_title, overview: element.overview, rating: element.vote_average, element:div2}
    })
    savior.forEach(element =>{
        document.querySelectorAll(".gothrough").forEach(div => {
            if(div.value === element.id){
                div.addEventListener("click",() => {
                    Swal.fire({
                        title: `<em style="color:white;">${element.original_title} </em>`,
                        background: `linear-gradient(rgba(0,0,0,0.527),rgba(0,0,0,0.5)),url(${"https://image.tmdb.org/t/p/w500/"}${element.poster_path})` + `no-repeat`,
                        icon: 'info',
                        html:
                          `<h3 style="color:white;">${element.overview}</h3>` + `<br>` + `<em style = "color:white;"> Rating: ${element.vote_average}</em>` + `<br>` + `<a style="color:azure"; href="//https://www.google.com/search?q=youtube+${element.original_title}+trailer.com">View Trailer</a>`
                      })
                })
            }
        })

    })
}
load()
