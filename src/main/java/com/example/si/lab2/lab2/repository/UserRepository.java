package com.example.si.lab2.lab2.repository;

import com.example.si.lab2.lab2.model.SiUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<SiUser, Integer>{

	SiUser getByEmailAndPassword(String email, String password);
}
