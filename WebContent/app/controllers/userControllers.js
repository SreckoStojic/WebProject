eCommerce.controller('usersController', function($localStorage,$rootScope, $scope, $uibModal, $location, usersFactory, resourceFactory){
	function init(){
		console.log('UsersController.Init');
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
			
			if($localStorage.customers == null){
				$localStorage.customers = {};
			}
			$rootScope.users.forEach(function(entry){
				if(entry.role == 'CUSTOMER'){
					if($localStorage.customers[entry.username] == null)
						{
							var shoppingCart = [];
							$localStorage.customers[entry.username] = shoppingCart;
						}
				}
			});
			
			if($localStorage.wishlist == null){
				$localStorage.wishlist = {};
			}
			$rootScope.users.forEach(function(entry){
				if(entry.role == 'CUSTOMER'){
					if($localStorage.wishlist[entry.username] == null){
						var wish = [];
						$localStorage.wishlist[entry.username] = wish;
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
		
		resourceFactory.getProducts().success(function(data){
			$rootScope.products = data;
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		
	}
	
	init();
	
	$scope.login = function(user){
		
		usersFactory.getUser(user).success(function(data){
			if(data){
				var logged = data;
				$localStorage.loggedUser = logged.username;
				if(logged.role == 'CUSTOMER'){
					$location.path('/customer');
				}else if(logged.role == 'ADMINISTRATOR'){
					$location.path('/admin');
				}else{
					$location.path('/manager');
				}
				
			}else{
				toast('Wrong username or password!');
			}
		});
	};
	
	$scope.openRegisterDialog = function () {
		$uibModal.open({
		      templateUrl: 'registerModal.html',
		      controller: 'ModalInstanceCtrl'
		    });

	};
});

//kontroler za modalni za novog korisnika
eCommerce.controller('ModalInstanceCtrl', function ($localStorage,$rootScope,$scope, $uibModalInstance, usersFactory, resourceFactory) {
	function init(){
		console.log('UsersController.Init');
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
			
			if($localStorage.customers == null){
				$localStorage.customers = {};
			}
			$rootScope.users.forEach(function(entry){
				if(entry.role == 'CUSTOMER'){
					if($localStorage.customers[entry.username] == null)
						{
							var shoppingCart = [];
							$localStorage.customers[entry.username] = shoppingCart;
						}
				}
			});
			
			if($localStorage.wishlist == null){
				$localStorage.wishlist = {};
			}
			$rootScope.users.forEach(function(entry){
				if(entry.role == 'CUSTOMER'){
					if($localStorage.wishlist[entry.username] == null){
						var wish = [];
						$localStorage.wishlist[entry.username] = wish;
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
		
		resourceFactory.getProducts().success(function(data){
			$rootScope.products = data;
		});
		
		resourceFactory.getDeliverers().success(function(data){
			$rootScope.deliverers = data;
		});
		
		if($localStorage.customers == null){
			$localStorage.customers = {};
		}
		$rootScope.users.forEach(function(entry){
			if(entry.role == 'CUSTOMER'){
				if($localStorage.customers[entry.username] == null)
					{
						var shoppingCart = [];
						$localStorage.customers[entry.username] = shoppingCart;
					}
			}
		});
			
		
	}
	
	init();
	
	
	  $scope.ok = function (user) {
	    
	    if(user && user.username && user.password && user.name && user.surname && user.contact && user.email && user.address && user.country){
	    	if(user.username.trim() != "" && user.password.trim()!="" && user.name.trim()!="" && user.surname.trim()!="" && user.contact.trim()!="" && user.email.trim()!="" && user.address.trim()!="" && user.country.trim()){
	    		
	    		user.role = 0;
			    usersFactory.addUser(user).success(function(data){
			    	if(data){
			    		toast("This user already exists!");
			    	}else{
			    		toast("You registered successfully!");
			    		init();
			    	}
			    	$uibModalInstance.close();
			    });
	    	}else{
	    		alert("Please enter valid data");
	    	}
	    }else{
	    	alert("Please enter valid data");
	    }
	  };

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
});
