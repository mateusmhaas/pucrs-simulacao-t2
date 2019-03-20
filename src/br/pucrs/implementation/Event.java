package br.pucrs.implementation;

import br.pucrs.helper.EventType;

public class Event implements Comparable<Event> {
	private int id;
	private String queueName;
	private Double time;
	private Runnable chainMethod;
	public Event(Double time, Runnable chainMethod, String queueName) {
		this.time = time;
		this.setChainMethod(chainMethod);
		this.queueName = queueName;// TODO Adicionar nome Fila
		this.id = IdGenerator.getNext(this.queueName); 
	}
	
	public Double getTime() {
		return time;
	}
	public void setTime(Double time) {
		this.time = time;
	}
	
	public Runnable getChainMethod() {
		return chainMethod;
	}
	public void setChainMethod(Runnable chainMethod) {
		this.chainMethod = chainMethod;
	}
	@Override
	public int compareTo(Event event) {
		if(this.time > event.getTime())
			return 1;
		else if(this.time < event.getTime())
			return -1;
		return 0;
	}
	@Override
	public String toString() {
		return "["+this.queueName+"-"+this.id+";"+this.time+"]";
	}
}
