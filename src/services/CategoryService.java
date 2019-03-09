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

import beans.Categories;
import beans.Category;
import beans.Products;

@Path("/categories")
public class CategoryService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getCategories")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Category> getCategories(){
		return this.getCategoryList().getCategories();
	}
	
	@GET
	@Path("/getCategoriesString")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getCategoriesString(){
		return this.getCategoryList().getCategoriesString();
	}
	
	@POST
	@Path("/addCategory")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addCategory(Category c){
		Categories cat = (Categories)ctx.getAttribute("categories");
		if(cat == null){
			cat = new Categories(ctx.getRealPath(""));
			ctx.setAttribute("categories", cat);
		}
		Category category = new Category(c.getName(), c.getDescription(), c.getSubcategory());
		
		if( (!c.getName().equals("")) && (!c.getDescription().equals(""))){
			boolean ret = cat.addCategory(category);
			ctx.setAttribute("categories", cat);
			cat.writeCategories(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "This category already exists!";
		}else return "FALSE";
	}
	
	@POST
	@Path("/changeCategory")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String changeCategory(Category c){
		Categories cat = (Categories)ctx.getAttribute("categories");
		if(cat == null){
			cat = new Categories(ctx.getRealPath(""));
			ctx.setAttribute("categories", cat);
		}
		Category category = new Category(c.getName(), c.getDescription(), c.getSubcategory());
		if( (!c.getName().equals("")) && (!c.getDescription().equals(""))){
			boolean ret = cat.changeCategory(category);
			ctx.setAttribute("categories", cat);
			cat.writeCategories(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "Failed to change category!";
		}else return "FALSE";
	}
	
	@DELETE
	@Path("/deleteCategory/{name}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteCategory(@PathParam("name") String name){
		Categories cat = (Categories)ctx.getAttribute("categories");
		if(cat == null){
			cat = new Categories(ctx.getRealPath(""));
			ctx.setAttribute("categories", cat);
		}
		Products prod = (Products)ctx.getAttribute("products");
		if(prod == null){
			prod = new Products(ctx.getRealPath(""));
			ctx.setAttribute("products", prod);
		}
		boolean ret = cat.deleteCategory(name, prod);
		cat.writeCategories(ctx.getRealPath(""));
		prod.writeProducts(ctx.getRealPath(""));
		ctx.setAttribute("categories", cat);
		if(ret)
			return "";
		else return "Failed!";
	}
	
	private Categories getCategoryList(){
		Categories cat = (Categories)ctx.getAttribute("categories");
		if(cat == null){
			cat = new Categories(ctx.getRealPath(""));
			ctx.setAttribute("categories", cat);
		}
		
		return cat;
	}
	
}
