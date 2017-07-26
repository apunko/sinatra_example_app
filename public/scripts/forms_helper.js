var Forms = Forms || {};
Forms.Items = Forms.Items || {};

Forms.Items.CreateForm = (function() {
  var _form_selector; 

  var createForm = {
    Initialize: function(form_selector) {
      _form_selector = form_selector;
      $(form_selector).submit(Forms.Items.CreateForm.OnCreate);
      $("li.item .close").click(Forms.Items.CreateForm.OnDelete);
    },

    OnCreate: function (e) {
        e.preventDefault();
        $.post({
          url : "/add_item",
          dataType: 'json',
          data : $(_form_selector).serialize()
        })
        .done(function(e) {
          debugger
          var item_element = $("<li class='item' item_id='" + e.item.id + "''><span class='check'>&#10003;</span>" + e.item.value + "<span class='close'>×</span></li>");
          $("ul.items").append(item_element);
          $("ul.items").find("li:last .close").click(Forms.Items.CreateForm.OnDelete)
          console.log( "success" );
        })
        .fail(function(e) {
          debugger;
          console.log( "error" );
        });
    },

    OnDelete: function(e) {
      e.preventDefault();
      debugger;
      $.ajax({
        url: '/items/' + $(e.target).parent().attr("item_id"),
        type: 'DELETE'
      })
      .done(function(e) {
        debugger;
        $("li[item_id=" + e.item_id + "]").remove();
        console.log( "success" );
      })
      .fail(function(e, data) {
        console.log( "Sorry, something went wrong" );
      });;
    }
  }

  return createForm;
})();