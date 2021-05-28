class JobSearch {
  constructor(id) {
    this._id = id || 0;
    this._jobs = [];
    this.name = '';
  }
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  set jobs(arr) {
    //do I want jobs to be objects from fetch or instantiated Jobs?
    this._jobs.length = 0; //temp reset while debugging
    arr.forEach((job) => {
      this._jobs.push(new Job(job));
    });
  }

  get jobs() {
    return this._jobs || [];
  }

  //TODO: Chop up and figure out instance call vs this
  buildJobSearchForm(jobSearchesObj) {
    const cardHeader = _.createElement({
      el: 'div',
      classes: ['card-header'],
    });
    cardHeader.innerHTML = `
      <div class="media-left ml-3 mt-3">
        <figure class="image "></figure>
        <img src="images/jat-iron.svg" width="112" height="28">
        </figure>
      </div>
      <h2 class="card-header-title">Select or create new job search</h2>
    `;
    const cardContent = _.createElement({
      el: 'div',
      classes: ['card-content'],
    });
    cardContent.innerHTML = `
      <h3 class="block">Choose an existing job search session</h3>
      <div class="block" id="existing-job-searches">
        ${(function () {
          return jobSearchesObj
            .map((jobSearch) => {
              return `<button class="button" data-type="existing" data-id="${jobSearch.id}">
                ${jobSearch.name}
                </button>`;
            })
            .join('');
        })()}
      </div>
      <h3 class="block">...or create a new job search</h3>
        <div class="block">
          <div class="field">
            <label class="label" for="new-session-name">Session Name</label>
            <div class="control">
              <input class="input" id="new-session-name" placeholder="e.g. my next adventure!!">
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" data-type="new">Create</button>
            </div>
          </div>
        </div>
    `;

    cardContent.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        ui.jobsList.innerText = '';
        if (evt.target.dataset.type === 'existing') {
          jobSearch.jobs = [];
          adapter.getJobSearch(
            parseInt(evt.target.dataset.id),
            function (json) {
              jobSearch.id = json.id;
              jobSearch.name = json.name;
              jobSearch.jobs = json.jobs;

              jobSearch.populateJobsList(jobSearch.jobs);

              ui.hideWorkPane();
              setTimeout(function () {
                ui.workPane.innerText = '';
              }, 300);

              ui.sessionButton.innerText = jobSearch.name;
              adapter.setStoredId(json.id);
            },
          );
        } else if (evt.target.dataset.type === 'new') {
          const field = document.querySelector('#new-session-name');
          if (field.value.length < 3) {
            alert(
              'Session name needs to be greater than 3 characters long',
            );
          } else {
            jobSearch.jobs = [];
            adapter.postJobSearch(field.value, function (json) {
              jobSearch.id = json.id;
              jobSearch.name = json.name;
              ui.hideWorkPane();
              ui.sessionButton.innerText = jobSearch.name;
              adapter.setStoredId(json.id);
            });
          }
        } else {
          throw 'An unknown button was detected';
        }
      }
    });
    ui.workPane.appendChild(cardHeader);
    ui.workPane.appendChild(cardContent);
  }

  populateJobsList(arr) {
    arr.forEach((job) => {
      const card = job.buildSummaryCard();
      ui.jobsList.appendChild(card);
    });
    ui.jobsList.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        switch (evt.target.dataset.type) {
          case 'show':
            console.log(`#${evt.target.dataset.id} something showy`);
            jobSearch.jobs
              .find((j) => {
                return j.id === parseInt(evt.target.dataset.id);
              })
              .buildViewJob();
            //do something showy
            break;
          case 'edit':
            //TODO: do something edity
            console.log(`#${evt.target.dataset.id} something edity`);
            break;
          case 'add-note':
            //TODO: do something showy
            //TODO: and do something edity
            console.log(`#${evt.target.dataset.id} something notey`);
            break;
          case 'delete':
            //TODO:do something deletey
            console.log(
              `#${evt.target.dataset.id} something deletey`,
            );
            break;
          default:
            console.warn('Case does not match existing options.');
            break;
        }
      }
    });
  }

  filterJobsByStatus(status) {
    let filteredJobs;
    switch (status) {
      case 'all':
        filteredJobs = this.jobs;
        break;
      case 'canx':
        const choices = ['closed', 'rejected', 'declined'];
        filteredJobs = this.jobs.filter((job) =>
          choices.includes(job.status),
        );
        break;
      default:
        filteredJobs = this.jobs.filter(
          (job) => job.status === status,
        );
    }
    //combine those in canx
    ui.jobsList.innerText = '';
    this.populateJobsList(filteredJobs);
  }
}
