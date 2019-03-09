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

import beans.Review;
import beans.Reviews;

@Path("/reviews")
public class ReviewService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getReviews")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Review> getReviews(){
		return this.getReviewsList().getReviews();
	}
	
	@DELETE
	@Path("/deleteReview/{id}")
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteReview(@PathParam("id") String id){
		Reviews re = (Reviews)ctx.getAttribute("reviews");
		if(re == null){
			re = new Reviews(ctx.getRealPath(""));
			ctx.setAttribute("reviews", re);
		}
		
		boolean ret = re.deleteReview(id);
		ctx.setAttribute("reviews", re);
		re.writeReviews(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	
	@POST
	@Path("/addNewReview")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String addNewReview(Review r){
		Reviews re = (Reviews)ctx.getAttribute("reviews");
		if(re == null){
			re = new Reviews(ctx.getRealPath(""));
			ctx.setAttribute("reviews", re);
		}
		
		Review review = new Review(r.getId(),r.getUser(),r.getDate(),r.getMarkPositive(),r.getMarkNegative(),r.getComment());
		boolean ret = re.addReview(review);
		ctx.setAttribute("reviews", re);
		re.writeReviews(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/reviewVoteUp/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String reviewVoteUp(@PathParam("id") String id){
		Reviews re = (Reviews)ctx.getAttribute("reviews");
		if(re == null){
			re = new Reviews(ctx.getRealPath(""));
			ctx.setAttribute("reviews", re);
		}
		
		boolean ret = re.voteUp(id);
		ctx.setAttribute("reviews", re);
		re.writeReviews(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/reviewVoteDown/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String reviewVoteDown(@PathParam("id") String id){
		Reviews re = (Reviews)ctx.getAttribute("reviews");
		if(re == null){
			re = new Reviews(ctx.getRealPath(""));
			ctx.setAttribute("reviews", re);
		}
		
		boolean ret = re.voteDown(id);
		ctx.setAttribute("reviews", re);
		re.writeReviews(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	@POST
	@Path("/changeReview")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String changeReview(Review r){
		Reviews re = (Reviews)ctx.getAttribute("reviews");
		if(re == null){
			re = new Reviews(ctx.getRealPath(""));
			ctx.setAttribute("reviews", re);
		}
		
		Review review = new Review(r.getId(),r.getUser(),r.getDate(),r.getMarkPositive(),r.getMarkNegative(),r.getComment());
		boolean ret = re.changeReview(review);
		ctx.setAttribute("reviews", re);
		re.writeReviews(ctx.getRealPath(""));
		if(ret)
			return "";
		else return "Failed!";
	}
	
	private Reviews getReviewsList(){
		Reviews re = (Reviews)ctx.getAttribute("reviews");
		if(re == null){
			re = new Reviews(ctx.getRealPath(""));
			ctx.setAttribute("reviews", re);
		}
		
		return re;
	}
}
