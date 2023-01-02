package com.pgfnform.pgfnform.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pgfnform.pgfnform.entities.Categorias;
import com.pgfnform.pgfnform.service.CategoriasServices;

@RestController
@RequestMapping(value = "/categorias")
public class CategoriasResource {
	
	@Autowired
	private CategoriasServices categoriasServices;

	@GetMapping
	public ResponseEntity<List<Categorias>> findAll()
	{
		return ResponseEntity.ok().body(categoriasServices.findAll()); //
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Categorias> findById(@PathVariable Long id) { //@PathVariable serve para reconhecer o numero que está no fim subtituindo o id no postman
		//Category cat = categoryRepository.findById(id).get();
		return ResponseEntity.ok().body(categoriasServices.findById(id)); 
	}
	
	@PostMapping(value = "/save")
	public ResponseEntity<Categorias> save(@RequestBody Categorias categoria) // receber um objeto do tipo cateogira criado pelo usuario
	{
		return new ResponseEntity<>(categoriasServices.save(categoria), HttpStatus.CREATED); //new ResponseEntity = ResponseEntity.ok(.body() e o HttpStatus.CREATED => ok 201
	}
	
	@PutMapping(value = "/update/{id}")  //precisa receber o id do item que será editado
	public ResponseEntity<Categorias> update(@RequestBody Categorias categoria, @PathVariable Long id)
	{
		return new ResponseEntity<>(categoriasServices.update(categoria, id), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id)
	{
		categoriasServices.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(value = "/busca", method = RequestMethod.GET)
	public ResponseEntity<List<Categorias>> search(@RequestParam(value = "nome", defaultValue = "") String nome) {
		return ResponseEntity.ok(categoriasServices.search(nome));
	}
	
}
