

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
  let igualArray=[]; // = lengua
  let parentesisCeroArray =[] // (0...) forma
  let parentesisNumeroArray= []; // (123) lugar
  let parentesisIgualArray =[]; // (=...) razas y pueblos
  let comillasTiempoArray =[]; // "..." tiempo

  let masArray=[]; //+ adición de temas
  let divisionArray =[]; // / extensión de temas
  let numeroSimpleArray=[];//123 numero base

  let colonArray =[]; // : relacion
  let dobleColonArray=[]; // :: relación doble  
  let asteriscoArray = []; // * notaciones ajenas a CDU
  let letrasArray = []; // A/Z
  let puntoCeroCeroArray =[]; // .00 auxiliar especial
  let guionCeroArray =[]; // -0 auxiliar comun dependiente
  let guionNumeroArray= []// -1/-9 Auxiliares especiales
  let puntoCeroArray =[]; // .0 subdivisiones
  let apostrofoArray =[]; // ' 

  
//vamos a hacer un for que recorra el array de entrada y meta cada caso en su array correspondiente, luego ordenaremos esos arrays por separado y al final reunificaremos

//cogemos arraysinpuntos como entrada

for(let i=0; i< arraysinpuntos.length; i++){

    let stringOperar = "";
    stringOperar = arraysinpuntos[i];
  //Se vienen mil ifs
  let regexOperadores = /[+/=:*a/z()«»]/g
  if(regexOperadores.test(stringOperar) == false){
    numeroSimpleArray.push(arraysinpuntos[i]);
  }



}

  

}