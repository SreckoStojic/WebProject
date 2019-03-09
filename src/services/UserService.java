package services;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Categories;
import beans.Products;
import beans.Reviews;
import beans.User;
import beans.UserToLogin;
import beans.Users;

@Path("/users")
public class UserService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getUsers(){
		return this.getUsersList().getUsers();
	}
	
	@GET
	@Path("/getManagersString")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getManagersString(){
		return this.getUsersList().getManagersString();
	}
	
	@POST
	@Path("/getUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(UserToLogin utl){
		Users us = (Users) ctx.getAttribute("users");
		if(us == null){
			us = new Users(ctx.getRealPath(""));
			ctx.setAttribute("users", us);
		}
		
		User user = us.getUser(utl.getUsername(), utl.getPassword());
		return user;
	}
	
	@POST
	@Path("/addUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addUser(User u){
		Users us = (Users) ctx.getAttribute("users");
		if(us == null){
			us = new Users(ctx.getRealPath(""));
			ctx.setAttribute("users", us);
		}
		User user = new User(u.getUsername(),
							 u.getPassword(),
							 u.getName(),
							 u.getSurname(),
							 u.getRole(),
							 u.getContact(),
							 u.getEmail(),
							 u.getAddress(),
							 u.getCountry());
		if((!u.getUsername().equals("")) && (!u.getPassword().equals("")) && (!u.getName().equals("")) && (!u.getSurname().equals("")) && (!u.getContact().equals("")) && (!u.getEmail().equals("")) && (!u.getAddress().equals(""))){
			boolean ret = us.addUser(user);
			ctx.setAttribute("users", us);
			us.writeUsers(ctx.getRealPath(""));
			if(ret)
				return "";
			else return "This user already exists!";
		}else return "false";
		
	}
	
	private Users getUsersList(){
		Users us = (Users) ctx.getAttribute("users");
		if(us == null){
			us = new Users(ctx.getRealPath(""));
			ctx.setAttribute("users", us);
		}
		
		return us;
	}
}
