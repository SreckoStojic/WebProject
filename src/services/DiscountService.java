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

import beans.Discount;
import beans.Discounts;
import beans.Purchases;
import beans.Shops;

@Path("/discounts")
public class DiscountService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getDiscounts")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Discount> getDiscount(){
		return getDiscountsList().getDiscounts();
	}
	
	@POST
	@Path("/addDiscount")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addDiscount(Discount d){
		Discounts di = (Discounts)ctx.getAttribute("discounts");
		if(di == null){
			di = new Discounts(ctx.getRealPath(""));
			ctx.setAttribute("discounts", di);
		}
		
		Discount discount = new Discount(d.getId(), d.getStart(), d.getEnd(), d.getPercent(), d.getCategoryDiscount(), d.getProduct(), d.getCategory(), d.getShop());
		if( (!d.getId().equals("")) && (d.getPercent()>0) && (!d.getShop().equals(""))){
			boolean ret = di.addDiscount(discount);
			ctx.setAttribute("discounts", di);
			di.writeDiscounts(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "This discount already exists!";
		}else return "false";
	}
	
	@GET
	@Path("/getDiscountsManager/{username}") 
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Discount> getDiscountsManager(@PathParam("username") String username){ 
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh==null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		
		return this.getDiscountsList().getDiscountsManager(username,sh);
	}
	
	@DELETE
	@Path("/deleteDiscount/{id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteDiscount(@PathParam("id") String id){
		Discounts dis = (Discounts)ctx.getAttribute("discounts");
		if(dis == null){
			dis = new Discounts(ctx.getRealPath(""));
			ctx.setAttribute("discounts", dis);
		}
		
		boolean ret = dis.deleteDiscount(id);
		ctx.setAttribute("discounts", dis);
		dis.writeDiscounts(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@GET
	@Path("/getRecommendedProducts/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Discount> getRecommendedProducts(@PathParam("username") String username){
		Discounts dis = (Discounts)ctx.getAttribute("discounts");
		if(dis == null){
			dis = new Discounts(ctx.getRealPath(""));
			ctx.setAttribute("discounts", dis);
		}
		
		Purchases pur = (Purchases)ctx.getAttribute("purchases");
		if(pur == null){
			pur = new Purchases(ctx.getRealPath(""));
			ctx.setAttribute("purchases", pur);
		}
		
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		
		String bestShop = pur.getBestShop(username, sh);
		ArrayList<Discount> ret = dis.getShopDiscounts(bestShop);
		
		return ret;
	}
	
	private Discounts getDiscountsList(){
		Discounts dis = (Discounts)ctx.getAttribute("discounts");
		if(dis == null){
			dis = new Discounts(ctx.getRealPath(""));
			ctx.setAttribute("discounts", dis);
		}
		
		return dis;
	}
	
}
