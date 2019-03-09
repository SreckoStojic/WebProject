package beans;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.codehaus.jackson.map.ObjectMapper;

public class Categories {

	private ArrayList<Category> categories;
	
	public Categories() {
		// TODO Auto-generated constructor stub
		categories = new ArrayList<Category>();
	}
	
	public Categories(String realPath){
		categories=new ArrayList<Category>();
		readCategories(realPath);
	}
	

	public ArrayList<Category> getCategories() {
		return categories;
	}

	public void setCategories(ArrayList<Category> categories) {
		this.categories = categories;
	}
	
	public Category getCategory(String name){
		for(Category c : categories){
			if(c.getName().contentEquals(name))
				return c;
		}
		return null;
	}
	
	public boolean addCategory(Category c){
		for(Category cat : categories){
			if(c.getName().equals(cat.getName()))
				return false;
		}
		categories.add(c);
		return true;
	}
	
	public boolean deleteCategory(String name, Products prod){
		Category cat = null;
		if(name.equals("other"))
			return false;
		for(Category c : categories){
			if(c.getName().equals(name))
				cat = c;
		}
		
		if(cat!=null){
			for(Product p : prod.getProducts()){
				if(p.getCategory().equals(name)){
					p.setCategory("other");
				}
			}
			categories.remove(cat);
			return true;
		}else return false;
	}
	
	public boolean changeCategory(Category c){
		Category temp = null;
		for(Category cat : categories){
			if(cat.getName().equals(c.getName()))
				temp = cat;
		}
		
		if(temp == null){
			return false;
		}else{
			categories.remove(temp);
			categories.add(c);
			return true;
		}
	}
	
	private void readCategories(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			Categories cat = mapper.readValue(new File(realPath+"/data/categories.json"), Categories.class);
			this.categories = cat.getCategories();
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	
	public ArrayList<String> getCategoriesString(){
		ArrayList<String> cat = new ArrayList<String>();
		for(Category c : categories){
			cat.add(c.getName());
		}
		
		return cat;
	}

	public synchronized void writeCategories(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(new File(realPath+"/data/categories.json"),this);
		}catch(IOException e){
			e.printStackTrace();
		}
	}
}
