class Adapter {
  constructor(url) {
    this.baseUrl = url;
  }

  getJobSearches(callback) {
    fetch(`${this.baseUrl}/job_searches`)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      });
  }
  getJobSearch(id, callback) {
    fetch(`${this.baseUrl}/job_searches/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      });
  }
  postJobSearch(name, callback) {
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name: name }),
    };
    fetch(`${this.baseUrl}/job_searches`, configObj)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      });
    //TODO build create action based on name
  }
  getJob(id, callback) {
    fetch(`${this.baseUrl}/jobs/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      });
  }

  //TODO: postJob
  postJob(jobObj, callback) {}

  //TODO: updateJob
  updateJob(jobObj, callback) {}

  getStoredId() {
    let id = window.sessionStorage.getItem('jobSearchId');
    if (id) {
      return parseInt(id);
    } else {
      return id; //returns null
    }
  }

  setStoredId(id) {
    window.sessionStorage.setItem('jobSearchId', id);
  }
}
