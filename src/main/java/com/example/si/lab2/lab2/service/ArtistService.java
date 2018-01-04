package com.example.si.lab2.lab2.service;

import com.example.si.lab2.lab2.model.Artist;
import com.example.si.lab2.lab2.repository.ArtistRepository;
import com.example.si.lab2.lab2.util.Crud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ArtistService implements Crud<Artist>{

    @Autowired
    private ArtistRepository artistRepository;

    @Override
    public Artist create(Artist artist) {
        List<Artist> artists = artistRepository.findAll();
        for(int i = 0; i < artists.size(); i++){
            if(artists.get(i).getName().equals(artist.getName())){
                return null;
            }
        }
        return artistRepository.save(artist);
    }

    @Override
    public List<Artist> getAll() {
        return artistRepository.findAll();
    }

    @Override
    public Artist getById(Integer id) {
        return artistRepository.findOne(id);
    }

    @Override
    public Artist update(Artist artist) {
        return artistRepository.exists(artist.getId()) ? artistRepository.save(artist) : null;
    }

    @Override
    public boolean removeById(Integer id) {
        Artist artist = artistRepository.findOne(id);
        if(artist != null){
            artistRepository.delete(id);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean removeAll() {
        artistRepository.deleteAll();
        return true;
    }
}
