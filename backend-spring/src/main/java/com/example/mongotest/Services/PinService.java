package com.example.mongotest.Services;

import com.example.mongotest.Dtos.PinDTO;
import com.example.mongotest.Models.DatabaseSequence;
import com.example.mongotest.Models.Pin;
import com.example.mongotest.Repository.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class PinService {


    private final PinRepository pinRepository;
    private final MongoOperations mongoOperations;

    @Autowired
    public PinService(PinRepository pinRepository, MongoOperations mongoOperations) {
        this.pinRepository = pinRepository;
        this.mongoOperations = mongoOperations;
    }

    public long generateSequence(String seqName) {
        DatabaseSequence counter = mongoOperations.findAndModify(
                query(where("_id").is(seqName)),
                new Update().inc("seq",1),
                options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return counter.getSeq();
    }

    public List<Pin> findPins(){
        return pinRepository.findAll();
    }

    public Pin findFirstById(Long id){
        return pinRepository.findFirstById(id);
    }

    public String deleteById(Long id){
        pinRepository.deleteById(id);
        return "Deleted pin" + id;
    }

    public Long insertPin(Pin pin){
        pin.setId(generateSequence("pins_sequence"));
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        pin.setTimestamp(LocalDateTime.now());
        pinRepository.save(pin);
        return pin.getId();
    }

    public String updatePin(PinDTO pinDTO){

        if (pinRepository.findFirstById(pinDTO.getId()) == null) {
            return "Pin not found";
        } else {
            Pin aux = findFirstById(pinDTO.getId());

            pinRepository.save(Pin.builder()
                    .id(pinDTO.getId())
                    .title(pinDTO.getTitle())
                    .location(pinDTO.getLocation())
                    .timestamp(pinDTO.getTimestamp())
                    .description(pinDTO.getDescription())
                    .latitude(pinDTO.getLatitude())
                    .longitude(pinDTO.getLongitude())
                    .build());

            return "Pin data updated";
        }


    }
}

