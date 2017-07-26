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
        .done(function() {
          alert( "success" );
        })
        .fail(function() {
          alert( "error" );
        });
    },

    OnDelete: function(e) {
      debugger;
      $.ajax({
        url: '/items/' + $(e.target).parent().attr("item_id"),
        type: 'DELETE'
      })
      .done(function() {
        alert( "success" );
      })
      .fail(function() {
        alert( "error" );
      });;
    }
  }

  return createForm;
})();