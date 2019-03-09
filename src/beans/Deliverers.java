package beans;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.codehaus.jackson.map.ObjectMapper;

public class Deliverers {

	private ArrayList<Deliverer> deliverers;
	
	public Deliverers() {
		// TODO Auto-generated constructor stub
		deliverers = new ArrayList<Deliverer>();
	}
	
	public Deliverers(String realPath){
		deliverers = new ArrayList<Deliverer>();
		readDeliverers(realPath);
	}

	public ArrayList<Deliverer> getDeliverers() {
		return deliverers;
	}

	public void setDeliverers(ArrayList<Deliverer> deliverers) {
		this.deliverers = deliverers;
	}
	
	public boolean addDeliverer(Deliverer d){
		for(Deliverer del : deliverers){
			if(del.getId().equals(d.getId()))
				return false;
		}
		
		deliverers.add(d);
		return true;
	}
	
	public boolean deleteDeliverer(String id){
		Deliverer temp = null;
		for(Deliverer del : deliverers){
			if(del.getId().equals(id))
				temp = del;
		}
		
		if(temp != null){
			deliverers.remove(temp);
			return true;
		}else return false;
	}
	
	public boolean changeDeliverer(Deliverer d){
		Deliverer temp = null;
		for(Deliverer del : deliverers){
			if(del.getId().equals(d.getId()))
				temp = del;
		}
		
		if(temp == null){
			return false;
		}else{
			deliverers.remove(temp);
			deliverers.add(d);
			return true;
		}
	}
	
	public ArrayList<String> getEnabledDeliverers(Shops shops,String shopName,Users us, String username){
		Shop s = shops.getShop(shopName);
		ArrayList<String> ret = new ArrayList<String>();
		for(Deliverer d : deliverers){
			for(String co : d.getCountry()){
				if(co.equals(s.getCountry()))
					ret.add(d.getName());
			}
		}
		
		return ret;
	}
	
	private void readDeliverers(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			Deliverers de = mapper.readValue(new File(realPath + "/data/deliverers.json"), Deliverers.class);
			this.deliverers = de.getDeliverers();
			
			for(Deliverer d : this.deliverers)
				System.out.println(d.getId());
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	
	public synchronized void writeDeliverers(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(new File(realPath+"/data/deliverers.json"), this);
		}catch(IOException e){
			e.printStackTrace();
		}
	}

}
