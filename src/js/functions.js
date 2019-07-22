// class Main{
//     init():void {
//       console.log("Hello Typescript")
//     }
// }

// var main = new Main();
// main.init();

console.log('Hola! soyjjhh');

// greeting function
(function(){
    var theScriptHtml = document.getElementById('greeting-template').innerHTML;
    var theTemplate = Handlebars.compile(theScriptHtml)
    var contextObj = {name:"Toni", city:"Barcelona"};
    var compiledData = theTemplate(contextObj);

    document.getElementById('greeting').innerHTML = compiledData
})