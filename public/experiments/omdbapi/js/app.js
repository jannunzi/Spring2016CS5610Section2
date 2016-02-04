(function(){
    $(init);

    var $movieTitleTxt;
    var $searchMovieBtn;
    var $tbody;
    var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";
    var detailsUrl = "http://www.omdbapi.com/?i=IMDBID";
    var $detailsPoster;
    var $director;
    var $detailsPlot;
    var $detailsActors;
    var $detailsTitle;

    function init() {
        $movieTitleTxt = $("#movieTitleTxt");
        $searchMovieBtn = $("#searchMovieBtn");
        $tbody = $("#searchResults tbody");

        $detailsPoster = $("#detailsPoster");
        $director = $("#director");
        $detailsPlot = $("#detailsPlot");
        $detailsActors = $("#detailsActors");
        $detailsTitle = $("#detailsTitle");


        $searchMovieBtn.click(searchMovie);
    }

    function searchMovie() {
        var movieTitle = $movieTitleTxt.val();
        var url = searchUrl
            .replace("TITLE", movieTitle)
            .replace("PAGE", 1);
//        alert("URL: " + url);
        $.ajax({
            url: url,
            success: renderMovieList
        });
    }

    function renderMovieList(response) {
        $tbody.empty();
        console.log(response);
        var totalResults = response.totalResults;
        var movies = response.Search;

        for(var m=0; m<movies.length; m++) {
            var movie = movies[m];

            var title = movie.Title;
            var imdbid = movie.imdbID;
            var poster = movie.Poster;

            console.log(title);

            var $tr = $("<tr>");

            var $img = $("<img>")
                .attr("src", poster)
                .addClass("poster")
                .attr("id", imdbid)
                .click(searchMovieDetails);

            var $td = $("<td>");
            $td.append($img);
            $tr.append($td);

            $td = $("<td>")
                .append(title);
            $tr.append($td);

            $td = $("<td>").append(imdbid);
            $tr.append($td);

            $tbody.append($tr);
        }
    }

    function searchMovieDetails(event) {

        var img = $(event.currentTarget);
        var imdbid = img.attr("id");

        var url = detailsUrl.replace("IMDBID", imdbid);

        $.ajax({
            url: url,
            success: renderMovieDetails
        });
    }

    function renderMovieDetails(movie) {
        console.log(movie);

        var actors = movie.Actors;
        var director = movie.Director;
        var plot = movie.Plot;
        var poster = movie.Poster;
        var title = movie.Title;

        $detailsPoster.attr("src", poster);
        $detailsPlot.html(plot);
        $director.html(director);
        $detailsTitle.html(title);

        var actorArray = actors.split(",");

        $detailsActors.empty();

        for(var a in actorArray) {
            var actor = actorArray[a];

            var $li = $("<li>")
                .append(actor)
                .appendTo($detailsActors);
        }

    }

})();