app.factory("playlistsAPI", function ($http,config) {

    var _addPlaylist = function (playlist) {
        return $http.post(config.baseUrl + "/playlists", playlist);
    }

    var _getPlaylists = function(){
        return $http.get(config.baseUrl + "/playlists");
    }
    
    var _getPlaylist = function(id){
        return $http.get(config.baseUrl + "/playlists/" + id);
    }

    var _updatePlaylist = function(playlist){
        return $http.put(config.baseUrl + "/playlists", playlist);
    }

    var _deletePlaylist = function(id){
        return $http.delete(config.baseUrl + /playlists/ + id);
    }

    var _getPlaylistsFromUser = function(user){
        return $http.get(config.baseUrl + "/playlists/user/" + user.id);
    }

    return{
        addPlaylist: _addPlaylist,
        getPlaylists: _getPlaylists,
        updatePlaylist: _updatePlaylist,
        deletePlaylist: _deletePlaylist,
        getPlaylist: _getPlaylist,
        getPlaylistsFromUser: _getPlaylistsFromUser

    }

});