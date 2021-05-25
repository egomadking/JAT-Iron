class Utils{

  createElement(el, classes){
    if(typeof el != "string"){
      throw("'el' argument is not a string")
    }
    if(typeof classes != "string" && !(classes instanceof Array) && typeof classes != "undefined"){
      throw (`'classes' param << ${classes} >> is not a string, array, or empty`)
    }
    let element = document.createElement(el)
    switch(typeof classes){
      case "string":
        element.classList.add(classes);
        break;
      case "object":
        classes.forEach( klass => {
          element.classList.add(klass)
        })
        break;
      case "undefined":
        break;
      default:

    }
    return element;
  }
}