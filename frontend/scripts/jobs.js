class Job {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.url = obj.url || 'none provided';
    this.company_logo = obj.company_logo || 'images/suitcase.png';
    this.company = obj.company;
    this.location = obj.location;
    this.description = obj.description;
    this.notes = obj.notes;
    this.recruiter_name = obj.recruiter_name;
    this.recruiter_phone = obj.recruiter_phone;
    this.recruiter_email = obj.recruiter_email || '';
    this.poc_notes = obj.poc_notes || '';
    this.posted = obj.posted;
    this.closed = obj.closed;
    this.status = obj.status;
  }

  massUpdate(obj) {
    Object.assign(this, obj);
  }

  buildSummaryCard() {
    const li = _.createElement({
      el: 'li',
      classes: ['block']
    });
    const card = _.createElement({
      el: 'div',
      classes: ['card']
    });
    const header = _.createElement({
      el: 'header',
      classes: ['card-header'],
    });
    header.innerHTML = `
      <div class="media-left">
        <figure class="image is-48x48 card-header-icon p-0 pl-1">
          <img src="${this.company_logo}" alt="logo">
        </figure>
      </div>

      <p class="card-header-title">${this.title}</p>

      <div class="media-right">
        <h2 class="card-header-title ">${this.company} | ${this.location}</h2>
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
    if (this.recruiter_email === '') {
      recruiterEmail = `<h3>No email provided</h3>`;
    } else {
      recruiterEmail = `<h3 class="block title is-5"><a href="mailto:${this.recruiter_email}">${this.recruiter_email}</a></h3>`;
    }
    cardContent.innerHTML = `
      <h2 class="block subtitle"><a href="#">${this.company} | ${this.location}</a></h2>
      <div class="block box">
        <h3 class="title is-5">Recruiter: ${this.recruiter_name}</h3>
        ${recruiterEmail}
        <h3 class="title is-5"><a href="tel:${this.recruiter_phone}">
        ${this.recruiter_phone}</a></h3>
        <p class="is-italic">${this.poc_notes}</p>
      </div>
        <h3 class="title is-4">Job Description</h3>
        <div class="content">
          ${this.description}
        </div>
        <h3 class="title is-4">Notes</h3>
        <div class="content">
          ${this.notes}
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-primary"
                    id="edit-job-info"
                    data-id="${this.id}">
              Edit
            </button>
          </div>
          <div class="control">
            <button type="button" class="button is-light" id="close-job-info">
              Close
            </button>
          </div>
        </div>
    `;

    const closeBtn = cardHeader.querySelector(
      '#close-work-pane-button',
    );
    closeBtn.addEventListener('click', ui.hideWorkPane);

    const editBtn = cardContent.querySelector('#edit-job-info');
    editBtn.addEventListener('click', (evt) => {
      ui.clearWorkPane();
      this.openEditForm();
    });

    const closeBtn2 = cardContent.querySelector('#close-job-info');
    closeBtn2.addEventListener('click', ui.hideWorkPane);

    ui.workPane.appendChild(cardHeader);
    ui.workPane.appendChild(cardContent);
    ui.showWorkPane();
  }

  static createForm() {
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
      <h2 class="card-header-title title mb-2" id="card-title"></h2>
      
      <div class="media-right">
        <button class="button delete is-dark" id="close-work-pane-button"></button>
      </div>
    `;
    const cardContent = _.createElement({
      el: 'div',
      classes: ['card-content'],
    });
    //<input type="hidden" value="${jobSearch.id}" data-field="job_search_id"> omitted from hidden-fields
    cardContent.innerHTML = `
      <form class="form is-grouped">
        <div id="hidden-fields">
        <input type="hidden" value="${jobSearch.id}" data-field="job_search_id">
        </div>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" value="" data-field="title">
          </div>
          <label class="label">Company</label>
          <div class="control">
            <input class="input" type="text" value="" data-field="company">
          </div>
          <label class="label">Location</label>
          <div class="control">
            <input class="input" type="text" value="" data-field="location">
          </div>
        </div>
        <div class="field">
          <label class="label">Status</label>
          <div class="select" id="status">
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
            <input class="input" type="text" value="" data-field="url">
          </div>
        </div>
        <div class="field">
          <label class="label" >Company Logo URL</label>
          <div class="control">
            <input class="input" type="text" value="" data-field="company_logo">
          </div>
        </div>

        <div class="field is-grouped">
          <label class="label">Recruiter name</label>
          <div class="control is-expanded">
            <input class="input" type="text" value="" data-field="recruiter_name">
          </div>

          <label class="label">Email</label>
          <div class="control is-expanded">
            <input class="input" type="text" value="" data-field="recruiter_email">
          </div>

          <label class="label">Phone</label>
          <div class="control is-expanded">
            <input class="input" type="text" value="" data-field="recruiter_phone">
          </div>
        </div>
        <div class="field">
          <label class="label">Contact notes</label>
          <div class="control">
            <textarea class="textarea" id="poc-notes"
                      placeholder "include 2nd poc, secondary emails/phones, etc."
                      data-field="poc_notes"></textarea>
          </div>
        </div>
        <div class="field is-grouped">
          <label class="label">Posted</label>
          <div class="control is-expanded">
            <input class="input" type="date" value="" data-field="posted">
          </div>

          <label class="label">Closed</label>
          <div class="control is-expanded">
            <input class="input" type="date" value="" data-field="closed">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" id="description"
                      placeholder "full job description copypaste" 
                      data-field="description"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Notes</label>
          <div class="control">
            <textarea class="textarea" id="notes"
                      placeholder "put notes here..." 
                      data-field="notes"></textarea>
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
    //cancel buttons
    const closeBtn = cardHeader.querySelector(
      '#close-work-pane-button',
    );
    const cancelBtn = cardContent.querySelector('#cancel-job-info');
    [closeBtn, cancelBtn].forEach((btn) => {
      btn.addEventListener('click', ui.hideWorkPane);
    });

    //submit
    const formEl = cardContent.querySelector('form');
    formEl.addEventListener('submit', Job.submitJobForm);
    return {
      header: cardHeader,
      content: cardContent
    };
  }

  static openBlankForm() {
    const form = this.createForm();
    const header = form.header;
    const content = form.content;

    //sets form title
    const title = header.querySelector('#card-title');
    title.innerText = 'New job';

    //sets an existing job's status on select field
    const select = content.querySelector('.select select');
    select.value = 'new';

    ui.workPane.appendChild(header);
    ui.workPane.appendChild(content);
    ui.showWorkPane();
  }

  openEditForm() {
    const form = Job.createForm();
    const header = form.header;

    const title = header.querySelector('#card-title');
    title.innerText = 'Edit job';
    const content = form.content;

    const hiddenFields = content.querySelector('#hidden-fields');
    const idField = `<input type="hidden" value="${this.id}" data-field="id">`;
    hiddenFields.insertAdjacentHTML('afterbegin', idField);
    const fields = [...content.querySelectorAll('input')];
    fields.forEach((field) => {
      if (field.dataset.field === 'job_search_id') {
        field.value = jobSearch.id;
      } else {
        field.value = this[field.dataset.field];
      }
    });
    const pocNotes = content.querySelector('#poc-notes');
    pocNotes.innerText = this.poc_notes;
    const description = content.querySelector('#description');
    description.innerText = this.description;
    const notes = content.querySelector('#notes');
    notes.innerText = this.notes;

    ui.workPane.appendChild(header);
    ui.workPane.appendChild(content);
    ui.showWorkPane();
  }

  static submitJobForm(evt) {
    evt.preventDefault();
    const fields = [...document.querySelector('form').elements];
    const jobObj = {};
    fields.forEach((el) => {
      if (el.dataset.field) {
        if (el.dataset.field) {
          jobObj[el.dataset.field] = el.value;
        }
      }
    });
    if (!jobObj.title || !jobObj.posted) {
      alert('Title and Posted date cannot be empty');
      return;
    }
    //TODO: handle bad http requests
    debug = jobObj;
    if (jobObj.id) {
      adapter.updateJob(jobObj, (json) => {
        jobSearch.updateJob(json);
        jobSearch.buildJobsListByStatus('all');
        ui.hideWorkPane();
      });
    } else {
      adapter.postJob(jobObj, (json) => {
        jobSearch.addNewJob(json);
        jobSearch.buildJobsListByStatus('all');
        ui.hideWorkPane();
      });
    }
  }
}