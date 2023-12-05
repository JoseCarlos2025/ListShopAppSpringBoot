package com.carlos.listshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carlos.listshop.entity.models.User;
import com.carlos.listshop.entity.services.IUserService;

@CrossOrigin(origins="*")
@RestController
public class UserControler {

	@Autowired
	IUserService userService;
	
	@GetMapping("/user")
	public List<User> getAllList(){
		return userService.getAll();
	}
	
	@GetMapping("/user/{id}")
	public User getOne(@PathVariable(value = "id") long id) {
		return userService.get(id);
	}
	
	@PostMapping("/user")
	public void post(User user) {
		userService.post(user);
	}
	
	@PutMapping("/user/{id}")
	public void put(@PathVariable(value = "id")long id,User user) {
		userService.put(user, id);
	}
	
	@DeleteMapping("/user/{id}")
	public void delete(@PathVariable(value = "id") long id) {
		userService.delete(id);
	}
}
