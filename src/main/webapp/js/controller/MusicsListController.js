(function () {
    'use strict';

    app.controller("MusicsListController", function ($scope, $state, UserService, musicsAPI, SessionService, playlistsAPI){

    	this.musics = [];	
    	this.playlist = UserService.getCurrentPlaylist();
		this.title = "Todas as músicas";

		this.playlistFromAPI;

		var self = this;

		var init = function(){
    		if(!SessionService.isUserLogged()){
    			$state.go("login");
    		}
            musicsAPI.getMusics().then(function(response){
            	if(response.data){
            		self.musics = response.data;
            		getPlaylist();
            	}
            });
           
    	}
		init();

		var getPlaylist = function(){
			 playlistsAPI.getPlaylist(self.playlist.id).then(function(response){
            	if(response.data){
            		self.playlistFromAPI = response.data
            		initScope();
            	}
            });
		}

    	var initScope = function() {	
    		for(var i = 0; i < self.musics.length; i++){
    			var index = indexOf(self.playlistFromAPI.musics, self.musics[i]);
    			if(index > -1){
    				self.musics[i].selected = true;
    			}else{
    				self.musics[i].selected = false;
    			}
    		}
		}
    	
		function indexOf(list, item) {
            var i = 0;
            while (i < list.length) {
                if (list[i].name === item.name) 
                    return i;
                i++;
            }
            return -1;
        }

		this.editPlaylist = function(){
			self.playlist.musics = [];
			for(var i = 0; i < self.musics.length; i++){
				if(self.musics[i].selected){
					self.playlist.musics.push(angular.copy(self.musics[i]));
				}
			}
			self.playlistFromAPI.musics = self.playlist.musics;
			playlistsAPI.updatePlaylist(self.playlistFromAPI).then(function(response){
				if(response.data){
					console.log(response.data);
					$scope.musicForm.$setPristine();
					showModal("Alterações salvas com sucesso!")
				}
			})
		}

		this.logout = function(){
			var confirm = window.confirm("Tem certeza que deseja sair?")
			if(confirm){
				SessionService.logout();
				$state.go("login")
			}
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
	        $state.go("playlist_view");
	    }

		// When the user clicks anywhere outside of the modal, close it
	    window.onclick = function(event) {
	        if (event.target == modal) {
	            modal.style.display = "none";
	            $state.go("playlist_view");
	        }
	    }
	});
})();