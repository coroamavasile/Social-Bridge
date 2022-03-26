package com.example.mongotest.Repository;


import com.example.mongotest.Models.Pin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  PinRepository extends MongoRepository<Pin, Long> {

    Pin findFirstById(Long id);

}
