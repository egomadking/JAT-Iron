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
      })
      .catch((err) => {
        this.displayError(err);
      });
  }
  getJobSearch(id, callback) {
    fetch(`${this.baseUrl}/job_searches/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      })
      .catch((err) => {
        this.displayError(err);
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
      })
      .catch((err) => {
        this.displayError(err);
      });
  }
  getJob(id, callback) {
    fetch(`${this.baseUrl}/jobs/${id}`)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      })
      .catch((err) => {
        this.displayError(err);
      });
  }

  postJob(jobObj, callback) {
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(jobObj),
    };
    fetch(`${this.baseUrl}/jobs/`, configObj)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      })
      .catch((err) => {
        this.displayError(err);
      });
  }

  updateJob(jobObj, callback) {
    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(jobObj),
    };
    fetch(`${this.baseUrl}/jobs/${jobObj.id}`, configObj)
      .then((resp) => resp.json())
      .then((json) => {
        if (callback) {
          callback(json);
        }
      })
      .catch((err) => {
        this.displayError(err);
      });
  }

  deleteJob(id, callback) {
    const configObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    fetch(`${this.baseUrl}/jobs/${id}`, configObj)
      .then((resp) => {
        return resp.json();
      })
      .then((json) => {
        if (callback) {
          callback(json);
        }
      })
      .catch((err) => {
        this.displayError(err);
      });
  }

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

  displayError(err) {
    ui.displayFetchError(err);
  }
}
