const app = angular.module('preMatricula', ['ngRoute']);
app.config(function($routeProvider) {

	$routeProvider.when('/home', {
		templateUrl:'rotas/home.html',
		controller: 'homeCtrl'
	});

	$routeProvider.when('/cadastro', {
		templateUrl:'rotas/cadastro.html',
		controller: 'cadastroCtrl'
	});

	$routeProvider.when('/aluno', {
		templateUrl:'rotas/aluno.html',
		controller: 'alunoCtrl'
	});

	$routeProvider.when('/coordenador', {
		templateUrl:'rotas/coordenador.html',
		controller: 'coordenadorCtrl'
	});

	$routeProvider.when('/disciplina', {
		templateUrl:'rotas/disciplina.html',
		controller: 'disciplinaCtrl'
	});

	$routeProvider.otherwise({redirectTo: '/home'});
});


app.service('disciplinaService', function($http){
	this.listar = function(id){
		console.log(id);
		return $http.get('http://localhost:8080/api/disciplina', {headers:{'token-autentication': `${id}`}});
	}
});

app.service('loginService', function($http){
	let login = this;
	login.listar = function(id){
		return $http.get('http://localhost:8080/api/usuario/login/'+id);
	}
	login.cadastrar = function(data){
		let data2 = JSON.stringify(data);
		$http.post('http://localhost:8080/api/usuario', data2, {headers:{'token-autentication': `${login.id_token}`}});	
	}
});

app.controller('homeCtrl', function($scope, loginService, $location){
	$scope.nome = 'Tatiane Andrade'
	$scope.email = 'andrade92tatiane@gmail.com'
	$scope.token = ''
	var googleUser = {};
	  var startApp = function() {
	    gapi.load('auth2', function(){
	      // Retrieve the singleton for the GoogleAuth library and set up the client.
	      auth2 = gapi.auth2.init({
	        client_id: '594906753462-rkhlero91bddrg1kqodqtk7qp4nbglmm.apps.googleusercontent.com',
	        cookiepolicy: 'single_host_origin',
	        // Request scopes in addition to 'profile' and 'email'
	        //scope: 'additional_scope'
	      });
	      attachSignin(document.getElementById('customBtn'));
	    });
	  };

	  function attachSignin(element) {
	    console.log(element.id);
	    auth2.attachClickHandler(element, {},
	        function(googleUser) {
	        	let profile = googleUser.getBasicProfile();
	        	loginService.id_token = googleUser.getAuthResponse().id_token;
	        	let usuario = loginService.listar(loginService.id_token).then(function(resp){
					console.log(resp.data);
				});
				if(usuario.matricula == null){
					loginService.email = profile.getEmail();
					loginService.nome =  profile.getName();
					$location.path('/cadastro');
				}
	        }, function(error) {
	          alert(JSON.stringify(error, undefined, 2));
	        });
	  }
	startApp()
});

app.controller('cadastroCtrl', function($scope, loginService) {
	
	$scope.nome = loginService.nome;
	$scope.email = loginService.email;
	$scope.cadastrar = function(){
		let usuario = {
			nome : $scope.nome,
			email: $scope.email,
			matricula: $scope.matricula,
			grade: $scope.grade
		}
		loginService.cadastrar(usuario);
	}
});

app.controller('alunoCtrl', function($scope) {
	$scope.message = "Página aluno."
});

app.controller('coordenadorCtrl', function($scope) {
	$scope.message = "Página coordenador."
});

app.controller('disciplinaCtrl', function($scope, disciplinaService, loginService ) {
	$scope.disciplina = {};

	disciplinaService.listar(loginService.token).then( function(resposta) {
			let resp = resposta.data;
			let periodos = [];
			for (let i = 0; i < resp.length; i++) {
					if(!periodos.includes(resp[i].periodo)){
						periodos.push(resp[i].periodo);
					}
			}

			periodos = periodos.sort((x, y) => {return x - y});
			let disciplinas = [];

			for(let i = 0; i < periodos.length; i++){
				let periodo = resp.filter(function(value){
					return value.periodo == periodos[i];
				});
				disciplinas.push(periodo);
			}
			console.log(periodos);
			$scope.disciplina = disciplinas;
		});
});

app.factory('ApiResource', function($resource, $http){
	var uri = 'localhost:8080/api';
});