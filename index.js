

function ordenaCDU(){
  let captura =document.getElementById("input");

  let entrada = '';
  entrada= captura.value;
  entrada.trim();
  

  
  let arrayEntrada = entrada.split(",");
 

  //vamos a quitarle los puntos y luego lo ponemos al primero para que se tome como decimal y el mayor que funcione


  let arraysinpuntos =[];

  
  for (let i= 0; i< arrayEntrada.length; i++){
    let splitTemporal = arrayEntrada[i];
    let splitSegundo = splitTemporal.split('');
    for(let j=0; j<splitSegundo.length; j++){
      let regexcerocero = /(\.00)/g;
      let regexPuntoCero = /(\.0)/g;
      
      if(regexcerocero.test(splitTemporal)==false &&  regexPuntoCero.test(splitTemporal)==false){
       
      if (splitSegundo[j] == ' ' || splitSegundo[j]=='.'){
        splitSegundo.splice(j, 1);
        j=0;
      }
    }else{
      if(splitSegundo[j]== ' '){
        splitSegundo.splice(j,1);
      }
    }
  }
  if(splitSegundo[1] != '.'){
    splitSegundo.splice(1, 0, '.');
  }
    let entexto = splitSegundo.join("");
    entexto.trim();

    arraysinpuntos.push(entexto);
    
  }
  console.log("array sin puntos: "+arraysinpuntos)

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


  let regexOperadores = /[+/=:*a-z A-Z()""«»'-]/g;
  let regexComillas = /\"/g;
  let regexABC = /[a-z A-Z]/g;
  let regexApostrofo = /\'/g;
  let regexcerocero = /(\.00)/g;
  let regexPuntoCero = /(\.0)/g
  let testRegexCeroCero= regexcerocero.test(stringOperar);
  let testRexepuntocero = regexPuntoCero.test(stringOperar);

  let testRegexOperadores = regexOperadores.test(stringOperar);
   // console.log(regexOperadores.test(stringOperar));
  if(testRegexOperadores == false && testRegexCeroCero==false && testRexepuntocero==false){
    numeroSimpleArray.push(arraysinpuntos[i]);
  } else if(stringOperar.indexOf('(=') !=-1){
    parentesisIgualArray.push(arraysinpuntos[i])
  } else if(stringOperar.indexOf('=')!= -1){
    //ya hemos separado los numeros básicos, para no perdernos seguimos el orden de preferencia
    igualArray.push(arraysinpuntos[i]);
  } else if(stringOperar.indexOf('(0')!=-1){
    parentesisCeroArray.push(arraysinpuntos[i]);
  } else if(stringOperar.indexOf('(') != -1){
    parentesisNumeroArray.push(arraysinpuntos[i]);
  } else if(regexComillas.test(stringOperar)==true){
    //para las comillas
    comillasTiempoArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('+') != -1){
    masArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('/') !=-1){
    divisionArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('::') != -1){
    dobleColonArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf(':') != -1){
    colonArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('*') != -1){
    asteriscoArray.push(arraysinpuntos[i]);
  }else if(regexABC.test(stringOperar) == true){
    letrasArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('.00') != -1){
    puntoCeroCeroArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('-0') != -1){
    guionCeroArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('-') != -1){
    guionNumeroArray.push(arraysinpuntos[i]);
  }else if(stringOperar.indexOf('.0') !=-1){
    puntoCeroArray.push(arraysinpuntos[i]);
   }else if(regexApostrofo.test(stringOperar)==true){
    apostrofoArray.push(arraysinpuntos[i]);
   }

}//FIN DEL FOR



//ya están separados en su correspondiente array ahora toca ordenarlos

//ordenar numero simples, vamos a probar con sort que lo mismo con eso ya vale

numeroSimpleArray.sort();

//ah pues si que lo ordena sí, voy a copiarlo a un arrayfinal que será en el que operaremos
let arrayFinal = numeroSimpleArray;

console.log("primer numero simple "+numeroSimpleArray)

//ORDENAR IGUALARRAY........................

let copiaIgualArray = igualArray;

//como vamos a hacerlo ? primero vamos a separar lo que va antes del igual, si es mayor que lo que va antes del igual en la siguiente posición los intercambiamos, si son iguales comparamos lo que va detrás del igual y lo mismo
//recuerda que el ordenamiento de burbuja hay dos bucles para que haga una pasada entera por cada elemento del array

let longitud = copiaIgualArray.length;

for (let i=0; i<copiaIgualArray.length; i++){

  for (let j= 0; j<longitud-1; j++){

    //separamos el numero de delante, pasamos a string para operar con ellos y cortar a partir del igual
    let stringTemporal = '';
    stringTemporal = copiaIgualArray[j];
    let indicePrimero = stringTemporal.indexOf('=');
    let stringTemporalSiguiente = "";
    stringTemporalSiguiente = copiaIgualArray[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('=');
    let antes;
    let antesSiguiente;
    let almacenTemporal;
    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);
    
    //burbuja de orden
    if(antes>antesSiguiente){
      almacenTemporal = copiaIgualArray[j];
      copiaIgualArray[j] = copiaIgualArray[j+1];
      copiaIgualArray[j+1]= almacenTemporal;
    }else if(antes==antesSiguiente){
      //comparamos los numeros de después del =, hay que meterle un punto para que los tome como decimales
      let despues = '';
      let despuesSiguiente = '';
      despues= stringTemporal.slice(indicePrimero+1);
      despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo+1);
      despues = despues.charAt(0) + '.'+ despues.substring(1);
      despuesSiguiente = despuesSiguiente.charAt(0) + '.'+ despuesSiguiente.substring(1);
      if(despues > despuesSiguiente){
        almacenTemporal = copiaIgualArray[j];
        copiaIgualArray[j] = copiaIgualArray[j+1];
        copiaIgualArray[j+1]= almacenTemporal;
        
      }
    }
  }
}
//FIN ORDENAR IGUAL ARRAY------------------------------------

//INICIO ORDENAR PARENTESISCERO ARRAY
let copiaParentesisCero = parentesisCeroArray;

//el funcionamiento es el mismo pero quitamos el ( y el ) y ponemos un punto tras el 0 para que lo tome de decimal

for(let i=0; i<copiaParentesisCero.length; i++){
  for(let j=0; j<copiaParentesisCero.length - 1; j++){

    let stringTemporal ='';//para poder usar slice con el indice
    stringTemporal = copiaParentesisCero[j];
    let indicePrimero = stringTemporal.indexOf('(');
    let indiceCierrePrimero = stringTemporal.indexOf(')');

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente = copiaParentesisCero[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('(');
    let indiceCierreSegundo = stringTemporalSiguiente.indexOf(')');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes= stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaParentesisCero[j];
      copiaParentesisCero[j] = copiaParentesisCero[j+1];
      copiaParentesisCero[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero+1, indiceCierrePrimero);
      despues = despues.charAt(0) + '.'+ despues.substring(1);
      let despuesSiguiente =stringTemporalSiguiente.slice(indiceSegundo+1, indiceCierreSegundo);
      despuesSiguiente = despuesSiguiente.charAt(0) + '.'+ despuesSiguiente.substring(1);
      //codigo de mierda, no vales para nada, el python es mejor, pringao, necesitas mil lineas para una chorrada
      if(despues > despuesSiguiente){
        almacenTemporal = copiaParentesisCero[j];
        copiaParentesisCero[j] = copiaParentesisCero[j+1];
        copiaParentesisCero[j+1] = almacenTemporal;
      }
    }
  }
}
//FIN ORDENAR PARENTESISCERO ARRAY---------------------------------

//INICIO ORDENAR PARENTESIS NUMERO ARRAY--------------

let copiaParentesisNumero = parentesisNumeroArray;

for(let i=0; i<copiaParentesisNumero.length;i++){
  for(let j=0; j< copiaParentesisNumero.length-1; j++){
    let stringTemporal="";
    stringTemporal =copiaParentesisNumero[j];
    let indicePrimero = stringTemporal.indexOf('(');
    let indiceCierrePrimero =stringTemporal.indexOf(')');

    let stringTemporalSiguiente = "";
    stringTemporalSiguiente= copiaParentesisNumero[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('(');
    let indiceCierreSegundo = stringTemporalSiguiente.indexOf(')');
   
    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice (0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaParentesisNumero[j];
      copiaParentesisNumero[j] =copiaParentesisNumero[j+1];
      copiaParentesisNumero[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero, indiceCierrePrimero);
      despues = despues.charAt(0)+ '.'+ despues.substring(1);

      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo, indiceCierreSegundo);
      despuesSiguiente= despuesSiguiente.charAt(0)+'.'+despuesSiguiente.substring(1);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaParentesisNumero[j];
        copiaParentesisNumero[j] = copiaParentesisNumero[j+1];
        copiaParentesisNumero[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR PARENTESIS NUMERO------------------------

//INICIO ORDENAR PARENTESIS IGUAL----------------------

let copiaParentesisIgual = parentesisIgualArray;

for(let i=0; i < copiaParentesisIgual.length;i++){
  for(let j=0; j< copiaParentesisIgual.length-1;j++){

    let stringTemporal='';
    stringTemporal = copiaParentesisIgual[j];

    let indicePrimero = stringTemporal.indexOf('(');
    let igualPrimero = stringTemporal.indexOf('=');
    let indiceCierrePrimero = stringTemporal.indexOf(')');

    let stringTemporalSiguiente = copiaParentesisIgual[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('(');
    let igualSegundo =stringTemporalSiguiente.indexOf('=');
    let indiceCierreSegundo = stringTemporalSiguiente.indexOf(')');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes= stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaParentesisIgual[j];
      copiaParentesisIgual[j] = copiaParentesisIgual[j+1];
      copiaParentesisIgual[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(igualPrimero, indiceCierrePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(igualSegundo, indiceCierreSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaParentesisIgual[j];
        copiaParentesisIgual[j] = copiaParentesisIgual[j+1];
        copiaParentesisIgual[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR PARENTESIS IGUAL------------------------

//INICIO ORDENAR COMILLAS TIEMPO---------------------------

let copiaComillas = comillasTiempoArray;
//el tiempo tiene características unicas, hay que ver el numero de digitos, si son cuatro es el año, tres habla de decenio, 2 de siglo y uno con milenio esto lo podemos solucionar añadiendo ceros hasta llegar a cuatro cifras, además lleva la barra para indicar extensión, para tratar eso habrá que comparar el numero principal como en todos pero dentro de las comillas habrá que separar comparar si el primero es igual y luego ordenar en base al 2º más alto

for(let i=0; i<copiaComillas.length; i++){
  for(let j=0; j<copiaComillas.length-1; j++){

    let stringTemporal = '';
    stringTemporal = copiaComillas[j];

    let indicePrimero = stringTemporal.indexOf('"');
    let indiceSeparador = stringTemporal.indexOf('/');

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente = copiaComillas[j+1];

    let indiceSegundo = stringTemporalSiguiente.indexOf('"');
    let indiceSeparadorSiguiente = stringTemporalSiguiente.indexOf('/');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){

      almacenTemporal = copiaComillas[j];
      copiaComillas[j] = copiaComillas[j+1];
      copiaComillas[j+1]= almacenTemporal;
      
    }else if(antes == antesSiguiente){
      let primeraFechaAntes;
      let segundaFechaAntes = '';
      //comprobar si la fecha es compuesta
      if(indiceSeparador != -1){
       primeraFechaAntes = stringTemporal.slice(indicePrimero+1, indiceSeparador-1);
      if(primeraFechaAntes.length==1){
        primeraFechaAntes += 000;
      }else if(primeraFechaAntes.length==2){
        primeraFechaAntes += 00;
      }else if(primeraFechaAntes.length==3){
        primeraFechaAntes +=0;
      }else{
        primeraFechaAntes = stringTemporal.slice(indicePrimero+1, indiceSeparador-1);
      }


      
       segundaFechaAntes =stringTemporal.slice(indiceSeparador+1, -1);


      if(segundaFechaAntes.length==1){
        segundaFechaAntes+=000;
      }else if(segundaFechaAntes.length == 2){
        segundaFechaAntes +=00;
      }else if(segundaFechaAntes.length == 3){
        segundaFechaAntes +=0;
      }
      }else{
        primeraFechaAntes = stringTemporal.slice(indicePrimero+1, -1)
      }

     let  primeraFechaAntesNumero = parseInt(primeraFechaAntes);
     let segundaFechaAntesNumero = parseInt(segundaFechaAntes);
  
      //comprobar si la siguiente fecha es compuesta
      let primeraFechaSiguiente;
      let segundaFechaSiguiente = '';
      if(indiceSeparadorSiguiente !=-1){
         primeraFechaSiguiente = stringTemporalSiguiente.slice(indiceSegundo+1, indiceSeparadorSiguiente-1);

        if(primeraFechaSiguiente.length==1){
          primeraFechaSiguiente +=000;
        }else if(primeraFechaSiguiente.length==2){
          primeraFechaSiguiente += 00;
        }else if(primeraFechaSiguiente.length ==3){
          primeraFechaSiguiente += 0;
        }

        
        
        segundaFechaSiguiente= stringTemporalSiguiente.slice(indiceSeparadorSiguiente+1, -1);
        if(segundaFechaSiguiente.length==1){
          segundaFechaSiguiente +=000;
        }else if(segundaFechaSiguiente.length == 2){
          segundaFechaSiguiente +=00;
        }else if(segundaFechaSiguiente.length == 3){
          segundaFechaSiguiente +=0;
        }else{
          segundaFechaSiguiente = stringTemporalSiguiente.slice(indiceSeparadorSiguiente+1, -1);
        }
        
      }else{
        primeraFechaSiguiente = stringTemporalSiguiente.slice(indiceSegundo+1, -1);
      }
      let primeraFechaSiguienteNumero = parseInt(primeraFechaSiguiente);
      let segundaFechaSiguienteNumero = parseInt(segundaFechaSiguiente);
      

    if(primeraFechaAntesNumero > primeraFechaSiguienteNumero){
      almacenTemporal = copiaComillas[j];
      copiaComillas[j] = copiaComillas[j+1];
      copiaComillas[j+1] = almacenTemporal;
    }else if(primeraFechaAntesNumero == primeraFechaSiguienteNumero){
   
      if(segundaFechaAntesNumero < segundaFechaSiguienteNumero){
        almacenTemporal = copiaComillas[j+1];
        copiaComillas[j+1] = copiaComillas[j];
        copiaComillas[j] = almacenTemporal;
        
      }
    }
    }
  }
}//FIN ORDENAR COMILLAS TIEMPO----------------------------------



//INICIO ORDENAR MÁS---------------------------------------------

let copiaMas = masArray;

for(let i=0; i<copiaMas.length;i++){
  for(let j=0; j<copiaMas.length-1;j++){
    let stringTemporal ='';
    stringTemporal = copiaMas[j];
    let indicePrimero = stringTemporal.indexOf('+');

    let stringTemporalSiguiente ='';
    stringTemporalSiguiente = copiaMas[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('+');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaMas[j];
      copiaMas[j] = copiaMas[j+1];
      copiaMas[j+1] = almacenTemporal;
    }else if(antes== antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaMas[j];
        copiaMas[j] = copiaMas[j+1];
        copiaMas[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR MÁS-----------------------------------

//INICIO ORDENAR DIVISION-----------------------------------

//no te engañes por el nombre, que no divide, amplía
let copiaDivision = divisionArray;

for(let i=0; i< copiaDivision.length; i++){
  for(let j=0; j<copiaDivision.length-1; j++){

    let stringTemporal = '';
    stringTemporal = copiaDivision[j];
    let indicePrimero = stringTemporal.indexOf('/');

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente = copiaDivision[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('/');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes= stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal =copiaDivision[j];
      copiaDivision[j] = copiaDivision[j+1];
      copiaDivision[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues= stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);
      if(despues < despuesSiguiente){
        almacenTemporal= copiaDivision[j];
        copiaDivision[j] = copiaDivision[j+1];
        copiaDivision[j+1]= almacenTemporal;
      }
    }
  }
}//FIN ORDENAR DIVISION------------------------------------

//INICIO ORDENAR COLON--------------------------------------

let copiaColon = colonArray;

for(let i=0; i<copiaColon.length;i++){
  for(let j=0; j<copiaColon.length-1; j++){

    let stringTemporal='';
    stringTemporal= copiaColon[j];
    let indicePrimero = stringTemporal.indexOf(':');

    let stringTemporalSiguiente='';
    stringTemporalSiguiente = copiaColon[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf(':');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaColon[j];
      copiaColon[j]=copiaColon[j+1];
      copiaColon[j+1] =almacenTemporal;
    }else if(antes==antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaColon[j];
        copiaColon[j] = copiaColon[j+1];
        copiaColon[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR COLON--------------------------------------

//INICIO ORDENAR DOBLE COLON-------------------------------

//para evitar lios con los indices lo mejor es detectar el primer colon y darle +2 para pasar al siguiente

let copiaDobleColon = dobleColonArray;

for(let i=0; i< copiaDobleColon.length; i++){
  for(let j=0; j< copiaDobleColon.length-1; j++){

    let stringTemporal = '';
    stringTemporal = copiaDobleColon[j];
    let indicePrimero = stringTemporal.indexOf(':');

    let stringTemporalSiguiente ='';
    stringTemporalSiguiente = copiaDobleColon[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf(':');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaDobleColon[j];
      copiaDobleColon[j] = copiaDobleColon[j+1];
      copiaDobleColon[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero+2);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo+2);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaDobleColon[j];
        copiaDobleColon[j] = copiaDobleColon[j+1];
        copiaDobleColon[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR DOBLE COLON--------------------------------

//INICIO ORDENAR ASTERISCO----------------------------------

//he googleado y el orden del asterisco va como todos los demás porque a veces se usa también para cdu como auxiliar, cuando es notaciones ajenas pos a saber 

let copiaAsterisco = asteriscoArray;

for(let i=0; i< copiaAsterisco.length;i++){
  for(let j=0; j<copiaAsterisco.length-1;j++){

    let stringTemporal ='';
    stringTemporal = copiaAsterisco[j];
    let indicePrimero = stringTemporal.indexOf('*');

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente = copiaAsterisco[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('*');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes= stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaAsterisco[j];
      copiaAsterisco[j] = copiaAsterisco[j+1];
      copiaAsterisco[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaAsterisco[j];
        copiaAsterisco[j] = copiaAsterisco[j+1];
        copiaAsterisco[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR ASTERISCOS---------------------------------

//INICIO ORDENAR ALFABETICO--------------------------------

//en principio no debería haber problema con esto porque la comparación de strings va bien pero habrá que probar, encontrar el indice sí es distinto
let copiaLetras = letrasArray;

for(let i=0; i< copiaLetras.length; i++){
  for(let j=0; j< copiaLetras.length-1; j++){

    let stringTemporal ='';
    stringTemporal = copiaLetras[j];
    let indicePrimero = stringTemporal.search(/[A-Z a-z]/g);

    let stringTemporalSiguiente ='';
    stringTemporalSiguiente = copiaLetras[j+1];
    let indiceSegundo = stringTemporalSiguiente.search(/[A-Z a-z]/g);

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes= stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);
    
    if(antes > antesSiguiente){

      almacenTemporal = copiaLetras[j];
      copiaLetras[j] = copiaLetras[j+1];
      copiaLetras[j+1] = almacenTemporal;
    }else if(antes== antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaLetras[j];
        copiaLetras[j] =copiaLetras[j+1];
        copiaLetras[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR ALFABÉTICO-------------------------------------

//INICIO ORDENAR CEROCERO--------------------------------------

let copiaCeroCero = puntoCeroCeroArray; 

for(let i=0; i<copiaCeroCero.length; i++){
  for(let j=0; j<copiaCeroCero.length-1; j++){

    let stringTemporal = '';
    stringTemporal = copiaCeroCero[j];
    let indicePrimero = stringTemporal.indexOf('.00');

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente = copiaCeroCero[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('.00');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes= stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0,indiceSegundo);
  

    if(antes > antesSiguiente){
      almacenTemporal = copiaCeroCero[j];
      copiaCeroCero[j]= copiaCeroCero[j+1];
      copiaCeroCero[j+1]= almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente  = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaCeroCero[j];
        copiaCeroCero[j] = copiaCeroCero[j+1];
        copiaCeroCero[j+1] = almacenTemporal;
      }
    }
  }
}//FIN CERO CERO-------------------------------------------------

//INICIO ORDENAR GUIÓN CERO--------------------------------

let copiaGuionCero = guionCeroArray;

for(let i=0; i< copiaGuionCero.length; i++){
  for(let j=0; j<copiaGuionCero.length-1; j++){

    let stringTemporal = '';
    stringTemporal = copiaGuionCero[j];
    let indicePrimero = stringTemporal.indexOf('-');

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente = copiaGuionCero[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('-');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes= stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente ){
      almacenTemporal = copiaGuionCero[j];
      copiaGuionCero[j] = copiaGuionCero[j+1];
      copiaGuionCero[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaGuionCero[j];
        copiaGuionCero[j] = copiaGuionCero[j+1];
        copiaGuionCero[j+1]= almacenTemporal;
      }
    }
  }
}//FIN ORDENAR GUION CERO-------------------------------------

//INICIO ORDENAR GUION NUMEROS--------------------------------

let copiaGuionNumero = guionNumeroArray;

for(let i=0; i< copiaGuionNumero.length; i++){
  for( let j=0; j<copiaGuionNumero.length-1; j++){

    let stringTemporal = '';
    stringTemporal = copiaGuionNumero[j];
    let indicePrimero = stringTemporal.indexOf('-');

    let stringTemporalSiguiente= '';
    stringTemporalSiguiente = copiaGuionNumero[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('-');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes =stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaGuionNumero[j];
      copiaGuionNumero[j] = copiaGuionNumero[j+1];
      copiaGuionNumero[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaGuionNumero[j];
        copiaGuionNumero[j]= copiaGuionNumero[j+1];
        copiaGuionNumero[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR GUION NUMERO--------------------------------

//INICIO ORDENAR PUNTO CERO--------------------------------

let copiaPuntoCero = puntoCeroArray;


for(let i=0; i<copiaPuntoCero.length; i++){
  for(let j=0; j<copiaPuntoCero.length-1; j++){

    let stringTemporal = '';
    stringTemporal = copiaPuntoCero[j];
    let indicePrimero =stringTemporal.indexOf('.0');

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente = copiaPuntoCero[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf('.0');

    let antes;
    let antesSiguiente;
    let almacenTemporal;

    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);
  

    if(antes > antesSiguiente){
      almacenTemporal = copiaPuntoCero[j];
      copiaPuntoCero[j] = copiaPuntoCero[j+1];
      copiaPuntoCero[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaPuntoCero[j];
        copiaPuntoCero[j] = copiaPuntoCero[j+1];
        copiaPuntoCero[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ORDENAR PUNTO CERO----------------------------------------

//INICIO ORDENAR APOSTROFO-------------------------------------

let copiaApostrofo = apostrofoArray;

for(let i=0; i<copiaApostrofo.length; i++){
  for (let j = 0; j<copiaApostrofo.length-1; j++){
    let stringTemporal = '';
    stringTemporal = copiaApostrofo[j];
    let indicePrimero = stringTemporal.indexOf("'");

    let stringTemporalSiguiente = '';
    stringTemporalSiguiente =copiaApostrofo[j+1];
    let indiceSegundo = stringTemporalSiguiente.indexOf("'");

    let antes; 
    let antesSiguiente;
    let almacenTemporal;

    antes = stringTemporal.slice(0, indicePrimero);
    antesSiguiente = stringTemporalSiguiente.slice(0, indiceSegundo);

    if(antes > antesSiguiente){
      almacenTemporal = copiaApostrofo[j];
      copiaApostrofo[j] = copiaApostrofo[j+1];
      copiaApostrofo[j+1] = almacenTemporal;
    }else if(antes == antesSiguiente){
      let despues = stringTemporal.slice(indicePrimero);
      let despuesSiguiente = stringTemporalSiguiente.slice(indiceSegundo);

      if(despues > despuesSiguiente){
        almacenTemporal = copiaApostrofo[j];
        copiaApostrofo[j] = copiaApostrofo[j+1];
        copiaApostrofo[j+1] = almacenTemporal;
      }
    }
  }
}//FIN ULTIMO ORDENAR------------------------------------


console.log("llegue después de ordenar todo")
//Vale, ahora hay que coger el de numeros normales y en el orden de los operadores y metiendolos donde corresponde

//entonces la idea es ir recorriendo ambos arrays con un bucle doble, el grande con el array a insertar y el de dentro recorre el array en el que se insertará, se puede usar splice para meterlo en el indice correcto

//insertamos array mas 

for (let i= 0; i< copiaMas.length;i++){
  for (let j=0; j<=arrayFinal.length;j++){

 
    let stringComparar = copiaMas[i];
    let indicePrimero = stringComparar.indexOf('+');
    let antes = stringComparar.slice(0, indicePrimero);


    let stringInsertar = arrayFinal[j];
    if(antes != '' && stringInsertar!=''){
    if (antes <= stringInsertar){
      arrayFinal.splice(j, 0, copiaMas[i]);
      break
    }
  }
  }
}
if(arrayFinal.length ==0 && copiaMas.length !=0){
  for(let i=0; i<copiaMas.length;i++){
    arrayFinal.push(copiaMas[i]);
  }
}
//añadir los de division

for(let i=0; i<copiaDivision.length;i++){
  for(let j=0; j<arrayFinal.length;j++){
    //vale comparamos lo de antes del simbolo, añadimos una comprobación para ver si el siguiente elemento tiene el mismo numero y un más en cuyo caso no lo metemos
    let stringComparar = arrayFinal[j];
    let indicePrimero = stringComparar.indexOf('+');
    let antes;
    if(indicePrimero != -1){
    antes = stringComparar.slice(0, indicePrimero);
    } else {
      antes = stringComparar;
    }

    let antesSiguiente;
    if(j != arrayFinal.length-1){
      let stringSiguiente = arrayFinal[j+1]//para ver si después va más o numero normal
       antesSiguiente;
      let indiceSiguiente = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      if(indiceSiguiente !=-1){
        antesSiguiente = stringSiguiente.slice(0,indiceSiguiente )
      }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else{
        antesSiguiente = stringSiguiente
      }
    }
    
    

    let stringDivision = copiaDivision[i];
    let indiceDivision = stringDivision.indexOf('/');
    let antesDivision = stringDivision.slice(0, indiceDivision);

    let regexOperadores = /[+/=:*a-z A-Z()«»]/g;

    if(j==0){
      if(antesDivision < antes){
        arrayFinal.splice(j,0, copiaDivision[i]);
        break
      }
    }else if(regexOperadores.test(antes)==false && antesDivision== antes){
      arrayFinal.splice(j,0, copiaDivision[i])
      break
    } else if(antesDivision > antes && antesDivision < antesSiguiente){

      arrayFinal.splice(j+1,0, copiaDivision[i]);

    }else if(j == arrayFinal.length-1 &&regexOperadores.test(stringComparar)== false && antesDivision > stringComparar){
     //miramos si el ultimo numero del array es numero normal y si el nuestro es mayor entonces lo metemos después

     arrayFinal.splice(j+1,0, copiaDivision[i]);
     break
    } 
   
  }
}

if(arrayFinal.length==0){
  arrayFinal.push(copiaDivision)
}

//Añadir colon. No debería tener misterio, buscamos el punto en el que sea mayor o igual que el anterior y menor que el siguiente, usamos ifs para separar la parte sin signo para compararlos bien 

for(let i=0;i < copiaColon.length; i++){
  for(let j=0; j<arrayFinal.length;j++){

    let stringColon = copiaColon[i];
    let indiceColon = stringColon.indexOf(':');
    let antesColon = stringColon.slice(0, indiceColon);

    let stringComparar = arrayFinal[j];
    //indices para cada cosa luego el que no sea -1 se usa para el slice
    let indiceSuma = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceComparar = stringComparar.indexOf(':');
    let antes;
    if(indiceSuma != -1){
      antes= stringComparar.slice(0, indiceSuma);
    }else if(indiceDivision !=-1){
      antes= stringComparar.slice(0, indiceDivision);
    }else if(indiceComparar != -1){
      antes = stringComparar.slice(0, indiceComparar);
    }else{
      antes = stringComparar;
    }

    let stringSiguiente
    let indiceSumaSiguiente
    let indiceDivisionSiguiente 
    let indiceSiguienteColon
    let antesSiguiente;

    if(j != arrayFinal.length-1){
    stringSiguiente = arrayFinal[j+1];
     indiceSumaSiguiente = stringSiguiente.indexOf('+');
     indiceDivisionSiguiente = stringSiguiente.indexOf('/');
     indiceSiguienteColon = stringSiguiente.indexOf(':');
    
    if(indiceSumaSiguiente !=-1){
      antesSiguiente = stringSiguiente.slice(0, indiceSuma);
    }else if(indiceDivisionSiguiente != -1){
      antesSiguiente = stringSiguiente.slice(0, indiceDivisionSiguiente);
    }else if(indiceSiguienteColon !=-1){
      antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
    }else{
      antesSiguiente = stringSiguiente;
    }
  }

    if(j==0 && antesColon < antes){
      arrayFinal.splice(j, 0, copiaColon[i]);
      break;
    }else if(antesColon >= antes && antesColon < antesSiguiente){
      
        arrayFinal.splice(j+1,0, copiaColon[i]);
        break;
    }else if(j == arrayFinal.length-1 ){
      
      arrayFinal.splice(j+1,0, copiaColon[i]);
      break;
    }
  }
}
if(arrayFinal.length==0){
  arrayFinal.push(copiaColon);
}

//vamos con doble colon, a grandes rasgos funciona igual que el anterior porque ya va ordenado y solo hay que mirar la parte de delante

for(let i=0; i<copiaDobleColon.length;i++){
  for(let j=0; j<arrayFinal.length;j++){

    //como antes pero añadiendo más casos a los ifs de antes
    let stringDobleColon = copiaDobleColon[i];
    let indiceDobleColon = stringDobleColon.indexOf(':');
    let antesDobleColon = stringDobleColon.slice(0, indiceDobleColon);


    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let antes;

    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else {
      antes = stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;
    if(j!= arrayFinal.length-1){
     stringSiguiente = arrayFinal[j+1];
    let indiceSiguienteMas = stringSiguiente.indexOf('+');
    let indiceSiguienteDivision = stringSiguiente.indexOf('/');
    let indiceSiguienteColon = stringSiguiente.indexOf(':');
     antesSiguiente;
    if(indiceSiguienteMas !=-1){
      antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
    }else if(indiceSiguienteDivision != -1){
      antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
    }else if(indiceSiguienteColon != -1){
      antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
    }else{
      antesSiguiente = stringSiguiente
    }
  }
    if(j==0 && antesDobleColon < antes){
      arrayFinal.splice(j,0, copiaDobleColon[i]);
      break;
    }else if(antesDobleColon >= antes && antesDobleColon < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaDobleColon[i]);
      break;
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1, 0, copiaDobleColon[i]);
      break
    }
    
  }
}

if(arrayFinal.length == 0){
  arrayFinal.push(copiaDobleColon);
}

//Vamos a introducir los igual, funciona en fin igual, encontrar el punto en que el anterior es menor o igual y el siguiente mayor y meterlo ahí

for(let i=0; i<copiaIgualArray.length; i++){
  for(let j=0; j< arrayFinal.length; j++){

    let stringIgual = copiaIgualArray[i];
    let indiceIgual = stringIgual.indexOf('=');
    let antesIgual = stringIgual.slice(0, indiceIgual);

    let stringComparar = arrayFinal[j];
    let indiceMas  = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgualAntes = stringComparar.indexOf('=')
    let antes;
    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision)
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgualAntes != -1){
      antes = stringComparar.slice(0, indiceIgualAntes);
    }else{
      antes= stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;
    if(j!= arrayFinal.length-1){
    stringSiguiente = arrayFinal[j+1];
    let indiceSiguienteMas = stringSiguiente.indexOf('+');
    let indiceSiguienteDivision = stringSiguiente.indexOf('/');
    let indiceSiguienteColon = stringSiguiente.indexOf(':');
    let indiceIgualSiguiente = stringSiguiente.indexOf('=');

    if(indiceSiguienteMas !=-1){
      antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
    }else if(indiceSiguienteDivision !=-1){
      antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
    }else if(indiceSiguienteColon != -1){
      antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
    }else if(indiceIgualSiguiente != -1){
      antesSiguiente = stringSiguiente.slice(0, indiceIgualSiguiente);
    }else{
      antesSiguiente = stringSiguiente;
    }
  }

  
  

    if(j==0 && antesIgual< antes){
      arrayFinal.splice(j, 0 , copiaIgualArray[i]);
      break
    }else if( antesIgual >= antes && antesIgual < antesSiguiente ){
      arrayFinal.splice(j+1,0, copiaIgualArray[i]);
      break
    }else if(j== arrayFinal.length -1){
      arrayFinal.splice(j+1,0, copiaIgualArray[i]);
      break
    }
    
  }
}

if(arrayFinal.length == 0){
  arrayFinal.push(copiaIgualArray);
}

//vamos al de parentesis cero, todos los de parentesis son iguales

for(let i=0; i<copiaParentesisCero.length;i++){
  for(let j=0; j<arrayFinal.length; j++){

    let stringParentesis = copiaParentesisCero[i];
    let indiceParentesis = stringParentesis.indexOf('(');
    let antesParentesis = stringParentesis.slice(0, indiceParentesis);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesisAntes = stringComparar.indexOf('(')
    let antes;

    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual !=-1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesisAntes !=-1){
      antes = stringComparar.slice(0, indiceParentesisAntes);
    }else{
      antes = stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j!= arrayFinal.length-1){
      
      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis= stringSiguiente.indexOf('(');

      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else{
        antesSiguiente = stringSiguiente;
      }
    }

    if(j==0 && antesParentesis < antes){
      arrayFinal.splice(j,0, copiaParentesisCero[i]);
      break
    }else if(antesParentesis >= antes && antesParentesis < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaParentesisCero[i]);
      break
    }else if(j==arrayFinal.length-1){
      arrayFinal.splice(j+1, 0, copiaParentesisCero[i]);
      break
    }
  }
}

if(arrayFinal.length==0){
  arrayFinal.push(copiaParentesisCero);
}

//ahora copiaparentesisNumero

for(let i=0; i< copiaParentesisNumero.length; i++){
  for(let j=0; j< arrayFinal.length;j++){

    let stringParentesisNumero = copiaParentesisNumero[i];
    let indiceParentesis = stringParentesisNumero.indexOf('(');
    let antesParentesisNumero = stringParentesisNumero.slice(0, indiceParentesis);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual =stringComparar.indexOf('=');
    let indiceParentesisAntes = stringComparar.indexOf('(');
    let antes;

    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision !=-1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesisAntes !=-1){
      antes = stringComparar.slice(0, indiceParentesisAntes);
    }else{
      antes = stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){
      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');

      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else{
        antesSiguiente =stringSiguiente;
      }
    }

    if(j==0 && antesParentesisNumero< antes ){
      arrayFinal.splice(j, 0, copiaParentesisNumero[i]);
      break
    }else if(antesParentesisNumero >= antes && antesParentesisNumero < antesSiguiente){
      arrayFinal.splice(j+1, 0, copiaParentesisNumero[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1, 0, copiaParentesisNumero[i]);
      break
    }
  }
}

if(arrayFinal.length==0){
  arrayFinal.push(copiaParentesisNumero);
}

//parentesis igual
for(let i=0; i<copiaParentesisIgual.length; i++){
  for(let j=0; j<arrayFinal.length; j++){

    let stringParentesisIgual = copiaParentesisIgual[i];
    let indiceParentesisIgual = stringParentesisIgual.indexOf('(');
    let antesParentesisIgual = stringParentesisIgual.slice(0,indiceParentesisIgual);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let antes;
    //al estar más arriba salta antes el indice del parentesis que del igual entonces coge el igual no el parentesis y trastoca el orden, así si hay tanto uno como otro los igualamos y arreglamos la comparación
    if(indiceIgual !=-1 && indiceParentesis !=-1){
      indiceIgual= indiceParentesis
    }

    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if( indiceDivision != -1){
      antes =stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else{
      antes = stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){
      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');

      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis != -1){
        indiceSiguienteIgual = indiceSiguienteParentesis
      }

      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else{
        antesSiguiente = stringSiguiente;
      }
    }
    

    if(j==0 && antesParentesisIgual < antes){
      arrayFinal.splice(j,0, copiaParentesisIgual[i]);
      break
    }else if( antesParentesisIgual >= antes && antesParentesisIgual < antesSiguiente){
      arrayFinal.splice(j+1, 0, copiaParentesisIgual[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1,0, copiaParentesisIgual[i]);
      break
    }

  }
}

if(arrayFinal.length ==0){
  arrayFinal.push(copiaParentesisIgual);
}

//ahora el de las comillas a ver si lo detectamos con index of hay que estar pendiente por si vuelve a pasar lo de los =  y el paréntesis

for(let i= 0; i<copiaComillas.length;i++){
  for (let j=0; j<arrayFinal.length; j++){

    let stringComillas = copiaComillas[i];
    let indiceComillas = stringComillas.indexOf('\"');
    let antesComillas = stringComillas.slice(0, indiceComillas);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceAntesComillas = stringComparar.indexOf('\"');
    let antes;

    //hay que igualar cuando hay = y () y cuando se da que hay "" y / para dividirla
    if(indiceIgual !=-1 && indiceParentesis !=-1){
      indiceIgual = indiceParentesis;
    }
    if(indiceAntesComillas != -1 && indiceDivision !=-1){
      indiceDivision = indiceAntesComillas;
    }

    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon !=-1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual !=-1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceAntesComillas != -1){
      antes = stringComparar.slice(0, indiceAntesComillas);
    }else{
      antes = stringComparar;
    }
   

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){
      stringSiguiente = arrayFinal[j+1];
      
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');

      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis !=-1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }
      if(indiceSiguienteComillas != -1 && indiceSiguienteDivision != -1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }


      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis)
      }else if(indiceSiguienteComillas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
      }else{
        antesSiguiente = stringSiguiente;
      }
    }


    if(j==0 && antesComillas < antes){
      arrayFinal.splice(j,0, copiaComillas[i]);
      break
    }else if(antesComillas >= antes && antesComillas < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaComillas[i]);
      break
    }else if(j == arrayFinal.length -1){
      arrayFinal.splice(j+1, 0, copiaComillas[i]);
      break
    }
  }
}

if(arrayFinal.length==0){
  arrayFinal.push(copiaComillas);
}

//asterisco

for(let i=0; i<copiaAsterisco.length;i++){
  for(let j=0; j<arrayFinal.length;j++){

    let stringAsterisco = copiaAsterisco[i];
    let indiceAsterisco = stringAsterisco.indexOf('*');
    let antesAsterisco = stringAsterisco.slice(0, indiceAsterisco);


    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceComillas = stringComparar.indexOf('\"');
    let indiceAntesAsterisco = stringComparar.indexOf('*');
    let antes;
    if(indiceDivision !=-1 && indiceComillas !=-1){
      indiceDivision = indiceComillas;
    }
    if(indiceIgual !=-1 && indiceParentesis!=-1){
      indiceIgual = indiceParentesis;
    }

    if(indiceMas !=-1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceComillas != -1){
      antes = stringComparar.slice(0, indiceComillas);
    }else if(indiceAntesAsterisco !=-1){
      antes = stringComparar.slice(0, indiceAntesAsterisco);
    }else{
      antes =stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){
      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');
      let indiceSiguienteAsteristo = stringSiguiente.indexOf('*');
      
      
      if(indiceSiguienteDivision !=-1 && indiceSiguienteComillas != -1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }
      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis !=-1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }

      if(indiceSiguienteMas !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else if(indiceSiguienteComillas !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
      }else if(indiceSiguienteAsteristo !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteAsteristo)
      }else{
        antesSiguiente = stringSiguiente;
      }
    }
  

    if(j==0 && antesAsterisco < antes ){
      arrayFinal.splice(j,0, copiaAsterisco[i]);
      break
    }else if(antesAsterisco >= antes && antesAsterisco < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaAsterisco[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1, 0, copiaAsterisco[i]);
      break
    }

  }
}

if(arrayFinal.length == 0){
  arrayFinal.push(copiaAsterisco);
}

//para copialetras hay que usar el metodo search con un regex a-z A-Z porque indexof no vale para usar regex

for(let i=0; i<copiaLetras.length;i++){
  for(let j= 0; j<arrayFinal.length; j++){

    let stringLetras = copiaLetras[i];
    let indiceLetras = stringLetras.search(/[A-Z a-z]/g);
    let antesLetras = stringLetras.slice(0, indiceLetras);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceComillas = stringComparar.indexOf('\"');
    let indiceAsterisco = stringComparar.indexOf('*');
    let indiceAntesLetras = stringComparar.search(/[A-Z a-z]/g);
    let antes;

    if(indiceDivision !=-1 && indiceComillas !=-1){
      indiceDivision = indiceComillas;
    }
    if(indiceIgual != -1 && indiceParentesis != -1){
      indiceIgual = indiceParentesis;
    }
    //a veces tras asterisco hay letras
    if(indiceAsterisco !=-1 && indiceAntesLetras !=-1){
      indiceAntesLetras = indiceAsterisco;
    }

    if(indiceMas !=-1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon !=-1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual !=-1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis !=-1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceComillas != -1){
      antes = stringComparar.slice(0, indiceComillas);
    }else if(indiceAsterisco !=-1){
      antes =stringComparar.slice(0, indiceAsterisco);
    }else if(indiceAntesLetras != -1){
      antes = stringComparar.slice(0, indiceAntesLetras);
    }else{
      antes = stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){

      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');
      let indiceSiguienteAsterisco = stringSiguiente.indexOf('*');
      let indiceSiguienteLetras = stringSiguiente.search(/[A-Z a-z]/g);

      if(indiceSiguienteDivision != -1 && indiceSiguienteComillas !=-1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }
      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis!=-1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }
      if(indiceSiguienteAsterisco !=-1 && indiceSiguienteLetras !=-1){
        indiceSiguienteLetras = indiceSiguienteAsterisco;
      }

      if(indiceSiguienteMas !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else if(indiceSiguienteComillas !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
      }else if(indiceSiguienteAsterisco !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteAsterisco);
      }else if(indiceSiguienteLetras !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteLetras);
      }else{
        antesSiguiente = stringSiguiente;
      }
    }

   

    if(j== 0 && antesLetras < antes){
      arrayFinal.splice(j,0, copiaLetras[i]);
      break;
    }else if(antesLetras >= antes && antesLetras < antesSiguiente){
      arrayFinal.splice(j+1, 0, copiaLetras[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1, 0, copiaLetras[i]);
      break
    }

  }
}

if(arrayFinal.length==0){
  arrayFinal.push(copiaLetras);
}

//ahora con 00 no debería tener problema es igual

for(let i=0; i<copiaCeroCero.length;i++){
  for(let j=0; j<arrayFinal.length;j++){

    let stringCero = copiaCeroCero[i];
    let indiceCero = stringCero.indexOf('.00');
    let antesCero = stringCero.slice(0, indiceCero+1);
    
   

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceComillas = stringComparar.indexOf('\"');
    let indiceAsterisco = stringComparar.indexOf('*');
    let indiceLetras = stringComparar.search(/[A-Z a-z]/g);
    let indiceAntesCero = stringComparar.indexOf(".00");
    let antes;

    if(indiceDivision !=-1 && indiceComillas !=-1){
      indiceDivision = indiceComillas;
    }
    if(indiceIgual != -1 && indiceParentesis !=-1){
      indiceIgual = indiceParentesis;
    }
    if(indiceAsterisco != -1 && indiceLetras != -1){
      indiceLetras = indiceAsterisco;
    }

    if(indiceMas !=-1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceComillas != -1){
      antes = stringComparar.slice(0, indiceComillas);
    }else if(indiceAsterisco != -1){
      antes = stringComparar.slice(0, indiceAsterisco);
    }else if(indiceLetras != -1){
      antes = stringComparar.slice(0, indiceLetras);
    }else if(indiceAntesCero != -1){
      antes = stringComparar.slice(0, indiceAntesCero+1);
    }else{
      antes = stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){

      stringSiguiente = arrayFinal[j+1];

      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');
      let indiceSiguienteAsterisco = stringSiguiente.indexOf('*');
      let indiceSiguienteLetras = stringSiguiente.search(/[A-Za-z]/g);
      let indiceSiguienteCero = stringSiguiente.indexOf('.00');
      

      if(indiceSiguienteDivision != -1 &&  indiceSiguienteComillas != -1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }
      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis != -1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }
      if(indiceSiguienteAsterisco !=-1 && indiceSiguienteLetras !=-1){
        indiceSiguienteLetras = indiceSiguienteAsterisco;
      }
      
      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else if(indiceSiguienteComillas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
      }else if(indiceSiguienteAsterisco != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteAsterisco);
      }else if(indiceSiguienteLetras != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteLetras);
      }else if(indiceSiguienteCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteCero+1);
      }else{
        antesSiguiente = stringSiguiente;
      }
    }

    if(j==0 && antesCero <antes){
      arrayFinal.splice(j,0, copiaCeroCero[i]);
      break
    }else if(antesCero >= antes && antesCero < antesSiguiente){
      arrayFinal.splice(j+1, 0, copiaCeroCero[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1,0, copiaCeroCero[i]);
      break
    }

  }
}

if(arrayFinal.length == 0){
  arrayFinal.push(copiaCeroCero);
}

//guión cero

for(let i=0; i<copiaGuionCero.length;i++){
  for(let j=0; j<arrayFinal.length;j++){

    let stringGuionCero = copiaGuionCero[i];
    let indiceGuion = stringGuionCero.indexOf('-');
    let antesGuion = stringGuionCero.slice(0, indiceGuion);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceComillas = stringComparar.indexOf('\"');
    let indiceAsterisco = stringComparar.indexOf('*');
    let indiceLetras = stringComparar.search(/[A-Z a-z]/g);
    let indiceCero = stringComparar.indexOf(".00");
    let indiceAntesGuion = stringComparar.indexOf('-');
    let antes;

    if(indiceDivision != -1 && indiceComillas != -1){
      indiceDivision = indiceComillas;
    }
    if(indiceIgual !=-1 &&indiceParentesis != -1){
      indiceIgual = indiceParentesis;
    }
    if(indiceAsterisco!= -1 && indiceLetras != -1){
      indiceLetras = indiceAsterisco;
    }

    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceComillas != -1){
      antes = stringComparar.slice(0, indiceComillas);
    }else if(indiceAsterisco != -1){
      antes = stringComparar.slice(0, indiceAsterisco);
    }else if(indiceLetras != -1){
      antes = stringComparar.slice(0,indiceLetras);
    }else if(indiceCero != -1){
      antes = stringComparar.slice(0, indiceCero+1);
    }else if(indiceAntesGuion != -1){
      antes = stringComparar.slice(0, indiceAntesGuion);
    }else {
      antes = stringComparar;
    }


    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){
      
      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');
      let indiceSiguienteAsterisco = stringSiguiente.indexOf('*');
      let indiceSiguienteLetras = stringSiguiente.search(/[A-Z a-z]/g);
      let indiceSiguienteCero = stringSiguiente.indexOf('.00');

      if(indiceSiguienteDivision != -1 && indiceSiguienteComillas != -1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }
      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis != -1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }
       if(indiceSiguienteAsterisco != -1 && indiceSiguienteLetras != -1){
        indiceSiguienteLetras = indiceSiguienteAsterisco;
       }

       if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
       }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
       }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
       }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
       }else if(indiceSiguienteParentesis != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
       }else if(indiceSiguienteComillas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
       }else if(indiceSiguienteAsterisco != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteAsterisco);
       }else if(indiceSiguienteLetras != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteLetras);
       }else if(indiceSiguienteCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteCero+1);
       }

    }

    if(j==0 && antesGuion < antes){
      arrayFinal.splice(j,0, copiaGuionCero[i]);
      break
    }else if(antesGuion >= antes && antesGuion < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaGuionCero[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1,0, copiaGuionCero[i]);
      break
    }
  }
}

if(arrayFinal.length == 0){
  arrayFinal.push(copiaGuionCero);
}

//copia guión numero, hay que usar regex /(-[1-9])/g para cogerlo

for(let i=0; i<copiaGuionNumero.length; i++){
  for(let j=0; j<arrayFinal.length;j++){

    let stringGuionNumero = copiaGuionNumero[i];
    let indiceGuionNumero = stringGuionNumero.indexOf('-');
    let antesGuion = stringGuionNumero.slice(0, indiceGuionNumero);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceComillas = stringComparar.indexOf('\"');
    let indiceAsterisco = stringComparar.indexOf('*');
    let indiceLetras = stringComparar.search(/[A-Za-z]/g);
    let indiceCero = stringComparar.indexOf('.00');
    let indiceGuionCero = stringComparar.indexOf('-0');
    let indiceAntesNumero = stringComparar.search(/(-[1-9])/g);
    let antes;

    if(indiceDivision !=-1 && indiceComillas != -1){
      indiceDivision = indiceComillas;
    }
    if(indiceIgual != -1 && indiceParentesis != -1){
      indiceIgual = indiceParentesis;
    }
    if(indiceLetras != -1 && indiceAsterisco != -1){
      indiceLetras = indiceAsterisco;
    }

    if(indiceMas != -1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceComillas != -1){
      antes = stringComparar.slice(0, indiceComillas);
    }else if(indiceAsterisco != -1){
      antes = stringComparar.slice (0, indiceAsterisco);
    }else if(indiceLetras != -1){
      antes = stringComparar.slice(0, indiceLetras);
    }else if(indiceCero != -1){
      antes = stringComparar.slice(0, indiceCero+1);
    }else if(indiceGuionCero != -1){
      antes = stringComparar.slice(0, indiceGuionCero+1);
    }else if(indiceAntesNumero != -1){
      antes = stringComparar.slice(0, indiceAntesNumero+1);
    }else{
      antes = stringComparar;
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){

      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis= stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');
      let indiceSiguienteAsterisco = stringSiguiente.indexOf('*');
      let indiceSiguienteLetras = stringSiguiente.search(/[A-Za-z]/g);
      let indiceSiguienteCero = stringSiguiente.indexOf('.00');
      let indiceSiguienteGuionCero = stringSiguiente.indexOf('-0');

      if(indiceSiguienteDivision != -1 && indiceSiguienteComillas != -1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }
      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis!= -1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }
      if(indiceSiguienteLetras != -1 && indiceSiguienteAsterisco != -1){
        indiceSiguienteLetras = indiceSiguienteAsterisco;
      }


      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else if(indiceSiguienteComillas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
      }else if(indiceSiguienteAsterisco != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteAsterisco);
      }else if(indiceSiguienteLetras !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteLetras);
      }else if(indiceSiguienteCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteCero+1);
      }else if(indiceSiguienteGuionCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteGuionCero);
      }else {
        antesSiguiente = stringSiguiente;
      }
    }

    if(j==0 && antesGuion <antes){
      arrayFinal.splice (j,0, copiaGuionNumero[i]);
      break
    }else if(antesGuion >= antes && antesGuion < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaGuionNumero[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1, 0, copiaGuionNumero[i]);
      break
    }

  }
}

if(arrayFinal.length ==0){
  arrayFinal.push(copiaGuionNumero);
}

//punto cero

for(let i=0; i<copiaPuntoCero.length;i++){
  for(let j=0; j<arrayFinal.length;j++){
    
    let stringPuntoCero = copiaPuntoCero[i];
    let indicePuntoCero = stringPuntoCero.indexOf('.0');
    let antesPuntoCero = stringPuntoCero.slice(0, indicePuntoCero);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceComillas = stringComparar.indexOf('\"');
    let indiceAsterisco = stringComparar.indexOf('*');
    let indiceLetras = stringComparar.search(/[A-Za-z]/g);
    let indiceCeroCero = stringComparar.indexOf('.00');
    let indiceGuionCero = stringComparar.indexOf('-0');
    let indiceGuionNumero = stringComparar.search(/(-[1-9])/g);
    let indiceAntesPuntoCero = stringComparar.indexOf('.0');
    let antes;

    if(indiceDivision != -1 && indiceComillas != -1){
      indiceDivision = indiceComillas;
    }
    if(indiceIgual != -1 && indiceParentesis != -1){
      indiceIgual = indiceParentesis;
    }
    if(indiceAsterisco != -1 && indiceLetras != -1){
      indiceLetras  = indiceAsterisco;
    }

    if(indiceMas != -1){
      antes = stringComparar.slice (0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice (0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceComillas != -1){
      antes = stringComparar.slice(0, indiceComillas);
    }else if(indiceAsterisco != -1){
      antes = stringComparar.slice(0, indiceAsterisco);
    }else if(indiceLetras != -1){
      antes = stringComparar.slice(0, indiceLetras);
    }else if(indiceCeroCero != -1){
      antes = stringComparar.slice(0, indiceCeroCero+1);
    }else if(indiceGuionCero !=-1){
      antes=stringComparar.slice(0, indiceGuionCero)
    }else if(indiceGuionNumero != -1){
      antes = stringComparar.slice(0, indiceGuionNumero);
    }else if(indiceAntesPuntoCero != -1){
      antes = stringComparar.slice(0, indiceAntesPuntoCero+1);
    }else{
      antes = stringComparar
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){

      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');
      let indiceSiguienteAsterisco = stringSiguiente.indexOf('*');
      let indiceSiguienteLetras = stringSiguiente.search(/[A-Za-z]/g);
      let indiceSiguienteCeroCero = stringSiguiente.indexOf('.00');
      let indiceSiguienteGuionCero = stringSiguiente.indexOf('-0');
      let indiceSiguienteGuionNumero = stringSiguiente.search(/(-[1-9])/g);


      if(indiceSiguienteDivision != -1 && indiceSiguienteComillas != -1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }
      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis != -1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }
      if(indiceSiguienteLetras != -1 && indiceSiguienteAsterisco != -1){
        indiceSiguienteLetras = indiceSiguienteAsterisco;
      }

      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else if(indiceSiguienteComillas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
      }else if(indiceSiguienteAsterisco != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteAsterisco)
      }else if(indiceSiguienteLetras != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteLetras);
      }else if(indiceSiguienteCeroCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteCeroCero+1);
      }else if(indiceSiguienteGuionCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteGuionCero);
      }else if(indiceSiguienteGuionNumero != -1){
        antesSiguiente = stringSiguiente.slice(0,indiceSiguienteGuionNumero);
      }else{
        antesSiguiente = stringSiguiente;
      }
    }

    if(j==0 && antesPuntoCero< antes ){
      arrayFinal.splice(j,0, copiaPuntoCero[i]);
      break
    }else if(antesPuntoCero >=antes && antesPuntoCero < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaPuntoCero[i]);
      break
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1,0, copiaPuntoCero[i]);
      break
    }

  }
}

if(arrayFinal.length == 0){
  arrayFinal.push(copiaPuntoCero);
}

//copia Apostrofo
for(let i=0; i< copiaApostrofo.length; i++){
  for(let j = 0; j<arrayFinal.length;j++){

    let stringApostrofo = copiaApostrofo[i];
    let indiceApostrofo = stringApostrofo.indexOf("'");
    let antesApostrofo = stringApostrofo.slice(0, indiceApostrofo);

    let stringComparar = arrayFinal[j];
    let indiceMas = stringComparar.indexOf('+');
    let indiceDivision = stringComparar.indexOf('/');
    let indiceColon = stringComparar.indexOf(':');
    let indiceIgual = stringComparar.indexOf('=');
    let indiceParentesis = stringComparar.indexOf('(');
    let indiceComillas = stringComparar.indexOf('\"');
    let indiceAsterisco = stringComparar.indexOf('*');
    let indiceLetras = stringComparar.search(/[A-Za-z]/g);
    let indiceCeroCero = stringComparar.indexOf('.00');
    let indiceGuionCero = stringComparar.indexOf('-0');
    let indiceGuionNumero = stringComparar.search(/(-[1-9])/g);
    let indicePuntoCero = stringComparar.indexOf('.0');
    let indiceAntesApostrofo = stringComparar.indexOf("'");
    let antes;

    if(indiceDivision != -1 && indiceComillas != -1){
      indiceDivision = indiceComillas;
    }
    if(indiceIgual != -1 && indiceParentesis != -1){
      indiceIgual = indiceParentesis;
    }
    if(indiceAsterisco != -1  && indiceLetras != -1){
      indiceLetras = indiceAsterisco;
    }

    if(indiceMas !=-1){
      antes = stringComparar.slice(0, indiceMas);
    }else if(indiceDivision != -1){
      antes = stringComparar.slice(0, indiceDivision);
    }else if(indiceColon != -1){
      antes = stringComparar.slice(0, indiceColon);
    }else if(indiceIgual != -1){
      antes = stringComparar.slice(0, indiceIgual);
    }else if(indiceParentesis != -1){
      antes = stringComparar.slice(0, indiceParentesis);
    }else if(indiceComillas != -1){
      antes = stringComparar.slice(0, indiceComillas);
    }else if(indiceAsterisco != -1){
      antes = stringComparar.slice(0, indiceAsterisco);
    }else if(indiceLetras !=-1){
      antes= stringComparar.slice(0, indiceLetras);
    }else if(indiceCeroCero != -1){
      antes = stringComparar.slice(0, indiceCeroCero+1);
    }else if(indiceGuionCero != -1){
      antes = stringComparar.slice(0, indiceGuionCero);
    }else if(indiceGuionNumero != -1){
      antes =stringComparar.slice(0, indiceGuionNumero);
    }else if(indicePuntoCero != -1){
      antes = stringComparar.slice(0, indicePuntoCero+1);
    }else if(indiceAntesApostrofo !=-1){
      antes =stringComparar.slice(0, indiceAntesApostrofo);
    }else{
      antes = stringComparar
    }

    let stringSiguiente;
    let antesSiguiente;

    if(j != arrayFinal.length-1){
      stringSiguiente = arrayFinal[j+1];
      let indiceSiguienteMas = stringSiguiente.indexOf('+');
      let indiceSiguienteDivision = stringSiguiente.indexOf('/');
      let indiceSiguienteColon = stringSiguiente.indexOf(':');
      let indiceSiguienteIgual = stringSiguiente.indexOf('=');
      let indiceSiguienteParentesis = stringSiguiente.indexOf('(');
      let indiceSiguienteComillas = stringSiguiente.indexOf('\"');
      let indiceSiguienteAsterisco = stringSiguiente.indexOf('*');
      let indiceSiguienteLetras = stringSiguiente.search(/[A-Za-z]/g);
      let indiceSiguienteCeroCero = stringSiguiente.indexOf('.00');
      let indiceSiguienteGuionCero = stringSiguiente.indexOf('-0');
      let indiceSiguienteGuionNumero = stringSiguiente.search(/(-[1-9])/g);
      let indiceSiguientePuntoCero = stringSiguiente.indexOf('.0');

      if(indiceSiguienteDivision !=-1 && indiceSiguienteComillas != -1){
        indiceSiguienteDivision = indiceSiguienteComillas;
      }
      if(indiceSiguienteIgual != -1 && indiceSiguienteParentesis !=-1){
        indiceSiguienteIgual = indiceSiguienteParentesis;
      }
      if(indiceSiguienteLetras != -1 && indiceSiguienteAsterisco !=-1){
        indiceSiguienteLetras = indiceSiguienteAsterisco;
      }

      if(indiceSiguienteMas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteMas);
      }else if(indiceSiguienteDivision !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteDivision);
      }else if(indiceSiguienteColon != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteColon);
      }else if(indiceSiguienteIgual != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteIgual);
      }else if(indiceSiguienteParentesis !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteParentesis);
      }else if(indiceSiguienteComillas != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteComillas);
      }else if(indiceSiguienteAsterisco != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteAsterisco);
      }else if(indiceSiguienteLetras != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteLetras);
      }else if(indiceSiguienteCeroCero !=-1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteCeroCero+1);
      }else if(indiceSiguienteGuionCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguienteGuionCero);
      }else if(indiceSiguienteGuionNumero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceGuionNumero);
      }else if(indiceSiguientePuntoCero != -1){
        antesSiguiente = stringSiguiente.slice(0, indiceSiguientePuntoCero+1);
      }else{
        antesSiguiente = stringSiguiente;
      }
    }

    if(j==0 && antesApostrofo <antes){
      arrayFinal.splice(j,0, copiaApostrofo[i]);
      break
    }else if(antesApostrofo >= antes && antesApostrofo < antesSiguiente){
      arrayFinal.splice(j+1,0, copiaApostrofo[i]);
    break;
    }else if(j== arrayFinal.length-1){
      arrayFinal.splice(j+1,0, copiaApostrofo[i]);
      break
    }

  }
}

//Hay que añadir los auxiliares independientes metiendolos en el if inicial, ordenandolos y luego aqui al final los empujamos al inicio. Hay que procesar el output para que salga con un punto cada tres numeros

console.log("mas "+ copiaMas);//hecho
console.log("division "+ copiaDivision);//hecho
console.log("numero normal "+numeroSimpleArray);//hecho
console.log("colon "+ copiaColon);//hecho
console.log("doble colon " + copiaDobleColon); //hecho
console.log("igual " + copiaIgualArray); //hecho
console.log("parentesis cero " + copiaParentesisCero);//hecho
console.log("parentesis numero " + copiaParentesisNumero);//hecho
console.log("parentesis igual " + copiaParentesisIgual);//hecho
console.log("comillas " + copiaComillas);//hecho
console.log("asterisco " + copiaAsterisco);//hecho
console.log("Letras " + copiaLetras);//hecho
console.log("cero cero" + copiaCeroCero);//hecho
console.log("guion cero" + copiaGuionCero);//hecho
console.log("guion numero " + copiaGuionNumero);//hecho
console.log("punto cero " + copiaPuntoCero);//hecho
console.log("apostrofo " + copiaApostrofo);//hecho
console.log("array final = "+arrayFinal)
}//FIN DE LA FUNCION

//usando esto de entrada de prueba 1, 1/45, 1+34, 1:23, 1=111, 1(034),1(345), 1::24, 1(=490),1"2005", 2, 2/65, 2"1900/2000",2"2005", 2"1990/2000", 3, 3(490), 1*asd, 2*asd, 3*asd, 1ARTUREZ, 2MARTINEZ, 2ATAULFO, 1.0023, 11.0023, 2.0034, 2.0021, 4.0056, 1-023, 1-024, 2-045, 3-065, 1-24, 2-34, 3-43, 3-21, 2.02, 2.045, 3.02, 2'12, 2'09, 1'1223