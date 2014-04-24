'use strict';

var Psychonaut = function (options) {
  var natural = require('natural');
  var BloomFilter = require('bloomfilter').BloomFilter;

  natural.PorterStemmer.attach();

  var bloom = new BloomFilter(
    32 * 256, // number of bits to allocate.
    16        // number of hash functions.
  );

  if (!options || (!options.content && typeof options.content !== 'object')) {
    throw new Error('You need content to match keywords from');
  }

  var getSuggested = function (word) {
    return options.content[word] || false;
  };

  var add = function (stemmed) {
    stemmed.forEach(function (word) {
      if (options.content[word]) {
        bloom.add(word);
      }
    });
  };

  this.tag = function (text) {
    var stemmed = text.tokenizeAndStem();

    add(stemmed);

    return stemmed;
  };

  this.check = function (text) {
    var stemmed = this.tag(text);

    for (var i = 0; i < stemmed.length; i ++) {
      if (bloom.test(stemmed[i])) {
        return getSuggested(stemmed[i]);
      }
    }

    return false;
  };
};

module.exports = Psychonaut;
