'use strict';

angular.module('addicaidSiteApp')
  .factory('filters', [function() {
    var defaultFiltersObject = {
      location: {
        useCurrentLocation: true,
        radius: null,
        zip: null
      },
      fellowships: [
        {
          text: 'Alcoholics Anonymous',
//          cssClass: 'AA',
//          imgSrc: 'images/AAcircle.png',
          filters: [{ 'fellowship.abbrevName' : 'AA' }],
          selected: false
        },
        {
          text: 'Narcotics Anonymous',
//          cssClass: 'NA',
//          imgSrc: 'images/NAcircle.png',
          filters: [{ 'fellowship.abbrevName' : 'NA' }],
          selected: false
        }
      ],
      days: [
        // days - array of 7 days, 0..6 = Sun..Sat (matches javascript Date.getDay)
        // each day has display "text" and "selected" boolean
        {
          text: 'SUN',
          filters: [{ 'day' : 'SUNDAY' }],
          selected: false
        },
        {
          text: 'MON',
          filters: [{ 'day' : 'MONDAY' }],
          selected: false
        },
        {
          text: 'TUE',
          filters: [{ 'day' : 'TUESDAY' }],
          selected: false
        },
        {
          text: 'WED',
          filters: [{ 'day' : 'WEDNESDAY' }],
          selected: false
        },
        {
          text: 'THU',
          filters: [{ 'day' : 'THURSDAY' }],
          selected: false
        },
        {
          text: 'FRI',
          filters: [{ 'day' : 'FRIDAY' }],
          selected: false
        },
        {
          text: 'SAT',
          filters: [{ 'day' : 'SATURDAY' }],
          selected: false
        }
      ],
      times: [
        {
          text1: 'morning',
          text2: '6AM - 12PM',
          imgFilename: 'clock',
          filters: [{ name: 'between', key: 'timeAsNumber', start: 6, end: 12 }],
          selected: false
        },
        {
          text1: 'afternoon',
          text2: '12PM - 5PM',
          imgFilename: 'clock',
          filters: [{ name: 'between', key: 'timeAsNumber', start: 12, end: 17 }],
          selected: false
        },
        {
          text1: 'evening',
          text2: '5PM - 8PM',
          imgFilename: 'clock',
          filters: [{ name: 'between', key: 'timeAsNumber', start: 17, end: 20 }],
          selected: false
        },
        {
          text1: 'night',
          text2: '8PM...?',
          imgFilename: 'clock',
          filters: [
            { name: 'between', key: 'timeAsNumber', start: 20, end: 24 },
            { name: 'between', key: 'timeAsNumber', start: 0, end: 6 }
          ],
          selected: false
        }
      ],
      ratings: [
        {
          text: 'young people',
          filters: [{ 'rating.forYoungPeople' : 'true' }],
          selected: false
        },
        {
          text: 'snacks',
          filters: [{ 'rating.isHasSnacks' : 'true' }],
          selected: false
        },
        {
          text: 'fellowship',
          filters: [{ 'rating.forFellowship' : 'true' }],
          selected: false
        },
        {
          text: 'cool venue?',
          filters: [{ 'rating.isCoolVenue' : 'true' }],
          selected: false
        }
      ]
    };

    // Public API here
    return {
      someMethod: function() {
        return meaningOfLife;
      }
    };
  }]);
