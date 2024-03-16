$(document).ready(function(){
    $(function() {
        $("#movie-title").autocomplete({
            source: suggestMoviesUrl,
            minLength: 2,
        });
    });
})
