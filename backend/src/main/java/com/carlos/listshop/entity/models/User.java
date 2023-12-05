package com.carlos.listshop.entity.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;

	private String password;

	@OneToMany(mappedBy = "user")
	private List<ItemList> itemLists;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<ItemList> getItemLists() {
		return itemLists;
	}

	public void setItemLists(List<ItemList> itemLists) {
		this.itemLists = itemLists;
	}

	public User(long id, String name, String password) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
	}

	public User() {
		
	}
	
}
