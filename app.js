/**
 * Created by Iaroslav Zhbankov on 04.10.2016.
 */
var search = document.querySelector("input");
var searchField = document.querySelector(".searchField");
var xbutton = document.querySelector("#xbutton");

search.addEventListener("keypress", function (event) {
    if (event.which == 13) {
        var title = $(".searchForm").val();

        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + title + "&format=json&callback=?",
            dataType: 'json',
            type: "GET",
            headers: {
                "Api-User-Agent": "Example/1.0"
            },
            success: function (data) {
                $(".container").empty();
                if (data.query.search.length > 0) {
                    showArticle(data);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});

search.addEventListener("click", function () {
    var xbutton = document.createElement("div");
    var textButton = document.createTextNode("X");
    xbutton.setAttribute("id","xbutton");
    xbutton.appendChild(textButton);
    searchField.appendChild(xbutton);
});

/*xbutton.addEventListener("click", function(){
   $("#xbutton").remove();
});*/

$(function() {
    $(".searchForm").focus(function(){
        $(this).animate({ width:"500px"}, 1000);
    }).blur(function(){
        $(this).animate({ width:"250px"}, 500);
    });
});

function showArticle(data) {
    $(".randomArticle").css("margin-top", "5%");
    var container = document.querySelector(".container");
    for (var i = 0; i < 10; i++) {
        var aTag = document.createElement("a");
        aTag.setAttribute("href", "https://en.wikipedia.org/wiki/" + + data.query.search[i].title);
        aTag.setAttribute("target", "_blank");
        var node = document.createElement("div");
        node.setAttribute("class", "article");
        aTag.appendChild(node);
        container.appendChild(aTag);
        var lastarticle = document.getElementsByClassName("article")[i];
        lastarticle.innerHTML = "<b><h4>" + data.query.search[i].title + "</h4></b> \n" + data.query.search[i].snippet;

        /*var node = document.createElement("div");
        node.setAttribute("id", "article_" + i);
        node.setAttribute("class", "article");
        container.appendChild(node);
        var lastarticle = document.getElementsByClassName("container")[0].lastChild;
        lastarticle.innerHTML = "<a href='https://en.wikipedia.org/wiki/" + data.query.search[i].title + "' target='_blank' >" + "<b><h4>" + data.query.search[i].title +
            "</h4></b> \n" + data.query.search[i].snippet + "</a>";*/
    }
}