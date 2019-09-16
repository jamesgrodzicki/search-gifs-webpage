var topics = ['Dota 2', 'Fortnite', 'Breath of the Wild'];

function displayTopics(){
    var userSearch = $(this).attr("data-topic");
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${userSearch}&limit=10&api_key=kX4labCrdQYWIey290BDrU6vkWm51GuQ`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}

function renderButtons(){
    $(".button-container").empty();
    for(var i=0; i<topics.length; i++){
        $("#button-container").append(`<button type="button" class="btn btn-light" data-topic="${topics[i]}">${topics[i]}</button>`);
    }
}

$(document).ready(function(){

    renderButtons();
    displayTopics();
});