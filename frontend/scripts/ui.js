class Ui {
  constructor() {
    this.addHamburgerListeners();
    this.getUiButtons();
    this.getUiTargets();
  }

  addHamburgerListeners() {
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
  }
  getUiButtons() {
    this.logoButton = document.querySelector('#logo-button');
    this.sessionButton = document.querySelector('#session-button');
    this.newJobButton = document.querySelector('#new-job-button');
    this.jobFilterNew = document.querySelector('#job-filter--new');
    this.jobFilterAppliedButton = document.querySelector(
      '#job-filter--applied',
    );
    this.jobInterviewingViewButton = document.querySelector(
      '#job-filter--interviewing',
    );
    this.jobOfferViewButton = document.querySelector(
      '#job-filter--offer',
    );
    this.jobAcceptedViewButton = document.querySelector(
      '#job-filter--accepted',
    );
    this.jobCanxViewButton = document.querySelector(
      '#job-filter--canx',
    );
  }
  getUiTargets() {
    this.jobsList = document.querySelector('#jobs-list');
    this.workPane = document.querySelector('#work-pane');
  }
  redrawJobList(nodeArray) {
    //TODO: takes in HTML and overwrites contents of ui.jobsList
  }
  redrawWorkPane({ header, content }) {
    //TODO: takes in HTML and overwrites contents of ui.workPane
  }
  clearWorkPane() {}
}
