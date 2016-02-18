(function(){
    angular
        .module("MovieApp")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, MovieService) {
        $scope.imdbID = $routeParams.imdbID;

        MovieService.findMovieByImdbID(
            $scope.imdbID,
            function(response) {
                $scope.movie = response;
            }
        )
    }
})();