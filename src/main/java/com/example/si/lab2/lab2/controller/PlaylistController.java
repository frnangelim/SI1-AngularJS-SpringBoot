package com.example.si.lab2.lab2.controller;

import com.example.si.lab2.lab2.model.Playlist;
import com.example.si.lab2.lab2.model.SiUser;
import com.example.si.lab2.lab2.service.PlaylistService;
import com.example.si.lab2.lab2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class PlaylistController {
    
    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private UserService userService;

    @RequestMapping(method= RequestMethod.GET, value="/playlists",produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Playlist>> getPlaylists(){
        return new ResponseEntity<>(playlistService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/playlists/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Playlist> getPlaylistById(@PathVariable("id") Integer id){
        if(playlistService.getById(id) != null){
            return new ResponseEntity<>(playlistService.getById(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method= RequestMethod.GET, value="/playlists/user/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArrayList<Playlist>> getPlaylistByUser(@PathVariable("id") Integer id){
        SiUser user = userService.getById(id);
        if(user != null){
            ArrayList<Integer> playlistsId = user.getPlaylists();
            ArrayList<Playlist> playlists = new ArrayList<>();

            for(int i = 0; i < playlistsId.size(); i++){
                Playlist pl = playlistService.getById(playlistsId.get(i));
                playlists.add(pl);
            }
            if(playlists != null){
                return new ResponseEntity<>(playlists, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method=RequestMethod.POST, value="/playlists",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Playlist> createPlaylist(@RequestBody Playlist playlist){
        return new ResponseEntity<>(playlistService.create(playlist), HttpStatus.CREATED);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/playlists",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Playlist> updatePlaylist(@RequestBody Playlist playlist){
        if(playlistService.update(playlist) != null){
            return new ResponseEntity<>(playlistService.update(playlist), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value="/playlists/{id}")
    public ResponseEntity<SiUser> deletePlaylist(@PathVariable Integer id){
        int idOwner = playlistService.getById(id).getOwner();
        SiUser user = userService.getById(idOwner);

        for(int i = 0; i < user.getPlaylists().size(); i++){
            if(user.getPlaylists().get(i).equals(id)){
                user.getPlaylists().remove(i);
            }
        }
        userService.update(user);
        Boolean removed = playlistService.removeById(id);
        if(removed) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}
