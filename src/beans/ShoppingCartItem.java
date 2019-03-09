package beans;

import java.util.ArrayList;

public class ShoppingCartItem {
	
	private String shopName;
	private ArrayList<ProductInShoppingCart> products;
	private String delivererName;
	private double transferDuration;
	private double transferPrice;
	private double totalPrice;
	
	
	public ShoppingCartItem() {
		// TODO Auto-generated constructor stub
		products = new ArrayList<ProductInShoppingCart>();
	}


	public ShoppingCartItem(String shopName, ArrayList<ProductInShoppingCart> products, String delivererName,
			double transferDuration, double transferPrice, double totalPrice) {
		super();
		this.shopName = shopName;
		this.products = products;
		this.delivererName = delivererName;
		this.transferDuration = transferDuration;
		this.transferPrice = transferPrice;
		this.totalPrice = totalPrice;
	}


	public String getShopName() {
		return shopName;
	}


	public void setShopName(String shopName) {
		this.shopName = shopName;
	}


	public ArrayList<ProductInShoppingCart> getProducts() {
		return products;
	}


	public void setProducts(ArrayList<ProductInShoppingCart> products) {
		this.products = products;
	}


	public String getDelivererName() {
		return delivererName;
	}


	public void setDelivererName(String delivererName) {
		this.delivererName = delivererName;
	}


	public double getTransferDuration() {
		return transferDuration;
	}


	public void setTransferDuration(double transferDuration) {
		this.transferDuration = transferDuration;
	}


	public double getTransferPrice() {
		return transferPrice;
	}


	public void setTransferPrice(double transferPrice) {
		this.transferPrice = transferPrice;
	}


	public double getTotalPrice() {
		return totalPrice;
	}


	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	

}
