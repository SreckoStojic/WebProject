package beans;

import java.util.ArrayList;

public class Product {

	private String id;
	private String name;
	private String color;
	private double[] dimensions;
	private double weight;
	private String country;
	private String producer;
	private double price;
	private String category;
	private String image;
	private String video;
	private double mark;
	private ArrayList<String> review;
	private int quantity;
	private String shopName;
	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Product(String id, String name, String color, double[] dimensions, double weight, String country,
			String producer, double price, String category, String image, String video, double mark,
			ArrayList<String> review, int quantity, String shopName) {
		super();
		this.id = id;
		this.name = name;
		this.color = color;
		this.dimensions = dimensions;
		this.weight = weight;
		this.country = country;
		this.producer = producer;
		this.price = price;
		this.category = category;
		this.image = image;
		this.video = video;
		this.mark = mark;
		this.review = review;
		this.quantity = quantity;
		this.shopName = shopName;
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
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public double[] getDimensions() {
		return dimensions;
	}
	public void setDimensions(double[] dimensions) {
		this.dimensions = dimensions;
	}
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getProducer() {
		return producer;
	}
	public void setProducer(String producer) {
		this.producer = producer;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getVideo() {
		return video;
	}
	public void setVideo(String video) {
		this.video = video;
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
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	
	

}
