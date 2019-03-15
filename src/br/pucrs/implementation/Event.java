package br.pucrs.implementation;

import br.pucrs.helper.EventType;

public class Event implements Comparable<Event> {
//	private EventType type;
	private Double time;
	private Runnable chainMethod;
	public Event(Double time, Runnable chainMethod) {
//		this.type = eventType;
		this.time = time;
		this.setChainMethod(chainMethod);
	}
//	public EventType getType() {
//		return type;
//	}
//	public void setType(EventType type) {
//		this.type = type;
//	}
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
}
