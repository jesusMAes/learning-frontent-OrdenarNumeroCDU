

function ordenaCDU(){
  let captura =document.getElementById("input");
  let entrada = captura.value;

  //primera entrada de prueba: 
  //   725 «20» , 725 (084.11) , 725 , 725.91 , 725 + 745 , 725=02
  entrada.trim();
  let arrayEntrada = entrada.split(",");
 

  //vamos a quitarle los puntos y luego lo ponemos al primero para que se tome como decimal y el mayor que funcione

  let arraysinpuntos =[];

  
  for (let i= 0; i< arrayEntrada.length; i++){
    let splitTemporal = arrayEntrada[i];
    let splitSegundo = splitTemporal.split('');
    for(let j=0; j<splitSegundo.length; j++){
      if (splitSegundo[j] == ' ' || splitSegundo[j]=='.'){
        splitSegundo.splice(j, 1);
        j=0;
      }
    }
    splitSegundo.splice(1, 0, '.');
    let entexto = splitSegundo.join("");

    arraysinpuntos.push(entexto);
    
  }

  //fin del for para los puntos, ahora vamos a recorrer el array pasando cada elemento a su operador, voy a hacer un array para cada simbolo. fuerza bruta joer.
  let masArray=[]; //+
  let divisionArray =[]; // /
  let numeroSimpleArray=[];//123
  let colonArray =[]; // :
  let dobleColonArray=[]; // ::
  let igualArray=[]; // =
  let parentesisCeroArray =[] // (0...)
  let parentesisNumeroArray= []; // (123)
  


  

}