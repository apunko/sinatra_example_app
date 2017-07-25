var Forms = Forms || {};
Forms.TaskList = Forms.TaskList || {};
Forms.Items = Forms.Items || {};

Forms.TaskList.CreateForm = (function() {
  var _form_selector; 

  var createForm = {
    Initialize: function(form_selector) {
      _form_selector = form_selector;
      $(form_selector).submit(Forms.TaskList.CreateForm.OnCreate);
    },

    OnCreate: function (e) {
        debugger;
        e.preventDefault();
        $.post({
          url : "/create_task_list",
          dataType: 'json',
          data : $(_form_selector).serialize()
        })
        .done(function() {
          alert( "success" );
        })
        .fail(function() {
          alert( "error" );
        });
    }
  }

  return createForm;
})();

Forms.Items.CreateForm = (function() {
  var _form_selector; 

  var createForm = {
    Initialize: function(form_selector) {
      _form_selector = form_selector;
      $(form_selector).submit(Forms.Items.CreateForm.OnCreate);
    },

    OnCreate: function (e) {
        debugger;
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
    }
  }

  return createForm;
})();