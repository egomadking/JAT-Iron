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

  //TODO: loadJobs
  //TODO: insertJobs into pane
  //TODO: sortJobsByStatus
}
