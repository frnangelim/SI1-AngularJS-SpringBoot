package com.example.si.lab2.lab2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class SiUser {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String email;
    private String name;
    private String password;
    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "fans")
    @JsonIgnoreProperties("fans")
    private List<Artist> idols;

    private ArrayList<Integer> playlists;

    public ArrayList<Integer> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(ArrayList<Integer> playlists) {
        this.playlists = playlists;
    }

    //    @OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
//    @JsonIgnoreProperties("owner")
//    private List<Playlist> myplaylists;

    public List<Artist> getIdols() {
        return idols;
    }

    public void setIdols(List<Artist> idols) {
        this.idols = idols;
    }

//    public List<Playlist> getMyplaylists() {
//        return myplaylists;
//    }
//
//    public void setMyplaylists(List<Playlist> myplaylists) {
//        this.myplaylists = myplaylists;
//    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
