package beans;

public class Purchase {

	private String id;
	private String username;
	private ShoppingCartItem shoppingCartItem;
	public Purchase() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Purchase(String id, String username, ShoppingCartItem shoppingCartItem) {
		super();
		this.id = id;
		this.username = username;
		this.shoppingCartItem = shoppingCartItem;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public ShoppingCartItem getShoppingCartItem() {
		return shoppingCartItem;
	}
	public void setShoppingCartItem(ShoppingCartItem shoppingCartItem) {
		this.shoppingCartItem = shoppingCartItem;
	}
	
	

}
