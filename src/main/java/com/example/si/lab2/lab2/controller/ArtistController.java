package com.example.si.lab2.lab2.controller;

import com.example.si.lab2.lab2.model.Album;
import com.example.si.lab2.lab2.model.Artist;
import com.example.si.lab2.lab2.service.AlbumService;
import com.example.si.lab2.lab2.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ArtistController {

    @Autowired
    private ArtistService artistService;

    @Autowired
    private AlbumService albumService;

    @RequestMapping(method= RequestMethod.GET, value="/artists",produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Artist>> getArtists(){
        return new ResponseEntity<>(artistService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/artists/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Artist> getArtistById(@PathVariable("id") Integer id){
        if(artistService.getById(id) != null){
            return new ResponseEntity<>(artistService.getById(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method=RequestMethod.POST, value="/artists",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist){
        return new ResponseEntity<>(artistService.create(artist), HttpStatus.CREATED);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/artists",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Artist> updateArtist(@RequestBody Artist artist){
        if(artistService.update(artist) != null){
            return new ResponseEntity<>(artistService.update(artist), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value="/artists/{id}")
    public ResponseEntity<List<Artist>> deleteArtist(@PathVariable Integer id){
        Artist currentArtist = artistService.getById(id);
        List<Album> currentAlbums = currentArtist.getAlbums();
        for(int i = 0; i < currentAlbums.size(); i++){
            albumService.deleteAlbumCustom(currentAlbums.get(i).getId());
        }



        Boolean removed = artistService.removeById(id);
        if(removed) {
            return new ResponseEntity<>(artistService.getAll(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
