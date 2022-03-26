package com.example.mongotest.Controllers;


import com.example.mongotest.Dtos.UserDTO;
import com.example.mongotest.Models.Pin;
import com.example.mongotest.Models.UserEntity;
import com.example.mongotest.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<UserEntity>> getUsers(){
        return new ResponseEntity<>(userService.findUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable("id") Long id){
        System.out.println(id);
        return new ResponseEntity<>(userService.findFirstById(id),HttpStatus.OK);
    }


    @PostMapping()
    public ResponseEntity<Long> insertUser( @RequestBody UserEntity user){
        System.out.println("insert user");
        System.out.println(user.toString());
        return new ResponseEntity<>(userService.insertUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/addpin/{idUser}/{idPin}")
    public ResponseEntity<String> insertPinByUserId(@PathVariable("idUser") Long idUser, @PathVariable("idPin") Long idPin){
        System.out.println("o ajuns aici");
        return new ResponseEntity<String>(userService.insertPinByUserId(idUser,idPin), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        return new ResponseEntity<>(userService.deleteById(id),HttpStatus.OK);
    }

    @PostMapping("/delete/pin/{userId}/{pinId}")
    public ResponseEntity<String> deletePinByUserId(@PathVariable("userId") Long userId,@PathVariable("pinId") Long pinId){
        return new ResponseEntity<String>(userService.deletePinByUserId(userId,pinId),HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser( @RequestBody UserDTO userDTO){
        return new ResponseEntity<>(userService.updateUser(userDTO),HttpStatus.OK);
    }



}
