(function () {
    'use strict';

    app.controller("LoginController", function ($scope, UserService, $window, $state, $http, userAPI, SessionService){

    	var self = this;

		var init = function(){
			if(SessionService.isUserLogged()){
				$state.go("home");
			}
    	}
    	init();

    	this.login = function(user){
    		userAPI.login(user).then(function(response){
    			if(response.data){
    				SessionService.setCurrentUser(response.data);
 					$state.go("home");
 				}else{
 					showModal("Usuário e/ou senha incorreto(s)");
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