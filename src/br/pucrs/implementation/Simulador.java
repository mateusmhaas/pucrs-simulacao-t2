package br.pucrs.implementation;

import java.util.Random;

import br.pucrs.helper.EventType;

public class Simulador {
	private int FILA1;
	private int FILA2;
	private int time;
	private Agenda agenda;
	private Random random;
	public Simulador() {
		this.FILA1 = 0;
		this.FILA2 = 0;
		this.time  = 0;
		this.agenda = new Agenda();
		this.random = new Random();
	}

	public double getRandom(Double min, Double max) {
		return min + (max - min) * random.nextDouble(); 
	}
	public void run() {
		for(;;) {
			this.agenda.addEvent(new Event(time + this.getRandom(1.0, 2.3), this::CH1, "Q1"));
			Event nextEvent = this.agenda.getNextEvent();
			nextEvent.getChainMethod().run();
			this.time += nextEvent.getTime();
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	
	public void CH1() {
		System.out.println("Simulador - CH1");
		if(FILA1 < 4) {
			FILA1++;
			if(FILA1 <= 1) {
				FILA1--;
				this.agenda.addEvent(new Event(time + this.getRandom(1.0, 2.3), this::P12, "Q2"));	
			}
		}
		this.agenda.addEvent(new Event(time + this.getRandom(1.0, 2.3), this::CH1, "Q1"));
	}
	public void P12() {
		System.out.println("Simulador - P12");
	}
	public void SA1() {
		System.out.println("Simulador - SA1");
	}
	public void SA2() {		
		System.out.println("Simulador - SA2");
	}
}
