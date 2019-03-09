eCommerce.factory('adminsFactory', function($http){
	var factory = {};
	
	factory.getCategoriesString = function(){
		return $http.get('/WebProject/rest/categories/getCategoriesString');
	};
	
	factory.getShopsString = function(){
		return $http.get('/WebProject/rest/shops/getShopsString');
	};
	
	factory.getManagersString = function(){
		return $http.get('/WebProject/rest/users/getManagersString'); 
	};
	
	factory.addProduct = function(product){
		return $http.post('/WebProject/rest/products/addProduct', {"id":product.id, "name":product.name,
																	"color":product.color, "dimensions":[product.dimensions[0], product.dimensions[1], product.dimensions[2]],
																	"weight":product.weight, "country":product.country,
																	"producer":product.producer, "price":product.price,
																	"category":product.category, "image":product.image,
																	"video":product.video, "mark":product.mark,
																	"review":product.review, "quantity":product.quantity, "shopName":product.shopName});
	};
	
	factory.deleteProduct = function(productId){
		return $http.delete('/WebProject/rest/products/deleteProduct/' + productId);
	};
	
	factory.changeProduct = function(product){
		return $http.post('/WebProject/rest/products/changeProduct', {"id":product.id, "name":product.name,
																	"color":product.color, "dimensions":[product.dimensions[0], product.dimensions[1], product.dimensions[2]],
																	"weight":product.weight, "country":product.country,
																	"producer":product.producer, "price":product.price,
								 	 								"category":product.category, "image":product.image,
																	"video":product.video, "mark":product.mark,
																	"review":product.review, "quantity":product.quantity, "shopName":product.shopName});
	};
	
	factory.addCategory = function(category){
		return $http.post('/WebProject/rest/categories/addCategory', {"name":category.name, "description":category.description, "subcategory":category.subcategory});
	};
	
	factory.deleteCategory = function(categoryName){
		return $http.delete('/WebProject/rest/categories/deleteCategory/'+categoryName);
	};
	
	factory.changeCategory = function(category){
		return $http.post('/WebProject/rest/categories/changeCategory', {"name":category.name, "description":category.description, "subcategory":category.subcategory});
	};
	
	factory.addDeliverer = function(deliverer){
		return $http.post('/WebProject/rest/deliverers/addDeliverer', {"id":deliverer.id, "name":deliverer.name, "description":deliverer.description, "country":deliverer.country, "deliverPrice":deliverer.deliverPrice});
	};
	
	factory.deleteDeliverer = function(delivererId){
		return $http.delete('/WebProject/rest/deliverers/deleteDeliverer/'+delivererId);
	};
	
	factory.changeDeliverer = function(deliverer){
		return $http.post('/WebProject/rest/deliverers/changeDeliverer',  {"id":deliverer.id, "name":deliverer.name, "description":deliverer.description, "country":deliverer.country, "deliverPrice":deliverer.deliverPrice});
	};
	
	factory.addShop = function(shop){
		return $http.post('/WebProject/rest/shops/addShop', {"id" : shop.id, "name" : shop.name, "address" : shop.address, "country" : shop.country,
															 "contact" : shop.contact, "email" : shop.email, "manager" : shop.manager, "mark" : shop.mark, "review" : shop.review});
	};
	
	factory.deleteShop = function(shopId){
		return $http.delete('/WebProject/rest/shops/deleteShop/'+shopId);
	};
	
	factory.changeShop = function(shop){
		return $http.post('/WebProject/rest/shops/changeShop', {"id" : shop.id, "name" : shop.name, "address" : shop.address, "country" : shop.country,
																"contact" : shop.contact, "email" : shop.email, "manager" : shop.manager, "mark" : shop.mark, "review" : shop.review});
	};
	
	factory.deleteReview = function(reviewId){
		return $http.delete('/WebProject/rest/reviews/deleteReview/'+reviewId);
	};
	
	
	return factory;
});