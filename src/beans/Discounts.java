package beans;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;

import org.codehaus.jackson.map.ObjectMapper;

public class Discounts implements Serializable{
	
	private ArrayList<Discount> discounts;

	public Discounts() {
		// TODO Auto-generated constructor stub
		discounts = new ArrayList<Discount>();
	}

	public Discounts(String realPath) {
		discounts = new ArrayList<Discount>();
		readDiscounts(realPath);
	}

	public ArrayList<Discount> getDiscounts() {
		return discounts;
	}

	public void setDiscounts(ArrayList<Discount> discounts) {
		this.discounts = discounts;
	}
	
	public boolean addDiscount(Discount d){
		for(Discount discount : discounts){
			if(discount.getId().equals(d.getId()))
				return false;
		}
		
		discounts.add(d);
		return true;
	}
	
	public boolean deleteDiscount(String id){
		Discount temp = null;
		for(Discount d : discounts){
			if(d.getId().equals(id))
				temp = d;
		}
		
		if(temp != null){
			discounts.remove(temp);
			return true;
		}else return false;
	}
	
	private void readDiscounts(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			Discounts di = mapper.readValue(new File(realPath+"/data/discounts.json"), Discounts.class);
			this.discounts = di.getDiscounts();
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	
	public ArrayList<Discount> getShopDiscounts(String shop){
		ArrayList<Discount> ret = new ArrayList<Discount>();
		for(Discount d : discounts){
			if(d.getShop().equals(shop)){
				ret.add(d);
			}
		}
		
		return ret;
	}
	
	public ArrayList<Discount> getDiscountsManager(String username, Shops shops){
		ArrayList<Discount> ret = new ArrayList<Discount>();
		for(Discount d : discounts){
			if(((shops.getShop(d.getShop())).getManager()).equals(username))
				ret.add(d);
		}
		
		return ret;
	}
	
	public synchronized void writeDiscounts(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(new File(realPath+"/data/discounts.json"), this);
		}catch(IOException e){
			e.printStackTrace();
		}
	}

}
