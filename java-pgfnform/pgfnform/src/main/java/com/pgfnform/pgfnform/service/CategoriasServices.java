package com.pgfnform.pgfnform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgfnform.pgfnform.entities.Categorias;
import com.pgfnform.pgfnform.repository.CategoriasRepository;


@Service
public class CategoriasServices {

	@Autowired
	private CategoriasRepository categoriasRepository;
	
	public List<Categorias> findAll(){
		return categoriasRepository.findAll();
	}
	
	public Categorias findById(Long id)
	{
		Categorias obj = categoriasRepository.findById(id).get();
		return obj;
	}
	
	public Categorias save(Categorias categoria)
	{
		return categoriasRepository.save(categoria);
	}
	
	public Categorias update(Categorias categoria, Long id)
	{
		Categorias categoryUptaded = findById(id);
		categoryUptaded.setNome(categoria.getNome()); 
		return categoriasRepository.save(categoryUptaded);
	}
	
	public void delete(Long id) {
		categoriasRepository.deleteById(id);
	}
}
