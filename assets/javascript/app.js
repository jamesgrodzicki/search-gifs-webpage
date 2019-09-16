var topics = ['Dota 2', 'Fortnite', 'Breath of the Wild'];

function displayTopics(){
    var userSearch = $(this).attr("data-topic");
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${userSearch}&limit=10&api_key=kX4labCrdQYWIey290BDrU6vkWm51GuQ`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        results = response.data;
        for(var i=0;i<results.length;i++){
            var topicDiv = $("<div>");
            var ratingTag = $("<p>");
            $(ratingTag).text("Rating: " + results[i].rating);
            var imgTag = $("<img>");
            imgTag.attr("src", results[i].images.fixed_height_still.url);
            $(topicDiv).append(imgTag, ratingTag);
            $(".gifs").prepend(topicDiv)
        }
    })
}

function renderButtons(){
    $("#button-container").empty();
    for(var i=0; i<topics.length; i++){
        $("#button-container").append(`<button type="button" class="btn btn-light gif-button" data-topic="${topics[i]}">${topics[i]}</button>`);
    }
}

$(document).ready(function(){
    renderButtons();
    $("#add-game").on("click", function(event){
        event.preventDefault();
        var newGame = $("#game-input").val().trim();
        topics.push(newGame);
        renderButtons();
    });
    $(document).on("click", ".gif-button", displayTopics);
});