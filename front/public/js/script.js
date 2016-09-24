$('#login-btn').click(function() {
    var userData = {
        login: $('#sign-in-login').val(),
        password: $('#sign-in-password').val()
    }
    if (userData.login && userData.password){
      $.ajax({
          method: 'POST',
          url: 'http://localhost:9000/sign-in',
          data: userData,
          success: function(data) {
              localStorage.setItem('userLogin', userData.login);;
              document.cookie = "login=" + data.token;
              location.replace('/list')
          }
      })
    }
})

$('#log-out').click(function(){
  document.cookie = "login=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  location.replace('/sign-in');
})

$('#signup-btn').click(function() {
    var userData = {
        login: $('#sign-in-login').val(),
        password: $('#sign-in-password').val()
    }

    $.ajax({
        method: 'POST',
        url: 'http://localhost:9000/sign-up',
        data: userData,
        success: function(data) {
            console.log(data);
        }
    })
})

$('#create-time').click(function() {
    var timeData = {
        user: localStorage.getItem('userLogin'),
        date: $('#date').val(),
        spentTime: $('#time').val(),
        note: $('#note').val()
    }
    $.ajax({
        method: 'POST',
        url: 'http://localhost:9000/time',
        data: timeData,
        success: function(data) {
            console.log(data);
        }
    })
})


$(function() {
    if (top.location.pathname === '/list') {
        var userName = localStorage.getItem('userLogin')
        $.ajax({
            method: 'GET',
            url: 'http://localhost:9000/time-list/' + userName,
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    var timeList = {
                        date: '<td>' + data[i].date + '</td>',
                        time: '<td>' + data[i].spentTime + 'h</td>',
                        note: '<td>' + data[i].note + '</td>',
                        editButton: '<td><button class="edit-button btn btn-info" value="' + data[i]._id + '">Edit' + '</button><button class="remove-button btn btn-danger" value="' + data[i]._id + '">Remove</button></td>'
                    }
                    $("#time-list").append('<tr>' + timeList.date + timeList.time + timeList.note + timeList.editButton + '</tr>');
                }
                $('.edit-button').click(function(data) {
                  var timeId = $(this).attr("value");
                    location.replace('/edit?id='+timeId);
                })
                $('.remove-button').click(function(data) {
                    var timeId = $(this).attr("value");
                    $.ajax({
                        method: 'DELETE',
                        url: 'http://localhost:9000/time/' + timeId,
                        success: function(data) {
                            location.reload();
                        }
                    })
                })
            }
        })
    } else if (top.location.pathname === '/edit') {
        function getUrlVar(key) {
            var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
            return result && unescape(result[1]) || "";
        }

        var timeId = getUrlVar('id');
        $.ajax({
          method: 'GET',
          url: 'http://localhost:9000/time/' + timeId,
          success: function(data){
            $('#date').val(data.date);
            $('#time').val(data.spentTime);
            $('#note').val(data.note);
          }
        })

        $('#edit-time').click(function(){
          var newData = {
              user: localStorage.getItem('userLogin'),
              date: $('#date').val(),
              spentTime: $('#time').val(),
              note: $('#note').val()
          }

          $.ajax({
            method: 'PUT',
            url: 'http://localhost:9000/time/' + timeId,
            data: newData,
            success: function(data){
              location.replace('/list')
            }
          })
        })
    }
});
