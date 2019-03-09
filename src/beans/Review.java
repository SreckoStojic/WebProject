package beans;

import java.util.Date;

public class Review {
	
	private String id;
	private String user;
	private Date date;
	private double markPositive;
	private double markNegative;
	private String comment;
	public Review(String id, String user, Date date, double markPositive, double markNegative, String comment) {
		super();
		this.id = id;
		this.user = user;
		this.date = date;
		this.markPositive = markPositive;
		this.markNegative = markNegative;
		this.comment = comment;
	}
	public Review() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getMarkPositive() {
		return markPositive;
	}
	public void setMarkPositive(double markPositive) {
		this.markPositive = markPositive;
	}
	public double getMarkNegative() {
		return markNegative;
	}
	public void setMarkNegative(double markNegative) {
		this.markNegative = markNegative;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	public void voteUp(){
		this.markPositive++;
	}
	
	public void voteDown(){
		this.markNegative++;
	}

}
