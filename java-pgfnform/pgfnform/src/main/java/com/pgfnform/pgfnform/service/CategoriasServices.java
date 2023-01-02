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
		Categorias categoriaUptaded = findById(id);
		categoriaUptaded.setNome(categoria.getNome()); 
		return categoriasRepository.save(categoriaUptaded);
	}
	
	public void delete(Long id) {
		categoriasRepository.deleteById(id);
	}
	
	public List<Categorias> search(String nome) {
		List<Categorias> categorias =  categoriasRepository.findCategoriaByName(nome);
		return categorias;
	}
}
