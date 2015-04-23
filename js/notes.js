





var Notes = {

  index: window.localStorage.getItem("Notes:index"),
  $notes_list : document.getElementById("notes-list"),

  /// adjusting contacts
  $form: document.getElementById("contacts-form"),
  $button_save:document.getElementById("contacts-op-save"),
  $button_delete:document.getElementById("contacts-op-discard"),

  $show_form:document.getElementById("show-form"),


  init: function(){
    //get items from localStorage
    if(!Notes.index){
      window.localStorage.setItem("Notes:index", Notes.index = 1);
    }

    //show form
    Notes.$show_form.addEventListener("click", function(event){
      $(".form-container").toggleClass("fullSize").promise().done(function(){
        $(".container.form-buttons>a").animate({
          opacity:1
        });
      });
    }, true);

    //set up form
    Notes.$form.reset();



    //set up delete actions
    Notes.$button_delete.addEventListener("click", function(event){

      $(".form-container").toggleClass("fullSize");
      // $(".container.form-buttons>a").animate({
      //     opacity:0
      //   });
      Notes.$form.reset();
      Notes.$form.id_entry.value = 0;
    }, true);


    //set up save actions
    Notes.$form.addEventListener("submit", function(event){
      var note_entry = {
        id: parseInt(this.id_entry.value),
        title: this.title.value,
        contents : this.contents.value,
      };

     alert("note saved!");
     $(".form-container").toggleClass("fullSize");

     // if this is the first time it has been submitted- add it
     if(note_entry.id == 0){
       Notes.noteAdd(note_entry);
       Notes.displayAdd(note_entry);
     }else{
       Notes.noteEdit(note_entry);
       Notes.displayEdit(note_entry);

     }
     console.log(localStorage);
     //clear form
     this.reset();
     //reset the tracking value
     this.id_entry.value = 0;


    //TO DO!!!! toggle class to close after adding a timeout function.

     event.preventDefault();
    },true);


          $("ul#notes-list.collapsible.popout").on("click","div.collapsible-header>i.mdi-action-delete ", function(){

            // console.log($(this).data("id"));
            Notes.displayRemove($(this).data("id"));
            Notes.noteRemove($(this).data("id"))

          });

          $("ul#notes-list.collapsible.popout").on("click","div.collapsible-header>i.mdi-content-create", function(){

            console.log($(this).data("id"));

            var edit_entry = JSON.parse(window.localStorage.getItem("Notes:"+ $(this).data("id")));

            console.log(edit_entry);

            Notes.$form.title.value = edit_entry.title
            Notes.$form.contents.value = edit_entry.contents
            Notes.$form.id_entry.value = edit_entry.id


            $(".form-container").addClass("fullSize");

            Notes.$form.focus();

          });



        // $("ul#notes-list.collapsible.popout").on("click","div.collapsible-header", function(){
        //     $(this).find("i").css("display","block");

        //     // $(this).find("i").toggleClass("display-on");

        //     // write helper function or find another way to toggle  display in jquery

            //   // $("ul#notes-list.collapsible.popout").find("div.collapsible-body").css("background-color", "red");

          //   // $(this).parent().next().css("background-color", "red");


        // });







      // display what we have already
      if(window.localStorage.length-1){
         var notes_list = [], i, key;
         for(i = 0; i < window.localStorage.length; i++){

           console.log(key);
           key = window.localStorage.key(i);
           if(/Notes:\d+/.test(key)){
              notes_list.push(JSON.parse(window.localStorage.getItem(key)));
              // console.log("***********************************************");
              // console.log(notes_list);
           }
         }
         if(notes_list.length){
            notes_list.forEach(Notes.displayAdd);
         }
      }

    }, // init funct


  noteAdd: function(note_entry){
    //start at our index in the list
    note_entry.id = Notes.index
    // add and increment index by one
    window.localStorage.setItem("Notes:index", ++Notes.index);
    // and the new key and data-array to our notes object
    window.localStorage.setItem("Notes:" + note_entry.id, JSON.stringify(note_entry));
    },

  noteEdit: function(note_entry){
    //grab already indexed key set its content changes
    window.localStorage.setItem("Notes:" + note_entry.id, JSON.stringify(note_entry));
  },

  noteRemove: function(id){
    window.localStorage.removeItem("Notes:" + id);
    Notes.index = Notes.index -1;
  },



  displayAdd: function(note_entry){

    // console.log("********************************")
    // console.log(note_entry);

    var noteDisplay = document.createElement('li');
    $(noteDisplay).attr("id" , "display-" + note_entry.id);

    var deleteIcon = $("<i></i>");
    $(deleteIcon).attr({"class" : "mdi-action-delete  right", "data-id" : note_entry.id})
    // .css("display","none");

    var editIcon = $("<i></i>");
    $(editIcon).attr({"class" : "mdi-content-create  right", "data-id": note_entry.id })

    var titleDisplay = $("<div></div>");
    $(titleDisplay).addClass("collapsible-header");

    var contentDisplay = $("<div></div>");
    $(contentDisplay).addClass("collapsible-body");

    var contentP = $("<p></p>")
    $(contentP).html(note_entry.contents);

   $(contentDisplay).append(contentP);
   $(titleDisplay).attr({"class" : "collapsible-header"}).html(note_entry.title);

   $(titleDisplay).append(deleteIcon);

   $(titleDisplay).append(editIcon);

   $(noteDisplay).append(titleDisplay);
   $(noteDisplay).append(contentDisplay);
   $("ul#notes-list.collapsible.popout").append(noteDisplay);

   $('.collapsible').collapsible();


  },

  displayEdit: function(note_entry){

    var textEdit = document.getElementById("display-" + note_entry.id);

    var deleteIcon = $("<i></i>");
    $(deleteIcon).attr({"class" : "mdi-action-delete  right", "data-id" : note_entry.id})
    // .css("display","none");

    var editIcon = $("<i></i>");
    $(editIcon).attr({"class" : "mdi-content-create  right", "data-id": note_entry.id })


    $(textEdit).find("div.collapsible-header").html(note_entry.title ).append(deleteIcon).append(editIcon);

    $(textEdit).find("div.collapsible-body").html("<p>" + note_entry.contents + "</p>");


  },


  displayRemove: function(id){
    Notes.$notes_list.removeChild(document.getElementById("display-"+ id))

  }



}


Notes.init();


























