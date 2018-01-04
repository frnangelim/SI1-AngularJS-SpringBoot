package com.example.si.lab2.lab2.service;

import com.example.si.lab2.lab2.model.Album;
import com.example.si.lab2.lab2.model.Music;
import com.example.si.lab2.lab2.model.SiUser;
import com.example.si.lab2.lab2.repository.AlbumRepository;
import com.example.si.lab2.lab2.repository.MusicRepository;
import com.example.si.lab2.lab2.util.Crud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicService implements Crud<Music> {

    @Autowired
    private MusicRepository musicRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Override
    public Music create(Music music) {
        if(music.getAlbum() != null && music.getName() != null){
            List<Album> albums = albumRepository.findAll();
            for(int i = 0; i < albums.size(); i++){
               if(albums.get(i).getName().equals(music.getAlbum().getName())){
                   for(int j = 0; j < albums.get(i).getMusics().size(); j++){
                       if(albums.get(i).getMusics().get(j).getName().equals(music.getName())){
                           return null;
                       }
                   }
               }
            }
            return musicRepository.save(music);
        }else{
            return null;
        }
    }

    @Override
    public List<Music> getAll() {
        return musicRepository.findAll();
    }

    @Override
    public Music getById(Integer id) {
        return musicRepository.findOne(id);
    }

    @Override
    public Music update(Music music) {
        return musicRepository.exists(music.getId()) ? musicRepository.save(music) : null;
    }

    @Override
    public boolean removeById(Integer id) {
        Music music = musicRepository.findOne(id);
        if(music != null){
            musicRepository.delete(music);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean removeAll() {
        musicRepository.deleteAll();
        return true;
    }
}
