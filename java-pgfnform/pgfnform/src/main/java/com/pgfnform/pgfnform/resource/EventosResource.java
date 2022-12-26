package com.pgfnform.pgfnform.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import com.pgfnform.pgfnform.entities.Eventos;
import com.pgfnform.pgfnform.repository.EventosRepository;
import com.pgfnform.pgfnform.service.EventosServices;

@RestController
@RequestMapping(value="/eventos-pgfn")
public class EventosResource {
	
	//injeção de dependencia
	@Autowired //faz um pre processamento por baixo dos panos e resolve a instancia, depende do @component no ProductRepository
	private EventosRepository eventosRepository;
	
	@Autowired
	private EventosServices eventosServices;
	
	@GetMapping
	public ResponseEntity<Page<Eventos>> findAll(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "5") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "id") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction)
	{
		Page<Eventos> eventos = eventosServices.findAll(page, linesPerPage, orderBy, direction); 
		return ResponseEntity.ok().body(eventos);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Eventos> findById(@PathVariable Long id) { //@PathVariable serve para reconhecer o numero que está no fim subtituindo o id no postman
		Eventos eventos = eventosRepository.findById(id).get();  
		return ResponseEntity.ok().body(eventos); 
	}
	
	@PostMapping(value = "/save")
	public ResponseEntity<Eventos> save(@RequestBody Eventos eventos)
	{
		return new ResponseEntity<>(eventosServices.save(eventos), HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Eventos> update(@RequestBody Eventos eventos, @PathVariable Long id)
	{
		return new ResponseEntity<>(eventosServices.update(eventos, id), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id)
	{
		eventosServices.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(value = "/busca", method = RequestMethod.GET)
	public ResponseEntity<List<Eventos>> search(@RequestParam(value = "nome", defaultValue = "") String nome) {
		return ResponseEntity.ok(eventosServices.search(nome));
	}
	
}
