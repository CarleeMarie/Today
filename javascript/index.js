//This displays our current week day and date in the quotes box on the index page
var currentDate = dayjs().format('dddd, MMMM D, YYYY ')
  $("#todays-date").text(currentDate);

//==========Declared varibles==========
//Button varibles
const searchButton = document.getElementById("search-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
//Misc Varibles
let countNumber = document.getElementById("count-number");
let numInput = document.getElementById("input-search");
let quote = document.getElementById("quote");
let quoteWarning = document.getElementById("quote-warning");
//Our starting point for the quote being displayed
let quoteNumber = 0;
//API fetch url 
const quotesUrl = "https://type.fit/api/quotes";

//Here we fetch the API and store it as a json
fetch(quotesUrl)
.then(function(response) {
return response.json();
})
.then(function(data) {
    //==========Event listeners==========
    previousButton.addEventListener("click", function() {
        //Thisa gives our user a message if they try to go past the initial quote
        if (countNumber.value <= 0) {
            quoteWarning.innerHTML = `<b><i>This is the first quote</i></b>`;
        } else {
            countNumber.value = --quoteNumber;
            renderQuote(countNumber.value, data);
        }
        console.log(countNumber);
    });

    nextButton.addEventListener("click", function() {
        if (countNumber.value >= 1642) {
            quoteWarning.innerHTML = `<b><i>This is the last quote :(</i></b>`;
        } else {
            quoteWarning.innerHTML = "";
            countNumber.value = ++quoteNumber;
            renderQuote(countNumber.value, data);
        }
        console.log(countNumber);
    });

    //This function will render our quotes
    function renderQuote(index, data) {
        let quote = document.getElementById("quote");
        
        if (data[index].author == null) {
            data[index].author = "unknown";
        }
        
        let quoteHTML = `<div class="alert alert-outline-primary is-size-4 has-text-centered"><i class="fa fa-quote-left" aria-hidden="true"></i>&nbsp;
                    ${data[index].text} &nbsp;<i class="fa fa-quote-right" aria-hidden="true"></i><br>
                    <span class="is-size-5" style="color:#1766ba; font-weight: bolder;">—
                        ${data[index].author}
                    </span>
                </div>`;
        quote.innerHTML = quoteHTML;
        };
        renderQuote(0, data);
console.log(data);
})

