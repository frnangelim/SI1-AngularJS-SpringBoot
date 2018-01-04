app.factory("musicsAPI", function ($http,config) {

    var _addMusic = function (music) {
        return $http.post(config.baseUrl + "/musics", music);
    }

    var _getMusics = function(){
        return $http.get(config.baseUrl + "/musics");
    }

    var _deleteMusic = function(id){
        return $http.delete(config.baseUrl + "/musics/" + id);
    }


    return{
        addMusic: _addMusic,
        getMusics: _getMusics,
        deleteMusic: _deleteMusic
    }

});