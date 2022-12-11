//This modal is not currently being user but will in future developments
//Modal functionality 
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
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
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



  //Modal HTML for when we can implement it
  // This is the filters modal that we will add functionality to
  //   <div id="modal-js-example" class="modal">
  //     <div class="modal-background"></div>
    
  //     <div class="modal-content">
  //       <div class="box">
  //         <h2 class="has-text-centered is-size-4">Filters</h2>
  //         <!--Country select-->
  //         <p>Select Country</p>
  //         <div class="field">
  //           <p class="control has-icons-left is-expanded">
  //             <span class="select is-fullwidth">
  //               <select>
  //                 <option selected>Country</option>
  //                 <option id="US">US</option>
  //                 <option id="CA">Canada</option>
  //                 <option id="CN">China</option>
  //                 <option id="MX">Mexico</option>
  //               </select>
  //             </span>
  //             <span class="icon is-small is-left">
  //               <i class="fas fa-globe"></i>
  //             </span>
  //           </p>
  //         </div>
  //         <!--City input-->
  //         <div class="field">
  //           <label class="label">Enter City</label>
  //           <div class="control">
  //             <input class="input" type="text" placeholder="e.g Chicago">
  //           </div>
  //         </div>

  //         <!--Color theme Select-->
  //         <p>Select Color Theme</p>
  //         <div class="buttons field is-grouped is-grouped-centered">
  //           <!--Need to change button is-class to new settings to set color themes-->
  //           <button class="button is-info">Color</button>
  //           <button class="button is-success">Color</button>
  //           <button class="button is-warning">Color</button>
  //           <button class="button is-danger">Color</button>
  //         </div>
          
  //         <!--Filters submit and cancel buttons-->
  //         <div class="field is-grouped is-grouped-centered">
  //           <div class="control">
  //             <button id="submit" class="button is-link">Submit</button>
  //           </div>
  //           <div class="control">
  //             <button id="cancel" class="button is-link is-light">Cancel</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
      
  //     <button class="modal-close is-large" aria-label="close"></button>
  //   </div>