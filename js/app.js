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

app.controller('disciplinaCtrl', function($scope) {
	$scope.disciplina= [
		{Periodo: "1", Codigo:"2321323", Disciplina: "Leda", Creditos: "4", Grade: "Ambas"},
		{Periodo: "1", Codigo:"4324324", Disciplina: "Leda", Creditos: "4", Grade: "Ambas"},
		{Periodo: "1", Codigo:"5354543", Disciplina: "Leda", Creditos: "4", Grade: "Ambas"},
		{Periodo: "1", Codigo:"5435345", Disciplina: "Leda", Creditos: "4", Grade: "Ambas"},
		{Periodo: "1", Codigo:"5423542", Disciplina: "Leda", Creditos: "4", Grade: "Ambas"}
	]
});