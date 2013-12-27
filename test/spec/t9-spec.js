(function() {
	describe("T9Word getPossibleWords from 9463", function() {
		var wind = "9463";
		it("wine", function() {
			return expect(getPossibleWords(wind)).toContain('wine');
		});
		it("wind", function() {
			return expect(getPossibleWords(wind)).toContain('wind');
		})
	});
}).call(this);