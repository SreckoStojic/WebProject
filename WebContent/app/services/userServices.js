eCommerce.factory('usersFactory', function($http){
	var factory = {};
	
	factory.getUser = function(user) {
		return $http.post('/WebProject/rest/users/getUser', {"username":user.username, "password":user.password});
	};
	
	factory.addUser = function(user){
		return $http.post('/WebProject/rest/users/addUser', {"username":user.username, "password":user.password,
														     "name":user.name, "surname":user.surname,
														     "role":user.role, "contact":user.contact,
														     "email":user.email, "address":user.address,
														     "country":user.country});
	}
	
	return factory;
});