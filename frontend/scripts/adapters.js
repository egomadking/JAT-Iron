class Adapter {
  constructor(url){
    this.baseUrl = url
  }

  getJobSearches(){
    fetch(`${this.baseUrl}/job_searches`)
      .then(resp => resp.json())
      .then(json =>{
        console.dir(json)
      })
  }
  getJob(id){
    fetch(`${this.baseUrl}/jobs`)
      .then(resp => resp.json())
      .then(json => {
        console.dir(json)
      })
  }
}