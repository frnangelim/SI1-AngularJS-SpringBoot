package com.example.si.lab2.lab2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class Music {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @OneToOne
    @JsonIgnore
    private Artist artist;
    @ManyToOne()
    @JoinColumn(name = "album")
    @JsonIgnoreProperties("musics")
    private Album album;
    private String duration;
    private String year;
    @ManyToMany(mappedBy = "musics")
    @JsonIgnoreProperties("musics")
    private List<Playlist> joao;

    public List<Playlist> getPlaylists() {
        return joao;
    }

    public void setPlaylists(List<Playlist> playlists) {
        this.joao = playlists;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
