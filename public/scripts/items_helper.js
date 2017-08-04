var Forms = Forms || {};
Forms.Items = Forms.Items || {};

Forms.Items = (function() {
  var _form_selector; 

  function createItemElement(item) {
    var listElement = $("<li class='item' item_id='" + item.id + "''></li>");
    listElement.append("<span class='check'>&#10003;</span>")
      .append(item.value).append("<span class='close'>×</span>");
    return listElement;
  }

  var items = {
    initialize: function(form_selector) {
      _form_selector = form_selector;
      $(form_selector).off('submit').submit(Forms.Items.onCreate);
      $("ul.items .close").click(Forms.Items.onDelete);
      $("ul.items .check").click(Forms.Items.onUpdate);
    },

    onCreate: function (e) {
        e.preventDefault();
        $.post({
          url: "/add_item",
          dataType: 'json',
          data: $(_form_selector).serialize()
        })
        .done(function(e) {
          var item_element = createItemElement(e.item);
          $("ul.items").append(item_element);
          $("ul.items li:last .close").click(Forms.Items.onDelete);
          $("ul.items li:last .check").click(Forms.Items.onUpdate);
          $(_form_selector).find("input").val("");
        })
        .fail(function(e) {
          console.log("Sorry, something went wrong");
        });
    },

    onUpdate: function(e) {
      $.ajax({
        url: '/items/' + $(e.target).parent().attr("item_id"),
        type: 'PUT'
      })
      .done(function(e) {
        $("li[item_id=" + e.item.id + "]").removeClass();
        $("li[item_id=" + e.item.id + "]").addClass("done_" + e.item.done);
      })
      .fail(function(e) {
        console.log( "Sorry, something went wrong" );
      });;
    },

    onDelete: function(e) {
      $.ajax({
        url: '/items/' + $(e.target).parent().attr("item_id"),
        type: 'DELETE'
      })
      .done(function(e) {
        $("li[item_id=" + e.item_id + "]").remove();
      })
      .fail(function(e) {
        console.log("Sorry, something went wrong");
      });;
    }
  }

  return items;
})();