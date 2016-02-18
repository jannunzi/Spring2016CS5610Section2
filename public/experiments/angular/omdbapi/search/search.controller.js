(function(){
    angular
        .module("MovieApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, MovieService) {
        $scope.search = search;
        $scope.title = $routeParams.title;

        //if(!$scope.title) {
        //    $scope.title = "Star Wars";
        //}

        if($scope.title) {
            search($scope.title);
        }

        function search(title) {
            $location.url("/search/"+$scope.title);
            console.log(title);
            MovieService.findMovieByTitle(
                title,
                function(response){
                    console.log(response);
                    $scope.data = response;
                });
        }
    }
})();