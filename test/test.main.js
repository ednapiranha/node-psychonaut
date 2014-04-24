'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var Psychonaut = require('../main');

var ads = {
  'hike': ['REI', 'MEC'],
  'music': ['soundcloud', 'youtube']
};

var p = new Psychonaut({
  content: ads
});

describe('psychonaut', function () {
  describe('tokenize', function () {
    it('should tokenize and stem a sentence containing hike and return hike ads', function () {
      var s = 'I am hiking today at noon';
      p.tag(s);
      p.check(s).should.eql(ads.hike);
    });

    it('should tokenize and stem a sentence containing music and return music ads', function () {
      var s = 'I am listening to music today at noon';
      p.tag(s);
      p.check(s).should.eql(ads.music);
    });

    it('should tokenize and stem a sentence containing hike and music and return hike ads', function () {
      var s = 'I am hiking today at noon and listening to music';
      p.tag(s);
      p.check(s).should.eql(ads.hike);
    });

    it('should not return hike or music ads', function () {
      p.check('I am just hanging out, no boggie').should.eql(false);
    });
  });
});
