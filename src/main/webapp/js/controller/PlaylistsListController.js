(function () {
    'use strict';

    app.controller("PlaylistsListController", function ($scope, UserService, $state, $window, userAPI, playlistsAPI, SessionService){

    	// this.playlists = UserService.getPlaylists();
		this.title = "Minhas Playlists";
		this.playlists = [];

		this.currentUser = SessionService.getCurrentUser();
		this.currentUserFromAPI;

		var self = this;

		var init = function(){
    		if(!SessionService.isUserLogged()){
    			$state.go("login");
    		}
             userAPI.getUser(self.currentUser.id).then(function(response){
            	if(response.data){
            		self.currentUserFromAPI = response.data;
            		playlistsAPI.getPlaylistsFromUser(self.currentUserFromAPI).then(function(response){
		            	if(response.data){
		            		self.playlists = response.data;
		            	}
            		});
            	}
            })
    	}
    	init();

    	this.logout = function(){
			var confirm = window.confirm("Tem certeza que deseja sair?")
			if(confirm){
				SessionService.logout();
				$state.go("login")
			}
		}

		this.goToPlaylist = function(playlist){
			UserService.setCurrentPlaylist(playlist);
			$state.go("playlist_view");
		}

		this.addPlaylist = function(playlist){
			playlist.musics = [];
			playlist.owner = self.currentUserFromAPI.id;
			playlistsAPI.addPlaylist(playlist).then(function(response){
				if(response.data){
					self.goToPlaylist(response.data);
				}else{
					showModal("Essa playlist já existe!");
				}
			})
		}

		function indexOf(playlist){
			for(var i = 0; i < self.playlists.length; i++){
				if(self.playlists[i].name === playlist.name){
					return i;
				}
			}
			return -1;
		}

		this.isPlaylistSelectedToRemove = function() {
			return self.playlists.some(function(playlist){
				return playlist.selected;
			});
		}

		this.removePlaylists = function(){
			var removedPlaylist = $window.confirm('Tem certeza que deseja remover a(s) playlist(s)');
		    if(removedPlaylist){
		    	var selected = getSelectedObjects(self.playlists);
		    	for(var i = 0; i < selected.length; i++){
		    		playlistsAPI.deletePlaylist(selected[i].id).then(function(response){
		    			if(response.data){
		    				init();
		    				showModal("Playlist(s) removida(s) com sucesso");
		    			}
		    		});
		    	}
		    }
			
		}

		function getSelectedObjects(list){
			var myObjects = angular.copy(list);
		    var objects = myObjects.filter(function(object){
				if(object.selected){
					return object;
				}	
			});
		    return objects;
		}


	    // Get the modal
	    var modal = document.getElementById('myModal');

		// Get the button that opens the modal
	    var btn = document.getElementById("myBtn");

		// Get the <span> element that closes the modal
	    var span = document.getElementsByClassName("close")[0];

	    var modalText = document.getElementById("modalText");

		var showModal = function(msg){
			modalText.textContent = msg;
			modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
	    span.onclick = function() {
	        modal.style.display = "none";
	    }

		// When the user clicks anywhere outside of the modal, close it
	    window.onclick = function(event) {
	        if (event.target == modal) {
	            modal.style.display = "none";
	        }
	    }
	});
})();