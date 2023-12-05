package com.carlos.listshop.entity.dao;

import org.springframework.data.repository.CrudRepository;

import com.carlos.listshop.entity.models.User;

public interface IUserDao extends CrudRepository<User, Long>{

}
