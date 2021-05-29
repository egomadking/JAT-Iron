class Job {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.url = obj.url || 'none provided';
    this.company_logo = obj.company_logo || 'images/suitcase.png';
    this.description = obj.description;
    this.recruiter_name = obj.recruiter_name;
    this.recruiter_phone = obj.recruiter_phone;
    this.recruiter_email = obj.recruiter_email || '';
    this.poc_notes = obj.poc_notes || '';
    this.posted = obj.posted;
    this.closed = obj.closed;
    this.status = obj.status;
  }

  //TODO: update only key/values in post return object
  //not used quite yet
  massUpdate(obj) {
    Object.assign(this, obj);
  }

  buildSummaryCard() {
    const li = _.createElement({ el: 'li', classes: ['block'] });
    const card = _.createElement({ el: 'div', classes: ['card'] });
    const header = _.createElement({
      el: 'header',
      classes: ['card-header'],
    });
    header.innerHTML = `
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="${this.company_logo}" alt="logo">
        </figure>
      </div>

      <p class="card-header-title">${this.title}</p>

      <div class="media-right">
        <h2 class="card-header-title ">Company Name, Location</h2>
      </div>
    `;
    const cardContent = _.createElement({
      el: 'div',
      classes: ['card-content'],
    });
    let recruiterEmail = this.recruiter_email;
    if (this.recruiter_email === '') {
      recruiterEmail = 'no email address provided';
    } else {
      recruiterEmail = `email: <a href="${this.recruiter_email}">${this.recruiter_email}</a>`;
    }
    cardContent.innerHTML = `
      <div class="content">

        <p class="block">POC: ${this.recruiter_name} 
            | ${recruiterEmail} 
            | tel: <a href="tel:${this.recruiter_phone}">${this.recruiter_phone}</a></p>
        <p class="block">Open: ${this.posted} Closed ${this.closed}</p>
        
      </div>
    `;
    const cardFooter = _.createElement({
      el: 'footer',
      classes: ['card-footer'],
    });
    cardFooter.innerHTML = `
      <button class="card-footer-item button" data-type="show" data-id="${this.id}">Show</button>
      <button class="card-footer-item button" data-type="edit" data-id="${this.id}">Edit</button>
      <button class="card-footer-item button" data-type="add-note" data-id="${this.id}">Add Note(#)</button>
      <button class="card-footer-item button" data-type="delete" data-id="${this.id}">Delete</button>
    `;

    li.appendChild(card);
    card.appendChild(header);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);

    return li;
  }

  buildViewJob() {
    const cardHeader = _.createElement({
      el: 'div',
      classes: ['card-header'],
    });
    cardHeader.innerHTML = `
      <div class="media-left ml-3">
        <figure class="image is-64x64">
          <img src="${this.company_logo}" alt="logo">
        </figure>
      </div>
      <h2 class="card-header-title title mb-2">${this.title}</h2>
      
      <div class="media-right">
        <button class="button delete is-dark" id="close-work-pane-button"></button>
      </div>
    `;
    const cardContent = _.createElement({
      el: 'div',
      classes: ['card-content'],
    });
    let recruiterEmail = this.recruiter_email;
    if (!this.recruiter_email === '') {
      recruiterEmail = `<h3><textarea href="mailto:"${this.recruiter_email}">${this.recruiter_email}</a></h3>`;
    } else {
      recruiterEmail = `<h3>No email provided</h3>`;
    }
    cardContent.innerHTML = `
      <h2 class="block subtitle"><a href="#">Company Name, Location</a></h2>
      <div class="block box">
        <h3>Recruiter: ${this.recruiter_name}</h3>
        ${recruiterEmail}
        <h3><a href="tel:${this.recruiter_phone}">
        ${this.recruiter_phone}</a></h3>
        <p class="is-italic">${this.poc_notes}</p>
      </div>
        <div class="content">
          ${this.description}
        </div>
    `;

    const closeBtn = cardHeader.querySelector(
      '#close-work-pane-button',
    );
    closeBtn.addEventListener('click', ui.hideWorkPane);
    ui.workPane.appendChild(cardHeader);
    ui.workPane.appendChild(cardContent);
    ui.showWorkPane();
  }

  buildEditJob() {
    const cardHeader = _.createElement({
      el: 'div',
      classes: ['card-header'],
    });
    cardHeader.innerHTML = `
      <div class="media-left ml-3">
        <figure class="image is-64x64">
          <img src="images/edit.svg" alt="logo">
        </figure>
      </div>
      <h2 class="card-header-title title mb-2">Edit job</h2>
      
      <div class="media-right">
        <button class="button delete is-dark" id="close-work-pane-button"></button>
      </div>
    `;
    const cardContent = _.createElement({
      el: 'div',
      classes: ['card-content'],
    });
    //TODO: figure out how to select matching Status value
    cardContent.innerHTML = `
      <form class="form is-grouped">
        <input type="hidden" value="${jobSearch.id}" data-field="job_search_id">
        <input type="hidden" value="${this.id}" data-field="id">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" value="${this.title}" data-field="title">
          </div>
        </div>
        <div class="field">
          <label class="label">Status</label>
          <div class="select">
            <select data-field="status">
              <option value="new">new</option>
              <option value="applied">applied</option>
              <option value="interviewing">interviewing</option>
              <option value="offer">offer</option>
              <option value="accepted">accepted</option>
              <option value="rejected">rejected</option>
              <option value="declined">declined</option>
              <option value="closed">closed</option>
              
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Company or posting URL</label>
          <div class="control" >
            <input class="input" type="text" value="${this.url}" data-field="url">
          </div>
        </div>
        <div class="field">
          <label class="label" >Company Logo URL</label>
          <div class="control">
            <input class="input" type="text" value="${this.company_logo}" data-field="company_logo">
          </div>
        </div>

        <div class="field is-grouped">
          <label class="label">Recruiter name</label>
          <div class="control is-expanded">
            <input class="input" type="text" value="${this.recruiter_name}" data-field="recruiter_name">
          </div>

          <label class="label">Email</label>
          <div class="control is-expanded">
            <input class="input" type="text" value="${this.recruiter_email}" data-field="recruiter_email">
          </div>

          <label class="label">Phone</label>
          <div class="control is-expanded">
            <input class="input" type="text" value="${this.recruiter_phone}" data-field="recruiter_phone">
          </div>
        </div>
        <div class="field">
          <label class="label">Contact notes</label>
          <div class="control">
            <textarea class="textarea"
                      placeholder "include 2nd poc, secondary emails/phones, etc."
                      data-field="poc_notes">${this.poc_notes}</textarea>
          </div>
        </div>
        <div class="field is-grouped">
          <label class="label">Posted</label>
          <div class="control is-expanded">
            <input class="input" type="date" value="${this.posted}" data-field="posted">
          </div>

          <label class="label">Closed</label>
          <div class="control is-expanded">
            <input class="input" type="date" value="${this.closed}" data-field="closed">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" 
                      placeholder "full job description copypaste" 
                      data-field="description">${this.description}</textarea>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary" id="submit-job-info">
              Submit
            </button>
          </div>
          <div class="control">
            <button type="button" class="button is-light" id="cancel-job-info">
              Cancel
            </button>
          </div>
        </div>
      </form>
    `;

    //sets an existing job's status on select field
    const select = cardContent.querySelector('.select select');
    select.value = this.status;

    const closeBtn = cardHeader.querySelector(
      '#close-work-pane-button',
    );
    closeBtn.addEventListener('click', ui.hideWorkPane);

    const form = cardContent.querySelector('form');
    form.addEventListener('submit', this.submitJobForm);

    const cancelJobInfo = cardContent.querySelector(
      '#cancel-job-info',
    );
    cancelJobInfo.addEventListener('click', (evt) => {
      ui.hideWorkPane();
    });

    ui.workPane.appendChild(cardHeader);
    ui.workPane.appendChild(cardContent);
    ui.showWorkPane();
  }
  //TODO: buildNewJob()

  submitJobForm(evt) {
    const fields = [...document.querySelector('form').elements];
    const jobObj = {};
    fields.forEach((el) => {
      if (el.dataset.field) {
        console.log({ [el.dataset.field]: el.value });
        if (el.dataset.field) {
          jobObj[el.dataset.field] = el.value;
        }
      }
    });
    debug = jobObj;
    adapter.updateJob(jobObj, (json) => {
      jobSearch.updateJob(json);
      jobSearch.buildJobsListByStatus('all');
      ui.hideWorkPane();
    });
    //TODO: if id exists, updateJob
    //TODO: if id does not exist, postJob
  }
}
