var t9Word = angular.module('t9Word', []);
 
t9Word.controller('T9Ctrl', function ($scope, $filter) {

    $scope.numberSequence = '';
    $scope.words = [];
    $scope.filteredWords = [];
    $scope.currentPage = 0;
    $scope.pageSize = 40;
    $scope.numberOfPages = function() {
        return Math.ceil($scope.filteredWords.length / $scope.pageSize);                
    };

    $scope.$watch('query', function() {
        $scope.filteredWords = $filter('filter')($scope.words, this.last);
        $scope.currentPage = 0;
    }, true);

    $scope.getWords = function() {
        $scope.words = getPossibleWords($scope.numberSequence);
        $scope.filteredWords = $filter('filter')($scope.words, $scope.query);
        $scope.currentPage = 0;
    };

    // Fired when * button clicked
    $scope.undoLast = function() {
        $scope.numberSequence = $scope.numberSequence.slice(0, $scope.numberSequence.length - 1);
        $scope.getWords();
    };

    // Fired when # button clicked
    $scope.clearSequence = function() {
        $scope.numberSequence = '';
        $scope.getWords();
    };

    // Fired when 0-9 button clicked
    $scope.addToSequence = function(num) {
        var okToRun = true;

        if ($scope.words.length >= 8e5) {
            okToRun = confirm("WARNING: Many Word Combinations - " +
                              "This might take a while, are you sure?");
        }

        if (okToRun) {
            $scope.numberSequence += num;
            $scope.getWords();
        }
    };

    // Fired when any keyboard key is pressed
    // Triggers clearSequence or addToSequence when *, # or 0-9 pressed
    $scope.pressPhoneKey = function(ev) {
        var clear = ev.which == 35,
            undo = ev.which == 42,
            num;

        if (clear) $scope.clearSequence();
        if (undo) $scope.undoLast();

        num = ev.which - 48;  // 48 is the 0 key
        if (num >= 0 && num < 10) {
            $scope.addToSequence(num);
        }
    };

});

t9Word.filter('startFrom', function() {
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    }
});
