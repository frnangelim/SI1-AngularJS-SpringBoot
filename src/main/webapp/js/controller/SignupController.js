(function () {
    'use strict';

    app.controller("SignupController", function ($scope, UserService, $window, $state, $http, userAPI, SessionService){

    	var self = this;

		var init = function(){
			if(SessionService.isUserLogged()){
				$state.go("home");
			}
    	}
    	init();

    	this.signup = function(user){
    		user.playlists = [];
    		userAPI.addUser(user).then(function(response){
 				if(response.data){
 					showModal("Usuário cadastrado com sucesso!")
 				}else{
 					showModal("Já existe um usuário com este e-mail.")
 				}
    		});
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
	    	$state.go("login");
	        modal.style.display = "none";
	    }

		// When the user clicks anywhere outside of the modal, close it
	    window.onclick = function(event) {
	        if (event.target == modal) {
	        	$state.go("login");
	            modal.style.display = "none";
	        }
	    }

    });

})();