package com.carlos.listshop.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carlos.listshop.entity.models.ItemList;
import com.carlos.listshop.entity.models.User;
import com.carlos.listshop.entity.dao.IItemListDao;
import com.carlos.listshop.entity.dao.IUserDao;

@Service
public class ItemListServiceImpl implements IItemListService {

	@Autowired
	private IItemListDao itemListDao;
	@Autowired
	private IUserDao userDao;

	@Override
	public ItemList get(long id) {
		return itemListDao.findById(id).get();
	}

	@Override
	public List<ItemList> getAll() {
		return (List<ItemList>) itemListDao.findAll();
	}

	@Override
	public void post(ItemList itemList, long UserId) {
		Optional<User> userOptional = userDao.findById(UserId);
		
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			itemList.setUser(user);	
			
			itemListDao.save(itemList);
		}else {
			throw new IllegalArgumentException("No se encontró el ItemList con la ID proporcionada: " + UserId);
		}

	}

	@Override
	public void put(ItemList itemList, long id) {
		itemListDao.findById(id).ifPresent((x) -> {
			itemList.setId(id);
			itemListDao.save(itemList);
		});
	}

	@Override
	public void delete(long id) {
		itemListDao.deleteById(id);

	}

	@Override
	public List<ItemList> findAllFromUserID(String UserId) {
		return itemListDao.findAllFromUserID(UserId);
	}

}
