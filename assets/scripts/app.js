var AppView = Backbone.View.extend({

  el: $('#theApp'),

  initialize: function() {
    var searchBar = new SearchBar({el: this.$('.navbar')});
  }

})

var SearchBar = Backbone.View.extend({

  events: {
    'submit .navbar-form' : 'submitForm'
  },

  submitForm: function(e) {
    e.preventDefault();
    var extractedUrl = this.extractGithubUrl(this.$('.form-control').val());
    alert(extractedUrl);
  },

  extractGithubUrl: function(string) {
    var parsedString,
        isGithubRepo, 
        isGithubShortRepo,
        urlRepoRegex,
        shortRepoRegex;

    urlRepoRegex   = /github.*\/(.*)\/(.*)/;
    shortRepoRegex = /(.*)\/(.*)/;

    parsedString = function(string) {
      if ( isGithubRepo(string) ) {
        return apiIfyFromParts( urlRepoRegex.exec( string ) );
      } else if ( isGithubShortRepo(string) ) {
        return apiIfyFromParts( shortRepoRegex.exec( string ) );
      } else {
        return false;
      }
    }

    isGithubRepo = function(string) {
      return urlRepoRegex.test(string);
    }

    isGithubShortRepo = function(string) {
      return shortRepoRegex.test(string);
    }

    apiIfyFromParts = function(parts) {
      return apiIfy( parts[1], parts[2] );
    }

    apiIfy = function(username,repo) {
      return "https://api.github.com/repos/" + username + "/" + repo;
    }

    return parsedString( string )
  },


})