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
    cardContent.innerHTML = `
      <div class="content">

        <p class="block">POC: ${this.recruiter_name} 
            | email: <a href="${this.recruiter_email}">${this.recruiter_email}</a> 
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
      recruiterEmail = `<h3><a href="mailto:"${this.recruiter_email}">${this.recruiter_email}</a>`;
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

  buildEditJob() {}
  //TODO: buildEditJob()
  //TODO: buildNewJob()
}
