t9Word = angular.module("t9Word", [])
t9Word.controller "T9Ctrl", ($scope, $filter) ->
	$scope.numberSequence = ""
	$scope.words = []
	$scope.filteredWords = []
	$scope.currentPage = 0
	$scope.pageSize = 40
	$scope.numberOfPages = ->
		Math.ceil $scope.filteredWords.length / $scope.pageSize

	$scope.$watch "query", (->
		$scope.filteredWords = $filter("filter")($scope.words, @last)
		$scope.currentPage = 0
	), true
	$scope.getWords = ->
		$scope.words = getPossibleWords($scope.numberSequence)
		$scope.filteredWords = $filter("filter")($scope.words, $scope.query)
		$scope.currentPage = 0


	# Fired when * button clicked
	$scope.undoLast = ->
		$scope.numberSequence = $scope.numberSequence.slice(0, $scope.numberSequence.length - 1)
		$scope.getWords()


	# Fired when # button clicked
	$scope.clearSequence = ->
		$scope.numberSequence = ""
		$scope.getWords()


	# Fired when 0-9 button clicked
	$scope.addToSequence = (num) ->
		okToRun = true
		okToRun = confirm("WARNING: Many Word Combinations - " + "This might take a while, are you sure?")  if $scope.words.length >= 8e5
		if okToRun
			$scope.numberSequence += num
			$scope.getWords()


	# Fired when any keyboard key is pressed
	# Triggers clearSequence or addToSequence when *, # or 0-9 pressed
	$scope.pressPhoneKey = (ev) ->
		clear = ev.which is 35
		undo = ev.which is 42
		num = undefined
		$scope.clearSequence()  if clear
		$scope.undoLast()  if undo
		num = ev.which - 48 # 48 is the 0 key
		$scope.addToSequence num  if num >= 0 and num < 10

t9Word.filter "startFrom", ->
	(input, start) ->
		start = parseInt(start, 10)
		input.slice start
