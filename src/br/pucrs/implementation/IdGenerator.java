package br.pucrs.implementation;

import java.util.HashMap;

public class IdGenerator {
	static HashMap<String, Integer> ids = new HashMap<>();
	
	public static int getNext(String name) {
		int id;
		if(ids.containsKey(name)) {
			id = ids.get(name);
			id++;
			ids.put(name, id);
			return id;
		} else {
			ids.put(name, 0);
			return 0;
		}
	}
}
