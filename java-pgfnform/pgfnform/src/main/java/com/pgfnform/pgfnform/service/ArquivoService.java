package com.pgfnform.pgfnform.service;

import java.util.Optional;
import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgfnform.pgfnform.entities.Arquivo;
import com.pgfnform.pgfnform.repository.ArquivoRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ArquivoService {
	
	@Autowired
	private ArquivoRepository arquivoRepository;
	
	public Arquivo find(Integer id) {
		Optional<Arquivo> obj = arquivoRepository.findById(id);
		return	obj.get();
	}
	
	@Transactional //boa prática nos métodos que precisam de transação( salvar, alterar, excluir, etc.,) pois garante a execução dentro de um contexto transacional e o rollback será feito caso ocorra algum erro.
	public Arquivo insert(MultipartFile file) {
		Arquivo arq = new Arquivo();
		
		Byte[] image = leArquivo(file);
		
		arq.setId(null);
		arq.setImage(image);
		arq = arquivoRepository.save(arq);
		return arq;
	}
	
	private Byte[] leArquivo(MultipartFile file) {
		byte[] bs = null;
		try {
			bs = file.getBytes();
		} catch (IOException e) {
			e.printStackTrace();
		}
		Byte[] byteObjects = new Byte[bs.length];
		int i=0;
		for (byte b: bs) {
			byteObjects[i++] = b;
		}
		return byteObjects;
	}

	
	@Transactional
	public void delete(Integer id) {
		Arquivo arq = find(id);
		arquivoRepository.delete(arq);
	}



}
