(function () {
    'use strict';

    app.controller("HomeController", function ($scope,$state, UserService, $window,userAPI, artistsAPI, albumsAPI, musicsAPI, SessionService){
		this.titleAlbum = "Adicionar Álbum";
		this.titleMusic = "Adicionar Música"
		this.titleArtist = "Adicionar Artistas"

		this.searchText = "";

		this.albums = [];
		this.musics = [];
		this.artists = [];

		this.currentUser = SessionService.getCurrentUser();

		this.currentUserFromAPI;


		var self = this;

		this.init = function(){
    		if(!SessionService.isUserLogged()){
    			$state.go("login");
    		}	
    		artistsAPI.getArtists().then(function(response){
                if(response.data){
                    self.artists = response.data;
                }
            });
            musicsAPI.getMusics().then(function(response){
            	if(response.data){
            		self.musics = response.data;
            	}
            });
            albumsAPI.getAlbums().then(function(response){
            	if(response.data){
            		console.log(response.data);
            		self.albums = response.data;
            	}
            });
            userAPI.getUser(self.currentUser.id).then(function(response){
            	if(response.data){
            		self.currentUserFromAPI = response.data;
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

		this.addArtist = function(artist) {
			if(artist.favorite == null){
				artist.favorite = false;
			}
			artist.albums = [];
			artist.fans = [];
			artist.selected = false;

			artistsAPI.addArtist(artist).then(function(response){
                if(response.data){
                	self.artists.push(response.data);
                	delete $scope.artist;
                }else{
                	showModal("Artista existente!");
                }
            });
			
			
		}
		this.removeArtists = function() {
			var removeArtist = $window.confirm('Tem certeza que deseja remover o(s) artista(s)? Todos os albuns e músicas desse(s) artista(s) serão removidos');
		    if(removeArtist){
		    	var artists = getSelectedObjects(self.artists);
		    	for(var i = 0; i < artists.length; i++){
		    		artistsAPI.deleteArtist(artists[i].id).then(function(response){
			    		if(response.data){
			    			self.init();
			    			showModal("Artista(s) removido(s) com sucesso!");
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

		this.isArtistFavorite = function(artist){
			var index = indexOf(self.currentUserFromAPI.idols, artist);
			if(index !== -1){
				return true;
			}else{
				return false;
			}
		}

		 function indexOf(list, object) {
            var i = 0;
            while (i < list.length) {
                if (list[i].name === object.name) 
                    return i;
                i++;
            }
            return -1;
        }

		this.setFavorite = function(currentArtist){
			var msg = "Ocorreu um erro, tente novamente!"
			if(!currentArtist.fans){
				currentArtist.fans = []
			}
			var index = containsFan(currentArtist.fans, self.currentUser);
			if(index !== -1){
				currentArtist.fans.splice(index, 1);
				msg = "Artista removido dos favoritos!"
			}else{
				currentArtist.fans.push(self.currentUser);
				msg = "Artista adicionado aos favoritos!"
			}

			artistsAPI.updateArtist(currentArtist).then(function(response){
				if(response.data){
					self.init();
					showModal(msg);
				}
			});
		}

		function containsFan(list, fan){
			for(var i = 0; i < list.length; i++){
				if(list[i].id == fan.id){
					return i;
				}
			}
			return -1;
		}

		this.isArtistSelectedToRemove = function() {
			return self.artists.some(function(artist){
				return artist.selected;
			});
		}

		this.goToProfile = function(artist){
			UserService.setCurrentArtist(artist);
			window.scrollTo(0,0);
		}

		this.resetSearch = function(){
			self.searchText = "";
			delete $scope.searchText;
		}

		this.hasSearch = function(){
			if(self.searchText == "" || self.searchText == null){
				return false;
			}else{
				return true;
			}
		}

		this.onSearch = function(text){
			self.searchText = text;
		}

		this.addAlbum = function(album){
			album.musics = [];
			album.artist = album.artist;

			albumsAPI.addAlbum(album).then(function(response){
				if(response.data){
					self.init();
					delete $scope.album;
				}else{
					showModal("Álbum existente!");
				}
			});
			
		}

		this.removeAlbums = function (){
			var removed = $window.confirm('Tem certeza que deseja remover o(s) álbum(ns)? Todas as músicas desse(s) album(ns) serão removidas');
			if(removed){
				var albums = getSelectedObjects(self.albums);
		    	for(var i = 0; i < albums.length; i++){
		    		albumsAPI.deleteAlbum(albums[i].id).then(function(response){
			    		if(response.data){
			    			self.init();
			    			showModal("Álbum(ns) removido(s) com sucesso!");
			    		}
		    		});
		    	}
			}	
		}

		this.isAlbumSelectedToRemove = function(){
			return self.albums.some(function(album){
				return album.selected;
			});
		}

		// Music
		this.addMusic = function(music){
			var duration = music.duration.split(":");
			if(music.year < 1860 || music.year > 2050){
				showModal("Digite um ano de lançamento válido!");
			}else if(duration.length != 2 || duration.length != 2 
				|| duration[0].length != 2 || duration[1].length != 2){
				showModal("Digite um tempo de duração válido! (MM:SS)");
			}else{
				musicsAPI.addMusic(music).then(function(response){
					if(response.data){
						self.musics.push(response.data);
						delete $scope.music;
						showModal("Música adicionada ao álbum '" + music.album.name + "' com sucesso!");
					}else{
						showModal("Esta música já existe no álbum '" + music.album.name + "'!");
					}
				})
				
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