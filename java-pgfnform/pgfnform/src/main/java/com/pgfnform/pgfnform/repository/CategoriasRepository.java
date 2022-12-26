package com.pgfnform.pgfnform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgfnform.pgfnform.entities.Categorias;

@Repository
public interface CategoriasRepository extends JpaRepository<Categorias, Long>{ //Long se refere ao id
	
}