package com.carlos.listshop.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carlos.listshop.entity.models.Item;
import com.carlos.listshop.entity.models.ItemList;
import com.carlos.listshop.entity.dao.IItemDao;
import com.carlos.listshop.entity.dao.IItemListDao;

@Service
public class ItemServiceImpl implements IItemService{

	@Autowired
	private IItemDao itemDao;
	
	@Autowired
	private IItemListDao itemListDao;
	
	@Override
	public Item get(long id) {
		return itemDao.findById(id).get();
	}

	public List<Item> getAll() {
		return (List<Item>) itemDao.findAll();
	}
	
	@Override
	public void post(Item item, long itemListId) {
	    Optional<ItemList> itemListOptional = itemListDao.findById(itemListId);

	    if (itemListOptional.isPresent()) {
	        ItemList itemList = itemListOptional.get();

	        item.setItemList(itemList);

	        itemDao.save(item);
	    } else {
	    	throw new IllegalArgumentException("No se encontró el ItemList con la ID proporcionada: " + itemListId);
	    }
	}


	@Override
	public void put(Item item, long id) {
		itemDao.findById(id).ifPresent((x)->{
			item.setId(id);
			itemDao.save(item);
		});
	}

	@Override
	public void delete(long id) {
		itemDao.deleteById(id);
	}

	@Override
	public List<Item> findAllFromListID(String itemListId) {
		return itemDao.findAllFromListID(itemListId);
	}
	
}
