eCommerce.controller('adminsController', function($localStorage,$rootScope,$scope, $uibModal,$location, adminsFactory, resourceFactory,prodFilter,shoFilter, $mdDialog, $mdMedia){
	function init(){
		console.log('AdminsController.Init');
		
		console.log($localStorage.loggedUser);
		
		if(!$localStorage.loggedUser)
			$location.path('/');
		
		resourceFactory.getUsers().success(function(data){
			$rootScope.users = data;
			
			$rootScope.users.forEach(function(entry){
				if(entry.username.localeCompare($localStorage.loggedUser) == 0){
					if(entry.role != 'ADMINISTRATOR'){
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
	}
	
	init();
	
	$scope.logOut = function(){
		$localStorage.loggedUser = null;
		$location.path('/');
	};
	
	$scope.openNewProductDialog = function(){
		$uibModal.open({
			templateUrl : 'newProductModal.html',
			controller : 'ModalNewProductCtrl',
		});
	};
	
	$scope.deleteProduct = function(productId){
		adminsFactory.deleteProduct(productId).success(function(data){
			if(data){
				
				toast("Failed to delete product!")
			}else{
				toast("Product deleted!");
				init();
			}
			
		})
	};
	
	$scope.deleteCategory = function(categoryName){
		adminsFactory.deleteCategory(categoryName).success(function(data){
			if(data){
				toast("Failed to delete category");
			}else{
				toast("Category deleted!");
				init();
			}
		})
	};
	
	$scope.deleteDeliverer = function(delivererId){
		adminsFactory.deleteDeliverer(delivererId).success(function(data){
			if(data){
				toast("Failed to delete deliverer!");
			}else{
				toast("Deliverer deleted!");
				init();
			}
			
		})
	};
	
	$scope.deleteShop = function(shopId){
		adminsFactory.deleteShop(shopId).success(function(data){
			if(data){
				toast("Failed to delete shop!");
			}else{
				toast("Shop deleted!");
				init();
			}
		});
	};
	
	$scope.deleteReview = function(reviewId){
		adminsFactory.deleteReview(reviewId).success(function(data){
			if(data){
				toast("Failed to delete review!");
			}else{
				toast("Review deleted!");
				init();
			}
		});
	};
	
	$scope.openChangeProductDialog = function(product){
		$rootScope.productToChange = product;
		$uibModal.open({
			templateUrl : 'changeProductModal.html',
			controller : 'ModalChangeProductCtrl',
		});
	}
	
	$scope.openNewCategoryDialog = function(){
		$uibModal.open({
			templateUrl : 'newCategoryModal.html',
			controller : 'ModalNewCategoryCtrl',
		});
	};
	
	$scope.openChangeCategoryDialog = function(category){
		$rootScope.categoryToChange = category;
		$uibModal.open({
			templateUrl : 'changeCategoryModal.html',
			controller : 'ModalChangeCategoryCtrl',
		});
	};
	
	$scope.openNewDelivererDialog = function(event){
//		
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
	    $mdDialog.show({
	      controller: 'ModalNewDelivererCtrl',
	      templateUrl: 'newDelivererModal.html',
	      parent: angular.element(document.body),
	      targetEvent: event,
	      clickOutsideToClose:true,
	      fullscreen: useFullScreen
	    })
	};
	
	$scope.openChangeDelivererDialog = function(deliverer,event){
		$localStorage.delivererToChange = deliverer;
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
	    $mdDialog.show({
	      controller: 'ModalChangeDelivererCtrl',
	      templateUrl: 'changeDelivererModal.html',
	      parent: angular.element(document.body),
	      targetEvent: event,
	      clickOutsideToClose:true,
	      fullscreen: useFullScreen
	    })
	};
	
	$scope.openNewShopDialog = function(){
		$uibModal.open({
			templateUrl : 'newShopModal.html',
			controller : 'ModalNewShopCtrl',
		});
	};
	
	$scope.openChangeShopDialog = function(shop){
		$rootScope.shopToChange = shop;
		$uibModal.open({
			templateUrl : 'changeShopModal.html',
			controller : 'ModalChangeShopCtrl',
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
eCommerce.controller('ModalNewProductCtrl', function($localStorage,$rootScope,$scope, $uibModalInstance, $location, adminsFactory, resourceFactory, Upload){
	function init(){
		adminsFactory.getShopsString().success(function(data){
			$scope.shopsString = data;
		});
		adminsFactory.getCategoriesString().success(function(data){
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

				                $scope.newProduct.image = ('upload/images/' + file.name);
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
					
					
					adminsFactory.addProduct(newProduct).success(function(data){
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

//kontroler za modalni za novu kategoriju
eCommerce.controller('ModalNewCategoryCtrl', function($localStorage,$rootScope,$scope, $uibModalInstance, $location, adminsFactory, resourceFactory){
	function init(){
		adminsFactory.getCategoriesString().success(function(data){
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
	}
	
	init();
	
	$scope.addCategory = function(newCategory){
		if(newCategory && newCategory.name && newCategory.description){
			if(newCategory.name.trim()!="" && newCategory.description.trim()!=""){
			
				adminsFactory.addCategory(newCategory).success(function(data){
					if(data){
						toast("Category already exists!");
					}else{
						toast("Category successfully added!");
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
	
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};
});

//kontroler za dodavanje novog dostavljaca
eCommerce.controller('ModalNewDelivererCtrl', function($localStorage,$rootScope,$scope, $mdConstant, $location, adminsFactory, resourceFactory,$mdDialog, $mdMedia){
	function init(){
		adminsFactory.getCategoriesString().success(function(data){
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
		
		$scope.countries = [ 
	                        {name: 'Afghanistan', code: 'AF'}, 
	                        {name: 'Åland Islands', code: 'AX'}, 
	                        {name: 'Albania', code: 'AL'}, 
	                        {name: 'Algeria', code: 'DZ'}, 
	                        {name: 'American Samoa', code: 'AS'}, 
	                        {name: 'AndorrA', code: 'AD'}, 
	                        {name: 'Angola', code: 'AO'}, 
	                        {name: 'Anguilla', code: 'AI'}, 
	                        {name: 'Antarctica', code: 'AQ'}, 
	                        {name: 'Antigua and Barbuda', code: 'AG'}, 
	                        {name: 'Argentina', code: 'AR'}, 
	                        {name: 'Armenia', code: 'AM'}, 
	                        {name: 'Aruba', code: 'AW'}, 
	                        {name: 'Australia', code: 'AU'}, 
	                        {name: 'Austria', code: 'AT'}, 
	                        {name: 'Azerbaijan', code: 'AZ'}, 
	                        {name: 'Bahamas', code: 'BS'}, 
	                        {name: 'Bahrain', code: 'BH'}, 
	                        {name: 'Bangladesh', code: 'BD'}, 
	                        {name: 'Barbados', code: 'BB'}, 
	                        {name: 'Belarus', code: 'BY'}, 
	                        {name: 'Belgium', code: 'BE'}, 
	                        {name: 'Belize', code: 'BZ'}, 
	                        {name: 'Benin', code: 'BJ'}, 
	                        {name: 'Bermuda', code: 'BM'}, 
	                        {name: 'Bhutan', code: 'BT'}, 
	                        {name: 'Bolivia', code: 'BO'}, 
	                        {name: 'Bosnia and Herzegovina', code: 'BA'}, 
	                        {name: 'Botswana', code: 'BW'}, 
	                        {name: 'Bouvet Island', code: 'BV'}, 
	                        {name: 'Brazil', code: 'BR'}, 
	                        {name: 'British Indian Ocean Territory', code: 'IO'}, 
	                        {name: 'Brunei Darussalam', code: 'BN'}, 
	                        {name: 'Bulgaria', code: 'BG'}, 
	                        {name: 'Burkina Faso', code: 'BF'}, 
	                        {name: 'Burundi', code: 'BI'}, 
	                        {name: 'Cambodia', code: 'KH'}, 
	                        {name: 'Cameroon', code: 'CM'}, 
	                        {name: 'Canada', code: 'CA'}, 
	                        {name: 'Cape Verde', code: 'CV'}, 
	                        {name: 'Cayman Islands', code: 'KY'}, 
	                        {name: 'Central African Republic', code: 'CF'}, 
	                        {name: 'Chad', code: 'TD'}, 
	                        {name: 'Chile', code: 'CL'}, 
	                        {name: 'China', code: 'CN'}, 
	                        {name: 'Christmas Island', code: 'CX'}, 
	                        {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
	                        {name: 'Colombia', code: 'CO'}, 
	                        {name: 'Comoros', code: 'KM'}, 
	                        {name: 'Congo', code: 'CG'}, 
	                        {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
	                        {name: 'Cook Islands', code: 'CK'}, 
	                        {name: 'Costa Rica', code: 'CR'}, 
	                        {name: 'Cote D\'Ivoire', code: 'CI'}, 
	                        {name: 'Croatia', code: 'HR'}, 
	                        {name: 'Cuba', code: 'CU'}, 
	                        {name: 'Cyprus', code: 'CY'}, 
	                        {name: 'Czech Republic', code: 'CZ'}, 
	                        {name: 'Denmark', code: 'DK'}, 
	                        {name: 'Djibouti', code: 'DJ'}, 
	                        {name: 'Dominica', code: 'DM'}, 
	                        {name: 'Dominican Republic', code: 'DO'}, 
	                        {name: 'Ecuador', code: 'EC'}, 
	                        {name: 'Egypt', code: 'EG'}, 
	                        {name: 'El Salvador', code: 'SV'}, 
	                        {name: 'Equatorial Guinea', code: 'GQ'}, 
	                        {name: 'Eritrea', code: 'ER'}, 
	                        {name: 'Estonia', code: 'EE'}, 
	                        {name: 'Ethiopia', code: 'ET'}, 
	                        {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
	                        {name: 'Faroe Islands', code: 'FO'}, 
	                        {name: 'Fiji', code: 'FJ'}, 
	                        {name: 'Finland', code: 'FI'}, 
	                        {name: 'France', code: 'FR'}, 
	                        {name: 'French Guiana', code: 'GF'}, 
	                        {name: 'French Polynesia', code: 'PF'}, 
	                        {name: 'French Southern Territories', code: 'TF'}, 
	                        {name: 'Gabon', code: 'GA'}, 
	                        {name: 'Gambia', code: 'GM'}, 
	                        {name: 'Georgia', code: 'GE'}, 
	                        {name: 'Germany', code: 'DE'}, 
	                        {name: 'Ghana', code: 'GH'}, 
	                        {name: 'Gibraltar', code: 'GI'}, 
	                        {name: 'Greece', code: 'GR'}, 
	                        {name: 'Greenland', code: 'GL'}, 
	                        {name: 'Grenada', code: 'GD'}, 
	                        {name: 'Guadeloupe', code: 'GP'}, 
	                        {name: 'Guam', code: 'GU'}, 
	                        {name: 'Guatemala', code: 'GT'}, 
	                        {name: 'Guernsey', code: 'GG'}, 
	                        {name: 'Guinea', code: 'GN'}, 
	                        {name: 'Guinea-Bissau', code: 'GW'}, 
	                        {name: 'Guyana', code: 'GY'}, 
	                        {name: 'Haiti', code: 'HT'}, 
	                        {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
	                        {name: 'Holy See (Vatican City State)', code: 'VA'}, 
	                        {name: 'Honduras', code: 'HN'}, 
	                        {name: 'Hong Kong', code: 'HK'}, 
	                        {name: 'Hungary', code: 'HU'}, 
	                        {name: 'Iceland', code: 'IS'}, 
	                        {name: 'India', code: 'IN'}, 
	                        {name: 'Indonesia', code: 'ID'}, 
	                        {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
	                        {name: 'Iraq', code: 'IQ'}, 
	                        {name: 'Ireland', code: 'IE'}, 
	                        {name: 'Isle of Man', code: 'IM'}, 
	                        {name: 'Israel', code: 'IL'}, 
	                        {name: 'Italy', code: 'IT'}, 
	                        {name: 'Jamaica', code: 'JM'}, 
	                        {name: 'Japan', code: 'JP'}, 
	                        {name: 'Jersey', code: 'JE'}, 
	                        {name: 'Jordan', code: 'JO'}, 
	                        {name: 'Kazakhstan', code: 'KZ'}, 
	                        {name: 'Kenya', code: 'KE'}, 
	                        {name: 'Kiribati', code: 'KI'}, 
	                        {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
	                        {name: 'Korea, Republic of', code: 'KR'}, 
	                        {name: 'Kuwait', code: 'KW'}, 
	                        {name: 'Kyrgyzstan', code: 'KG'}, 
	                        {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
	                        {name: 'Latvia', code: 'LV'}, 
	                        {name: 'Lebanon', code: 'LB'}, 
	                        {name: 'Lesotho', code: 'LS'}, 
	                        {name: 'Liberia', code: 'LR'}, 
	                        {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
	                        {name: 'Liechtenstein', code: 'LI'}, 
	                        {name: 'Lithuania', code: 'LT'}, 
	                        {name: 'Luxembourg', code: 'LU'}, 
	                        {name: 'Macao', code: 'MO'}, 
	                        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
	                        {name: 'Madagascar', code: 'MG'}, 
	                        {name: 'Malawi', code: 'MW'}, 
	                        {name: 'Malaysia', code: 'MY'}, 
	                        {name: 'Maldives', code: 'MV'}, 
	                        {name: 'Mali', code: 'ML'}, 
	                        {name: 'Malta', code: 'MT'}, 
	                        {name: 'Marshall Islands', code: 'MH'}, 
	                        {name: 'Martinique', code: 'MQ'}, 
	                        {name: 'Mauritania', code: 'MR'}, 
	                        {name: 'Mauritius', code: 'MU'}, 
	                        {name: 'Mayotte', code: 'YT'}, 
	                        {name: 'Mexico', code: 'MX'}, 
	                        {name: 'Micronesia, Federated States of', code: 'FM'}, 
	                        {name: 'Moldova, Republic of', code: 'MD'}, 
	                        {name: 'Monaco', code: 'MC'}, 
	                        {name: 'Mongolia', code: 'MN'}, 
	                        {name: 'Montserrat', code: 'MS'}, 
	                        {name: 'Morocco', code: 'MA'}, 
	                        {name: 'Mozambique', code: 'MZ'}, 
	                        {name: 'Myanmar', code: 'MM'}, 
	                        {name: 'Namibia', code: 'NA'}, 
	                        {name: 'Nauru', code: 'NR'}, 
	                        {name: 'Nepal', code: 'NP'}, 
	                        {name: 'Netherlands', code: 'NL'}, 
	                        {name: 'Netherlands Antilles', code: 'AN'}, 
	                        {name: 'New Caledonia', code: 'NC'}, 
	                        {name: 'New Zealand', code: 'NZ'}, 
	                        {name: 'Nicaragua', code: 'NI'}, 
	                        {name: 'Niger', code: 'NE'}, 
	                        {name: 'Nigeria', code: 'NG'}, 
	                        {name: 'Niue', code: 'NU'}, 
	                        {name: 'Norfolk Island', code: 'NF'}, 
	                        {name: 'Northern Mariana Islands', code: 'MP'}, 
	                        {name: 'Norway', code: 'NO'}, 
	                        {name: 'Oman', code: 'OM'}, 
	                        {name: 'Pakistan', code: 'PK'}, 
	                        {name: 'Palau', code: 'PW'}, 
	                        {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
	                        {name: 'Panama', code: 'PA'}, 
	                        {name: 'Papua New Guinea', code: 'PG'}, 
	                        {name: 'Paraguay', code: 'PY'}, 
	                        {name: 'Peru', code: 'PE'}, 
	                        {name: 'Philippines', code: 'PH'}, 
	                        {name: 'Pitcairn', code: 'PN'}, 
	                        {name: 'Poland', code: 'PL'}, 
	                        {name: 'Portugal', code: 'PT'}, 
	                        {name: 'Puerto Rico', code: 'PR'}, 
	                        {name: 'Qatar', code: 'QA'}, 
	                        {name: 'Reunion', code: 'RE'}, 
	                        {name: 'Romania', code: 'RO'}, 
	                        {name: 'Russian Federation', code: 'RU'}, 
	                        {name: 'RWANDA', code: 'RW'}, 
	                        {name: 'Saint Helena', code: 'SH'}, 
	                        {name: 'Saint Kitts and Nevis', code: 'KN'}, 
	                        {name: 'Saint Lucia', code: 'LC'}, 
	                        {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
	                        {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
	                        {name: 'Samoa', code: 'WS'}, 
	                        {name: 'San Marino', code: 'SM'}, 
	                        {name: 'Sao Tome and Principe', code: 'ST'}, 
	                        {name: 'Saudi Arabia', code: 'SA'}, 
	                        {name: 'Senegal', code: 'SN'}, 
	                        {name: 'Serbia and Montenegro', code: 'CS'}, 
	                        {name: 'Seychelles', code: 'SC'}, 
	                        {name: 'Sierra Leone', code: 'SL'}, 
	                        {name: 'Singapore', code: 'SG'}, 
	                        {name: 'Slovakia', code: 'SK'}, 
	                        {name: 'Slovenia', code: 'SI'}, 
	                        {name: 'Solomon Islands', code: 'SB'}, 
	                        {name: 'Somalia', code: 'SO'}, 
	                        {name: 'South Africa', code: 'ZA'}, 
	                        {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
	                        {name: 'Spain', code: 'ES'}, 
	                        {name: 'Sri Lanka', code: 'LK'}, 
	                        {name: 'Sudan', code: 'SD'}, 
	                        {name: 'Suriname', code: 'SR'}, 
	                        {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
	                        {name: 'Swaziland', code: 'SZ'}, 
	                        {name: 'Sweden', code: 'SE'}, 
	                        {name: 'Switzerland', code: 'CH'}, 
	                        {name: 'Syrian Arab Republic', code: 'SY'}, 
	                        {name: 'Taiwan, Province of China', code: 'TW'}, 
	                        {name: 'Tajikistan', code: 'TJ'}, 
	                        {name: 'Tanzania, United Republic of', code: 'TZ'}, 
	                        {name: 'Thailand', code: 'TH'}, 
	                        {name: 'Timor-Leste', code: 'TL'}, 
	                        {name: 'Togo', code: 'TG'}, 
	                        {name: 'Tokelau', code: 'TK'}, 
	                        {name: 'Tonga', code: 'TO'}, 
	                        {name: 'Trinidad and Tobago', code: 'TT'}, 
	                        {name: 'Tunisia', code: 'TN'}, 
	                        {name: 'Turkey', code: 'TR'}, 
	                        {name: 'Turkmenistan', code: 'TM'}, 
	                        {name: 'Turks and Caicos Islands', code: 'TC'}, 
	                        {name: 'Tuvalu', code: 'TV'}, 
	                        {name: 'Uganda', code: 'UG'}, 
	                        {name: 'Ukraine', code: 'UA'}, 
	                        {name: 'United Arab Emirates', code: 'AE'}, 
	                        {name: 'United Kingdom', code: 'GB'}, 
	                        {name: 'United States', code: 'US'}, 
	                        {name: 'United States Minor Outlying Islands', code: 'UM'}, 
	                        {name: 'Uruguay', code: 'UY'}, 
	                        {name: 'Uzbekistan', code: 'UZ'}, 
	                        {name: 'Vanuatu', code: 'VU'}, 
	                        {name: 'Venezuela', code: 'VE'}, 
	                        {name: 'Viet Nam', code: 'VN'}, 
	                        {name: 'Virgin Islands, British', code: 'VG'}, 
	                        {name: 'Virgin Islands, U.S.', code: 'VI'}, 
	                        {name: 'Wallis and Futuna', code: 'WF'}, 
	                        {name: 'Western Sahara', code: 'EH'}, 
	                        {name: 'Yemen', code: 'YE'}, 
	                        {name: 'Zambia', code: 'ZM'}, 
	                        {name: 'Zimbabwe', code: 'ZW'} 
	                      ];
	
		//$scope.countries = $scope.countries || [];
	}
	
	init();
	
	$scope.newDeliverer = {
			id : "",
			name : "",
			description : "",
			deliverPrice : 0,
			country : []
	};
	
	$scope.addCountry = function (selectedCountry) {
        if (selectedCountry && ($scope.newDeliverer.country.indexOf(selectedCountry) == -1)) {
            $scope.newDeliverer.country.push(selectedCountry);
        }
    };
	
	$scope.addDeliverer = function(newDeliverer){
		if(newDeliverer && newDeliverer.id && newDeliverer.name && newDeliverer.description){
			if(newDeliverer.id.trim() != "" && newDeliverer.name.trim() != "" && newDeliverer.description.trim() != ""){
				var flag = true;
				if(isNaN(newDeliverer.deliverPrice)){
					flag = false
				}else if(newDeliverer.deliverPrice < 0){
					flag = false;
				}
				
				
				if(flag){
					adminsFactory.addDeliverer(newDeliverer).success(function(data){
						if(data){
							toast("Deliverer already exists!");
						}else{
							toast("Deliverer successfully added!");
							init();
						}
						$mdDialog.cancel();
					});
				}else{
					alert("Please enter valid data!");
				}
			}else{
				alert("Please enter valid data");
			}
		}else{
			alert("Please enter valid data!");
		}
	};
	
	$scope.cancel = function(){
		$mdDialog.cancel();
	};
});

//kontroler za modalni za novu prodavnicu
eCommerce.controller('ModalNewShopCtrl', function($localStorage,$rootScope,$scope, $uibModalInstance,$mdConstant, $location, adminsFactory, resourceFactory){
	function init(){
		adminsFactory.getManagersString().success(function(data){
			$scope.managersString = data;
		});
		
		adminsFactory.getCategoriesString().success(function(data){
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
	}
	
	init();
	
	$scope.addShop =  function(newShop){
		newShop.mark = null;
		newShop.review = null;
		
		if(newShop && newShop.id && newShop.name && newShop.address && newShop.country && newShop.contact && newShop.email && newShop.manager){
			if(newShop.id.trim() != "" && newShop.name.trim() != "" && newShop.address.trim() != "" && newShop.country.trim() != "" && newShop.contact.trim() != "" 
				&& newShop.email.trim() != "" && newShop.manager.trim() != ""){
					adminsFactory.addShop(newShop).success(function(data){
						if(data){
							toast("Shop already exists!");
						}else{
							toast("Shop successfully added!");
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
	
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};
});

//kontroler za modalni za promjenu proizvoda
eCommerce.controller('ModalChangeProductCtrl', function($localStorage,$rootScope, $scope,  $uibModalInstance, $location, adminsFactory, resourceFactory){
	function init(){
		adminsFactory.getShopsString().success(function(data){
			$scope.shopsString = data;
		});
		adminsFactory.getCategoriesString().success(function(data){
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
					adminsFactory.changeProduct(product).success(function(data){
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

//kontroler za modalni za promjenu kategorije
eCommerce.controller('ModalChangeCategoryCtrl', function($localStorage,$rootScope,$scope,  $uibModalInstance, $location, adminsFactory, resourceFactory){
	function init(){
		adminsFactory.getCategoriesString().success(function(data){
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
	}
	
	init();
	
	$scope.changeCategory = function(category){
		if(category && category.name && category.description){
			if(category.name.trim()!="" && category.description.trim()!=""){
				adminsFactory.changeCategory(category).success(function(data){
					if(data){
						toast("Failed to change category!");
					}else{
						toast("Category successfully changed!");
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

//kontroler za modalni za promjenu dobavljaca
eCommerce.controller('ModalChangeDelivererCtrl',function($localStorage,$rootScope,$scope, $location, adminsFactory, resourceFactory,$mdDialog, $mdMedia){
	function init(){
		adminsFactory.getCategoriesString().success(function(data){
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
		
		$scope.delivererToChange = {
				id : $localStorage.delivererToChange.id,
				name : $localStorage.delivererToChange.name,
				description : $localStorage.delivererToChange.description,
				deliverPrice : $localStorage.delivererToChange.delivererPrice,
				country : $localStorage.delivererToChange.country
		};
		
		$scope.countries = [ 
	                        {name: 'Afghanistan', code: 'AF'}, 
	                        {name: 'Åland Islands', code: 'AX'}, 
	                        {name: 'Albania', code: 'AL'}, 
	                        {name: 'Algeria', code: 'DZ'}, 
	                        {name: 'American Samoa', code: 'AS'}, 
	                        {name: 'AndorrA', code: 'AD'}, 
	                        {name: 'Angola', code: 'AO'}, 
	                        {name: 'Anguilla', code: 'AI'}, 
	                        {name: 'Antarctica', code: 'AQ'}, 
	                        {name: 'Antigua and Barbuda', code: 'AG'}, 
	                        {name: 'Argentina', code: 'AR'}, 
	                        {name: 'Armenia', code: 'AM'}, 
	                        {name: 'Aruba', code: 'AW'}, 
	                        {name: 'Australia', code: 'AU'}, 
	                        {name: 'Austria', code: 'AT'}, 
	                        {name: 'Azerbaijan', code: 'AZ'}, 
	                        {name: 'Bahamas', code: 'BS'}, 
	                        {name: 'Bahrain', code: 'BH'}, 
	                        {name: 'Bangladesh', code: 'BD'}, 
	                        {name: 'Barbados', code: 'BB'}, 
	                        {name: 'Belarus', code: 'BY'}, 
	                        {name: 'Belgium', code: 'BE'}, 
	                        {name: 'Belize', code: 'BZ'}, 
	                        {name: 'Benin', code: 'BJ'}, 
	                        {name: 'Bermuda', code: 'BM'}, 
	                        {name: 'Bhutan', code: 'BT'}, 
	                        {name: 'Bolivia', code: 'BO'}, 
	                        {name: 'Bosnia and Herzegovina', code: 'BA'}, 
	                        {name: 'Botswana', code: 'BW'}, 
	                        {name: 'Bouvet Island', code: 'BV'}, 
	                        {name: 'Brazil', code: 'BR'}, 
	                        {name: 'British Indian Ocean Territory', code: 'IO'}, 
	                        {name: 'Brunei Darussalam', code: 'BN'}, 
	                        {name: 'Bulgaria', code: 'BG'}, 
	                        {name: 'Burkina Faso', code: 'BF'}, 
	                        {name: 'Burundi', code: 'BI'}, 
	                        {name: 'Cambodia', code: 'KH'}, 
	                        {name: 'Cameroon', code: 'CM'}, 
	                        {name: 'Canada', code: 'CA'}, 
	                        {name: 'Cape Verde', code: 'CV'}, 
	                        {name: 'Cayman Islands', code: 'KY'}, 
	                        {name: 'Central African Republic', code: 'CF'}, 
	                        {name: 'Chad', code: 'TD'}, 
	                        {name: 'Chile', code: 'CL'}, 
	                        {name: 'China', code: 'CN'}, 
	                        {name: 'Christmas Island', code: 'CX'}, 
	                        {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
	                        {name: 'Colombia', code: 'CO'}, 
	                        {name: 'Comoros', code: 'KM'}, 
	                        {name: 'Congo', code: 'CG'}, 
	                        {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
	                        {name: 'Cook Islands', code: 'CK'}, 
	                        {name: 'Costa Rica', code: 'CR'}, 
	                        {name: 'Cote D\'Ivoire', code: 'CI'}, 
	                        {name: 'Croatia', code: 'HR'}, 
	                        {name: 'Cuba', code: 'CU'}, 
	                        {name: 'Cyprus', code: 'CY'}, 
	                        {name: 'Czech Republic', code: 'CZ'}, 
	                        {name: 'Denmark', code: 'DK'}, 
	                        {name: 'Djibouti', code: 'DJ'}, 
	                        {name: 'Dominica', code: 'DM'}, 
	                        {name: 'Dominican Republic', code: 'DO'}, 
	                        {name: 'Ecuador', code: 'EC'}, 
	                        {name: 'Egypt', code: 'EG'}, 
	                        {name: 'El Salvador', code: 'SV'}, 
	                        {name: 'Equatorial Guinea', code: 'GQ'}, 
	                        {name: 'Eritrea', code: 'ER'}, 
	                        {name: 'Estonia', code: 'EE'}, 
	                        {name: 'Ethiopia', code: 'ET'}, 
	                        {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
	                        {name: 'Faroe Islands', code: 'FO'}, 
	                        {name: 'Fiji', code: 'FJ'}, 
	                        {name: 'Finland', code: 'FI'}, 
	                        {name: 'France', code: 'FR'}, 
	                        {name: 'French Guiana', code: 'GF'}, 
	                        {name: 'French Polynesia', code: 'PF'}, 
	                        {name: 'French Southern Territories', code: 'TF'}, 
	                        {name: 'Gabon', code: 'GA'}, 
	                        {name: 'Gambia', code: 'GM'}, 
	                        {name: 'Georgia', code: 'GE'}, 
	                        {name: 'Germany', code: 'DE'}, 
	                        {name: 'Ghana', code: 'GH'}, 
	                        {name: 'Gibraltar', code: 'GI'}, 
	                        {name: 'Greece', code: 'GR'}, 
	                        {name: 'Greenland', code: 'GL'}, 
	                        {name: 'Grenada', code: 'GD'}, 
	                        {name: 'Guadeloupe', code: 'GP'}, 
	                        {name: 'Guam', code: 'GU'}, 
	                        {name: 'Guatemala', code: 'GT'}, 
	                        {name: 'Guernsey', code: 'GG'}, 
	                        {name: 'Guinea', code: 'GN'}, 
	                        {name: 'Guinea-Bissau', code: 'GW'}, 
	                        {name: 'Guyana', code: 'GY'}, 
	                        {name: 'Haiti', code: 'HT'}, 
	                        {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
	                        {name: 'Holy See (Vatican City State)', code: 'VA'}, 
	                        {name: 'Honduras', code: 'HN'}, 
	                        {name: 'Hong Kong', code: 'HK'}, 
	                        {name: 'Hungary', code: 'HU'}, 
	                        {name: 'Iceland', code: 'IS'}, 
	                        {name: 'India', code: 'IN'}, 
	                        {name: 'Indonesia', code: 'ID'}, 
	                        {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
	                        {name: 'Iraq', code: 'IQ'}, 
	                        {name: 'Ireland', code: 'IE'}, 
	                        {name: 'Isle of Man', code: 'IM'}, 
	                        {name: 'Israel', code: 'IL'}, 
	                        {name: 'Italy', code: 'IT'}, 
	                        {name: 'Jamaica', code: 'JM'}, 
	                        {name: 'Japan', code: 'JP'}, 
	                        {name: 'Jersey', code: 'JE'}, 
	                        {name: 'Jordan', code: 'JO'}, 
	                        {name: 'Kazakhstan', code: 'KZ'}, 
	                        {name: 'Kenya', code: 'KE'}, 
	                        {name: 'Kiribati', code: 'KI'}, 
	                        {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
	                        {name: 'Korea, Republic of', code: 'KR'}, 
	                        {name: 'Kuwait', code: 'KW'}, 
	                        {name: 'Kyrgyzstan', code: 'KG'}, 
	                        {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
	                        {name: 'Latvia', code: 'LV'}, 
	                        {name: 'Lebanon', code: 'LB'}, 
	                        {name: 'Lesotho', code: 'LS'}, 
	                        {name: 'Liberia', code: 'LR'}, 
	                        {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
	                        {name: 'Liechtenstein', code: 'LI'}, 
	                        {name: 'Lithuania', code: 'LT'}, 
	                        {name: 'Luxembourg', code: 'LU'}, 
	                        {name: 'Macao', code: 'MO'}, 
	                        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
	                        {name: 'Madagascar', code: 'MG'}, 
	                        {name: 'Malawi', code: 'MW'}, 
	                        {name: 'Malaysia', code: 'MY'}, 
	                        {name: 'Maldives', code: 'MV'}, 
	                        {name: 'Mali', code: 'ML'}, 
	                        {name: 'Malta', code: 'MT'}, 
	                        {name: 'Marshall Islands', code: 'MH'}, 
	                        {name: 'Martinique', code: 'MQ'}, 
	                        {name: 'Mauritania', code: 'MR'}, 
	                        {name: 'Mauritius', code: 'MU'}, 
	                        {name: 'Mayotte', code: 'YT'}, 
	                        {name: 'Mexico', code: 'MX'}, 
	                        {name: 'Micronesia, Federated States of', code: 'FM'}, 
	                        {name: 'Moldova, Republic of', code: 'MD'}, 
	                        {name: 'Monaco', code: 'MC'}, 
	                        {name: 'Mongolia', code: 'MN'}, 
	                        {name: 'Montserrat', code: 'MS'}, 
	                        {name: 'Morocco', code: 'MA'}, 
	                        {name: 'Mozambique', code: 'MZ'}, 
	                        {name: 'Myanmar', code: 'MM'}, 
	                        {name: 'Namibia', code: 'NA'}, 
	                        {name: 'Nauru', code: 'NR'}, 
	                        {name: 'Nepal', code: 'NP'}, 
	                        {name: 'Netherlands', code: 'NL'}, 
	                        {name: 'Netherlands Antilles', code: 'AN'}, 
	                        {name: 'New Caledonia', code: 'NC'}, 
	                        {name: 'New Zealand', code: 'NZ'}, 
	                        {name: 'Nicaragua', code: 'NI'}, 
	                        {name: 'Niger', code: 'NE'}, 
	                        {name: 'Nigeria', code: 'NG'}, 
	                        {name: 'Niue', code: 'NU'}, 
	                        {name: 'Norfolk Island', code: 'NF'}, 
	                        {name: 'Northern Mariana Islands', code: 'MP'}, 
	                        {name: 'Norway', code: 'NO'}, 
	                        {name: 'Oman', code: 'OM'}, 
	                        {name: 'Pakistan', code: 'PK'}, 
	                        {name: 'Palau', code: 'PW'}, 
	                        {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
	                        {name: 'Panama', code: 'PA'}, 
	                        {name: 'Papua New Guinea', code: 'PG'}, 
	                        {name: 'Paraguay', code: 'PY'}, 
	                        {name: 'Peru', code: 'PE'}, 
	                        {name: 'Philippines', code: 'PH'}, 
	                        {name: 'Pitcairn', code: 'PN'}, 
	                        {name: 'Poland', code: 'PL'}, 
	                        {name: 'Portugal', code: 'PT'}, 
	                        {name: 'Puerto Rico', code: 'PR'}, 
	                        {name: 'Qatar', code: 'QA'}, 
	                        {name: 'Reunion', code: 'RE'}, 
	                        {name: 'Romania', code: 'RO'}, 
	                        {name: 'Russian Federation', code: 'RU'}, 
	                        {name: 'RWANDA', code: 'RW'}, 
	                        {name: 'Saint Helena', code: 'SH'}, 
	                        {name: 'Saint Kitts and Nevis', code: 'KN'}, 
	                        {name: 'Saint Lucia', code: 'LC'}, 
	                        {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
	                        {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
	                        {name: 'Samoa', code: 'WS'}, 
	                        {name: 'San Marino', code: 'SM'}, 
	                        {name: 'Sao Tome and Principe', code: 'ST'}, 
	                        {name: 'Saudi Arabia', code: 'SA'}, 
	                        {name: 'Senegal', code: 'SN'}, 
	                        {name: 'Serbia and Montenegro', code: 'CS'}, 
	                        {name: 'Seychelles', code: 'SC'}, 
	                        {name: 'Sierra Leone', code: 'SL'}, 
	                        {name: 'Singapore', code: 'SG'}, 
	                        {name: 'Slovakia', code: 'SK'}, 
	                        {name: 'Slovenia', code: 'SI'}, 
	                        {name: 'Solomon Islands', code: 'SB'}, 
	                        {name: 'Somalia', code: 'SO'}, 
	                        {name: 'South Africa', code: 'ZA'}, 
	                        {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
	                        {name: 'Spain', code: 'ES'}, 
	                        {name: 'Sri Lanka', code: 'LK'}, 
	                        {name: 'Sudan', code: 'SD'}, 
	                        {name: 'Suriname', code: 'SR'}, 
	                        {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
	                        {name: 'Swaziland', code: 'SZ'}, 
	                        {name: 'Sweden', code: 'SE'}, 
	                        {name: 'Switzerland', code: 'CH'}, 
	                        {name: 'Syrian Arab Republic', code: 'SY'}, 
	                        {name: 'Taiwan, Province of China', code: 'TW'}, 
	                        {name: 'Tajikistan', code: 'TJ'}, 
	                        {name: 'Tanzania, United Republic of', code: 'TZ'}, 
	                        {name: 'Thailand', code: 'TH'}, 
	                        {name: 'Timor-Leste', code: 'TL'}, 
	                        {name: 'Togo', code: 'TG'}, 
	                        {name: 'Tokelau', code: 'TK'}, 
	                        {name: 'Tonga', code: 'TO'}, 
	                        {name: 'Trinidad and Tobago', code: 'TT'}, 
	                        {name: 'Tunisia', code: 'TN'}, 
	                        {name: 'Turkey', code: 'TR'}, 
	                        {name: 'Turkmenistan', code: 'TM'}, 
	                        {name: 'Turks and Caicos Islands', code: 'TC'}, 
	                        {name: 'Tuvalu', code: 'TV'}, 
	                        {name: 'Uganda', code: 'UG'}, 
	                        {name: 'Ukraine', code: 'UA'}, 
	                        {name: 'United Arab Emirates', code: 'AE'}, 
	                        {name: 'United Kingdom', code: 'GB'}, 
	                        {name: 'United States', code: 'US'}, 
	                        {name: 'United States Minor Outlying Islands', code: 'UM'}, 
	                        {name: 'Uruguay', code: 'UY'}, 
	                        {name: 'Uzbekistan', code: 'UZ'}, 
	                        {name: 'Vanuatu', code: 'VU'}, 
	                        {name: 'Venezuela', code: 'VE'}, 
	                        {name: 'Viet Nam', code: 'VN'}, 
	                        {name: 'Virgin Islands, British', code: 'VG'}, 
	                        {name: 'Virgin Islands, U.S.', code: 'VI'}, 
	                        {name: 'Wallis and Futuna', code: 'WF'}, 
	                        {name: 'Western Sahara', code: 'EH'}, 
	                        {name: 'Yemen', code: 'YE'}, 
	                        {name: 'Zambia', code: 'ZM'}, 
	                        {name: 'Zimbabwe', code: 'ZW'} 
	                      ];
		
	}
	
	init();
	
	
	$scope.changeDeliverer = function(deliverer){
		if(deliverer && deliverer.id && deliverer.name && deliverer.description){
			if(deliverer.id.trim() != "" && deliverer.name.trim() != "" && deliverer.description.trim() != ""){
				var flag = true;
				if(isNaN(deliverer.deliverPrice)){
					flag = false
				}else if(deliverer.deliverPrice < 0){
					flag = false;
				}
				
				
				if(flag){
					adminsFactory.changeDeliverer(deliverer).success(function(data){
						if(data){
							toast("Failed to change deliverer!");
						}else{
							toast("Deliverer successfully changed!");
							init();
						}
						
						$mdDialog.cancel();
					});
				}else{
					alert("Please enter valid data!");
				}
			}else{
				alert("Please enter valid data");
			}
		}else{
			alert("Please enter valid data!");
		}
	
	};
	
	$scope.addCountry = function (selectedCountry) {
        if (selectedCountry && ($scope.delivererToChange.country.indexOf(selectedCountry) == -1)) {
            $scope.delivererToChange.country.push(selectedCountry);
        }
    };
	
	$scope.cancel = function () {
		$mdDialog.cancel();
	  };
});

eCommerce.controller('ModalChangeShopCtrl', function($localStorage,$rootScope,$scope,  $uibModalInstance, $location, adminsFactory, resourceFactory){
	function init(){
		adminsFactory.getManagersString().success(function(data){
			$scope.managersString = data;
		});
		
		adminsFactory.getCategoriesString().success(function(data){
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
	}
	
	init();
	
	$scope.changeShop = function(shop){
		if(shop && shop.id && shop.name && shop.address && shop.country && shop.contact && shop.email && shop.manager){
			if(shop.id.trim() != "" && shop.name.trim() != "" && shop.address.trim() != "" && shop.country.trim() != "" && shop.contact.trim() != "" 
				&& shop.email.trim() != "" && shop.manager.trim() != ""){
					adminsFactory.changeShop(shop).success(function(data){
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