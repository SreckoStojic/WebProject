package beans;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.codehaus.jackson.map.ObjectMapper;

public class Products {

	private ArrayList<Product> products;
	
	public Products() {
		// TODO Auto-generated constructor stub
		products = new ArrayList<Product>();
	}
	
	public Products(String realPath){
		products = new ArrayList<Product>();
		readProducts(realPath);
	}
	

	public ArrayList<Product> getProducts() {
		return products;
	}

	public void setProducts(ArrayList<Product> products) {
		this.products = products;
	}

	
	public boolean addProduct(Product p){
		for(Product pr : products){
			if(pr.getId().equals(p.getId()))
				return false;
		}
		products.add(p);
		return true;
	}
	
	public boolean changeProduct(Product p){
		Product temp = null;
		for(Product pr : products){
			if(pr.getId().equals(p.getId()))
				temp = pr;
		}
		
		if(temp == null){
			return false;
		}else{
			products.remove(temp);
			products.add(p);
			return true;
		}
	}
	
	public boolean deleteProducts(String id){
		Product temp = null;
		for(Product p : products){
			if(p.getId().equals(id))
				temp = p;
		}
		
		if(temp!=null){
			products.remove(temp);
			return true;
		}else return false;
	}
	
	public ArrayList<Product> getManagersProducts(String username, Shops shops){
		ArrayList<Shop> s = new ArrayList<Shop>();
		for(Shop sh : shops.getShops()){
			if(sh.getManager().equals(username))
				s.add(sh);
		}
		
		ArrayList<Product> ret = new ArrayList<Product>();
		for(Product p : products){
			for(Shop sh : s){
				if(p.getShopName().equals(sh.getName())){
						ret.add(p);
				}
			}
		}
		
		return ret;
	}
	
	public ArrayList<String> getManagersProductsString(String username, Shops shops){
		ArrayList<Shop> s = new ArrayList<Shop>();
		for(Shop sh : shops.getShops()){
			if(sh.getManager().equals(username))
				s.add(sh);
		}
		
		ArrayList<String> ret = new ArrayList<String>();
		for(Product p : products){
			for(Shop sh : s){
				if(p.getShopName().equals(sh.getName()))
					ret.add(p.getName());
			}
		}
		
		return ret;
	}
	
	public boolean rateProduct(String id, int mark){
		for(Product p : products){
			if(p.getId().equals(id)){
				if(p.getMark() == 0){
					p.setMark(mark);
					return true;
				}else{
					p.setMark((p.getMark() + mark)/2);
					return true;
				}
			}
		}
		
		return false;
	}
	
	public boolean addReview(String productId, String reviewId){
		for(Product p : products){
			if(p.getId().equals(productId)){
				p.addReview(reviewId);
				return true;
			}
		}
		
		return false;
	}
	
	public boolean subFromQuantity(String name,int count){
		for(Product p : products){
			if(p.getName().equals(name)){
				p.setQuantity(p.getQuantity() - count);
				return true;
			}
		}
		return false;
	}
	
	private void readProducts(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			Products pr = mapper.readValue(new File(realPath+"/data/products.json"), Products.class);
			this.products = pr.getProducts();
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	
	public synchronized void writeProducts(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
		
			mapper.writeValue(new File(realPath+"/data/products.json"), this);
		}catch(IOException e){
			e.printStackTrace();
		}
	}
}
