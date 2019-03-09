package beans;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.codehaus.jackson.map.ObjectMapper;

public class Reviews {

	private ArrayList<Review> reviews;
	
	public Reviews() {
		// TODO Auto-generated constructor stub
		reviews = new ArrayList<Review>();
	}
	
	public Reviews(String realPath){
		reviews = new ArrayList<Review>();
		readReviews(realPath);
	}

	public ArrayList<Review> getReviews() {
		return reviews;
	}

	public void setReviews(ArrayList<Review> reviews) {
		this.reviews = reviews;
	}
	
	public Review getReview(String id){
		for(Review r : reviews){
			if(r.getId().equals(id))
				return r;
		}
		return null;
	}
	
	private void readReviews(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			Reviews re = mapper.readValue(new File(realPath + "/data/reviews.json"), Reviews.class);
			this.reviews = re.getReviews();
			
			for(Review r : this.reviews)
				System.out.println(r.getId());
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	
	public boolean addReview(Review r){
		for(Review rew : reviews){
			if(rew.getId().equals(r.getId()))
				return false;
		}
		
		reviews.add(r);
		return true;
	}
	
	public boolean deleteReview(String id){
		Review r = null;
		for(Review review : reviews){
			if(review.getId().equals(id))
				r = review;
		}
		
		if(r != null){
			reviews.remove(r);
			return true;
		}else return false;
	}
	
	public boolean voteUp(String reviewId){
		for(Review r : reviews){
			if(r.getId().equals(reviewId)){
				r.voteUp();
				return true;
			}
		}
		
		return false;
	}
	
	public boolean voteDown(String reviewId){
		for(Review r : reviews){
			if(r.getId().equals(reviewId)){
				r.voteDown();
				return true;
			}
		}
		
		return false;
	}
	
	public boolean changeReview(Review r){
		Review temp = null;
		for(Review re : reviews){
			if(r.getId().equals(re.getId()))
				temp = re;
		}
		
		if(temp != null){
			reviews.remove(temp);
			reviews.add(r);
			return true;
		}else{
			return false;
		}
	}

	public synchronized void writeReviews(String realPath){
		try{
			ObjectMapper mapper = new ObjectMapper();
			mapper.writeValue(new File(realPath+"/data/reviews.json"), this);
		}catch(IOException e){
			e.printStackTrace();
		}
	}
}
