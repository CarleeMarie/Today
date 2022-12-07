//find API call that will return the hourly data for the current day (read document) show from current hour to midnight most relevant information is always at the top
//look up how to request the information from the data and 
// browser storage?

//use day and time as ID, pulling from eventModal.js (which sets the time)

//create junk id and store in local storage

//write code to pull that junk data and test code

//localStorage.setValue(key, value_you_want_stored)

function renderDay () {
    
    const today = new Date();
    let currentHour = today.getHours();
    console.log(today);
    console.log(currentHour);

    let listTag = "";

    for (let i = firstDate; i > 0; i--) {
        listTag += `<li class="inactive">${PreviousMonthLast - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        console.log(i);
        listTag += `<li>${i}</li>`;
    }

    for (let i = NextMonthFirst; i < 6; i++) {
        listTag += `<li class="inactive">${i - NextMonthFirst + 1}</li>`;
    }

    currentDate.innerHTML = `${months[currentMonth]} ${currentYear}` ;
    daysCount.innerHTML = listTag;
}

renderDay();

function saveEvent() {
    var event = (".hour)
    localStorage.setItem("hours[1]", entry());

localStorage.setItem("event", )

localStorage.getItem()

// var currentTime = document.getElementById("#"

// localStorage.getItem()

// dayjs().hour() 
 


