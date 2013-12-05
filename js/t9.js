/* This should be wrapped in a module or something, but it's left in the
   global space to follow the signature spec in case direct tests are run. */

/**
 * Gets all possible words for a given number sequence typed on a standard
 * telephone 10-digit keypad. Gets ALL letter combinations and not just
 * those which are actual words (which would require a separate dictionary
 * lookup).
 *
 * Characters that do not correspond with a letter will be ignored.
 *
 * @param int|string numberSequence
 *
 * @return array An array of unique lowercase string word possibilities
 *               given the number sequence.
 */
function getPossibleWords(numberSequence) {
    var numLetters = {
            '0': null,
            '1': null,
            '2': 'abc',
            '3': 'def',
            '4': 'ghi',
            '5': 'jkl',
            '6': 'mno',
            '7': 'pqrs',
            '8': 'tuv',
            '9': 'wxyz'
        },
        num, letter,
        letterTrie = {},
        leaves = [letterTrie],
        newLeaves = [],
        leaf, curLeaf, letters;

    if (!numberSequence) return [];
    numberSequence = numberSequence.toString();  // unify type

    // create trie from number-to-letter map in sequence
    // by adding letters from current number in sequence to the bottom level (leaves) of the trie
    for (var nsi = 0, nsl = numberSequence.length; nsi < nsl; nsi++) {

        num = numberSequence[nsi];
        letters = numLetters[num] ? numLetters[num].split('') : [];
        for (var lti = 0, ltl = letters.length; lti < ltl; lti++) {

            letter = letters[lti];
            for (var lfi = 0, lfl = leaves.length; lfi < lfl; lfi++) {
                leaf = leaves[lfi];
                curLeaf = {};
                leaf[letter] = curLeaf;   // add new leaf to trie at letter key
                newLeaves.push(curLeaf);  // keep track of leaves for next iteration
                leaf['sequence'] = numberSequence.slice(nsi);  // for memo key in getTrieCombinations
            }

        }

        // only set new leaves if new leaves were added (i.e. num not 0 or 1)
        if (letters.length) {
            leaves = newLeaves;
            newLeaves = [];
        }

    }

    return getTrieCombinations(letterTrie, {});
}

function getTrieCombinations(trie, memo) {
    var keys = Object.keys(trie),
        kl = keys.length,
        k, subcomb, scl, subans,
        answer = memo[trie['sequence']];

    // if answer already computed in some prior run just return it
    if (answer) return answer;
    answer = [];

    if (!kl) return [];

    for (var i = 0; i < kl; i++) {

        k = keys[i];
        if (k === 'sequence') continue;

        subcomb = getTrieCombinations(trie[k], memo);
        scl = subcomb.length;

        // if there are sub-combinations, add the current letter to the front of each
        // and concat to the answer
        if (scl) {

            subans = [];
            for (var sci = 0; sci < scl; sci++) {
                subans.push(k + subcomb[sci]);
            }
            answer = answer.concat(subans);

        // otherwise just add the current letter to the answer
        } else {
            answer.push(k);
        }

    }

    // store answer to memo
    memo[trie['sequence']] = answer;

    return answer;
}
