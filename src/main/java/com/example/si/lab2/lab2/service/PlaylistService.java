package com.example.si.lab2.lab2.service;

import com.example.si.lab2.lab2.model.Playlist;
import com.example.si.lab2.lab2.model.SiUser;
import com.example.si.lab2.lab2.repository.PlaylistRepository;
import com.example.si.lab2.lab2.repository.UserRepository;
import com.example.si.lab2.lab2.util.Crud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaylistService implements Crud<Playlist>{

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Playlist create(Playlist playlist) {
        Playlist playlistSaved = playlistRepository.save(playlist);
        if(playlistSaved != null){
            SiUser user = userRepository.findOne(playlistSaved.getOwner());
            ArrayList playlists = user.getPlaylists();
            if(playlists != null){
                user.getPlaylists().add(playlistSaved.getId());
            }
            userRepository.save(user);
        }
        return playlistSaved;
    }

    @Override
    public List<Playlist> getAll() {
        return playlistRepository.findAll();
    }

    @Override
    public Playlist getById(Integer id) {
        return playlistRepository.findOne(id);
    }

    @Override
    public Playlist update(Playlist playlist) {
        return playlistRepository.exists(playlist.getId()) ? playlistRepository.save(playlist) : null;
    }

    @Override
    public boolean removeById(Integer id) {
        Playlist playlist = playlistRepository.findOne(id);
        if(playlist != null){
            playlistRepository.delete(id);
            return true;
        }else{
           return false;
        }
    }

    @Override
    public boolean removeAll() {
        playlistRepository.deleteAll();
        return true;
    }
}
