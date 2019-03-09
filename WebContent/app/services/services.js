eCommerce.factory('resourceFactory', function($http){
	var factory = {};
	
	factory.getUsers = function() {
		return $http.get('/WebProject/rest/users/getUsers');
	};
	
	factory.getCategories = function(){
		return $http.get('/WebProject/rest/categories/getCategories');
	}
	
	factory.getReviews = function(){
		return $http.get('/WebProject/rest/reviews/getReviews');
	}
	
	factory.getProducts = function(){
		return $http.get('/WebProject/rest/products/getProducts');
	}
	
	factory.getDeliverers = function(){
		return $http.get('/WebProject/rest/deliverers/getDeliverers');
	}
	
	factory.getShops = function(){
		return $http.get('/WebProject/rest/shops/getShops'); 
	}
	
	factory.getDiscounts = function(){
		return $http.get('/WebProject/rest/discounts/getDiscounts');
	}
	
	factory.getCategoriesString = function(){
		return $http.get('/WebProject/rest/categories/getCategoriesString');
	};
	
	
	return factory;
});