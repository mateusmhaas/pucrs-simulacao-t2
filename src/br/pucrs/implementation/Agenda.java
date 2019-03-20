package br.pucrs.implementation;

import java.util.ArrayList;
import java.util.Collections;

public class Agenda {
	ArrayList<Event> events;
	public Agenda() {
		this.events = new ArrayList<>();
	}
	
	public void addEvent(Event e) {
		System.out.println("AGENDA - Creating event");
		this.events.add(e);
	}
	public Event getNextEvent() {
		System.out.println("AGENDA - Running next event");
		Collections.sort(this.events);
		return this.events.remove(0);
	}
}
