//=========Declared Varibles=========
const currentDate = document.querySelector(".current-date");
daysCount = document.querySelector(".days");
previousNextIcons = document.querySelectorAll(".date-controls a");

//Filter varibles
var country = document.querySelector("country");
var month = document.querySelector("month");
var year = document.querySelector("year");

var apiKey = 'dd743e7089ec4e97bac4ec73d5f502be';
let date = new Date(),
currentYear = date.getFullYear(),
currentMonth = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
console.log(date, currentYear, currentMonth);

//This function will render our calenar
function renderCalendar () {
    let firstDate = new Date(currentYear, currentMonth, 1).getDay(),
    lastDate = new Date(currentYear, currentMonth + 1, 0).getDate(),
    PreviousMonthLast = new Date(currentYear, currentMonth, 0).getDate();
    NextMonthFirst = new Date(currentYear, currentMonth, lastDate).getDay(),
    console.log(lastDate);
    let listTag = "";
//This creates the last few days of previous month to fill calendar
    for (let i = firstDate; i > 0; i--) {
        listTag += `<li class="inactive">${PreviousMonthLast - i + 1}</li>`;
    }
//This highlights our current day if it matches todays date
    for (let i = 1; i <= lastDate; i++) {
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth()
                    && currentYear === new Date().getFullYear() ? "active" : "";
        listTag += `<li data-unique="${currentMonth+1}/${i}/${currentYear}" id="date" class="${isToday} li-date event-modal-trigger" data-target="modal-event"> ${i}</li>`;
    }
    
//Creates next months first days to fill calendar 
    for (let i = NextMonthFirst; i < 6; i++) {
        listTag += `<li class="inactive">${i - NextMonthFirst + 1}</li>`;
    }

    currentDate.innerHTML = `${months[currentMonth]} ${currentYear}` ;
    daysCount.innerHTML = listTag;
}
renderCalendar();

//This is our calendar control function
previousNextIcons.forEach(direction => {
    //This adds a click event to both our left and right icons
    direction.addEventListener("click", () => { 
        //When the previous icon is clicked it will go back a month, else it will increase by one
        currentMonth = direction.id === "previous" ? currentMonth - 1 : currentMonth + 1;
        //This allows our calendar to render months outside of the current year
        if (currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        }else {
            date = new Date();
        }
        renderCalendar();
    });
});
