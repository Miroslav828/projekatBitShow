const urlSearch = "http://api.tvmaze.com/search/shows?q=";
const input = $("input");
const cardHolderSearch = $('.cardHolder');



const search = ((inputValue) => {
    $.ajax({
        url: `${urlSearch}${inputValue}`,
        method: 'GET',
    }).done((response) => {

        cardHolderSearch.html("")
        response.forEach((element) => {
            console.log(element.show.image.medium)
            let card = $(`<div class="card col-4" style="width: 18rem;" onclick="showInfo(${element.show.id})">
            <img src='${element.show.image.medium}' class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title" >${element.show.name}</h5>
            </div>
          </div>`);
            cardHolderSearch.append(card);
            // console.log(card);
        })
    }).fail(() => {
        alert('Network Error')
    })
})

const searchHandler = (event) => {

    if (event.keyCode == 13) {
        let inputValue = input.val();
        input.blur();
        if (!inputValue) {
            alert('input is required');
            return;
        }
        search(inputValue);
    }

}

input.on("keydown", searchHandler);


const dropdown = (() =>{
    const enteredText = input.val();

    $.ajax({
        url: `${urlSearch}${enteredText}`,
        method: 'GET',
    }).done((result) => {

        $('#searchList').text('');
        for (let i = 0; i < 10; i++) {
            if (result[i] !== undefined) {
                let searchListElement =
                    $(`<li onclick="showInfo(${result[i].show.id})">
        ${result[i].show.name}
        </li>`);
                $('#searchList').append(searchListElement);
                console.log(searchListElement);
            }
         
        }
    })
})

input.on("keyup", dropdown);

