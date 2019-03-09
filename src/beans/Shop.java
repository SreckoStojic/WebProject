package beans;

import java.util.ArrayList;

public class Shop {

	private String id;
	private String name;
	private String address;
	private String country;
	private String contact;
	private String email;
	private String manager;
	private double mark;
	private ArrayList<String> review;
	public Shop() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Shop(String id, String name, String address, String country, String contact, String email, String manager,
			double mark, ArrayList<String> review) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.country = country;
		this.contact = contact;
		this.email = email;
		this.manager = manager;
		this.mark = mark;
		this.review = review;
	}
	
	public boolean addReview(String reviewId){
		for(String s : review){
			if(s.equals(reviewId))
				return false;
		}
		
		review.add(reviewId);
		return true;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	public double getMark() {
		return mark;
	}
	public void setMark(double mark) {
		this.mark = mark;
	}
	public ArrayList<String> getReview() {
		return review;
	}
	public void setReview(ArrayList<String> review) {
		this.review = review;
	}
	
	
}
