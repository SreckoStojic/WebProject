//filter za proizvode
eCommerce.filter('prod', function(){
	return function(input, filter){
		var out = [];
		if (filter.flag) {
			return input;
		}
		
		angular.forEach(input, function(product){
			var temp = true;
			if(filter.name){
				if(filter.name.localeCompare(product.name) != 0){
					temp = false;
				}
			}
			
			if(filter.priceFrom && filter.priceTo){
				if(filter.priceFrom > product.price || filter.priceTo <product.price){
					temp = false;
				}
			}
			
			if(filter.category){
				if(filter.category.localeCompare(product.category) != 0){
					temp=false;
				}
			}
			
			if(filter.country){
				if(filter.country.localeCompare(product.country) != 0){
					temp = false;
				}
			}
			
			if(filter.color){
				if(filter.color.localeCompare(product.color) != 0){
					temp = false;
				}
			}
			
			if(filter.mark){
				if(filter.mark != product.mark){
					temp = false;
				}
			}
			
			if(filter.quantity){
				if(filter.quantity != product.quantity){
					temp = false;
				}
			}
			
			if(filter.reviewNumber){
				if(filter.reviewNumber != product.review.length){
					temp = false;
				}
			}
			
			
			if(temp)
				out.push(product);
			
		});
		return out;
	}
});

//shop filter
eCommerce.filter('sho', function(){
	return function(input, filter){
		var out = [];
		if(filter.flag){
			return input;
		}
		
		angular.forEach(input, function(shop){
			var temp = true;
			
			if(filter.name){
				if(filter.name.localeCompare(shop.name) != 0){
					temp = false;
				}
			}
			
			if(filter.mark){
				if(filter.mark != shop.mark){
					temp = false;
				}
			}
			
			if(filter.country){
				if(filter.country.localeCompare(shop.country) != 0){
					return false;
				}
			}
			
			if(temp)
				out.push(shop);
			
		});
		
		return out;
	}
});