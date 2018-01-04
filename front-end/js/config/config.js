const app = angular.module('mySpotify', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'view/login.html',
            controller: 'LoginController as loginCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'view/signup.html',
            controller: 'SignupController as signupCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'view/home.html',
            controller: 'HomeController as homeCtrl'
        })
        .state('artist_profile', {
            url: '/artistas/perfil',
            templateUrl: 'view/artist_profile.html',
            controller: 'ArtistProfileController as profileCtrl'
        })
        .state('playlists',  {
            url: '/playlists',
            templateUrl: 'view/playlists_list.html',
            controller: 'PlaylistsListController as playlistCtrl'
        })
        .state('playlist_view', {
            url: '/playlists/view',
            templateUrl: 'view/playlist_view.html',
            controller: 'PlaylistViewController as pvCtrl'
        })
        .state('musics', {
            url: '/musics',
            templateUrl: 'view/musics_list.html',
            controller: 'MusicsListController as musiCtrl'

        })

        $urlRouterProvider.otherwise('/login');
    }]);