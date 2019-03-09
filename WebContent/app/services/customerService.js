eCommerce.factory('customersFactory', function($http){
	var factory = {};
	
	factory.getEnabledDeliverers = function(shopName,username){
		return $http.get('/WebProject/rest/deliverers/getEnabledDeliverers/'+shopName+'/'+username);
	};
	
	factory.addPurchase = function(purchase){
		return $http.post('/WebProject/rest/purchases/addPurchase', {"id":purchase.id, "username":purchase.username, "shoppingCartItem":purchase.shoppingCartItem});
	};
	
	factory.rateProduct = function(productId, mark){
		return $http.post('/WebProject/rest/products/rateProduct/'+productId+'/'+mark);
	};
	
	factory.rateShop = function(shopName, mark){
		return $http.post('/WebProject/rest/shops/rateShop/'+shopName+'/'+mark);
	};
	
	factory.addCommentToReviews = function(newComment){
		return $http.post('/WebProject/rest/reviews/addNewReview', {"id":newComment.id, "user":newComment.user, "date":newComment.date,
																 "markPositive":newComment.markPositive,"markNegative":newComment.markNegative, "comment":newComment.comment});	
	};
	
	factory.addCommentToProduct = function(newComment, productId){
		return $http.post('/WebProject/rest/products/addReview/'+productId, {"id":newComment.id, "user":newComment.user, "date":newComment.date,
																  "markPositive":newComment.markPositive,"markNegative":newComment.markNegative, "comment":newComment.comment});
	};
	
	factory.addCommentToShop = function(newComment, shopId){
		return $http.post('/WebProject/rest/shops/addReview/'+shopId, {"id":newComment.id, "user":newComment.user, "date":newComment.date,
			  "markPositive":newComment.markPositive,"markNegative":newComment.markNegative, "comment":newComment.comment});

	};
	
	factory.reviewVoteUp = function(reviewId){
		return $http.post('/WebProject/rest/reviews/reviewVoteUp/'+reviewId);
	};
	
	factory.reviewVoteDown = function(reviewId){
		return $http.post('/WebProject/rest/reviews/reviewVoteDown/'+reviewId);
	};
	
	factory.getUserPurchaseShops = function(user){
		return $http.get('/WebProject/rest/purchases/getUserPurchaseShops/'+user);
	};
	
	factory.deleteReview = function(reviewId){
		return $http.delete('/WebProject/rest/reviews/deleteReview/'+reviewId);
	};
	
	factory.changeReview = function(reviewToChange){
		return $http.post('/WebProject/rest/reviews/changeReview', {"id":reviewToChange.id, "user": reviewToChange.user, "date":reviewToChange.date,
																	"markPositive":reviewToChange.markPositive, "markNegative":reviewToChange.markNegative, "comment":reviewToChange.comment});
	};
	
	factory.subFromQuantity = function(name, count){
		return $http.post('/WebProject/rest/products/subFromQuantity/'+name+'/'+count);
	};
	
	factory.getRecommendedProducts = function(loggedUser){
		return $http.get('/WebProject/rest/discounts/getRecommendedProducts/'+loggedUser);
	};
	
	
	return factory;
});