package com.example.mongotest.Services;

import com.example.mongotest.Dtos.UserDTO;
import com.example.mongotest.Models.DatabaseSequence;
import com.example.mongotest.Models.Pin;
import com.example.mongotest.Models.UserEntity;
import com.example.mongotest.Repository.PinRepository;
import com.example.mongotest.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PinRepository pinRepository;
    private final MongoOperations mongoOperations;

    @Autowired
    public UserService(UserRepository userRepository, PinRepository pinRepository, MongoOperations mongoOperations) {
        this.userRepository = userRepository;
        this.pinRepository = pinRepository;
        this.mongoOperations = mongoOperations;
    }

    public long generateSequence(String seqName){
        DatabaseSequence counter = mongoOperations.findAndModify(
                query(where("_id").is(seqName)),
                new Update().inc("seq",1),
                options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return counter.getSeq();

    }

    public List<UserEntity> findUsers(){
        return userRepository.findAll();
    }

    public UserEntity findFirstById(Long id){
        return userRepository.findFirstById(id);
    }

    public String deleteById(Long id){
        userRepository.deleteById(id);
        return "deleted user" + id;
    }

    public Long insertUser(UserEntity user){
        user.setId(generateSequence("users_sequence"));
        userRepository.save(user);
        return user.getId();
    }

    public String updateUser(UserDTO userDTO){
        if (userRepository.findFirstById(userDTO.getId()) == null) {
            return "User not found";
        } else {
            UserEntity aux = findFirstById(userDTO.getId());

            userRepository.save(UserEntity.builder()
                    .id(userDTO.getId())
                    .name(userDTO.getName())
                    .address(userDTO.getAddress())
                    .phoneNumber(userDTO.getPhoneNumber())
                    .age(userDTO.getAge())
                    .email(userDTO.getEmail())
                    .username(userDTO.getUsername())
                    .password(userDTO.getPassword())
                    .role(userDTO.getRole())
                    .build());

            return "User data updated";
        }

    }

    public String insertPinByUserId(Long idUser, Long idPin) {
        UserEntity user = userRepository.findFirstById(new Long(idUser));
        Pin pin = pinRepository.findFirstById(new Long(idPin));
        user.addPin(pin);
        userRepository.save(user);

        return "Pin was added";
    }

    public String deletePinByUserId(Long userId, Long pinId) {
        UserEntity user = userRepository.findFirstById(new Long(userId));
        List<Pin> pins = user.getFavPins();
        List<Pin> result = new ArrayList<>();

        for(Pin pin: pins){
            if(pin.getId() != pinId ){
                result.add(pin);
            }
        }
        user.setFavPins(result);
        userRepository.save(user);
        return "Pin was deleted";
    }
}
