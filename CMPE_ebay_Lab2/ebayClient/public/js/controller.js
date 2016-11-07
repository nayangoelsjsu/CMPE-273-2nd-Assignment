var ebayapp= angular.module('ebayapp',[]);

ebayapp.controller('ctrl1',function ($scope,$http) {
	$scope.bday=window.bdays;
	$scope.phone=window.phones;
	$scope.address=window.addresss;
	$scope.city=window.citys;
	$scope.state=window.states;
	$scope.zip=window.zips;
	$scope.updateflag=0;
	$scope.updateform= function () {
		$scope.updateflag=1;
		$scope.$applyAsync();
	};

	$scope.updateit= function (bday,phone,address,city,state,zip) {
		$scope.updateflag=0;
		console.log(bday);
		$scope.bday=bday;
		$scope.phone=phone;
		$scope.address=address;
		$scope.city=city;
		$scope.state=state;
		$scope.zip=zip;
		$scope.email=window.emails;
		$scope.$applyAsync();
		console.log($scope.email);
		var str= "/updateuser?phone="+phone+"&bday="+bday+"&address="+address+"&city="+city+"&state="+state+"&zip="+zip;
		console.log(str);
		$http.get(str).then(function (response) {
    		console.log("hi Hacker");
		  });
	};
});


ebayapp.controller('ctrl2',function($scope,$http){
	$scope.items= window.items;
	console.log(typeof $scope.items);
});

