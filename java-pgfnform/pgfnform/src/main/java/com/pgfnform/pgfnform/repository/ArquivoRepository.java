package com.pgfnform.pgfnform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgfnform.pgfnform.entities.Arquivo;

@Repository
public interface ArquivoRepository extends JpaRepository <Arquivo, Integer> {

}
