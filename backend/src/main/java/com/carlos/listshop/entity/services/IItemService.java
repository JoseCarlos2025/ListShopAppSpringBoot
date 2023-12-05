package com.carlos.listshop.entity.services;

import java.util.List;

import com.carlos.listshop.entity.models.Item;

public interface IItemService {
	public Item get(long id);

	public List<Item> getAll();
	
	public List<Item> findAllFromListID(String itemListId);

	public void post(Item item, long itemListId);

	public void put(Item item, long id);

	public void delete(long id);
}
