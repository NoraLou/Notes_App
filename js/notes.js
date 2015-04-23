





var Notes = {

  index: window.localStorage.getItem("Notes:index"),
  $notes_list : document.getElementById("notes-list"),
  $form: document.getElementById("contacts-form"),
  $button_save:document.getElementById("contacts-op-save"),
  $button_delete:document.getElementById("contacts-op-discard"),
  $show_form:document.getElementById("show-form"),


  init: function(){
    if(!Notes.index){
      window.localStorage.setItem("Notes:index", Notes.index = 1);
    }

    if(Notes.index == 1){
     Materialize.toast("Click the 'plus' icon to add some notes", 4000, "red accent-2");

    }

    //intialize form display
    Notes.$show_form.addEventListener("click", function(event){
      $(".form-container").toggleClass("fullSize").promise().done(function(){
        $(".container.form-buttons>a").animate({
          opacity:1
        });
      });
    }, true);

    //set up form
    Notes.$form.reset();

    //set up cancel actions
    Notes.$button_delete.addEventListener("click", function(event){

      $(".form-container").toggleClass("fullSize");
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

     $(".form-container").toggleClass("fullSize");

     if(note_entry.id == 0){
       Notes.noteAdd(note_entry);
       Notes.displayAdd(note_entry);
     }else{
       Notes.noteEdit(note_entry);
       Notes.displayEdit(note_entry);
     }

     //clear form
     this.reset();
     //reset the tracking value
     this.id_entry.value = 0;

     event.preventDefault();
    },true);

          //set up delete event handler
          $("ul#notes-list.collapsible.popout").on("click","div.collapsible-header>i.mdi-action-delete ", function(){

            Notes.displayRemove($(this).data("id"));
            Notes.noteRemove($(this).data("id"))
          });

          //set up edit event handler
          $("ul#notes-list.collapsible.popout").on("click","div.collapsible-header>i.mdi-content-create", function(){

            var edit_entry = JSON.parse(window.localStorage.getItem("Notes:"+ $(this).data("id")));

            Notes.$form.title.value = edit_entry.title
            Notes.$form.contents.value = edit_entry.contents
            Notes.$form.id_entry.value = edit_entry.id

            $(".form-container").addClass("fullSize");
            $(".form-container").find("div.input-field").find("label").addClass("active");

            Notes.$form.focus();

          });


          //display options to edit and delete only when entire note is visible
        $("ul#notes-list.collapsible.popout").on("click","div.collapsible-header", function(){
            $(this).find("i").toggle();

         });

      //initialize display from localstorage
      if(window.localStorage.length-1){
         var notes_list = [], i, key;
         for(i = 0; i < window.localStorage.length; i++){

           key = window.localStorage.key(i);
           if(/Notes:\d+/.test(key)){
              notes_list.push(JSON.parse(window.localStorage.getItem(key)));
           }
         }
         if(notes_list.length){
            notes_list.forEach(Notes.displayAdd);
         }
      }

    }, // init funct


  noteAdd: function(note_entry){
    note_entry.id = Notes.index
    window.localStorage.setItem("Notes:index", ++Notes.index);
    window.localStorage.setItem("Notes:" + note_entry.id, JSON.stringify(note_entry));
    },

  noteEdit: function(note_entry){
    window.localStorage.setItem("Notes:" + note_entry.id, JSON.stringify(note_entry));
  },

  noteRemove: function(id){
    window.localStorage.removeItem("Notes:" + id);
    window.localStorage.setItem("Notes:index", --Notes.index);
  },

  displayAdd: function(note_entry){

    var noteDisplay = document.createElement('li');
    $(noteDisplay).attr("id" , "display-" + note_entry.id);

    var deleteIcon = $("<i></i>");
    $(deleteIcon).attr({"class" : "mdi-action-delete  right", "data-id" : note_entry.id})
    .css("display","none");

    var editIcon = $("<i></i>");
    $(editIcon).attr({"class" : "mdi-content-create  right", "data-id": note_entry.id })
    .css("display","none");

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
    .css("display","none");

    var editIcon = $("<i></i>");
    $(editIcon).attr({"class" : "mdi-content-create  right", "data-id": note_entry.id })
     .css("display","none");

    $(textEdit).find("div.collapsible-header").html(note_entry.title ).append(deleteIcon).append(editIcon);

    $(textEdit).find("div.collapsible-body").html("<p>" + note_entry.contents + "</p>");

  },


  displayRemove: function(id){
    Notes.$notes_list.removeChild(document.getElementById("display-"+ id))

  }



}


Notes.init();


























