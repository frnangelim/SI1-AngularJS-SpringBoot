app.factory("artistsAPI", function ($http,config) {

    var _addArtist = function (artist) {
        return $http.post(config.baseUrl + "/artists", artist);
    }

    var _getArtists = function(){
        return $http.get(config.baseUrl + "/artists");
    }

    var _getArtist = function(id){
        return $http.get(config.baseUrl + "/artists/" + id);
    }

    var _updateArtist = function(artist){
        return $http.put(config.baseUrl + "/artists", artist);
    }

    var _deleteArtist = function(id){
        return $http.delete(config.baseUrl + "/artists/" + id);
    }

    var _deleteArtists = function(artists){
        return $http.delete(config.baseUrl + "/artists", artists);
    }


    return{
        addArtist: _addArtist,
        getArtists: _getArtists,
        getArtist: _getArtist,
        updateArtist: _updateArtist,
        deleteArtist: _deleteArtist,
        deleteArtists: _deleteArtists
    }

});