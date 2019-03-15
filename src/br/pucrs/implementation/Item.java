package br.pucrs.implementation;

import br.pucrs.helper.NameManager;

public class Item {
	private Double entrada;
	private Double saida;
	private int name;
	
	public Item() {
		this.name = NameManager.getName();
	}
	
	public Item(Double entrada) {
		this.name = NameManager.getName();
		this.entrada = entrada;
	}
	
	public Double getEntrada() {
		return entrada;
	}
	public void setEntrada(Double entrada) {
		this.entrada = entrada;
	}
	public Double getSaida() {
		return saida;
	}
	public void setSaida(Double saida) {
		this.saida = saida;
	}
	public int getName() {
		return name;
	}
}
