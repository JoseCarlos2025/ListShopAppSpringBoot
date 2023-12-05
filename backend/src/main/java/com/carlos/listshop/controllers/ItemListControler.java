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

import com.carlos.listshop.entity.models.ItemList;
import com.carlos.listshop.entity.services.IItemListService;

@CrossOrigin(origins="*")
@RestController
public class ItemListControler {
	
	@Autowired
	IItemListService listService;
	
	@GetMapping("/itemlist")
	public List<ItemList> getAllList(){
		return listService.getAll();
	}
	
	@GetMapping("/itemlist/{id}")
	public ItemList getOne(@PathVariable(value = "id") long id) {
		return listService.get(id);
	}
	
	@PostMapping("/itemlist")
	public void post(ItemList list,@RequestParam(name = "userId") long userId) {
		System.out.println(list.getDateShop());
		listService.post(list, userId);
	}
	
	@PutMapping("/itemlist/{id}")
	public void put(ItemList list,@PathVariable(value = "id")long id) {
		ItemList existingItem = listService.get(id);
		
	    if (list.getListName() != null) {
	        existingItem.setListName(list.getListName());
	    }
	    if (list.getDateShop() != null) {
	        existingItem.setDateShop(list.getDateShop());
	    }

	    listService.put(existingItem, id);;
	}
	
	@DeleteMapping("/itemlist/{id}")
	public void delete(@PathVariable(value = "id") long id) {
		listService.delete(id);
	}
	
	@GetMapping(path = "/itemlist/userId/{userId}")
	private List<ItemList> findAllFromListID(@PathVariable("userId") String userId){
		System.out.println(userId);
		return listService.findAllFromUserID(userId);
	}
}
