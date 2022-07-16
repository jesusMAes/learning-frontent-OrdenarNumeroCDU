

function ordenaCDU(){
  let captura =document.getElementById("input");

  let entrada = '';
  entrada= captura.value;
  entrada.trim();
  
  //primera entrada de prueba: 
  //   725 «20» , 725 (084.11) , 725 , 725.91 , 725 + 745 , 725=02
  
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


  let regexOperadores = /[+/=:*a/z()«»""']/g;
  let regexComillas = /\"/g;
  let regexABC = /[a-z A-Z]/g;
  let regexApostrofo = /\'/g;
    
  if(regexOperadores.test(stringOperar) == false){
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
         primeraFechaSiguiente = stringTemporalSiguiente.slice(indicePrimero, indiceSeparadorSiguiente-1);

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
        primeraFechaSiguiente = stringTemporalSiguiente.slice(indicePrimero+1, -1);
      }
      let primeraFechaSiguienteNumero = parseInt(primeraFechaSiguiente);
      let segundaFechaSiguienteNumero = parseInt(segundaFechaSiguiente);
      
    //QUEDO TRABAJANDO EN ARREGLAR PRIMERA FECHA SIGUIENTE NUMERO
      console.log(primeraFechaSiguienteNumero);
    if(primeraFechaAntesNumero > primeraFechaSiguienteNumero){
      almacenTemporal = copiaComillas[j];
      copiaComillas[j] = copiaComillas[j+1];
      copiaComillas[j+1] = almacenTemporal;
    }else if(primeraFechaAntesNumero == primeraFechaSiguienteNumero){
   
      if(segundaFechaAntesNumero < segundaFechaSiguienteNumero){
        almacenTemporal = copiaComillas[j];
        copiaComillas[j+1] = copiaComillas[j];
        copiaComillas[j] = copiaComillas[j+1];
        
      }
    }
    }
  }
}

console.log(copiaComillas)
}//FIN DE LA FUNCION