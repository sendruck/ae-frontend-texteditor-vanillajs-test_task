
document.addEventListener("DOMContentLoaded", function() { 
    var instance = document.querySelector(".instance");
    var wrapper = document.querySelector(".wrapper");
    var tooltip = document.querySelector(".tooltip");
    var bold  = document.querySelector(".bold");
    var cursive  = document.querySelector(".cursive");
    var underline  = document.querySelector(".underline");
    var similar_word = document.querySelector(".similar-word");
    var similar

    instance.addEventListener("mouseenter", function(event) {

        var activeText = event.target;
        var word = activeText.innerText;
        var currTool = event.target.nextSibling.nextSibling;
        similar = getSimilar( word, currTool );
        activeText.style.background = "#b8e7ff";
        document.querySelector(".tooltip").classList.add("tooltip_act");
    });

    wrapper.addEventListener("mouseleave", function(event) {
        var activeText = event.target.querySelector(".instance")
        activeText.style.background = "none";
        document.querySelector(".tooltip").classList.remove("tooltip_act");
    });

    bold.addEventListener("click", function(event) {
        if(bold.classList.contains("active-controller")) {
            bold.classList.remove("active-controller");
            instance.classList.remove("bold");
        } else {
            bold.classList.add("active-controller");
            instance.classList.add("bold");
        }
    });

    cursive.addEventListener("click", function(event) {
        if(cursive.classList.contains("active-controller")) {
            cursive.classList.remove("active-controller");
            instance.classList.remove("cursive");
        } else {
            cursive.classList.add("active-controller");
            instance.classList.add("cursive");
        }
    });

    underline.addEventListener("click", function(event) {
        if(underline.classList.contains("active-controller")) {
            underline.classList.remove("active-controller");
            instance.classList.remove("underline");
        } else {
            underline.classList.add("active-controller");
            instance.classList.add("underline");
        }
    });

    similar_word.addEventListener("click", function(event) {
        var curInstance = event.target.parentElement.parentElement.previousSibling.previousSibling;
        var curSimilar = event.target.innerHTML;
        event.target.innerHTML = curSimilar;
        curInstance.innerHTML = curSimilar;
    }); 

    function getSimilar( word, currTool ) {
        var url = new URL("https://api.datamuse.com/words"),
        params = { ml: word }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(similarArr) {
            var similar = similarArr[0].word;
            currTool.querySelector(".similar-word").innerHTML = similar;
        })
    }

  });
