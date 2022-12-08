var quoteURL="https://type.fit/api/quotes";
fetch(quoteURL)
.then(function (response){
    return response.json();
}) 
.then(function (data){
    console.log(data)
    function recordQuote (){
        var quote=document.getElementById("quote");
        
    }
    ;
})


