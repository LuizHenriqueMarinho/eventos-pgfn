package com.pgfnform.pgfnform.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Eventos implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	
	@Column(columnDefinition="TEXT") //permite digitar mais caracteres
	private String descricao;
	private String local;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
	private LocalDateTime data;

	@Column(columnDefinition="TEXT")
	private String detalhes; //
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Categorias categoria;

	@ManyToOne
	@JoinColumn(name = "imagem_id")
	private Arquivo imagem;
	
	//cria uma coluna com a data e hora da criação dos itens 
    @Column(updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    //cria uma coluna com a data e hora da edição dos itens
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", locale = "pt-BR", timezone = "Brazil/East")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    
	public Eventos() {
	}

	public Eventos(Long id, String nome, String descricao, String local, LocalDateTime data, String detalhes,
			Categorias categoria, Arquivo imagem, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.local = local;
		this.data = data;
		this.detalhes = detalhes;
		this.categoria = categoria;
		this.imagem = imagem;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public String getDetalhes() {
		return detalhes;
	}

	public void setDetalhes(String detalhes) {
		this.detalhes = detalhes;
	}

	public Categorias getCategoria() {
		return categoria;
	}

	public void setCategoria(Categorias categoria) {
		this.categoria = categoria;
	}

	public Arquivo getImagem() {
		return imagem;
	}

	public void setImagem(Arquivo imagem) {
		this.imagem = imagem;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Eventos other = (Eventos) obj;
		return Objects.equals(id, other.id);
	}


	
}


