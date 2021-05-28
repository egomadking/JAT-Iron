class Ui {
  constructor() {
    this.addHamburgerListeners();
    this.getUiButtons();
    this.getUiTargets();
    this.setUiButtonEventListeners();
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
    this.jobFilterButtons = document.querySelector('#filter-buttons');
  }
  getUiTargets() {
    this.jobsList = document.querySelector('#jobs-list');
    this.workPane = document.querySelector('#work-pane');
  }
  setUiButtonEventListeners() {
    this.sessionButton.addEventListener('click', function (evt) {
      adapter.getJobSearches(function (json) {
        jobSearch.buildJobSearchForm(json);
        ui.workPane.classList.remove('local-is-hidden');
      });
    });
    this.jobFilterButtons.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        const filter = evt.target.dataset.filterBy;
        console.log(evt.target.dataset.filterBy);
        jobSearch.filterJobsByStatus(filter);
      }
    });
    this.logoButton.addEventListener('click', function (evt) {
      jobSearch.filterJobsByStatus('all');
    });
  }
  redrawJobList(nodeArray) {
    //TODO: takes in HTML and overwrites contents of ui.jobsList
  }
  redrawWorkPane({ header, content }) {
    //TODO: takes in HTML and overwrites contents of ui.workPane
  }
  clearWorkPane() {}
}
