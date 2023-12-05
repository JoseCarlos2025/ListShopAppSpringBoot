package com.carlos.listshop.entity.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.carlos.listshop.entity.models.Item;


public interface IItemDao extends CrudRepository<Item, Long>{
	
	@Query("SELECT i FROM Item i WHERE i.itemList.id = :id")
	List<Item> findAllFromListID(@Param("id") String itemListId);
}
