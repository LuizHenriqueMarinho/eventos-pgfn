package com.pgfnform.pgfnform.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.pgfnform.pgfnform.entities.Eventos;
import com.pgfnform.pgfnform.repository.EventosRepository;

@Service
public class EventosServices {
	
	@Autowired
	private EventosRepository eventosRepository;
	
	
	public Page<Eventos> findAll(Integer page, Integer linesPerPage, String orderBy, String direction){
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction) , orderBy);
		Page<Eventos> eventos;
		eventos = eventosRepository.findAll(pageRequest);
		return eventos;
	}
	
	public Eventos findById(Long id)
	{
		Optional<Eventos> obj = eventosRepository.findById(id);
		return obj.get();
	}
	
	public Eventos save(Eventos eventos)
	{
		return eventosRepository.save(eventos);
	}
	
	public Eventos update(Eventos eventos, Long id)
	{
		Eventos eventosUpdated = findById(id);
		eventosUpdated.setNome(eventos.getNome());
		eventosUpdated.setDescricao(eventos.getDescricao());
		eventosUpdated.setLocal(eventos.getLocal());
		eventosUpdated.setData(eventos.getData());
		eventosUpdated.setCategoria(eventos.getCategoria());
		return eventosRepository.save(eventosUpdated);
	}	
	
	public void delete(Long id) {
		eventosRepository.deleteById(id);
	}
	
	public List<Eventos> search(String nome) {
		List<Eventos> eventos =  eventosRepository.findEventoByName(nome);
		return eventos;
	}
	
}
