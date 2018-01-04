package com.example.si.lab2.lab2.controller;

import com.example.si.lab2.lab2.model.Album;
import com.example.si.lab2.lab2.model.Music;
import com.example.si.lab2.lab2.model.Playlist;
import com.example.si.lab2.lab2.repository.AlbumRepository;
import com.example.si.lab2.lab2.service.AlbumService;
import com.example.si.lab2.lab2.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    @Autowired
    private PlaylistService playlistService;

    @RequestMapping(method= RequestMethod.GET, value="/albums",produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Album>> getAlbums(){
        return new ResponseEntity<>(albumService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/albums/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Album> getAlbumById(@PathVariable("id") Integer id){
        if(albumService.getById(id) != null){
            return new ResponseEntity<>(albumService.getById(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method=RequestMethod.POST, value="/albums",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Album> createAlbum(@RequestBody Album album){
        return new ResponseEntity<>(albumService.create(album), HttpStatus.CREATED);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/albums",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Album> updateAlbum(@RequestBody Album album){
        if(albumService.update(album) != null){
            return new ResponseEntity<>(albumService.update(album), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value="/albums/{id}")
    public ResponseEntity<List<Album>> deleteAlbum(@PathVariable Integer id){
        if(albumService.getById(id) != null){
            Boolean removed = albumService.deleteAlbumCustom(id);
            if(removed) {
                return new ResponseEntity<>(albumService.getAll(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
