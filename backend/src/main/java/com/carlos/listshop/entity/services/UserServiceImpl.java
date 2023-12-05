package com.carlos.listshop.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carlos.listshop.entity.dao.IUserDao;
import com.carlos.listshop.entity.models.User;

@Service
public class UserServiceImpl implements IUserService {

	@Autowired
	private IUserDao userDao;
	
	@Override
	public User get(long id) {
		return userDao.findById(id).get();
	}

	@Override
	public List<User> getAll() {
		return (List<User>) userDao.findAll();
	}

	@Override
	public void post(User user) {
		userDao.save(user);
		
	}

	@Override
	public void put(User user, long id) {
		userDao.findById(id).ifPresent((x)->{
			user.setId(id);
			userDao.save(user);
		}) ;
		
	}

	@Override
	public void delete(long id) {
		userDao.deleteById(id);
	}

}
