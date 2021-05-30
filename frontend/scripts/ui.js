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
    this.body = document.querySelector('body');
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
        jobSearch.buildJobsListByStatus(filter);
      }
    });
    this.logoButton.addEventListener('click', function (evt) {
      jobSearch.buildJobsListByStatus('all');
    });
    this.newJobButton.addEventListener('click', function (evt) {
      Job.openBlankForm();
    });
  }
  clearWorkPane = () => {
    this.workPane.innerText = '';
  };
  hideWorkPane = () => {
    if (![...this.workPane.classList].includes('local-is-hidden')) {
      this.workPane.classList.add('local-is-hidden');
      this.body.classList.remove('scroll-disabled');
      setTimeout(() => {
        this.workPane.innerText = '';
      }, 300);
    } else {
      console.warn('Workpane is already hidden. Check your state.');
    }
  };
  showWorkPane = () => {
    if ([...this.workPane.classList].includes('local-is-hidden')) {
      this.workPane.classList.remove('local-is-hidden');
      this.body.classList.add('scroll-disabled');
    } else {
      console.warn('Workpane is already shown. Check your state.');
    }
  };
}
