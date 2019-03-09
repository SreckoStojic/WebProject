package beans;

public class ProductInShoppingCart {
	
	private String productName;
	private int count;
	private double tax;
	private double weight;
	private double price;
	public ProductInShoppingCart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ProductInShoppingCart(String productName, int count, double tax, double weight, double price) {
		super();
		this.productName = productName;
		this.count = count;
		this.tax = tax;
		this.weight = weight;
		this.price = price;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public double getTax() {
		return tax;
	}
	public void setTax(double tax) {
		this.tax = tax;
	}
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}

	
}
