(function () {
    'use strict';

    app.controller("PlaylistViewController", function ($scope, UserService, $state, SessionService, playlistsAPI){

    	this.playlistLocal = UserService.getCurrentPlaylist();
		this.title = UserService.getCurrentPlaylist().name;

		this.playlist;

		var self = this;

		var init = function(){
    		if(!SessionService.isUserLogged()){
    			$state.go("login");
    		}
    		playlistsAPI.getPlaylist(self.playlistLocal.id).then(function(response){
            	if(response.data){
            		self.playlist = response.data
            	}
            });
    	}
    	init();

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
	    }

		// When the user clicks anywhere outside of the modal, close it
	    window.onclick = function(event) {
	        if (event.target == modal) {
	            modal.style.display = "none";
	        }
	    }
	});
})();