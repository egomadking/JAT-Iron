document.addEventListener('DOMContentLoaded', init);

const adapter = new Adapter('http://127.0.0.1:3000');
const _ = new Utils();
const ui = new Ui();
const jobSearch = new JobSearch();

let debugJobSearch;

function init(evt) {
  let storedId = adapter.getStoredId();
  if (storedId) {
    adapter.getJobSearch(storedId, function (json) {
      jobSearch.id = storedId;
      jobSearch.jobs = json.jobs;
      jobSearch.jobs.forEach((job) => {
        let card = job.buildSummaryCard();
        ui.jobsList.appendChild(card);
      });
    });
  } else {
    //TODO: this is rough but works
    ui.workPane.classList.remove('local-is-hidden');
    adapter.getJobSearches(function (json) {
      debugJobSearch = json;
      jobSearch.buildJobSearchForm(json);
    });
  }
}
