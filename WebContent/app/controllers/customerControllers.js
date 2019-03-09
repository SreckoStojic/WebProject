eCommerce.controller('customersController', function($localStorage,$rootScope,$scope,$location,$uibModal, customersFactory, resourceFactory, prodFilter,shoFilter,$mdDialog, $mdMedia){
	function init(){
		console.log('CustomersController.Init');
		
		if(!$localStorage.loggedUser)
			$location.path('/');
		
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
			
			$rootScope.users.forEach(function(entry){
				if(entry.username.localeCompare($localStorage.loggedUser) == 0){
					if(entry.role != 'CUSTOMER'){
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
			//oni koji su na popustu
			$rootScope.discounts = [];
			resourceFactory.getDiscounts().success(function(d){
				d.forEach(function(entry){
					$rootScope.products.forEach(function(prod){
						if(prod.shopName.localeCompare(entry.shop) == 0){
							if(entry.product){
								if(entry.product.localeCompare(prod.name) == 0){
									var disc={
											"product" : {
												"id" : "",
												 "name" : "",
												 "color" : "",
												 "dimensions" : [],
												 "weight" : null,
												 "country" : "",
												 "producer" : "",
												 "price" : null,
												 "category" : "",
												 "image" : "",
												 "video" : "",
												 "mark" : null,
												 "review" : [],
												 "quantity" : null,
												 "shopName" : ""
											},
											"percent" : null
									};
									disc.product = prod;
									disc.percent = entry.percent;
									disc.start =entry.start;
									disc.end = entry.end;
									($rootScope.discounts).push(disc);
								}
							}
							if(entry.category){
								if(entry.category.localeCompare(prod.category) == 0){
									var disc={
											"product" : {
												"id" : "",
												 "name" : "",
												 "color" : "",
												 "dimensions" : [],
												 "weight" : null,
												 "country" : "",
												 "producer" : "",
												 "price" : null,
												 "category" : "",
												 "image" : "",
												 "video" : "",
												 "mark" : null,
												 "review" : [],
												 "quantity" : null,
												 "shopName" : ""
											},
											"percent" : null
									};
									disc.product = prod;
									disc.percent = entry.percent;
									disc.start =entry.start;
									disc.end = entry.end;
									($rootScope.discounts).push(disc);
								}
							}
						}	
					});
				});
			});
			
			//preporuceni proizvodi
			$rootScope.recommended = [];
			customersFactory.getRecommendedProducts($localStorage.loggedUser).success(function(d){
				d.forEach(function(entry){
					$rootScope.products.forEach(function(prod){
						if(prod.shopName.localeCompare(entry.shop) == 0){
							if(entry.product){
								if(entry.product.localeCompare(prod.name) == 0){
									var disc={
											"product" : {
												"id" : "",
												 "name" : "",
												 "color" : "",
												 "dimensions" : [],
												 "weight" : null,
												 "country" : "",
												 "producer" : "",
												 "price" : null,
												 "category" : "",
												 "image" : "",
												 "video" : "",
												 "mark" : null,
												 "review" : [],
												 "quantity" : null,
												 "shopName" : ""
											},
											"percent" : null
									};
									disc.product = prod;
									disc.percent = entry.percent;
									disc.start =entry.start;
									disc.end = entry.end;
									($rootScope.recommended).push(disc);
								}
							}
							
							if(entry.category){
								if(entry.category.localeCompare(prod.category) == 0){
									var disc={
											"product" : {
												"id" : "",
												 "name" : "",
												 "color" : "",
												 "dimensions" : [],
												 "weight" : null,
												 "country" : "",
												 "producer" : "",
												 "price" : null,
												 "category" : "",
												 "image" : "",
												 "video" : "",
												 "mark" : null,
												 "review" : [],
												 "quantity" : null,
												 "shopName" : ""
											},
											"percent" : null
									};
									disc.product = prod;
									disc.percent = entry.percent;
									disc.start =entry.start;
									disc.end = entry.end;
									($rootScope.recommended).push(disc);
								}
								
							}
						}
					});
				});
			});
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		resourceFactory.getShops().success(function(data){
			$rootScope.shops = data;
		});
		
		customersFactory.getUserPurchaseShops($localStorage.loggedUser).success(function(data){
			$rootScope.userPurchaseShops = data;					//prodavnice u kojima je kupac kupovao
		});
		
		
		
		resourceFactory.getShops().success(function(data){
			$rootScope.shops = data;
			$rootScope.enabledDeliverers = {};
			//inicijalizacija dozvoljenih dostavljaca za svaku prodavnicu
			$rootScope.shops.forEach(function(entry){
				var name = entry.name;
				customersFactory.getEnabledDeliverers(name,$localStorage.loggedUser).success(function(data){
					$rootScope.enabledDeliverers[name] = data;
				});
			});
		});
		
		$scope.shoppingCart = $localStorage.customers[$localStorage.loggedUser];
		$scope.userWishlist = $localStorage.wishlist[$localStorage.loggedUser];
		//provjera da li ima proizvoda koji su u wishlist a da su na akciji
		resourceFactory.getDiscounts().success(function(data){
			if($localStorage.loggedUser){
				data.forEach(function(entry){
					if($localStorage.wishlist[$localStorage.loggedUser]){
						($localStorage.wishlist[$localStorage.loggedUser]).forEach(function(prod){
							if(entry.shop.localeCompare(prod.shopName) == 0){
								var n = Date.now();
								if(entry.category){
									if(entry.category.localeCompare(prod.category) == 0){
										if(n>entry.start && n<entry.end){
											toast("Some products in your wishlist are on SALE!");
										}
									}
								}
								if(entry.product){
									if(entry.product.localeCompare(prod.name) == 0){
										if(n>entry.start && n<entry.end){
											toast("Some products in your wishlist are on SALE!");
										}
									}
								}
							}
						});
					}
				});
			}
		});
	} 
	
	init();
	
	$scope.logOut = function(){
		$localStorage.loggedUser = null;
		$location.path('/');
	};
	
	$scope.addProductToWishlist = function(product){
		var flag = 0;				//da li je vec u wishlist
		$localStorage.wishlist[$localStorage.loggedUser].forEach(function(entry){
			if(entry.id.localeCompare(product.id) == 0){
				flag = 1;
				toast("This product is already in your wishlist!");
			}
		});
		
		if(flag == 0){
			toast("You added product to wishlist!");
			($localStorage.wishlist[$localStorage.loggedUser]).push(product);
			init();
		}
		
		//provjera da li je na akciji
		resourceFactory.getDiscounts().success(function(data){
			data.forEach(function(entry){
				if(entry.shop.localeCompare(product.shopName) == 0){
					if(entry.category){
						if(entry.category.localeCompare(product.category) == 0){
							var n = Date.now();
							if(n>entry.start && n<entry.end){
								toast("This product is on SALE!");
							}
						}
					}
					if(entry.product){
						if(entry.product.localeCompare(product.name) == 0){
							var n = Date.now();
							if(n>entry.start && n<entry.end){
								toast("This product is on SALE!");
							}
						}
					}
				}
			});
		});
		
	};
	
	
	
	$scope.addProductToCart = function(product, productInSC){
		if(productInSC){
			productInSC.productName = product.name;
			productInSC.tax = product.price/100*18 * productInSC.count;
			productInSC.weight = product.weight;
			productInSC.price = product.price;
			var flag = 0; //da li postoji u shopping cart ta ptodavnica
			var flag2 = 0; //da li u prodavnici u SC psootoji taj proizvod
			$localStorage.customers[$localStorage.loggedUser].forEach(function(entry){
				if(entry.shopName.localeCompare(product.shopName) == 0){				//vraca 0 ako je tacno
					entry.products.forEach(function(prod,index,err){
						if(prod.productName.localeCompare(productInSC.productName) == 0){
							entry.transferPrice *= product.weight* Number(productInSC.count);		//promjena cijene prevoza
							entry.totalPrice += product.price* Number(productInSC.count);			//promjena ukupne cijene
							prod.count = Number(prod.count) + Number(productInSC.count);
							prod.tax = product.price/100*18 * prod.count;
							flag2=1;
						}
					});
					if(flag2 == 0){
						(entry.products).push(productInSC);			//dodavanje proizvoda
						entry.transferPrice *= product.weight* Number(productInSC.count);		//promjena cijene prevoza
						entry.totalPrice += product.price* Number(productInSC.count);			//promjena ukupne cijene
					}
					flag = 1;
					flag2 = 0;
				}							
			});
			
			if(flag == 0){
				var scItem = {
					shopName : 	product.shopName,
					products : [],
					delivererName : null,
					transferDuration : null,					//kad se izabere deliverer onda se mnozi sa koeficijentom i odredjuje trajanje pprenosa
					transferPrice : product.weight* Number(productInSC.count),
					totalPrice : product.price* Number(productInSC.count)
				};
				scItem.products.push(productInSC);
				
				($localStorage.customers[$localStorage.loggedUser]).push(scItem);
			}
			
			flag = 0;
			
			init();
			toast("Product added to your shopping cart!!");
			
			//provjera ako ima u wishlist da se brise
			var num = -1;
			$localStorage.wishlist[$localStorage.loggedUser].forEach(function(entry,i,e){
				if(entry.id.localeCompare(product.id) == 0){
					num = i;
				}
			});
			
			if(num != -1){
				($localStorage.wishlist[$localStorage.loggedUser]).splice(num,1);
				init();
			}
		}else{
			toast("Enter count od product!");
		}
		
	};
	
	//za dodavanje proizvoda koji je na popustu u shopping cart
	$scope.addDiscountProductToCart = function(discount, productInSC){
		var n = Date.now();
		if(n>discount.start && n<discount.end){
			var product = discount.product;
			product.price = product.price/100*(100-discount.percent);		//uracunavam popust u cijenu
			if(productInSC){
				productInSC.productName = product.name;
				productInSC.tax = product.price/100*18 * productInSC.count;
				productInSC.weight = product.weight;
				productInSC.price = product.price;
				var flag = 0; //da li postoji u shopping cart ta ptodavnica
				var flag2 = 0; //da li u prodavnici u SC psootoji taj proizvod
				$localStorage.customers[$localStorage.loggedUser].forEach(function(entry){
					if(entry.shopName.localeCompare(product.shopName) == 0){				//vraca 0 ako je tacno
						entry.products.forEach(function(prod,index,err){
							if(prod.productName.localeCompare(productInSC.productName) == 0){
								entry.transferPrice *= product.weight* Number(productInSC.count);		//promjena cijene prevoza
								entry.totalPrice += product.price* Number(productInSC.count);			//promjena ukupne cijene
								prod.count = Number(prod.count) + Number(productInSC.count);
								prod.tax = product.price/100*18 * prod.count;
								flag2=1;
							}
						});
						if(flag2 == 0){
							(entry.products).push(productInSC);			//dodavanje proizvoda
							entry.transferPrice *= product.weight* Number(productInSC.count);		//promjena cijene prevoza
							entry.totalPrice += product.price* Number(productInSC.count);			//promjena ukupne cijene
						}
						flag = 1;
						flag2 = 0;
					}							
				});
				
				if(flag == 0){
					var scItem = {
						shopName : 	product.shopName,
						products : [],
						delivererName : null,
						transferDuration : null,					//kad se izabere deliverer onda se mnozi sa koeficijentom i odredjuje trajanje pprenosa
						transferPrice : product.weight* Number(productInSC.count),
						totalPrice : product.price* Number(productInSC.count)
					};
					scItem.products.push(productInSC);
					
					($localStorage.customers[$localStorage.loggedUser]).push(scItem);
				}
				
				flag = 0;
				
				init();
				toast("Product added to your shopping cart!!");
				
				//provjera ako ima u wishlist da se brise
				var num = -1;
				$localStorage.wishlist[$localStorage.loggedUser].forEach(function(entry,i,e){
					if(entry.id.localeCompare(product.id) == 0){
						num = i;
					}
				});
				
				if(num != -1){
					($localStorage.wishlist[$localStorage.loggedUser]).splice(num,1);
					init();
				}
			}else{
				toast("Enter count od product!");
			}
		}else{
			toast("This product is not on SALE at this momment!");
		}
		
	};
	
	//brisanje proizvoda is shoping carta
	$scope.removeProductFromSC = function(product,shopName){
		if(product){
			var num;
			var removeShop = -1;
			$localStorage.customers[$localStorage.loggedUser].forEach(function(entry,i,e){
				if(entry.shopName.localeCompare(shopName) == 0){
					entry.products.forEach(function(prod,index,arr){
						if(prod.productName.localeCompare(product.productName) == 0){
							num = index;
						}
					});
					entry.products.splice(num,1);
					entry.transferPrice /= (product.weight*product.count);
					entry.totalPrice -= Number(product.price) * Number(product.count);
					
				}
				
				if(entry.totalPrice <= 0){
					removeShop = i;
				}
			});
			
			if(removeShop != -1){
				$localStorage.customers[$localStorage.loggedUser].splice(removeShop,1);
			}
			
			
			init();
			toast("Product removed from your shopping cart!!");
		}else{
			toast("Failed!");
		}
	};
	
	$scope.makePurchase = function(shoppingCart){
		var flag = true;
		shoppingCart.forEach(function(entry){
			if(entry.delivererName){
			if(!(entry.delivererName != "")){
				if((entry.deliveryName.localeCompare("Deliverer")) == 0)
					flag = false;
			}
			}else flag = false;
				
		});
		if(flag){
			var addP = true;								//da li da se izvrsi kupovina
			shoppingCart.forEach(function(entry){
				(entry.products).forEach(function(data){
					var count = data.count;
					var name = data.productName;
					($rootScope.products).forEach(function(prod){
						if(prod.name.localeCompare(name) == 0){
							if(prod.quantity < count){
								toast("There is not enough products in shop.");
								addP = false;
							}
							}
						}
						
					);
				});
			});
			
			if(addP){
				//smanjuje se broj  na stanju u modelu
				shoppingCart.forEach(function(entry){
					(entry.products).forEach(function(data){
						var count = data.count;
						var name = data.productName;
						customersFactory.subFromQuantity(name, count).success(function(d){
							
						});
					});
				});
				//dodavanje kupovine
				shoppingCart.forEach(function(entry){
					entry.transferDuration = 3;												//bezveze konstanta
					var purchase = {
							id : "",
							usename : "",
							shoppingCartItem : ""
							
					};
					purchase.username = $localStorage.loggedUser;
					var n = Date.now();
					purchase.id = purchase.username + n + entry.shopName;
					purchase.shoppingCartItem = entry;
					customersFactory.addPurchase(purchase).success(function(data){
						if(data){
							toast("Failed to add purchase!");
						}else{
							toast("Purchase added!");
							init();
						}
					});
				});
				
				$localStorage.customers[$localStorage.loggedUser] = [];
				$scope.shoppingCart = $localStorage.customers[$localStorage.loggedUser];
			}

		}else{
			alert("Enter deliverers");
		}
	}
	
	$scope.openShowProduct = function(product){
		$rootScope.productToShow = product;
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
	    $mdDialog.show({
	      controller: 'ModalShowProductCtrl',
	      templateUrl: 'showProduct.html',
	      parent: angular.element(document.body),
	      
	      clickOutsideToClose:true,
	      fullscreen: useFullScreen
	    })
	};
	
	$scope.openShopReviews = function(shop){
		$rootScope.shopToShow = shop;
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
	    $mdDialog.show({
	      controller: 'ModalShopReviewsCtrl',
	      templateUrl: 'shopReviewsModal.html',
	      parent: angular.element(document.body),
	      
	      clickOutsideToClose:true,
	      fullscreen: useFullScreen
	    })
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




//kontroler za modalni za prikaz proizvoda
eCommerce.controller('ModalShowProductCtrl',function($localStorage,$rootScope,$scope, $location, customersFactory, resourceFactory,$mdDialog, $mdMedia){
	function init(){
		
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
		});
		
		resourceFactory.getCategories().success(function(data){
			$rootScope.categories = data;
		});
		
		resourceFactory.getReviews().success(function(data){
			$rootScope.reviews = data;
			$scope.shopReviews = [];
			
			($rootScope.reviews).forEach(function(entry) {
				$rootScope.productToShow.review.forEach(function(data){
					if(data.localeCompare(entry.id) == 0)
						$scope.shopReviews.push(entry);
				});
			});
			
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
		
		$scope.productToShow = $rootScope.productToShow;
		$scope.newComment = {
				"id":"",
				"user":"",
				"date":null,
				"mark":1,
				"comment":""
		};
	}
	
	init();
	
	$scope.cancel = function () {
		$mdDialog.cancel();
	  };
	  
	 $scope.rateProduct = function(productId, mark){
		customersFactory.rateProduct(productId, mark).success(function(data){
			
			if(data){
				toast("Failed to rate!");
			}else{
				toast("You rated this product!");
				init();
				
				if($scope.productToShow.mark == 0){
					$scope.productToShow.mark = mark;
				}else{
					$scope.productToShow.mark = ($scope.productToShow.mark + mark)/2;
					
				}
			};
		}) ;
	 };
	 
	 $scope.addComment = function(newComment, productToShow){
		var n = Date.now();
		newComment.date = n;
		newComment.id = $localStorage.loggedUser + n;
		newComment.user = $localStorage.loggedUser;
		customersFactory.addCommentToReviews(newComment).success(function(data){
			if(data){
				toast("Failed to comment!");
			}else{
				toast("You sent review!");
			}
		});
		
		customersFactory.addCommentToProduct(newComment, productToShow.id).success(function(data){
			if(data){
				toast("Failed to comment!");
			}else{
				toast("You sent review!");
				
			}
		});
		
		$rootScope.productToShow.review.push(newComment.id);
		init();
	 };
	  
	 $scope.reviewVoteUp = function(reviewId){
		 customersFactory.reviewVoteUp(reviewId).success(function(data){
			 if(data){
					toast("Failed to rate!");
				}else{
					toast("You rated review!");
					init();
				}
		 });
		 
	 };
	 
	 $scope.reviewVoteDown = function(reviewId){
		 customersFactory.reviewVoteDown(reviewId).success(function(data){
			 if(data){
					toast("Failed to rate!");
				}else{
					toast("You rated review!");
					init();
				}
		 });
		 
	 };
	 
	 $scope.deleteReview = function(review){
		if($localStorage.loggedUser.localeCompare(review.user) == 0){
			customersFactory.deleteReview(review.id).success(function(data){
				if(data){
					toast("Failed to delete!");
				}else{
					toast("You deleted review!");
					init();
				}
			});
		} else{
			toast("You cannot delete this comment! It is posted by another user!")
		}
	 };
	 
	 $scope.openChangeReview = function(rev){
		 	if($localStorage.loggedUser.localeCompare(rev.user) != 0){
		 		toast("You cannot change this comment! It is posted by another user!");
		 	}else{
		 
			 	$rootScope.reviewToChange = rev;
				$mdDialog.show({
					templateUrl : 'changeReview.html',
					controller : 'ModalChangeReviewCtrl',
				    clickOutsideToClose:true
				}).then(function (review) {
					
				}, function () {
					
				});
		 	}
		};
});

//kontroler za modalni za review prodavnice
eCommerce.controller('ModalShopReviewsCtrl',function($localStorage,$rootScope,$scope, $location, customersFactory, resourceFactory,$mdDialog, $mdMedia){
	function init(){
		
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
		});
		
		resourceFactory.getCategories().success(function(data){
			$rootScope.categories = data;
		});
		
		resourceFactory.getReviews().success(function(data){
			$rootScope.reviews = data;
			
			$scope.shopReviews = [];
			
			($rootScope.reviews).forEach(function(entry) {
				$rootScope.shopToShow.review.forEach(function(data){
					if(data.localeCompare(entry.id) == 0)
						$scope.shopReviews.push(entry);
				});
			});
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
		
		$scope.userPurchaseShops = $rootScope.userPurchaseShops;
		
		$scope.shopToShow = $rootScope.shopToShow;
		
		$scope.show = false;
		($scope.userPurchaseShops).forEach(function(data){
			if(data.localeCompare($rootScope.shopToShow.name) == 0){
				$scope.show = true;
			}
		});
		
		$scope.newComment = {
				"id":"",
				"user":"",
				"date":null,
				"mark":1,
				"comment":""
		};
	}
	
	init();
	
	$scope.cancel = function () {
		$mdDialog.cancel();
	  };
	  
	  
	  $scope.addComment = function(newComment, shopToShow){
			var n = Date.now();
			newComment.date = n;
			newComment.id = $localStorage.loggedUser + n;
			newComment.user = $localStorage.loggedUser;
			customersFactory.addCommentToReviews(newComment).success(function(data){
				if(data){
					toast("Failed to comment!");
				}else{
					toast("You sent review!");
				}
			});
			
			customersFactory.addCommentToShop(newComment, shopToShow.id).success(function(data){
				if(data){
					toast("Failed to comment!");
				}else{
					toast("You sent review!");
					
				}
			});
			
			$rootScope.shopToShow.review.push(newComment.id);
			init();
		 };
		 
		 $scope.reviewVoteUp = function(reviewId){
			 customersFactory.reviewVoteUp(reviewId).success(function(data){
				 if(data){
						toast("Failed to rate!");
					}else{
						toast("You rated review!");
						init();
					}
			 });
			 
		 };
		 
		 $scope.reviewVoteDown = function(reviewId){
			 customersFactory.reviewVoteDown(reviewId).success(function(data){
				 if(data){
						toast("Failed to rate!");
					}else{
						toast("You rated review!");
						init();
					}
			 });
			 
		 };
		 
		 $scope.rateShop = function(shopName, mark){
				customersFactory.rateShop(shopName, mark).success(function(data){
					
					if(data){
						toast("Failed to rate!");
					}else{
						toast("You rated this shop!");
						init();
						
						if($scope.shopToShow.mark == 0){
							$scope.shopToShow.mark = mark;
						}else{
							$scope.shopToShow.mark = ($scope.shopToShow.mark + mark)/2;
							
						}
					};
				}) ;
		 }; 
		 
		 $scope.deleteReview = function(review){
				if($localStorage.loggedUser.localeCompare(review.user) == 0){
					customersFactory.deleteReview(review.id).success(function(data){
						if(data){
							toast("Failed to delete!");
						}else{
							toast("You deleted review!");
							init();
						}
					});
				} else{
					toast("You cannot delete this comment! It is posted by another user!")
				}
			 };
			 
			 $scope.openChangeReview = function(rev){
				 	if($localStorage.loggedUser.localeCompare(rev.user) != 0){
				 		toast("You cannot change this comment! It is posted by another user!");
				 	}else{
				 
					 	$rootScope.reviewToChange = rev;
						$mdDialog.show({
							templateUrl : 'changeReview.html',
							controller : 'ModalChangeReviewCtrl',
						    clickOutsideToClose:true
						}).then(function (review) {
							
						}, function () {
							
						});
				 	}
				};
	
});

//kontroler za modalni za filter proizvoda
eCommerce.controller('ModalFilterProductsCtrl',function($localStorage,$rootScope,$scope, $location, customersFactory, resourceFactory,$mdDialog, $mdMedia){
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
		
		resourceFactory.getCategoriesString().success(function(data){
			$scope.categoriesString = data;
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
		
		
	}
	
	init();
	
	$scope.cancel = function () {
	    $mdDialog.cancel();
	  };
	  
	  
	$scope.filterProducts = function(filter){
		// TODO
		$mdDialog.hide(filter);
	};
	
	$scope.resetFilter = function(filter){
		filter = {
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
		
		$mdDialog.hide(filter);
	};
});

//kontroler za modalni za filter prodavnica
eCommerce.controller('ModalFilterShopsCtrl',function($localStorage,$rootScope,$scope, $location, customersFactory, resourceFactory,$mdDialog, $mdMedia){
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
		
		resourceFactory.getCategoriesString().success(function(data){
			$scope.categoriesString = data;
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
		
		
	}
	
	init();
	
	$scope.cancel = function () {
	    $mdDialog.cancel();
	  };
	  
	  
	$scope.filterShops = function(filter){
		// TODO
		$mdDialog.hide(filter);
	};
	
	$scope.resetFilter = function(filter){
		filter = {
				name : "",
				mark : 0,
				country : "",
				flag : true
		};
		
		$mdDialog.hide(filter);
	};
	
});

//kontroler za modalni za promjenu komentara
eCommerce.controller('ModalChangeReviewCtrl',function($localStorage,$rootScope,$scope, $location, customersFactory, resourceFactory,$mdDialog, $mdMedia){
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
		
		resourceFactory.getCategoriesString().success(function(data){
			$scope.categoriesString = data;
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
		
		
	}
	
	init();
	
	$scope.cancel = function () {
	    $mdDialog.cancel();
	  };
	  
	$scope.apply = function(reviewToChange){
		$rootScope.reviewToChange.comment = reviewToChange.comment;
		customersFactory.changeReview($rootScope.reviewToChange).success(function(data){
			if(data){
				toast("Failed to change!");
			}else{
				toast("You changed this review!");
				init();
			}
			
			$mdDialog.cancel();
		});
	};
	
	
});