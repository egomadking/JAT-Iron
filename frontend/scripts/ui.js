const ui = {
  addHamburgerListeners: function () {
    const $navbarBurgers = Array.from(
      document.querySelectorAll('.navbar-burger'),
    );
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  },
  getUiButtons: function () {
    this.logoButton = document.querySelector('#logo-button');
    this.sessionButton = document.querySelector('#session-button');
    this.newJobButton = document.querySelector('#new-job-button');
    this.jobFilterNew = document.querySelector('#job-filter--new');
    this.jobFilterAppliedButton = document.querySelector(
      '#job-filter--applied',
    );
    this.jobFilterInterviewingButton = document.querySelector(
      '#job-filter--interviewing',
    );
    this.jobFilterOfferButton = document.querySelector(
      '#job-filter--offer',
    );
    this.jobFilterAcceptedButton = document.querySelector(
      '#job-filter--accepted',
    );
    this.jobFilterCanxButton = document.querySelector(
      '#job-filter--canx',
    );
    this.closeWorkPaneButton = document.querySelector(
      '#close-work-pane-button',
    );
  },
};
