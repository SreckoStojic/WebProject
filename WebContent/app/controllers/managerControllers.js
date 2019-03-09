eCommerce.controller('managersController', function($localStorage,$rootScope,$scope, $uibModal,$location, managersFactory, resourceFactory,shoFilter, $mdDialog, $mdMedia){
	function init(){
		console.log('ManagerController.Init');
		
		if(!$localStorage.loggedUser)
			$location.path('/');
		
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
			
			$rootScope.users.forEach(function(entry){
				if(entry.username.localeCompare($localStorage.loggedUser) == 0){
					if(entry.role != 'MANAGER'){
						$location.path('/');
					}
				}
			});
		});
		
		resourceFactory.getCategories().success(function(data){
			$rootScope.categories = data;
		});
		
		resourceFactory.getReviews().success(function(data){
			$rootScope.reviews = data;
		});
		
		$scope.prFilter = {
				name:"",
				country:"",
				priceFrom:0,
				priceTo :0,
				mark:0,
				quantity:0,
				reviewNumber:0,
				category : "",
				flag : true
		};
		
		$scope.shFilter= {
				name : "",
				mark : 0,
				country : "",
				flag : true
		};
		
		resourceFactory.getProducts().success(function(data){
			$rootScope.products = data;
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		resourceFactory.getShops().success(function(data){
			$rootScope.shops = data;
		});
		
		managersFactory.getDiscountsManager($localStorage.loggedUser).success(function(data){
			$rootScope.managersDiscounts = data;
		});
		
		
		managersFactory.getManagersProducts($localStorage.loggedUser).success(function(data){
			$rootScope.managersProducts = data;
		});
		
		managersFactory.getManagerShops($localStorage.loggedUser).success(function(data){
			$rootScope.managersShops = data;
		});
		
		
	}

	init();
	
	$scope.logOut = function(){
		$localStorage.loggedUser = null;
		$location.path('/');
	};
	
	$scope.openNewProductDialog = function(){
		$uibModal.open({
			templateUrl : 'newProductModal.html',
			controller : 'ModalNewProductCtrlManager',
		});
	};
	
	$scope.openNewDiscountDialog = function(){
		$uibModal.open({
			templateUrl : 'newDiscountModal.html',
			controller : 'ModalNewDiscountCtrlManager'
		});
	};
	
	$scope.deleteProduct = function(productId){
		managersFactory.deleteProduct(productId).success(function(data){
			if(data){
				
				toast("Failed to delete product!")
			}else{
				toast("Product deleted!");
				init();
			}
			
		})
	};
	
	$scope.deleteDiscount = function(discountId){
		managersFactory.deleteDiscount(discountId).success(function(data){
			if(data){
				
				toast("Failed to delete discount!")
			}else{
				toast("Discount deleted!");
				init();
			}
			
		})
	}
	
	$scope.openChangeProductDialog = function(product){
		$rootScope.productToChange = product;
		$uibModal.open({
			templateUrl : 'changeProductModal.html',
			controller : 'ModalChangeProductCtrlManager',
		});
	};
	
	$scope.openChangeShopDialog = function(shop){
		$rootScope.shopToChange = shop;
		$uibModal.open({
			templateUrl : 'changeShopModal.html',
			controller : 'ModalChangeShopCtrlManager',
		});
	};
	
	$scope.openFilterProductsDialog = function(){
		$mdDialog.show({
			templateUrl : 'filterProduct.html',
			controller : 'ModalFilterProductsCtrl',
			parent: angular.element(document.body),
		    clickOutsideToClose:true
		}).then(function (filter) {
			filter.flag = false;
			$scope.prFilter = filter;
			console.log(JSON.stringify(filter));
		}, function () {
			
		});
	};
	
	
	$scope.openFilterShopsDialog = function(){
		$mdDialog.show({
			templateUrl : 'filterShops.html',
			controller : 'ModalFilterShopsCtrl',
			parent: angular.element(document.body),
		    clickOutsideToClose:true
		}).then(function (filter) {
			filter.flag = false;
			$scope.shFilter = filter;
			console.log(JSON.stringify(filter));
		}, function () {
			
		});
	};
});

//kontroler za modalni za novi proizvod
eCommerce.controller('ModalNewProductCtrlManager', function($localStorage,$rootScope,$scope, $uibModalInstance, $location, managersFactory, resourceFactory, Upload){
	function init(){
		managersFactory.getManagerShopsString($localStorage.loggedUser).success(function(data){
			$scope.shopsString = data;
		});
		managersFactory.getCategoriesString().success(function(data){
			$scope.categoriesString = data;
		});
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
		});
		
		resourceFactory.getCategories().success(function(data){
			$rootScope.categories = data;
		});
		
		resourceFactory.getReviews().success(function(data){
			$rootScope.reviews = data;
		});
		
		resourceFactory.getProducts().success(function(data){
			$rootScope.products = data;
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		resourceFactory.getShops().success(function(data){
			$rootScope.shops = data;
		});
		managersFactory.getDiscountsManager($localStorage.loggedUser).success(function(data){
			$rootScope.managersDiscounts = data;
		});
		
		
		managersFactory.getManagersProducts($localStorage.loggedUser).success(function(data){
			$rootScope.managersProducts = data;
		});
		
		managersFactory.getManagerShops($localStorage.loggedUser).success(function(data){
			$rootScope.managersShops = data;
		});
		
		
	}
	
	init();
	
	$scope.addProduct = function(newProduct){
		if(newProduct && newProduct.id && newProduct.name && newProduct.color && newProduct.country && newProduct.producer && newProduct.category && newProduct.shopName){
			var flag = true;
			if(newProduct.id.trim() != "" && newProduct.name.trim()!= "" && newProduct.color!=null
			   &&  newProduct.country.trim()!= "" && newProduct.producer.trim()!= "" && newProduct.category!= "" &&  newProduct.shopName!= "" ){
				if(isNaN(newProduct.dimensions[0])){
					flag = false;
				}else if(newProduct.dimensions[0]<0){
					flag = false;
				}
				
				if(isNaN(newProduct.dimensions[1])){
					flag = false;
				}else if(newProduct.dimensions[1]<0){
					flag = false;
				}
				
				if(isNaN(newProduct.dimensions[2])){
					flag = false;
				}else if(newProduct.dimensions[2]<0){
					flag = false;
				}
				
				if(isNaN(newProduct.weight)){
					flag = false;
				}else if(newProduct.weight < 0){
					flag = false;
				}
				
				if(isNaN(newProduct.price)){
					flag = false;
				}else if(newProduct.price < 0){
					flag = false;
				}
				
				if(isNaN(newProduct.mark)){
					flag = false;
				}else if(newProduct.mark < 0){
					flag = false;
				}
				
				if(isNaN(newProduct.quantity)){
					flag = false;
				}else if(newProduct.quantity < 0){
					flag = false;
				}
			
				if(flag){
						newProduct.review = null;
						
						if ($scope.files && $scope.files.length) {
				            for (var i = 0; i < $scope.files.length; i++) {
				                var file = $scope.files[i];
//				                var extension = file.name.substring(file.name.indexOf('.') + 1);
//				                var newName = $scope.newProduct.name + '_' + $scope.newProduct.images.length;

				                $scope.newProduct.image = ('/WebProject/upload/images/' + file.name);
				                Upload.upload({
				                    url: '/WebProject/rest/upload',
				                    data: {file: file}
				                });
				            }
				        }
				        
				        if($scope.video){
				        	var f = $scope.video;
				        	$scope.newProduct.video = ('/WebProject/upload/images/' + f.name);
				        	Upload.upload({
				        		url: '/WebProject/rest/upload',
				        		data : {f : f}
				        	});
				        }
						
						managersFactory.addProduct(newProduct).success(function(data){
							if(data){
								toast("Product already exists!");
							}else{
								toast("Product successfully added!");
								init();
							}
							
							$uibModalInstance.close();
						});
				}else{
					alert("Please insert valid data!");
				};
			}else{
				alert("Please insert valid data!");
			}
		}else{
			alert("Please insert valid data!");
		}
		
		
	};
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
});

//kontroler za modalni za promjenu proizvoda
eCommerce.controller('ModalChangeProductCtrlManager', function($localStorage,$rootScope, $scope,  $uibModalInstance, $location, managersFactory, resourceFactory){
	function init(){
		managersFactory.getManagerShopsString($localStorage.loggedUser).success(function(data){
			$scope.shopsString = data;
		});
		managersFactory.getCategoriesString().success(function(data){
			$scope.categoriesString = data;
		});
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
		});
		
		resourceFactory.getCategories().success(function(data){
			$rootScope.categories = data;
		});
		
		resourceFactory.getReviews().success(function(data){
			$rootScope.reviews = data;
		});
		
		resourceFactory.getProducts().success(function(data){
			$rootScope.products = data;
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		resourceFactory.getShops().success(function(data){
			$rootScope.shops = data;
		});
		managersFactory.getDiscountsManager($localStorage.loggedUser).success(function(data){
			$rootScope.managersDiscounts = data;
		});
		
		
		managersFactory.getManagersProducts($localStorage.loggedUser).success(function(data){
			$rootScope.managersProducts = data;
		});
		
		managersFactory.getManagerShops($localStorage.loggedUser).success(function(data){
			$rootScope.managersShops = data;
		});
		
		
	}
	
	init();
	
	$scope.changeProduct = function(product){
		if(product  && product.id && product.name && product.color && product.country && product.producer && product.category && product.shopName){
			var flag = true;
			if(product.id.trim() != "" && product.name.trim()!= "" && product.color!=null
			   &&  product.country.trim()!= "" && product.producer.trim()!= "" && product.category!= "" &&  product.shopName!= "" ){
				if(isNaN(product.dimensions[0])){
					flag = false;
				}else if(product.dimensions[0]<0){
					flag = false;
				}
				
				if(isNaN(product.dimensions[1])){
					flag = false;
				}else if(product.dimensions[1]<0){
					flag = false;
				}
				
				if(isNaN(product.dimensions[2])){
					flag = false;
				}else if(product.dimensions[2]<0){
					flag = false;
				}
				
				if(isNaN(product.weight)){
					flag = false;
				}else if(product.weight <= 0){
					flag = false;
				}
				
				if(isNaN(product.price)){
					flag = false;
				}else if(product.price < 0){
					flag = false;
				}
				
				if(isNaN(product.mark)){
					flag = false;
				}else if(product.mark < 0){
					flag = false;
				}
				
				if(isNaN(product.quantity)){
					flag = false;
				}else if(product.quantity < 0){
					flag = false;
				}
			
				if(flag){
						managersFactory.changeProduct(product).success(function(data){
							if(data){
								toast("Failed to change product!")
							}else{
								toast("Product successfully changed");
								init();
							}
							
							$uibModalInstance.close();
						});
				}else{
					alert("Please insert valid data!");
				};
		}else{
			alert("Please insert valid data!");
		}
	}else{
		alert("Please insert valid data!");
	}
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
});

eCommerce.controller('ModalChangeShopCtrlManager', function($localStorage,$rootScope,$scope,  $uibModalInstance, $location, managersFactory, resourceFactory){
	function init(){
		
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
		});
		
		resourceFactory.getCategories().success(function(data){
			$rootScope.categories = data;
		});
		
		resourceFactory.getReviews().success(function(data){
			$rootScope.reviews = data;
		});
		
		resourceFactory.getProducts().success(function(data){
			$rootScope.products = data;
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		resourceFactory.getShops().success(function(data){
			$rootScope.shops = data;
		});
		
		managersFactory.getDiscountsManager($localStorage.loggedUser).success(function(data){
			$rootScope.managersDiscounts = data;
		});
		
		
		managersFactory.getManagersProducts($localStorage.loggedUser).success(function(data){
			$rootScope.managersProducts = data;
		});
		
		managersFactory.getManagerShops($localStorage.loggedUser).success(function(data){
			$rootScope.managersShops = data;
		});
		
		
	}
	
	init();
	
	$scope.changeShop = function(shop){
		if(shop && shop.id && shop.name && shop.address && shop.country && shop.contact && shop.email && shop.manager){
			if(shop.id.trim() != "" && shop.name.trim() != "" && shop.address.trim() != "" && shop.country.trim() != "" && shop.contact.trim() != "" 
				&& shop.email.trim() != "" && shop.manager.trim() != ""){
					managersFactory.changeShop(shop).success(function(data){
						if(data){
							toast("Failed to change shop!");
						}else{
							toast("Shop successfully changed!");
							init();
						}
						
						$uibModalInstance.close();
					});
			}else{
				alert("Please enter valid data!");
			}
		}else{
			alert("Please enter valid data!");
		}
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
	
});

//kontroler za modalni za novu akciju
eCommerce.controller('ModalNewDiscountCtrlManager', function($localStorage,$rootScope,$scope, $uibModalInstance, $location, managersFactory, resourceFactory){
	function init(){
		managersFactory.getManagerShopsString($localStorage.loggedUser).success(function(data){
			$scope.shopsString = data;
		});
		managersFactory.getManagersProductsString($localStorage.loggedUser).success(function(data){
			$rootScope.managersProductsString = data;
		});
		managersFactory.getCategoriesString().success(function(data){
			$scope.categoriesString = data;
		});
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
		});
		
		resourceFactory.getCategories().success(function(data){
			$rootScope.categories = data;
		});
		
		resourceFactory.getReviews().success(function(data){
			$rootScope.reviews = data;
		});
		
		resourceFactory.getProducts().success(function(data){
			$rootScope.products = data;
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		resourceFactory.getShops().success(function(data){
			$rootScope.shops = data;
		});
		managersFactory.getDiscountsManager($localStorage.loggedUser).success(function(data){
			$rootScope.managersDiscounts = data;
		});
		
		
		managersFactory.getManagersProducts($localStorage.loggedUser).success(function(data){
			$rootScope.managersProducts = data;
		});
		
		managersFactory.getManagerShops($localStorage.loggedUser).success(function(data){
			$rootScope.managersShops = data;
		});
		
		
	}
	
	init();
	
	$scope.addDiscount = function(newDiscount){
		
			if(newDiscount && newDiscount.id && newDiscount.shop && newDiscount.categoryDiscount ){
				if(newDiscount.category || newDiscount.product){
					if(newDiscount.id != "" && newDiscount.shop != ""){
						var flag = true;
						if(isNaN(newDiscount.start)){
							flag = false;
						}else if(newDiscount.start < 0){
							flag = false;
						}
						
						if(isNaN(newDiscount.end)){
							flag = false;
						}else if(newDiscount.end < 0){
							flag = false;
						}
						
						if(isNaN(newDiscount.percent)){
							flag = false;
						}else if(newDiscount.percent < 0){
							flag = false;
						}
						
						if(!( newDiscount.category != "" || newDiscount.product != ""))
							flag = false;
						if(flag){
							managersFactory.addDiscount(newDiscount).success(function(data){
								if(data){
									toast("Discount already exists!");
								}else{
									toast("Discount successfully added!");
									init(); 
								}
							
								$uibModalInstance.close();
							});
						}else{
							alert("Please enter valid data!");
						}
						
					}else{
						alert("Please enter valid data!");
					}
				}else{
					alert("Please enter valid data!");
				}
				
				
			}else{
				alert("Please enter valid data!");
			}
			
		
		
	};
	
	$scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
});