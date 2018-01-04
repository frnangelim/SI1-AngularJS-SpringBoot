package com.example.si.lab2.lab2.controller;

import com.example.si.lab2.lab2.model.Music;
import com.example.si.lab2.lab2.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
public class MusicController {
    
    @Autowired
    private MusicService musicService;

    @RequestMapping(method= RequestMethod.GET, value="/musics",produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Music>> getMusics(){
        return new ResponseEntity<>(musicService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/musics/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Music> getMusicById(@PathVariable("id") Integer id){
        if(musicService.getById(id) != null){
            return new ResponseEntity<>(musicService.getById(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method=RequestMethod.POST, value="/musics",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Music> createMusic(@RequestBody Music music){
        return new ResponseEntity<>(musicService.create(music), HttpStatus.CREATED);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/musics",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Music> updateMusic(@RequestBody Music music){
        if(musicService.update(music) != null){
            return new ResponseEntity<>(musicService.update(music), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method = RequestMethod.DELETE, value="/musics/{id}")
    public ResponseEntity<Music> deleteMusic(@PathVariable Integer id){
        Boolean removed = musicService.removeById(id);
        if(removed) {
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
