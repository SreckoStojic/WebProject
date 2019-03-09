eCommerce.factory('managersFactory', function($http){
	var factory = {};
	
	factory.getManagersProducts = function(user){
		return $http.get('/WebProject/rest/products/' + user);
	};
	
	factory.getManagersProductsString = function(user){
		return $http.get('/WebProject/rest/products/getManagersProductsString/'+user);
	};
	
	factory.getCategoriesString = function(){
		return $http.get('/WebProject/rest/categories/getCategoriesString');
	};
	
	factory.getManagerShops = function(user){
		return $http.get('/WebProject/rest/shops/getManagerShops/'+user);
	};
	
	factory.getManagerShopsString = function(user){
		return $http.get('/WebProject/rest/shops/getManagerShopsString/'+user);
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
	
	factory.changeShop = function(shop){
		return $http.post('/WebProject/rest/shops/changeShop', {"id" : shop.id, "name" : shop.name, "address" : shop.address, "country" : shop.country,
																"contact" : shop.contact, "email" : shop.email, "manager" : shop.manager, "mark" : shop.mark, "review" : shop.review});
	};
	
	factory.getDiscountsManager = function(user){
		return $http.get('/WebProject/rest/discounts/getDiscountsManager/'+user);
	};
	
	factory.addDiscount = function(discount){
		return $http.post('/WebProject/rest/discounts/addDiscount', {"id":discount.id, "start":discount.start, "end":discount.end,
																	 "percent":discount.percent, "categoryDiscount":discount.categoryDiscount,
																	 "product":discount.product, "category":discount.category,
																	 "shop":discount.shop});
	};
	
	factory.deleteDiscount = function(discountId){
		return $http.delete('/WebProject/rest/discounts/deleteDiscount/'+discountId);
	};
	
	
	
	return factory;
});