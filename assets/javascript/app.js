var topics = ['Dota 2', 'Minecraft', 'Breath of the Wild'];

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
            topicDiv.attr("class", "pic-container")
            var ratingTag = $("<p>");
            $(ratingTag).text("Rating: " + results[i].rating);
            var imgTag = $("<img>");

            imgTag.attr({"class": "dynamic-pic", 
                        "src": results[i].images.fixed_height_still.url, 
                        "data-state": "still",
                        "data-animate": results[i].images.fixed_height.url, "data-still": results[i].images.fixed_height_still.url});

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
    $(".add-game").on("click", function(event){
        event.preventDefault();
        var newGame = $("#topic-input").val().trim();
        topics.push(newGame);
        renderButtons();
    });

    $(".gifs").on("click", ".dynamic-pic", function() {
        var state = $(this).attr("data-state");
        if(state == "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    $(document).on("click", ".gif-button", displayTopics);
});