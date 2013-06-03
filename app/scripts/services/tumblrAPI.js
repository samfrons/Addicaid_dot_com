'use strict';
/* jshint -W106 */
/* jshint -W015 */
/* jshint -W116 */

angular.module('addicaidSiteApp')
  .factory('tumblrAPI', ['$resource', function($resource) {
    var api_key = '3Uj5hvL773MVNlhFJC5gyVftNh4Qxci3hqoPkU3nAzp9bFJ8UB';
    var base_hostname = 'addicaid.tumblr.com';

    // Public API here
    return {
      blogAPI: $resource(
        'http://api.tumblr.com/v2/blog/:base_hostname/:action',
        {
          action: 'posts',
          api_key: api_key,
          base_hostname: base_hostname,
          callback: 'JSON_CALLBACK'
        },
        {
          get: {method: 'JSONP'}
        }),

      simplifyJSONProperties: function(json) {
        if (json.response.posts) {
          json.response.posts.forEach(function(post) {
            post.template = 'views/tumblr/tumblr-' + post.type + '-post.html'; // TODO: more generic getPartialUrl maybe?
            if (post.photos) {
              post.photos.forEach(function(photo) {
                photo.alt_sizes.forEach(function(alt_size) {
                  if (alt_size.width == 75) {
                    post.thumbnail = alt_size.url;
                  } else {
                    var key = 'photo_url_' + alt_size.width;
                    photo[key] = alt_size.url;
                  }
                });
              });
            }
            if (post.type == 'video' && post.player) {
              post.player.forEach(function(embed) {
                var key = 'video_embed_' + embed.width;
                post[key] = embed.embed_code;
              });
            }
          });
        }
      }
    };
  }]);
