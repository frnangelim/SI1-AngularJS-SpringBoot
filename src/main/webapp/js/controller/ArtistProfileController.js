(function () {
    'use strict';

    app.controller("ArtistProfileController", function ($scope, UserService, SessionService, $window, $state){

    	this.currentArtist = UserService.getCurrentArtist();
    	this.musicsX = UserService.getMusics();
    	this.musics = UserService.getArtistMusics(UserService.getCurrentArtist());
    	this.title = "Informações"

    	var self = this;

    	function loadInfo() {
    		var rating = document.getElementById('rating');
    		var lmPlayed = document.getElementById('lastMusicPlayed');
    		if(self.currentArtist.rating){
    			rating.value = self.currentArtist.rating;
    		}
    		if(self.currentArtist.lastMusicPlayed){
    			lmPlayed.value = self.currentArtist.lastMusicPlayed;
    		}
    	}

        this.logout = function(){
            var confirm = window.confirm("Tem certeza que deseja sair?")
            if(confirm){
                SessionService.logout();
                $state.go("login")
            }
        }

    	this.saveInfo = function(info){
    		if(info.rating){
    			self.currentArtist.rating = info.rating;
    		}
    		if(info.lastMusicPlayed){
    			self.currentArtist.lastMusicPlayed = info.lastMusicPlayed;
    		}
    		$scope.form.$setPristine();
    	}

        this.backHome = function(){
            if($scope.form.$dirty){
                var confirm = $window.confirm('Deseja sair sem salvar suas alterações?');
                if(confirm){
                    $state.go("home");
                }
            }else{
                $state.go("home");
            }
        }


         // Get the modal
        var modal = document.getElementById('myModal');

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        var modalText = document.getElementById("modalText");

        var confirmModal = document.getElementById('confirmModal');

        var showModal = function(msg){
            modalText.textContent = msg;
            modal.style.display = "block";
        }

        var showConfirmModal = function(msg){
            modalText.textContent = msg;
            confirmModal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            confirmModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                confirmModal.style.display = "none";
            }
        }

    });

})();