package beans;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.codehaus.jackson.map.ObjectMapper;

public class Purchases {
	
	private ArrayList<Purchase> purchases;
	
	public Purchases() {
		// TODO Auto-generated constructor stub
		purchases = new ArrayList<Purchase>();
	}
	
	public Purchases(String realPath){
		purchases = new ArrayList<Purchase>();
		readPurchases(realPath);
	}

	public ArrayList<Purchase> getPurchases() {
		return purchases;
	}

	public void setPurchases(ArrayList<Purchase> purchases) {
		this.purchases = purchases;
	}
	
	public boolean addPurchase(Purchase purchase){
		for(Purchase p : purchases){
			if(p.getId().equals(purchase.getId()))
					return false;
		}
		
		purchases.add(purchase);
		return true;
	}
	
	public ArrayList<String> getUserPurchaseShops(String username){
		ArrayList<String> ret = new ArrayList<String>();
		for(Purchase p : purchases){
			if(p.getUsername().equals(username)){
				if(!ret.contains(p.getShoppingCartItem().getShopName()))
					ret.add(p.getShoppingCartItem().getShopName());
			}
		}
		
		return ret;
	}
	
	//vraca ime prodavnice iz koje je najvise kupovao kupac
	public String getBestShop(String username, Shops sh){
		String ret = null;
		int num = 0;
		for(Shop s : sh.getShops()){
			int n = 0;
			for(Purchase p : purchases){
				if(p.getShoppingCartItem().getShopName().equals(s.getName())){
					if(p.getUsername().equals(username))	
						n++;
				}
			}
			if(n > num){
				num = n;
				ret = s.getName();
			}
		}
		
		return ret;
	}
	
	private void readPurchases(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			Purchases pu = mapper.readValue(new File(realPath + "/data/purchases.json"), Purchases.class);
			this.purchases = pu.getPurchases();
			
			for(Purchase p : this.purchases)
				System.out.println(p.getId());
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	
	public synchronized void writePurchases(String realPath){
		try{
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(new File(realPath+"/data/purchases.json"), this);
		}catch(IOException e){
			e.printStackTrace();
		}
	}

}
