# This should be wrapped in a module or something, but it's left in the
#   global space to follow the signature spec in case direct tests are run.

###
Gets all possible words for a given number sequence typed on a standard
telephone 10-digit keypad. Gets ALL letter combinations and not just
those which are actual words (which would require a separate dictionary
lookup).

Characters that do not correspond with a letter will be ignored.

@param int|string numberSequence

@return array An array of unique lowercase string word possibilities
given the number sequence.
###
getPossibleWords = (numberSequence) ->
	numLetters =
		0: null
		1: null
		2: "abc"
		3: "def"
		4: "ghi"
		5: "jkl"
		6: "mno"
		7: "pqrs"
		8: "tuv"
		9: "wxyz"

	num = undefined
	letter = undefined
	letterTrie = {}
	leaves = [letterTrie]
	newLeaves = []
	leaf = undefined
	curLeaf = undefined
	letters = undefined
	return []  unless numberSequence
	numberSequence = numberSequence.toString() # unify type

	# create trie from number-to-letter map in sequence
	# by adding letters from current number in sequence to the bottom level (leaves) of the trie
	nsi = 0
	nsl = numberSequence.length

	for nsi in [nsi...nsl]
		num = numberSequence[nsi]
		letters = (if numLetters[num] then numLetters[num].split("") else [])
		lti = 0
		ltl = letters.length

		for lti in [lti...ltl]
			letter = letters[lti]
			lfi = 0
			lfl = leaves.length

			for lfi in [lfi...lfl]
				leaf = leaves[lfi]
				curLeaf = {}
				leaf[letter] = curLeaf # add new leaf to trie at letter key
				newLeaves.push curLeaf # keep track of leaves for next iteration
				leaf["sequence"] = numberSequence.slice(nsi) # for memo key in getTrieCombinations
				lfi++
			lti++

		# only set new leaves if new leaves were added (i.e. num not 0 or 1)
		if letters.length
			leaves = newLeaves
			newLeaves = []
		nsi++
	getTrieCombinations letterTrie, {}
getTrieCombinations = (trie, memo) ->
	keys = Object.keys(trie)
	kl = keys.length
	k = undefined
	subcomb = undefined
	scl = undefined
	subans = undefined
	answer = memo[trie["sequence"]]

	# if answer already computed in some prior run just return it
	return answer  if answer
	answer = []
	return []  unless kl
	i = 0

	for i in [i...kl]
		k = keys[i]
		continue  if k is "sequence"
		subcomb = getTrieCombinations(trie[k], memo)
		scl = subcomb.length

		# if there are sub-combinations, add the current letter to the front of each
		# and concat to the answer
		if scl
			subans = []
			sci = 0

			for sci in [sci...scl]
				subans.push k + subcomb[sci]
				sci++
			answer = answer.concat(subans)

			# otherwise just add the current letter to the answer
		else
			answer.push k
		i++

	# store answer to memo
	memo[trie["sequence"]] = answer
	answer