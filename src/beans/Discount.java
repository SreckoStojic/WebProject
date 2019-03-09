package beans;

import java.util.ArrayList;
import java.util.Date;

public class Discount {
	
	private String id;
	private Date start;
	private Date end;
	private double percent;
	private int categoryDiscount;
	private String product;
	private String category;
	private String shop;
	public Discount() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Discount(String id, Date start, Date end, double percent, int categoryDiscount, String product,
			String category, String shop) {
		super();
		this.id = id;
		this.start = start;
		this.end = end;
		this.percent = percent;
		this.categoryDiscount = categoryDiscount;
		this.product = product;
		this.category = category;
		this.shop = shop;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getStart() {
		return start;
	}
	public void setStart(Date start) {
		this.start = start;
	}
	public Date getEnd() {
		return end;
	}
	public void setEnd(Date end) {
		this.end = end;
	}
	public double getPercent() {
		return percent;
	}
	public void setPercent(double percent) {
		this.percent = percent;
	}
	public int getCategoryDiscount() {
		return categoryDiscount;
	}
	public void setCategoryDiscount(int categoryDiscount) {
		this.categoryDiscount = categoryDiscount;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getShop() {
		return shop;
	}
	public void setShop(String shop) {
		this.shop = shop;
	}
	
	
}
