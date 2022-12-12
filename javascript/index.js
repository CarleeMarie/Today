//Made changes 12/11

//This displays our current week day and date in the quotes box on the index page
var currentDateQuote = dayjs().format('dddd, MMMM D, YYYY ')
  $("#todays-date").text(currentDateQuote);

//==========Declared varibles==========
//Button varibles
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const clearStorage = document.getElementById("clearStorage");
//Misc Varibles
let countNumber = document.getElementById("count-number");
let numInput = document.getElementById("input-search");
let quote = document.getElementById("quote");
let quoteWarning = document.getElementById("quote-warning");
var eventBox = document.getElementById('allEvents');
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
    //Event listener for the previous quote button
    previousButton.addEventListener("click", function() {
        //This gives our user a message if they try to go past the initial quote
        if (countNumber.value <= 0) {
            quoteWarning.innerHTML = `<b><i>This is the first quote</i></b>`;
        } else {
            //Clears warning once they go forward
            countNumber.value = --quoteNumber;
            renderQuote(countNumber.value, data);
        }
    });
    //Event listener for the next quote button
    nextButton.addEventListener("click", function() {
        //This gives our user a warning if they try to go past the last quote
        if (countNumber.value >= 1642) {
            quoteWarning.innerHTML = `<b><i>This is the last quote :(</i></b>`;
        } else {
            //Clears warning once they go backwards
            quoteWarning.innerHTML = "";
            countNumber.value = ++quoteNumber;
            renderQuote(countNumber.value, data);
        }
    });

    //This function will render our quotes
    function renderQuote(index, data) {
        let quote = document.getElementById("quote");
        
        if (data[index].author == null) {
            data[index].author = "unknown";
        }
        //This varibles creates our quote HTML 
        let quoteHTML = `<div class="alert alert-outline-primary is-size-4 has-text-centered"><i class="fa fa-quote-left" aria-hidden="true"></i>&nbsp;
                    ${data[index].text} &nbsp;<i class="fa fa-quote-right" aria-hidden="true"></i><br>
                    <span class="is-size-5" style="color:#1766ba; font-weight: bolder;">—
                        ${data[index].author}
                    </span>
                </div>`;
        //This quotes our quote html into the quote element
        quote.innerHTML = quoteHTML;
        };
        renderQuote(0, data);
});
//This is our clear local storage button
clearStorage.addEventListener("click", function() {
    localStorage.clear();
    eventBox.innerHTML = '';
});


//The next few functions will render our upcoming events on the index page

//Event list buttons
const pastEventButton = document.getElementById('past-event-button');
const todayEventButton = document.getElementById('event-today-button');
const futureEventButton = document.getElementById('future-event-button');
const allEventsButton = document.getElementById('all-events-button');
const defaultEventsButton = document.getElementById('default-events-button');

//Render function
function renderEvents () {
  var eventList = JSON.parse(localStorage.getItem("events"));
  var eventListBox = document.getElementById('allEvents');

    //Here we sort by date then by time
    eventList.sort((a, b) => {
      if(a.date > b.date) return 1;
      if(a.date < b.date) return -1;
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      });

    //The for loop will pull each individual event from the sorted array to render them
  for (let i = 0; i < eventList.length; i++) {
      var uniqueEvent = eventList[i];
      var eventDate = dayjs(uniqueEvent.date);
      var eventTime = uniqueEvent.time;
    //Below we create our list item HTML and add classes to them for styling then append it to the index page
      var createEvent = document.createElement("li");
      createEvent.innerHTML = `<p id="event-title">${uniqueEvent.name}</p><p id=event-info>Date: ${eventDate.format('MM-DD-YYYY')} <br>Time: ${eventTime} <br>Description: ${uniqueEvent.desc}</p>`;
      createEvent.setAttribute("data-date", uniqueEvent.date);
      eventListBox.appendChild(createEvent);
      createEvent.classList.add("event")
      createEvent.setAttribute("id", "created-event")
      
//Add class for past events
      var now = dayjs();
      var currentDate = now.format("MM-DD-YYYY");
      var currentTime = now.format('hh:mm');
      var dateForEvent = eventDate.format("MM-DD-YYYY");
    //We start with if statement, if the date if less than current date we hide the event from the initial opening of the webpage
    //or else we add the event-today or future-event classes for styling
    if (dateForEvent < currentDate) {
        createEvent.classList.add('past-event');
        createEvent.classList.add('past-display');        
      } else if (dateForEvent === currentDate) {
        createEvent.classList.add('event-today'); 
        //Here we have a nested if statement that compares the event time to current time, if it's past then we add a class for styling
        if(uniqueEvent.time < currentTime) {
          createEvent.classList.add('past-time');
        };
      } else {
        createEvent.classList.add('future-event');
      }
  }
}
//Here we render the events from the initial opening of the webpage
renderEvents();

//Event listeners to sort event list by past, today, future and all events
pastEventButton.addEventListener("click", function() {
  $('.past-event').removeClass('past-display');
  $('.event-today').addClass('today-display');
  $('.future-event').addClass('future-display');
});

todayEventButton.addEventListener("click", function() {
  $('.past-event').addClass('past-display');
  $('.event-today').removeClass('today-display');
  $('.future-event').addClass('future-display');
});

futureEventButton.addEventListener("click", function() {
  $('.past-event').addClass('past-display');
  $('.event-today').addClass('today-display');
  $('.future-event').removeClass('future-display');
});

allEventsButton.addEventListener("click", function() {
  $('.past-event').removeClass('past-display');
  $('.event-today').removeClass('today-display');
  $('.future-event').removeClass('future-display');
})

defaultEventsButton.addEventListener("click", function() {
  $('.past-event').addClass('past-display');
  $('.event-today').removeClass('today-display');
  $('.future-event').removeClass('future-display');
})