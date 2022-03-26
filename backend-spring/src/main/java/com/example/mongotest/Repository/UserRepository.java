package com.example.mongotest.Repository;

import com.example.mongotest.Models.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, Long> {

    UserEntity findFirstById(Long id);

    UserEntity findFirstByUsername(String username);



}
