class Adapter {
  constructor(url){
    this.baseUrl = url
  }

  getJobSearches(callback){
    fetch(`${this.baseUrl}/job_searches`)
      .then(resp => resp.json())
      .then(json =>{
        if(callback){
          callback(json)
        }
        console.dir(json)
      })
  }
  getJobSearch(id, callback){
    fetch(`${this.baseUrl}/job_searches/${id}`)
      .then(resp => resp.json())
      .then(json =>{
        if(callback){
          callback(json)
        }
        console.dir(json)
      })
  }
  getJob(id, callback){
    fetch(`${this.baseUrl}/jobs/${id}`)
      .then(resp => resp.json())
      .then(json => {
        if(callback){
          callback(json)
        }
        console.dir(json)
      })
  }

  getStoredId(){
    let id = window.sessionStorage.getItem("jobSearchId")
    if(id){
      return parseInt(id)
    } else {
      return id //returns null
    }
  }

  setStoredId(id){
    window.sessionStorage.setItem("jobSearchId", id)
  }
}