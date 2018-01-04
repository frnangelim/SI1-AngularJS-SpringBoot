package com.example.si.lab2.lab2.controller;


import com.example.si.lab2.lab2.model.SiUser;
import com.example.si.lab2.lab2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method=RequestMethod.GET, value="/users",produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SiUser>> getUsers(){
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(method= RequestMethod.GET, value="/users/{id}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SiUser> getUserById(@PathVariable("id") Integer id){
        if(userService.getById(id) != null){
            return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method= RequestMethod.POST, value="/login", produces= MediaType.APPLICATION_JSON_VALUE,
            consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SiUser> login(@RequestBody SiUser user){
        return new ResponseEntity<>
                (userService.getSiUserByEmailAndPassword(user.getEmail(),user.getPassword()),HttpStatus.OK);

    }

    @RequestMapping(method=RequestMethod.POST, value="/users",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SiUser> createUser(@RequestBody SiUser user){
        return new ResponseEntity<>(userService.create(user), HttpStatus.CREATED);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/users",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SiUser> updateUser(@RequestBody SiUser user){
        if(userService.update(user) != null){
            return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(method = RequestMethod.DELETE, value="/users/{id}")
    public ResponseEntity<SiUser> deleteUser(@PathVariable Integer id){
        Boolean removed = userService.removeById(id);
        if(removed) {
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
