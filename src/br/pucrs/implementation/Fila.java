package br.pucrs.implementation;

import java.util.ArrayList;

public class Fila {
	private ArrayList<Item> list;
	private int maxSize;
	
	public Fila(int maxSize) {
		list = new ArrayList<>();
		this.maxSize = maxSize;
	}
	
	public int size(){
		return this.list.size();
	}
	
	public boolean addItem(Item item) {
		if(this.size() >= this.maxSize) 
			return false;
		this.list.add(item);
		return true;
	}
	
	
}
