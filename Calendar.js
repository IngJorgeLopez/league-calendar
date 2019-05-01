const {clubes} = require('./team.json');

// Definimos el total de los equipos para generar nuestro calendario
let totalClubes = clubes.length;

// Revisamos si nuestra lista de clubes es impar 
let isImpar = (totalClubes % 2 != 0);

if (isImpar)
  totalClubes += 1;

let localClubes = [];
let visitorClubes = [];

// Número de partidos por ronda
let totalMatch = totalClubes / 2;

// Creamos un indice inverso
let inverseIndex = totalClubes - 2;



clubes.map((club, index) => {
  // Se crea los equipos para el partido inicial
  if (index % totalMatch == 0) {
    if (isImpar) {
      localClubes.push(null);
      visitorClubes.push(null);
    } else {
      // Se pone al primer equipo como local y al ultimo como visitante
      if (index % 2 == 0) {
        localClubes.push(clubes[index % (totalClubes - 1)]);
        visitorClubes.push(clubes[totalClubes - 1]);
      } else {
        localClubes.push(clubes[totalClubes - 1]);
        visitorClubes.push(clubes[index % (totalClubes - 1)]);
      }
    }
  } else {
    localClubes.push(clubes[index % (totalClubes - 1)]);
    visitorClubes.push(clubes[inverseIndex]);
    
    --inverseIndex;
    if (inverseIndex < 0) {
      inverseIndex = totalClubes - 2;
    }
  }
})

// Dejamos solo los primeros elementos de acuerdo al total de partidos con los que estaremos trabajando
// primera parte del splice "totalMatch" indica que se quitan los elementos a partir del total de partidos
localClubes.splice(totalMatch, visitorClubes.length - totalMatch);
visitorClubes.splice(totalMatch, visitorClubes.length - totalMatch);

for (var indexMatch = 0; indexMatch < totalClubes; ++indexMatch) {
  for (var index = 0; index < totalMatch; ++index){
    if (localClubes[index]) {
       console.log(`${localClubes[index].Id} vs ${visitorClubes[index].Id}`)
    }
  }

  // creamos un arreglo con el último elemento del arreglo de locales y al mismo tiempo este elemento se elimina del arreglo
  var elementToVisitor = localClubes.splice(localClubes.length - 1, 1);
  
  // obtenemos el primer elemento del arreglo de visitantes
  var elementToLocal = visitorClubes[0];

  // reemplazamos el primer elemento del arreglo local por el elemnto que viene del arreglo de visitantes
  localClubes.splice(0, 0, elementToLocal);

  // eliminamos el primer elemento del arreglo de visitantes e insertamos el elemeto que viene de local al último
  visitorClubes.splice(0, 1);
  visitorClubes.push(elementToVisitor[0]);

  console.log('****************************************')
}



