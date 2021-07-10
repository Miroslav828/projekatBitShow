const urlShows = 'http://api.tvmaze.com/shows';
const cardHolder = $('.cardHolder');
$(document).ready(()=>{
    shows()
})
const shows = (() =>{
    $.ajax({
        url:urlShows,
        method: 'GET',
    }).done((response) =>{
        response.sort((a,b) =>{
            return b.rating.average - a.rating.average
        });
    let first50TopMovies = response.slice(0, 50) 
     
    first50TopMovies.forEach((element) =>{
       // console.log(element,'usao');
        let card = $(`<div class="card col-4" style="width: 18 rem;" onclick="showInfo(${element.id})">
        <img src="${element.image.medium}" class= "card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title" >${element.name}</h5>
        
        </div>
        </div>`);
        cardHolder.append(card);
    }) 
    }).fail(() =>{
        alert("Network error")
    })
});