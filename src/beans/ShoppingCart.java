package beans;

import java.util.ArrayList;

public class ShoppingCart {

	private ArrayList<ShoppingCartItem> items;
	
	public ShoppingCart() {
		// TODO Auto-generated constructor stub
		items = new ArrayList<ShoppingCartItem>();
	}

	public ArrayList<ShoppingCartItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<ShoppingCartItem> items) {
		this.items = items;
	}
	
	

}
