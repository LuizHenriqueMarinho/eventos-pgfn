package com.pgfnform.pgfnform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pgfnform.pgfnform.entities.Categorias;

@Repository
public interface CategoriasRepository extends JpaRepository<Categorias, Long>{ //Long se refere ao id
	@Query("select c from Categorias c "
			+ " where lower(c.nome) LIKE lower(concat('%', :nome, '%'))")
	List<Categorias> findCategoriaByName(@Param("nome") String nome);
}