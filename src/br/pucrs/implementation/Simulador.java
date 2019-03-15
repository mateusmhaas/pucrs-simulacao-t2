package br.pucrs.implementation;

import br.pucrs.helper.EventType;

public class Simulador {
	private int FILA1;
	private int FILA2;
	private int time;
	private Agenda agenda;
	public Simulador() {
		this.FILA1 = 0;
		this.FILA2 = 0;
		this.time  = 0;
		this.agenda = new Agenda();
	}
	public void run() {
		for(;;) {
			CH1();
		}
	}
	
	public void CH1() {
		if(FILA1 < 4) {
			FILA1++;
			if(FILA1 <= 1) {
				this.agenda.addEvent(
						new Event(time + 0.0, this::P12));
			}
		}
		this.agenda.addEvent(new Event(time + 0.0, this::CH1));
	}
	public void P12() {
		
	}
	public void SA1() {
		
	}
	public void SA2() {
		
	}
}
