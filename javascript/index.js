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

//Render function
function renderEvents () {
  var eventList = JSON.parse(localStorage.getItem("events"));
  var eventListBox = document.getElementById('allEvents');

  //Sort by date
    function sortEventsByDate () {
      if(eventList == null){
        return;
      } else{
        eventList.sort(function(a,b){
          return new Date(a.date) - new Date(b.date);
        })
        return eventList;
    }};
    //Next we sort by time
    function sortEventsByTime  () {
      var sortedEvents = sortEventsByDate();
      if(sortedEvents == null){
        return;
      } else{
        sortedEvents.sort(function(a,b){
          return a.time.localeCompare(b.time);
        })
        return eventList;
    }};
    //This varible will hold our fully sorted array
    var fullySortedEvents = sortEventsByTime();  
    //The for loop will pull each individual event from the array to render them
  for (let i = 0; i < fullySortedEvents.length; i++) {
      var uniqueEvent = fullySortedEvents[i];
      var eventDate = dayjs(uniqueEvent.date);
    //Below we create our list item HTML and add classes to them for styling then append it to the index page
      var createEvent = document.createElement("li");
      createEvent.innerHTML = `<p id="event-title">${uniqueEvent.name}</p><p id=event-info>Date: ${eventDate.format('MM-DD-YYYY')} <br>Time: ${uniqueEvent.time} <br>Description: ${uniqueEvent.desc}</p>`;
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
        if(uniqueEvent.time <= currentTime) {
          createEvent.classList.add('past-time');
        } 
      } else {
        createEvent.classList.add('future-event');
      }
  }
}
//Here we render the events from the initial opening of the webpage
renderEvents();


//Attempting to add buttons to view specific events only, will need to work through this in future

// const pastEvents = document.querySelectorAll('.past-event');
// const todayEvents = document.querySelectorAll('.event-today');
// const futureEvents = document.querySelectorAll('.future-event');

// pastEventButton.addEventListener("click", function() {
//     pastEvents.classList.remove('past-display');
//     todayEvents.classList.add('today-display');
//     futureEvents.classList.add('future-display');
// });

// todayEventButton.addEventListener("click", function() {
//     pastEvents.setAttribute("style", "display: none;");
//     todayEvents.setAttribute("style", "display: block;");
//     futureEvents.setAttribute("style", "display: none;");
// });

// futureEventButton.addEventListener("click", function() {
//     pastEvents.setAttribute("style", "display: none;");
//     todayEvents.setAttribute("style", "display: none;");
//     futureEvents.setAttribute("style", "display: block;");
// });

// allEventsButton.addEventListener("click", function() {
//   pastEvents.setAttribute("style", "display: block;");
//   todayEvents.setAttribute("style", "display: block;");
//   futureEvents.setAttribute("style", "display: block;");
// })