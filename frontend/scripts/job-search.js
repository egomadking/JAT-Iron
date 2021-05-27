class JobSearch {
  constructor(id) {
    this._id = id || 0;
    this._jobs = [];
  }
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  set jobs(arr) {
    this._jobs = [...arr];
  }

  get jobs() {
    return this._jobs || [];
  }

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
          <label class="label">Session Name</label>
          <div class="control">
            <input class="input" placeholder="e.g. my next adventure!!">
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
        if (evt.target.dataset.type === 'existing') {
          jobSearch.id = parseInt(evt.target.dataset.id);
          //do something to load jobs
        } else if (evt.target.dataset.type === 'new') {
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
