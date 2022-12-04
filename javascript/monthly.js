//=========Declared Varibles=========
const currentDate = document.querySelector(".current-date");
daysCount = document.querySelector(".days");
previousNextIcons = document.querySelectorAll(".date-controls a");

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
renderCalendar();

previousNextIcons.forEach(direction => {
    direction.addEventListener("click", () => {
        console.log(direction);
        currentMonth = direction.id === "previous" ? currentMonth - 1 : currentMonth + 1;
        renderCalendar();
    });
});

//=========Function pulls holiday API=========
$.getJSON("https://holidays.abstractapi.com/v1/?api_key=dd743e7089ec4e97bac4ec73d5f502be&country=US&year=2020&month=12&day=25", function(data) {
    console.log(data);
})

