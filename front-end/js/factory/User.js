(function () {
    'use strict';

    app.factory('User', function (artistsAPI, albumsAPI) {

        const User = function () {
            this.albums = [];
            this.artists = [];
            this.playlists = [];
        };

        var self = this;

        User.prototype.addArtist = function(artist){
            return addArtist(this.artists, artist);
        }

        function addArtist(list, artist){
            if(artistAlreadyExists(list,artist)){
                return false;   
            }else{
                list.push(angular.copy(artist));
                return true;
            }
        }


        User.prototype.getArtists = function () {
            loadArtistsFromAPI(this.artists);
            return this.artists;
        };

        function loadArtistsFromAPI(artists){
            resetList(artists);
            artistsAPI.getArtists().then(function(response){
                if(response.data){
                    for(var i = 0; i < response.data.length; i++){
                        artists.push(response.data[i]);
                    }
                }
            })
        }

        User.prototype.getAlbums = function () {
            loadAlbumsFromAPI(this.albums);
            return this.albums;
        };

        function loadAlbumsFromAPI(albums){
            resetList(albums);
            albumsAPI.getAlbums().then(function(response){
                if(response.data){
                    for(var i = 0; i < response.data.length; i++){
                        albums.push(response.data[i]);
                    }
                }
            })
        }

        function resetList(artists){
            var length = artists.length;
            artists.splice(0,length);
        }

        User.prototype.getPlaylists = function(){
            return this.playlists;
        }

        User.prototype.addPlaylist = function(playlist){
            return addPlaylist(this.playlists, playlist);
        }

        function addPlaylist(playlists, playlist){
            if(itemAlreadyExists(playlists, playlist)){
                return false;
            }else{
                playlists.push(angular.copy(playlist));
                return true;
            }
        }

        User.prototype.removePlaylists = function(playlists){
            return removePlaylists(this.playlists);
        }

        function removePlaylists(list){
            var i = 0;
            while(i < list.length){
                if(list[i].selected){
                    list.splice(i,1);
                    i = 0;
                }else{
                    i++;
                }
            }
            return true;
        }



        function itemAlreadyExists(list, item){
            var i;
            for(i = 0;i < list.length; i++){
                if(list[i].name == item.name){
                    return true;
                }
            }
            return false;
        }

        User.prototype.setFavoriteArtist = function (artist) {
            return setFavoriteArtist(this.artists, artist);
        }

        User.prototype.addAlbum = function (album) {
            return addAlbum(this.albums,this.artists, album);
        };

        User.prototype.removeAlbums = function () {
            return removeAlbums(this.albums, this.artists, this.playlists);
        };

        User.prototype.getArtistMusics = function (artist){
            return getArtistMusics(this.albums, artist);
        }

        function getArtistMusics(albums, artist){
            var allMusics = getMusics(albums);
            var musics = [];
            for(var i = 0; i < allMusics.length; i++){
                if(allMusics[i].artist.name == artist.name){
                    musics.push(angular.copy(allMusics[i]));
                }
            }
            return musics;
        }

        function removeAlbums(list, artists, playlists) {
            var i = 0;
            while(i < list.length){
                if(list[i].selected){
                    var album = list[i];
                    removeFromArtists(artists,album);
                    removeFromPlaylists(playlists, list)
                    list.splice(i,1);
                    i = 0;
                }else{
                    i++;
                }
            }
            return true;
        }

        function removeFromPlaylists(playlists, albums){
            for(var i = 0; i < albums.length; i++){
                for(var j = 0; j < albums[i].musics.length; j++){
                    var music = albums[i].musics[j];
                    for(var k = 0; k < playlists.length; k++){
                        var index = indexOf(playlists[k].musics, music);
                        if(index > - 1){
                            playlists[k].musics.splice(index, 1);
                        }
                    }
                }
            }
        }

        function removeFromArtists(artists, album){
            for(var i = 0; i < artists.length; i++){
                var artistAlbums = artists[i].albums
                var index = indexOf(artistAlbums, album);
                if(index > -1){
                    artists[i].albums.splice(index, 1);
                }
            }
        }

        function addAlbum(list, artists, album) {
            if(itemAlreadyExists(list, album)){
                return false;
            }else{
                list.push(angular.copy(album));
                for(var i = 0; i < artists.length; i++){
                    if(artists[i].name == album.artist.name){
                        artists[i].albums.push(angular.copy(album));
                    }
                }
                return true;
            }
        }

        var albumAlreadyExists = function(list, album){
            var i;
            for(i = 0;i < list.length; i++){
                if(list[i].name == album.name){
                    return true;
                }
            }
            return false;
        }

        function containsAlbum(album) {
            return indexOf(this.albums, album) !== -1;
        }

        function indexOf(list, album) {
            var i = 0;
            while (i < list.length) {
                if (list[i].name === album.name) 
                    return i;
                i++;
            }
            return -1;
        }

        // Music
        User.prototype.getMusics = function () {
            return getMusics(this.albums);
            
        };

        function getMusics(albums){
            var musics = [];
            var i;
            var j;
            for(i = 0; i < albums.length; i++){
                for(j = 0; j < albums[i].musics.length; j++){
                    musics.push(albums[i].musics[j]);
                }
            }
            return musics;
        }

        User.prototype.addMusic = function(music){
            return addMusic(this.albums, music);
        }

        function addMusic(list, music){
            var i;
            for(i = 0; i < list.length; i++){
                if(list[i].name === music.album){
                    if(!containsMusic(list[i], music)){
                        list[i].musics.push(angular.copy(music));
                        return true;
                    }
                }
            }
            return false;
        }

        function containsMusic(album, music){
            var i;
            for(i = 0; i < album.musics.length; i++){
                if(album.musics[i].name === music.name){
                    return true;
                }
            }
            return false;
        }

        // Artists
       
        User.prototype.removeArtists = function () {
            return removeArtists(this.artists, this.albums, this.playlists);
        }

        

        function removeArtists(list, albums, playlists) {
            var i = 0;
            while(i < list.length){
                if(list[i].selected){
                    removeAllAlbumsFromThisArtist(list[i], albums, playlists);
                    list.splice(i,1);
                    i = 0;
                }else{
                    i++;
                }
            }
            return true;
        }

        function removeAllAlbumsFromThisArtist(artist, albums, playlists) {
            var artistAlbums = artist.albums;
            for(var i = 0; i < artistAlbums.length; i++){
                var index = indexOf(albums, artistAlbums[i]);
                if(index > -1){
                    removeAlbumFromPlaylists(playlists, albums[index]);
                    albums.splice(index, 1);
                }
            }
        }

        function removeAlbumFromPlaylists(playlists, album){
            for(var i = 0; i < album.musics.length; i++){
                var music = album.musics[i];
                for(var j = 0 ; j < playlists.length; j++){
                    var index = indexOf(playlists[j].musics, music);
                    if(index > -1){
                        playlists[j].musics.splice(index, 1);
                    }
                }
            }
        }

        function setFavoriteArtist(list, artist){
            if(itemAlreadyExists(list,artist)){
                var index = indexOf(list, artist);
                list.splice(index, 1);
                addArtist(list, artist);
            }else{
                addArtist(list, artist);
            }
        }

        var artistAlreadyExists = function(list, artist){
            var i;
            for(i = 0;i < list.length; i++){
                if(list[i].name == artist.name){
                    return true;
                }
            }
            return false;
        }

        User.prototype.constructor = User;

        return User;
    });
})();