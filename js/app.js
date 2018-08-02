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
	this.listar = function(){
		return $http.get('http://localhost:8080/api/disciplina');
	}
});

app.controller('homeCtrl', function($scope){
	$scope.nome = 'Tatiane Andrade'
	$scope.email = 'andrade92tatiane@gmail.com'
});

app.controller('cadastroCtrl', function($scope) {
	$scope.nome = 'Tatiane Andrade'
	$scope.email = 'andrade92tatiane@gmail.com'
});

app.controller('alunoCtrl', function($scope) {
	$scope.message = "Página aluno."
});

app.controller('coordenadorCtrl', function($scope) {
	$scope.message = "Página coordenador."
});

app.controller('disciplinaCtrl', function($scope, disciplinaService) {
	$scope.disciplina = {}; 

	disciplinaService.listar().then( function(resposta) {
			$scope.disciplina = resposta.data;
		});
});