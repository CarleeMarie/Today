//Modal controls area, this will open and close modal
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.event-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.key === "Escape") { // Escape key
      closeAllModals();
    }
  });
});

//Modal form input area
//Varibles
var saveButton = document.getElementById('save-event');
var eventNameInput = document.getElementById('event-name');
var eventDescInput = document.getElementById('event-description');
var eventDateInput = document.getElementById('start');
var eventTimeInput = document.getElementById('time');

//Event listener for save
saveButton.addEventListener("click", function() {
  saveEvent()
  //This will clear our inputs
  eventNameInput.value = '';
  eventDescInput.value = '';
  eventDateInput.value = '';
  eventTimeInput.value = '';
  window.location.reload(true);
});

//This function will save our form inputs
function saveEvent() {
  //form varibles
  var eventName = eventNameInput.value;
  var eventDesc = eventDescInput.value;
  var eventTime = eventTimeInput.value;
  var eventDateFirst = dayjs(eventDateInput.value);
  var eventDate = eventDateFirst.format('MM-DD-YYYY');
  //create an event entry from form input
  var newEvent = {
    name: eventName,
    desc: eventDesc,
    date: eventDate,
    time: eventTime,
  };

  //Adding event to local storage
  var events = getEventFromStorage();
  events.push(newEvent);
  saveEventToStorage(events);
};

function getEventFromStorage() {
  var events = localStorage.getItem('events');
  if (events) {
    events = JSON.parse(events);
  } else {
    events = [];
  }
  return events;
};
//Saves to local storage
function saveEventToStorage(events) {
  localStorage.setItem('events', JSON.stringify(events));
};