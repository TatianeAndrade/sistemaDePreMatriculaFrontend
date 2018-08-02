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
		return $http.get('http://192.168.0.187:8080/api/disciplina');
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