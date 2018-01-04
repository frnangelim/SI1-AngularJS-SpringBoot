(function () {
    'use strict';

    app.service('UserService', function (User) {

        const self = this;
        this.currentUser = new User();

        this.currentArtist = {};
        this.currentPlaylist = {};

        this.getProfileAlbums = function () {
            return self.currentUser.getAlbums();
        };

        this.addAlbum = function (album) {
            return self.currentUser.addAlbum(album);
        };

        this.removeAlbums = function () {
            return self.currentUser.removeAlbums();
        };

        this.getProfileMusics = function () {
            return self.currentUser.getMusics();
        };

        this.addMusic = function (music) {
            return self.currentUser.addMusic(music);
        }

        this.getProfileArtists = function () {
            return self.currentUser.getArtists();
        };

        this.addArtist = function (artist) {
            return self.currentUser.addArtist(artist);
        }

        this.removeArtists = function () {
            return self.currentUser.removeArtists();
        }

        this.setFavoriteArtist = function (artist) {
            return self.currentUser.setFavoriteArtist(artist);
        }

        this.getCurrentArtist = function(){
            return self.currentArtist;
        }

        this.setCurrentArtist = function(artist){
            self.currentArtist = artist;
        }

        this.getMusics = function(){
            return self.currentUser.getMusics();
        }

        this.getArtistMusics = function(artist){
            return self.currentUser.getArtistMusics(artist);
        }

        this.getPlaylists = function(){
            return self.currentUser.getPlaylists();
        }

        this.addPlaylist = function(playlist){
            return self.currentUser.addPlaylist(playlist);
        }

        this.removePlaylists = function(){
            return self.currentUser.removePlaylists();
        }

        this.getCurrentPlaylist = function(){
            return self.currentPlaylist;
        }

        this.setCurrentPlaylist = function(playlist){
            self.currentPlaylist = playlist;
        }

    });
})();