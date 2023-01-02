package com.pgfnform.pgfnform.resource;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import com.pgfnform.pgfnform.entities.Arquivo;
import com.pgfnform.pgfnform.service.ArquivoService;

@RestController
@RequestMapping(value="/arquivo")
public class ArquivoResource {
	
	@Autowired
	private ArquivoService arquivoService;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Arquivo> insert(@RequestParam("imagefile") MultipartFile file) {
		Arquivo arq = arquivoService.insert(file);
		return ResponseEntity.ok(arq);
	}
	
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public void find(@PathVariable Integer id, HttpServletResponse response) throws IOException {
		Arquivo obj = arquivoService.find(id);
		if (obj.getImage() != null) {
			byte[] byteArray = new byte[obj.getImage().length];
            int i = 0;
            for (Byte wrappedByte : obj.getImage()){
                byteArray[i++] = wrappedByte; //auto unboxing
            }
            response.setContentType("image/jpeg");
            // InputStream is = new ByteArrayInputStream(byteArray);
            response.getOutputStream().write(byteArray);
            // IOUtils.copy(is, response.getOutputStream());
		}
		
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id)
	{
		arquivoService.delete(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}


}
