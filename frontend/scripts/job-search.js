class JobSearch {
  constructor(id) {
    this._id = id || 0;
  }
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  buildJobSearchForm() {
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
      <div class="media-right">
        <button class="button delete is-dark" id="close-work-pane-button"></button>
      </div>
    `;
    const cardContent = _.createElement({
      el: 'div',
      classes: ['card-content'],
    });
    //TODO: generate existing job search buttons and insert into cardContent's innerHTML
    const existingJobSearches = 'something';
    cardContent.innerHTML = `
      <h3 class="block">Choose an existing job search session</h3>
      <div class="block" id="existing-job-searches">
        <button class="button">Search 1</button>
        <button class="button">Search 2</button>
        <button class="button">Search 3</button>
        <button class="button">Search 45</button>
      </div>
      <h3 class="block">...or create a new job search</h3>

      <form action="">
        <div class="field">
          <label class="label">Session Name</label>
          <div class="control">
            <input class="input" placeholder="e.g. my next adventure!!">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Create</button>
          </div>
        </div>
      </form>
    `;
    ui.workPane.appendChild(cardHeader);
    ui.workPane.appendChild(cardContent);
    //TODO: Submit button event listener
  }

  //TODO: loadJobs
  //TODO: insertJobs into pane
  //TODO: sortJobsByStatus
}
