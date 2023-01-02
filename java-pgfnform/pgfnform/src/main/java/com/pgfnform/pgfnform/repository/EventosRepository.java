package com.pgfnform.pgfnform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pgfnform.pgfnform.entities.Eventos;


@Repository
public interface EventosRepository extends JpaRepository<Eventos, Long>{ //Long se refere ao id
	@Query("select e from Eventos e "
			+"inner join Categorias c "  
			+"on c.id=e.categoria "  //quando o id da categoria for igual ao id que está na coluna categoria em eventos
            + " where lower(e.nome) LIKE lower(concat('%', :nome, '%'))"
            + " or lower(c.nome) LIKE lower(concat('%', :nome, '%'))")
    List<Eventos> findEventoByName(@Param("nome") String nome); //@Param é usado para vincular o parâmetro do método "name" ao parâmetro de consulta "name".

}