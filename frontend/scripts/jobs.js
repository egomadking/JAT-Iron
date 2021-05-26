class Job {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.url = obj.url || 'none provided';
    this.company_logo = obj.company_logo || 'images/suitcase.png';
    this.description = obj.description;
    this.recruiter_name = obj.recruiter_name;
    this.recruiter_phone = obj.recruiter_name;
    this.recruiter_email = obj.recruiter_email;
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
      <a href="#" class="card-footer-item">Show</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Add Note(#)</a>
      <a href="#" class="card-footer-item">Delete</a>
    `;

    li.appendChild(card);
    card.appendChild(header);
    card.appendChild(cardContent);
    card.appendChild(cardFooter);

    return li;
  }

  //TODO: buildJobWorkPane()
  //TODO: buildJobEditForm()
  //TODO: buildNewJobForm()
}
