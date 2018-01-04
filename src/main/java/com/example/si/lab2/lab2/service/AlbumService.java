package com.example.si.lab2.lab2.service;

import com.example.si.lab2.lab2.model.Album;
import com.example.si.lab2.lab2.model.Music;
import com.example.si.lab2.lab2.model.Playlist;
import com.example.si.lab2.lab2.repository.AlbumRepository;
import com.example.si.lab2.lab2.repository.PlaylistRepository;
import com.example.si.lab2.lab2.util.Crud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlbumService implements Crud<Album> {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Override
    public Album create(Album album) {
        List<Album> albums = albumRepository.findAll();
        for(int i = 0; i < albums.size(); i++){
            if(albums.get(i).getName().equals(album.getName())){
                return null;
            }
        }
        return albumRepository.save(album);
    }

    @Override
    public List<Album> getAll() {
        return albumRepository.findAll();
    }

    @Override
    public Album getById(Integer id) {
        return albumRepository.findOne(id);
    }

    @Override
    public Album update(Album album) {
        return albumRepository.exists(album.getId()) ? albumRepository.save(album) : null;
    }

    @Override
    public boolean removeById(Integer id) {
        Album album = albumRepository.findOne(id);
        if(album != null){
            albumRepository.delete(id);
            return true;
        }else{
            return false;
        }

    }

    @Override
    public boolean removeAll() {
        albumRepository.deleteAll();
        return true;
    }

    public boolean deleteAlbumCustom(Integer id) {
        List<Music> albumMusics = albumRepository.findOne(id).getMusics();
        List<Playlist> playlists = playlistRepository.findAll();
        for(int i = 0; i < playlists.size(); i++){
            List<Music> musics = playlists.get(i).getMusics();
            for(int j = 0; j < musics.size(); j++){
                if(albumMusics.contains(musics.get(j))) {
                    musics.remove(j);
                }
            }
        }
        return this.removeById(id);
    }
}
