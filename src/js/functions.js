console.log('hey! the functions has been loaded! ;)');

// --- 
// # LOAD - SCRIPT
// ---

function loadScript(file, callback)
{   
    // if (jQuery.browser.msie) {//Si el navegador es IE
    //     document.write('<script charset="utf-8" type="text/javascript" src="'+file+'"></script>');
    // } else {//Para el  resto
    var script = document.createElement('script');
    var footer = document.getElementsByTagName('footer')[0];
    // var footer = document.querySelector('footer');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = file;
    script.onreadystatechange = callback;
    script.onload = callback;
    footer.appendChild(script);        
// }      
};

loadScript("assets/js/hamburger.js", MyFileLoaded);
function MyFileLoaded(){
    // console.log('Hamburger script has been loaded! ;)');
}

// if (!window.jQuery) {
//     document.write('<script src="assets/js/hamburger.js" type="text/javascript"><\/script>');
//   }

// --- 
// # GREETING
// ---
// greeting function
// (function(){
//     var theScriptHtml = document.getElementById('greeting-template').innerHTML;
//     var theTemplate = Handlebars.compile(theScriptHtml)
//     var contextObj = {name:"Toni", city:"Barcelona"};
//     var compiledData = theTemplate(contextObj);

//     document.getElementById('greeting').innerHTML = compiledData
// })