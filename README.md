# Psychonaut

WIP

An experiment to test bloom filtering on auto-tagged words.

## Use case

The conceptual real world use case is storing input by a user while they chat as a way to determine what relevant advertisements/content should return.

## Example usage

    var Psychonaut = require('psychonaut');

    var ads = {
      'hike': ['REI', 'MEC'],
      'music': ['soundcloud', 'youtube']
    };

    var p = new Psychonaut({
      content: ads
    });

    var s = 'I am hiking today at noon';
    p.tag(s);
    p.check(s); // returns ads.hike
