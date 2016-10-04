/**
 * Created by Iaroslav Zhbankov on 04.10.2016.
 */
var search = document.querySelector("input");

search.addEventListener("keypress",function(event){
if (event.which == 13){
    $.ajax({
        url: 'api.php?action=query&titles=Albert%20Einstein&prop=info',
        data: {
            format: 'json'
        },
        dataType: 'jsonp'
    }).done( function ( data ) {
        console.log(data);
    } );
}
});