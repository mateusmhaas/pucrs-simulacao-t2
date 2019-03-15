package br.pucrs.implementation;

import java.util.ArrayList;
import java.util.Collections;

public class Agenda {
	ArrayList<Event> events;
	public Agenda() {
		this.events = new ArrayList<>();
	}
	
	public void addEvent(Event e) {
		this.events.add(e);
	}
	public Event getNextEvent() {
		Collections.sort(this.events);
		return this.events.remove(0);
	}
}
