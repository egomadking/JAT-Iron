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
          adapter.getJobSearch(
            parseInt(evt.target.dataset.id),
            function (json) {
              //TODO: This is wet when combined with new below
              console.log(this);
              jobSearch.id = json.id;
              jobSearch.name = json.name;
              jobSearch.jobs = json.jobs;
              jobSearch.jobs.forEach((job) => {
                let card = job.buildSummaryCard();
                ui.jobsList.appendChild(card);
              });
              ui.workPane.classList.add('local-is-hidden');
              setTimeout(function () {
                ui.workPane.innerText = '';
              }, 300);
              ui.workPane.classList.add('local-is-hidden');
              ui.sessionButton.innerText = jobSearch.name;
              adapter.setStoredId(json.id);
            },
          );

          //set sessionStorage
        } else if (evt.target.dataset.type === 'new') {
          const field = document.querySelector('#new-session-name');
          if (field.value.length < 3) {
            alert(
              'Session name needs to be greater than 3 characters long',
            );
          } else {
            adapter.postJobSearch(field.value, function (json) {
              jobSearch.id = json.id;
              jobSearch.name = json.name;
              ui.workPane.classList.add('local-is-hidden');
              setTimeout(function () {
                ui.workPane.innerText = '';
              }, 300);
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

    //TODO: JobSearches and Submit buttons event listeners
  }

  //TODO: loadJobs
  //TODO: insertJobs into pane
  //TODO: sortJobsByStatus
}
