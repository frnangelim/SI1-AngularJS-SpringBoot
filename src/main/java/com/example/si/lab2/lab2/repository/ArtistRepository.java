package com.example.si.lab2.lab2.repository;

import com.example.si.lab2.lab2.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Integer>{

}
