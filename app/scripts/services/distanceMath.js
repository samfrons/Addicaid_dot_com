'use strict';

angular.module('addicaidSiteApp')
  .factory('distanceMath', [function() {

    /*
     function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
     var R = 6371; // Radius of the earth in km
     var dLat = deg2rad(lat2-lat1);  // deg2rad below
     var dLon = deg2rad(lon2-lon1);
     var a =
     Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
     Math.sin(dLon/2) * Math.sin(dLon/2)
     ;
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R * c; // Distance in km
     return d;
     }

     function deg2rad(deg) {
     return deg * (Math.PI/180)
     }*/

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles                                   :::
//:::                  'K' is kilometers (default)                            :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at http://www.geodatasource.com                          :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: http://www.geodatasource.com                        :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2013            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // TODO: Distance calculation NEEDS TEST CASES!
    var calculateDistance = function(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var radlon1 = Math.PI * lon1/180;
      var radlon2 = Math.PI * lon2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit==='K') { dist = dist * 1.609344; }
      if (unit==='N') { dist = dist * 0.8684; }
      return dist;
    };



    return {
      distance: function(lat1, lon1, lat2, lon2, unit) {
        return calculateDistance(lat1, lon1, lat2, lon2, unit);
      }
    };
  }]);
