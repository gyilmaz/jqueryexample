/*
index.js 
*/
$(document).ready(function(){
"use strict";
// var resultList= jQuery("#resultList"); 
// resultList.text("THIS IS FROM JQUERY"); 

var resultList= $("#resultList"); 
resultList.text("THIS IS FROM JQUERY"); 

var toggleButton=$("#toggleButton");
toggleButton.on("click", function(){
    if(toggleButton.text()!="Show"){
     resultList.toggle(500); 
    toggleButton.text("Show");
    }else{
        resultList.toggle(500); 
    toggleButton.text("Hide");
    }
})

var listItems= $("header nav li");
listItems.css("font-size", "18px");
listItems.filter(":first").css("font-weight","bold");

// var msg="Hello World!"; 
//         console.log(msg);
      
//         var resultsDiv= document.getElementById("results"); 
//         resultsDiv.innerHTML="<p>This is from javascript</p>" ; 

//         console.log("msg is " + typeof(msg));
//         console.log("resultDiv is " + typeof(resultsDiv));

// var gitHubSearch = "https://api.github.com/search/repositories?q=jquery+language:javascript&sort=stars&order=desc";
// $.get(gitHubSearch).done(function(r){
//     // console.log(r.items.length); 
//     displayResults(r.items); 
// });

$("#gitHubSearchForm").on("submit", function(){

var searchPhrase= $("#searchPhrase").val();
var useStars= $("#useStars").val(); 
var langChoice= $("#langChoice").val(); 
console.log("before if use star" + useStars);
console.log("before if langchoice" + langChoice);

var gitUrl= "https://api.github.com/search/repositories?q="+encodeURIComponent(searchPhrase); 

if(searchPhrase){
    resultList.text("Performing Search"); 
   
    if(langChoice != "All"){
        gitUrl += "+language:"+encodeURIComponent(langChoice); 
    };

    if(useStars==true){
        gitUrl += "&sort=stars"
    };
    console.log("after if use star" + useStars);
    console.log("after if use langchoice" + langChoice);

    console.log(gitUrl);

$.ajax({
    url      : gitUrl,
    success  : function(r){// console.log(r.items.length); 
        displayResults(r.items); 
    },
    error: function (xhr, err) {
        //Here the status code can be retrieved like;
        //The message added to Response object in Controller can be retrieved as following.
        xhr.responseText;
        console.log(err);
        resultList.text("There is an error to retrive the list"); 
    }
    // complete : function() { ... }
});

}; 
    return false; 
}); 


// var results =[{
//     name: "jQuery",
//     language: "JavaScript",
//     score: "4.5",
//     showLog: function(){

//     },
//     owner:{
//         login:"gyilmaz",
//         id:"12345",
//     }
// },{
//         name: "jQueryUI",
//         language: "JavaScript",
//         score: 4.5,
//         showLog: function(){

//         },  
//     owner:{
//         login:"gyilmaz",
//         id:"12345",
//     }
// }];

function displayResults(results){
resultList.empty(); 
$.each(results, function(i, item){
   var newResult= $("<div class='result'>"+
   "<div class='title'>"+item.name + "</div>"+
   "<div> Language: "+item.language + "</div>"+
   "<div> Owner :"+item.owner.login+ "</div>"+
   "</div>"); 

   newResult.hover(function(){
    $(this).css("background-color", "lightgray");
   }, function(){
     $(this).css("background-color", "transparent");
   }); 

   resultList.append(newResult); 
});
}


});
