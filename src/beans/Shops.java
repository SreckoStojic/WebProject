package beans;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.codehaus.jackson.map.ObjectMapper;

public class Shops {

	private ArrayList<Shop> shops;
	
	public Shops() {
		// TODO Auto-generated constructor stub
		shops = new ArrayList<Shop>();
	}
	
	public Shops(String realPath){
		shops = new ArrayList<Shop>();
		readShops(realPath);
	}

	public ArrayList<Shop> getShops() {
		return shops;
	}

	public void setShops(ArrayList<Shop> shops) {
		this.shops = shops;
	}
	
	public boolean addShop(Shop s){
		for(Shop shop : shops){
			if(shop.getId().equals(s.getId()) || shop.getName().equals(s.getName()))
				return false;
		}
		
		shops.add(s);
		return true;
	}
	
	public Shop getShopByName(String name){
		for(Shop s : shops){
			if(s.getName().equals(name))
				return s;
		}
		
		return null;
	}
	
	public boolean deleteShop(String id, Products prod, Discounts dis){
		Shop temp = null;
		for(Shop s : shops){
			if(s.getId().equals(id))
				temp = s;
		}
		ArrayList<Product> productsToDelete = new ArrayList<Product>();
		for(Product p : prod.getProducts()){
			if((this.getShopByName(p.getShopName())).getId().equals(id))
				productsToDelete.add(p);
		}
		for(Product p : productsToDelete){
			prod.getProducts().remove(p);
		}
		
		ArrayList<Discount> discountsToDelete = new ArrayList<Discount>();
		for(Discount d : dis.getDiscounts()){
			if((this.getShopByName(d.getShop())).getId().equals(id))
				discountsToDelete.add(d);
		}
		for(Discount d : discountsToDelete){
			dis.getDiscounts().remove(d);
		}
		
		if(temp!=null){
			shops.remove(temp);
			return true;
		}else return false;
	}
	
	public boolean changeShop(Shop s){
		Shop temp = null;
		for(Shop shop : shops){
			if(shop.getId().equals(s.getId()))
				temp = shop;
		}
		
		if(temp == null){
			return false;
		}else {
			shops.remove(temp);
			shops.add(s);
			return true;
		}
	}
	
	private void readShops(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			Shops sh = mapper.readValue(new File(realPath + "/data/shops.json"), Shops.class);
			this.shops = sh.getShops();
			
			for(Shop shop : this.shops)
				System.out.println(shop.getId());
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	
	public ArrayList<String> getShopsString(){
		ArrayList<String> sh = new ArrayList<String>();
		for(Shop s : shops){
			sh.add(s.getName());
		}
		
		return sh;
	}
	
	public ArrayList<Shop> getManagerShops(String username){
		ArrayList<Shop> ret = new ArrayList<Shop>();
		for(Shop s : shops){
			if(s.getManager().equals(username))
				ret.add(s);
		}
		
		return ret;
	}
	
	public ArrayList<String> getManagerShopsString(String username){
		ArrayList<String> ret = new ArrayList<String>();
		for(Shop s : shops){
			if(s.getManager().equals(username))
				ret.add(s.getName());
		}
		
		return ret;
	}
	
	public Shop getShop(String name){
		for(Shop s : shops){
			if(s.getName().equals(name))
				return s;
		}
		return null;
	}
	
	public boolean addReview(String shopId, String reviewId){
		for(Shop s : shops){
			if(s.getId().equals(shopId)){
				s.addReview(reviewId);
				return true;
			}
		}
		
		return false;
	}
	
	public boolean rateShop(String name, int mark){
		for(Shop s : shops){
			if(s.getName().equals(name)){
				if(s.getMark() == 0){
					s.setMark(mark);
					return true;
				}else{
					s.setMark((s.getMark()+mark)/2);
					return true;
				}
			}
		}
		
		return false;
	}
	
	public synchronized void writeShops(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(new File(realPath+"/data/shops.json"), this);
		}catch(IOException e){
			e.printStackTrace();
		}
	}
 
}
