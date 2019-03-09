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

import beans.Product;
import beans.Products;
import beans.Review;
import beans.Shops;

@Path("/products")
public class ProductService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getProducts")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Product> getProducts(){
		return this.getProductList().getProducts();
	}
	
	
	@POST
	@Path("/addProduct")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addProduct(Product p) {
		Products pr = (Products)ctx.getAttribute("products");
		if(pr == null){
			pr = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", pr);
		}
		
		Product product = new Product(p.getId(),
									  p.getName(),
									  p.getColor(),
									  p.getDimensions(),
									  p.getWeight(),
									  p.getCountry(),
									  p.getProducer(),
									  p.getPrice(),
									  p.getCategory(),
									  p.getImage(),
									  p.getVideo(),
									  p.getMark(),
									  p.getReview(),
									  p.getQuantity(),
									  p.getShopName());
		
		if( (!p.getId().equals("")) && (!p.getName().equals("")) && (!p.getColor().equals("")) && (p.getWeight()>0) && (!p.getCountry().equals(""))
				&& (!p.getProducer().equals("")) && (p.getPrice()>0) && (!p.getCategory().equals(""))  && (p.getMark()>0)
				&& (p.getQuantity()>0) && (!p.getShopName().equals(""))){
			boolean ret = pr.addProduct(product);
			
			ctx.setAttribute("products", pr);
			pr.writeProducts(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "This product already exists!";
		}else return "Failed";
		
	}
	
	@POST
	@Path("/changeProduct")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String changeProduct(Product p){
		Products pr = (Products)ctx.getAttribute("products");
		if(pr == null){
			pr = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", pr);
		}
		
		Product product = new Product(p.getId(),
									  p.getName(),
									  p.getColor(),
									  p.getDimensions(),
									  p.getWeight(),
									  p.getCountry(),
									  p.getProducer(),
									  p.getPrice(),
									  p.getCategory(),
									  p.getImage(),
									  p.getVideo(),
									  p.getMark(),
									  p.getReview(),
									  p.getQuantity(),
									  p.getShopName());
		
		if( (!p.getId().equals("")) && (!p.getName().equals("")) && (!p.getColor().equals("")) && (p.getWeight()>0) && (!p.getCountry().equals(""))
				&& (!p.getProducer().equals("")) && (p.getPrice()>0) && (!p.getCategory().equals(""))  && (p.getMark()>0)
				&& (p.getQuantity()>0) && (!p.getShopName().equals(""))){
			boolean ret = pr.changeProduct(product);
			ctx.setAttribute("products", pr);
			pr.writeProducts(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "Change unsuccessfull!";
		}else return "Failed";
	}
	
	@DELETE
	@Path("/deleteProduct/{id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteProduct(@PathParam("id") String id){
		Products pr = (Products)ctx.getAttribute("products");
		if(pr == null){
			pr = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", pr);
		}
		boolean ret = pr.deleteProducts(id);
		ctx.setAttribute("products", pr);
		pr.writeProducts(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@GET
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Product> getManagersProducts(@PathParam("username") String username){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		return this.getProductList().getManagersProducts(username,sh);
	}
	
	@GET
	@Path("/getManagersProductsString/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getManagersProductsString(@PathParam("username") String username){
		Shops sh = (Shops)ctx.getAttribute("shops");
		if(sh == null){
			sh = new Shops(ctx.getRealPath(""));
			ctx.setAttribute("shops", sh);
		}
		return this.getProductList().getManagersProductsString(username,sh);
	}
	
	@POST
	@Path("/rateProduct/{id}/{mark}")
	@Produces(MediaType.TEXT_PLAIN)
	public String rateProduct(@PathParam("id") String id, @PathParam("mark") int mark){
		Products pr = (Products)ctx.getAttribute("products");
		if(pr == null){
			pr = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", pr);
		}
		
		boolean ret = pr.rateProduct(id, mark);
		pr.writeProducts(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/addReview/{productId}")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addReview(@PathParam("productId") String productId, Review r){
		Products pr = (Products)ctx.getAttribute("products");
		if(pr == null){
			pr = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", pr);
		}
		
		boolean ret = pr.addReview(productId, r.getId());
		pr.writeProducts(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/subFromQuantity/{name}/{count}")
	@Produces(MediaType.APPLICATION_JSON)
	public String subFromQuantity(@PathParam("name") String name, @PathParam("count") int count){
		Products pr = (Products)ctx.getAttribute("products");
		if(pr == null){
			pr = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", pr);
		}
		
		boolean ret = pr.subFromQuantity(name, count);
		ctx.setAttribute("products", pr);
		if(ret)
			return "";
		else return "Failed!";
	}
	
	private Products getProductList(){
		Products pr = (Products)ctx.getAttribute("products");
		if(pr == null){
			pr = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", pr);
		}
		
		return pr;
	}

}
