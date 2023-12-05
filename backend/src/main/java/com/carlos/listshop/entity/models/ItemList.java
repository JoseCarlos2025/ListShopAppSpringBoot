package com.carlos.listshop.entity.models;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "item_list")
public class ItemList implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String listName;

	private String dateShop;

	@OneToMany(mappedBy = "itemList")
	private List<Item> items;

	@ManyToOne
	private User user;
	
	public void setUser(User user) {
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getListName() {
		return listName;
	}

	public void setListName(String listName) {
		this.listName = listName;
	}

	public String getDateShop() {
		return dateShop;
	}

	public void setDateShop(String dateShop) {
		this.dateShop = dateShop;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public ItemList(String listName, String dateShop) {
		super();
		this.listName = listName;
		this.dateShop = dateShop;
	}

	public ItemList() {

	}

}
