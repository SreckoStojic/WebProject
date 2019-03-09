package beans;

import java.util.ArrayList;

public class Deliverer {

	private String id;
	private String name;
	private String description;
	private ArrayList<String> country;
	private double deliverPrice;
	
	public Deliverer() {
		// TODO Auto-generated constructor stub
	}

	public Deliverer(String id, String name, String description, ArrayList<String> country, double deliverPrice) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.country = country;
		this.deliverPrice = deliverPrice;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public ArrayList<String> getCountry() {
		return country;
	}

	public void setCountry(ArrayList<String> country) {
		this.country = country;
	}

	public double getDeliverPrice() {
		return deliverPrice;
	}

	public void setDeliverPrice(double deliverPrice) {
		this.deliverPrice = deliverPrice;
	}
	
	

}
