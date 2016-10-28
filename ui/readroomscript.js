


var $categoryElem = $('#categories-element');

//var $body = $('body');

//var $nytHeaderElem = $('#nytimes-header');
//var $nytElem = $('#nytimes-articles');
//var $greeting = $('#greeting');
var $wikiElem = $('#wikipedia-links');




function loadData() {


    // clear out old data before new request
    //$categoryElem.text("");
    //$nytElem.text("");

    var nytimesURL = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=%202b71d13814a34d95bb84259dd603f4ff';


    $.getJSON( nytimesURL, function( data ) {


      var categories = data.results;

       //console.log(categories);
       var category;

       for(var i=0; i <categories.length;i++){
        console.log(categories[i].display_name);
        category = categories[i].list_name_encoded;
        
        $categoryElem.append(
           '<li>'+ categories[i].display_name +'</li>'
        )
        
    }


}).error(function(e){
    $categoryElem.text("Couldn't load");



});







return false;
};





function loadBooks() {

    var requestBooks = $('#books').val();
    console.log(requestBooks);
    var requestTimeout = setTimeout(function(){
        $wikiElem.text('Couldnt find the books. Please input valid category with');

    },8000 );


    var booksURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=2b71d13814a34d95bb84259dd603f4ff';


    $.ajax({
        url : booksURL,
        method:'get',
        data: {},
        dataType : 'json',
        success : function(data){

        //console.log(data.results.lists[0]);

        //var booklist = data.results.lists[0];
        //console.log(booklist.books);

        //$wikiElem.append('<i> id:'+ booklist.display_name +'</i>' + '<p>'+booklist.updated+'</p>');

        //var booklist2 = booklist.books;
        var booklist;

        for(var j=0;j<=data.results.lists.length;j++)
        {
            //console.log(data.results.lists[j].list_name);
            if(data.results.lists[j].list_name == requestBooks)
            {
                console.log(true);
                booklist = data.results.lists[j].books;
                console.log(booklist);
                $wikiElem.append('<i> id:'+ booklist.display_name +'</i>' + '<p>'+booklist.updated+'</p>');
                //var booklist2 = booklist.books
                //console.log(booklist2);
                $.each(booklist,function(i,item){

          //console.log(item);


          html2 += 
          '<div class="jumbotron top-space">'+
          '<div class="row">'+
          '<div class="col-sm-4">' +

          '<h3>'+ item.title + '</h3>' + '<br>'+
          '<img src ='+ item.book_image +'>'+ '<hr>' + 

          '</div>' +
          '<div class="col-sm-8">'+

          '<h4>Season: '  + item.publisher+ '</h4>' +
          '<h4>Episode number: ' + item.weeks_on_list + '</h4>' + 
          '<h4>Airdate: ' + item.book_review_link + '</h4>' + '<br>'+
          '<h4>Summary:</h4>' + item.description + '<hr>'+
          '</div>' +



          '</div>' +
          '</div>' +
          '</div>';




            //$('#wikipedia-links').html(html2);
            $wikiElem.append(html2);
            clearTimeout(requestTimeout);

        });
            }
            else
            {
                console.log(false);
            }
        }

        //console.log(booklist2);
        var html2 = "";
        

        //clearTimeout(requestTimeout);

    }

}); 


}



$('#books').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
       loadBooks(); 
   }
                //Stop the event from propogation to other handlers
                //If this line will be removed, then keypress event handler attached 
                //at document level will also be triggered
                event.stopPropagation();
            });

