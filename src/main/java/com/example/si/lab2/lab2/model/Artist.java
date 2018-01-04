package com.example.si.lab2.lab2.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Artist {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String name;
    @Column(length=16384)
    private String photo;
    private boolean favorite;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "artist")
    @JsonIgnoreProperties("artist")
    private List<Album> albums;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="fans_idols",
    joinColumns = {@JoinColumn(name="artists_id")},
    inverseJoinColumns = {@JoinColumn(name="fans_id")})
    @JsonIgnoreProperties("idols")
    private List<SiUser> fans;

    public List<SiUser> getFans() {
        return fans;
    }

    public void setFans(List<SiUser> fans) {
        this.fans = fans;
    }

    public List<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
