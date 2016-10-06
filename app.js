/**
 * Created by Iaroslav Zhbankov on 04.10.2016.
 */
var search = document.querySelector("input");

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
                if (data.query.search.length > 0) {
                    showArticle(data);
                    events();
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});

function showArticle(data) {
    $(".container").empty();
    $(".randomArticle").css("margin-top", "5%");
    var container = document.querySelector(".container");
    for (var i = 0; i < 10; i++) {
        var node = document.createElement("div");
        node.setAttribute("id", "article_" + i);
        node.setAttribute("class", "article");
        container.appendChild(node);
        var lastarticle = document.getElementsByClassName("container")[0].lastChild;
        lastarticle.innerHTML = "<a href='https://en.wikipedia.org/wiki/" + data.query.search[i].title + "' target='_blank' >" + "<b><h4>" + data.query.search[i].title +
            "</h4></b> \n" + data.query.search[i].snippet + "/a";
    }
}

function events() {
    var articles = document.querySelectorAll(".article");
    for (var i = 0; i < articles.length; i++) {
        document.querySelector("#article_" + i).addEventListener("mouseover", function () {
            $("#article_" + i).css("background-color", "red");
        })
    }
};