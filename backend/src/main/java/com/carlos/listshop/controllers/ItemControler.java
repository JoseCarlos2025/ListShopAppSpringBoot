package com.carlos.listshop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carlos.listshop.entity.models.Item;
import com.carlos.listshop.entity.services.IItemService;

@CrossOrigin(origins="*")
@RestController
public class ItemControler {
	
	@Autowired
	IItemService itemService;
	
	@GetMapping("/item")
	public List<Item> getAItems(){
		return itemService.getAll();
	}
	
	@GetMapping("/item/{id}")
	public Item getOne(@PathVariable(value = "id")long id) {
		return itemService.get(id);
	}
	
	@PostMapping("/item")
	public void post( Item item, @RequestParam(name = "itemListId") long itemListId) {
	    itemService.post(item, itemListId);
	}

	
	@PutMapping("/item/{id}")
	public void put(Item item, @PathVariable(value = "id") long id) {
	    Item existingItem = itemService.get(id);
	    
	    if (item.getName() != null) {
	        existingItem.setName(item.getName());
	    }

	    itemService.put(existingItem, id);
	}

	
	@DeleteMapping("/item/{id}")
	public void delete(@PathVariable(value = "id")long id) {
		itemService.delete(id);
	}
	
	@GetMapping(path = "/item/ItemListId/{ItemListId}")
	private List<Item> findAllFromListID(@PathVariable("ItemListId") String ItemListId){
		System.out.println(ItemListId);
		return itemService.findAllFromListID(ItemListId);
	}
}
