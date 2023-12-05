package com.carlos.listshop.entity.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.carlos.listshop.entity.models.ItemList;

public interface IItemListDao extends CrudRepository<ItemList, Long> {
	
	@Query("SELECT i FROM ItemList i WHERE i.user.id = :id")
	List<ItemList> findAllFromUserID(@Param("id") String userId);

}
