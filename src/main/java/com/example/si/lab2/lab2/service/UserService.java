package com.example.si.lab2.lab2.service;

import com.example.si.lab2.lab2.model.SiUser;
import com.example.si.lab2.lab2.repository.UserRepository;
import com.example.si.lab2.lab2.util.Crud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements Crud<SiUser> {

    @Autowired
    private UserRepository userRepository;
    

    public SiUser create(SiUser user) {
        return userRepository.save(user);
    }


    public List<SiUser> getAll() {
        return userRepository.findAll();
    }


    public SiUser getById(Integer id) {
        return userRepository.findOne(id);
    }

    public SiUser getSiUserByEmailAndPassword(String email, String password){
        return userRepository.getByEmailAndPassword(email, password);
    }

    public SiUser update(SiUser user) {
        return userRepository.exists(user.getId()) ? userRepository.save(user) : null;
    }


    public boolean removeById(Integer id) {
        SiUser user = userRepository.findOne(id);
        if(user != null){
            userRepository.delete(user);
            return true;
        }else{
            return false;
        }
    }


    public boolean removeAll() {
        userRepository.deleteAll();
        return true;
    }
}
