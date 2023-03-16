// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//saveBookmark
function saveBookmark(e){

    //prevent form from submitting
    e.preventDefault();

   //get form values
   let siteName = document.getElementById('siteName').value;
   let siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteURL)){
        return false;
    }
   
   let bookmark = {
    name: siteName,
    url: siteURL
   }
  
   //test if bookmarks is null
   if(localStorage.getItem('bookmarks') === null){

    //initalize array
    let bookmarks = [];

    //add to array
    bookmarks.push(bookmark);

    //set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }else{

    //get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //add bookmark to array
    bookmarks.push(bookmark);

    //Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
   }

   //clear form
   document.getElementById('myForm').reset();

   /*
    // Local storage test
    localStorage.setItem('test', 'hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
   */
}

//delete bookmark
function deleteBookmark(url){
    //get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for(let i =0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url ){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
     //get bookmarks from local storage
     let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    let bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div>'+
                                        '<h3>' + name +
                                        ' <a class = "btn btn-primary" target="_blank" href="'+url+'">Visit</a>' +
                                        ' <a onclick="deleteBookmark(\'' + url + '\')" class = "btn btn-danger" href="#">Delete</a>' +
                                        '</h3>' + 
                                        '</div>';
    }
}
function validateForm(sitename, siteURL){
       //validation for it to not be empty
   if(!siteName || !siteURL){
        alert('Fill in form');
        return false;
   }

    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('use valid URL');
        return false;
    }
    return true;
}
