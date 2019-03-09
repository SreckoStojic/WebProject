package services;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Purchase;
import beans.Purchases;

@Path("/purchases")
public class PurchaseService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@POST
	@Path("/addPurchase")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addPurchase(Purchase sci){
		Purchases pur = (Purchases)ctx.getAttribute("purchases");
		if(pur == null){
			pur = new Purchases(ctx.getRealPath(""));
			ctx.setAttribute("purchases", pur);
		}
		Purchase purchase = new Purchase(sci.getId(),sci.getUsername(),sci.getShoppingCartItem());
		boolean ret = pur.addPurchase(purchase);
		ctx.setAttribute("purchases", pur);
		pur.writePurchases(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
		
	}
	
	@GET
	@Path("/getUserPurchaseShops/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getUserPurchaseShops(@PathParam("username") String username){
		Purchases pur = (Purchases)ctx.getAttribute("purchases");
		if(pur == null){
			pur = new Purchases(ctx.getRealPath(""));
			ctx.setAttribute("purchases", pur);
		}
		
		return  pur.getUserPurchaseShops(username);
		
	}

}
