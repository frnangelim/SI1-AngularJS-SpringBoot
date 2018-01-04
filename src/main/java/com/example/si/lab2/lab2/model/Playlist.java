package com.example.si.lab2.lab2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Playlist {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    @ManyToMany()
    @JoinTable(name="playlists_musics",
            joinColumns = {@JoinColumn(name="playlists_id")},
            inverseJoinColumns = {@JoinColumn(name="musics_id")})
    @JsonIgnoreProperties("playlists")
    private List<Music> musics;

    private Integer owner;

    public Integer getOwner() {
        return owner;
    }

    public void setOwner(Integer owner) {
        this.owner = owner;
    }

    //    @ManyToOne()
//    @JoinColumn(name="owner")
//    @JsonIgnoreProperties("myplaylists")
//    private SiUser owner;
//
//    public SiUser getOwner() {
//        return this.owner;
//    }
//
//    public void setOwner(SiUser owner) {
//        this.owner = owner;
//    }

    public List<Music> getMusics() {
        return musics;
    }

    public void setMusics(List<Music> musics) {
        this.musics = musics;
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
}
