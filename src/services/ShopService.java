package services;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Discounts;
import beans.Products;
import beans.Review;
import beans.Shop;
import beans.Shops;

@Path("/shops")
public class ShopService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getShops")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Shop> getShops(){
		return this.getShopList().getShops(); 
	}
	
	@GET
	@Path("/getShopsString")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getShopsString(){
		return this.getShopList().getShopsString();
	}
	
	@POST
	@Path("/addShop")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addShop(Shop shop){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		
		Shop s = new Shop(shop.getId(), shop.getName(), shop.getAddress(), shop.getCountry(), shop.getContact(), shop.getEmail(), shop.getManager(), shop.getMark(), shop.getReview());
		if( (!s.getId().equals("")) && (!s.getName().equals("")) && (!s.getAddress().equals("")) && (!s.getCountry().equals("")) && (!s.getContact().equals("")) && 
			 (!s.getEmail().equals("")) && (!s.getManager().equals(""))){
			boolean ret = sh.addShop(s);
			ctx.setAttribute("shops", sh);
			sh.writeShops(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "This shop already exists!";
		}else return "FALSE";
	}
	
	@DELETE
	@Path("/deleteShop/{id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteShop(@PathParam("id") String id){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		
		Products prod = (Products)ctx.getAttribute("products");
		if(prod==null){
			prod = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", prod);
		}
		
		Discounts dis = (Discounts)ctx.getAttribute("discounts");
		if(dis == null){
			dis = new Discounts(ctx.getRealPath(""));
			ctx.setAttribute("discounts", dis);
		}
		
		boolean ret = sh.deleteShop(id, prod, dis);
		ctx.setAttribute("shops", sh);
		ctx.setAttribute("products", prod);
		ctx.setAttribute("discounts", dis);
		sh.writeShops(ctx.getRealPath(""));
		prod.writeProducts(ctx.getRealPath(""));
		dis.writeDiscounts(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/changeShop")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String changeShop(Shop shop){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		Shop s = new Shop(shop.getId(), shop.getName(), shop.getAddress(), shop.getCountry(), shop.getContact(), shop.getEmail(), shop.getManager(), shop.getMark(), shop.getReview());
		if( (!s.getId().equals("")) && (!s.getName().equals("")) && (!s.getAddress().equals("")) && (!s.getCountry().equals("")) && (!s.getContact().equals("")) && 
				 (!s.getEmail().equals("")) && (!s.getManager().equals(""))){
			boolean ret = sh.changeShop(s); 
			ctx.setAttribute("shops", sh);
			sh.writeShops(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "Failed to change shop!";
		}else return "FALSE";
	}
	
	@GET
	@Path("/getManagerShops/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Shop> getManagerShops(@PathParam("username") String username){
		return this.getShopList().getManagerShops(username);
	}
	
	@GET
	@Path("/getManagerShopsString/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getManagerShopsString(@PathParam("username") String username){
		return this.getShopList().getManagerShopsString(username);
		
	}
	
	@POST
	@Path("/addReview/{shopId}")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addReview(@PathParam("shopId") String shopId, Review r){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		
		boolean ret = sh.addReview(shopId, r.getId());
		ctx.setAttribute("shops", sh);
		sh.writeShops(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/rateShop/{name}/{mark}")
	@Produces(MediaType.TEXT_PLAIN)
	public String rateShop(@PathParam("name") String name, @PathParam("mark") int mark){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		
		boolean ret = sh.rateShop(name, mark);
		ctx.setAttribute("shops", sh);
		sh.writeShops(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	private Shops getShopList(){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		return sh;
	}
}
