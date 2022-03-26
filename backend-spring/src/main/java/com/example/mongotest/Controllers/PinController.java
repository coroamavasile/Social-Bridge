package com.example.mongotest.Controllers;

import com.example.mongotest.Dtos.PinDTO;
import com.example.mongotest.Models.Pin;
import com.example.mongotest.Services.PinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/pin")
public class PinController {

    private final PinService pinService;

    @Autowired
    public PinController(PinService pinService) {
        this.pinService = pinService;
    }

    @GetMapping()
    public ResponseEntity<List<Pin>> getPins(){
        return new ResponseEntity<>(pinService.findPins(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pin> getPin(@PathVariable("id") Long id){
        return new ResponseEntity<>(pinService.findFirstById(id),HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Long> insertPin(@RequestBody Pin pin){
        System.out.println(pin.toString());
        return new ResponseEntity<>(pinService.insertPin(pin), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePin(@PathVariable("id") Long id){
        return new ResponseEntity<>(pinService.deleteById(id),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePin( @RequestBody PinDTO pinDTO){
        return new ResponseEntity<>(pinService.updatePin(pinDTO),HttpStatus.OK);
    }


}
