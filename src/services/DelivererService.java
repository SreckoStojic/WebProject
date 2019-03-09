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

import beans.Deliverer;
import beans.Deliverers;
import beans.Shops;
import beans.Users;

@Path("/deliverers")
public class DelivererService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getDeliverers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Deliverer> getDeliverers(){
		return this.getDelivererList().getDeliverers();
	}
	
	@POST
	@Path("/addDeliverer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addDeliverer(Deliverer d){
		Deliverers del = (Deliverers)ctx.getAttribute("deliverers");
		if(del == null){
			del = new Deliverers(ctx.getRealPath(""));
			ctx.setAttribute("deliverers", del);
		}
		
		Deliverer deliverer = new Deliverer(d.getId(), d.getName(), d.getDescription(), d.getCountry(), d.getDeliverPrice());
		
		if( (!d.getId().equals("")) && (!d.getName().equals("")) && (!d.getDescription().equals("")) && (!d.getCountry().equals(""))){
			boolean ret = del.addDeliverer(deliverer);
			ctx.setAttribute("deliverers`", del);
			del.writeDeliverers(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "This deliverer already exists!";
		}else return "FAILED";
	}
	
	@DELETE
	@Path("/deleteDeliverer/{id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteDeliverer(@PathParam("id") String id){
		Deliverers del = (Deliverers)ctx.getAttribute("deliverers");
		if(del == null){
			del = new Deliverers(ctx.getRealPath(""));
			ctx.setAttribute("deliverers", del);
		}
		
		boolean ret = del.deleteDeliverer(id);
		ctx.setAttribute("deliverers", del);
		del.writeDeliverers(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/changeDeliverer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String changeDeliverer(Deliverer d){
		Deliverers del = (Deliverers)ctx.getAttribute("deliverers");
		if(del == null){
			del = new Deliverers(ctx.getRealPath(""));
			ctx.setAttribute("deliverers", del);
		}
		
		Deliverer deliverer = new Deliverer(d.getId(), d.getName(), d.getDescription(), d.getCountry(), d.getDeliverPrice());
		if( (!d.getId().equals("")) && (!d.getName().equals("")) && (!d.getDescription().equals("")) && (!d.getCountry().equals(""))){
			boolean ret = del.changeDeliverer(deliverer);
			ctx.setAttribute("deliverers", del);
			del.writeDeliverers(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "Failed to change deliverer!";
		}else return "FALSE";
	}
	
	@GET
	@Path("/getEnabledDeliverers/{shopName}/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getEnabledDeliverers(@PathParam("shopName") String shopName,@PathParam("username") String username){
		Deliverers del = (Deliverers)ctx.getAttribute("deliverers");
		if(del == null){
			del = new Deliverers(ctx.getRealPath(""));
			ctx.setAttribute("deliverers", del);
		}
		
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		
		Users us=(Users)ctx.getAttribute("users");
		
		
		
		ArrayList<String> ret = del.getEnabledDeliverers(sh,shopName,us,username);
		return ret;
	}
	
	private Deliverers getDelivererList(){
		Deliverers del = (Deliverers)ctx.getAttribute("deliverers");
		if(del == null){
			del = new Deliverers(ctx.getRealPath(""));
			ctx.setAttribute("deliverers", del);
		}
		
		return del;
	}

}
