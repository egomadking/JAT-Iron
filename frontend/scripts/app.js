document.addEventListener("DOMContentLoaded", init)

const adapter = new Adapter("http://127.0.0.1:3000")
const _ = new Utils();

function init(evt){
  ui.addHamburgerListeners();
  ui.getUiButtons();

  let storedId = adapter.getStoredId();
  if(storedId){
    adapter.getJobSearch(storedId)
  } else {
    console.log("no id stored yet")
    adapter.getJobSearches()
  }
  /*

  if localStorage has jobSearchId
    load jobSearch with jobSearchId
    make ChooseSearchSession low key
  else
    load workspace with option to choose or createNew jobSearch
      load jobSearch and save jobSearchId to sessionStorage
      or
      create jobSearch (post) and save response's id to sessionStorage
  */
}