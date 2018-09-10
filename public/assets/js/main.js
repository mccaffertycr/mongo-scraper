$(document).ready(function() {

  $(document).on('click', '.new-scrape', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/new',
      type: 'get',
      success: function(res) {
        console.log('successfully scraped articles');
        if (res) {
          window.location.replace('/scrape');
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $(document).on('click', '.save', function(e) {
    e.preventDefault();
    var id = $(this).data('id');  
    $.ajax({
      url: '/saved',
      type: 'put',
      data: { id: id, saved: true },
      success: function() {
        console.log('article saved');
        alert('article saved');
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $(document).on('click', '.delete', function(e) {
    e.preventDefault();
    var id = $(this).data('id');
    $.ajax({
        url: '/saved',
        method: 'delete',
        data: { id: id },
        success: function() {
          console.log('article deleted');
        },
        error: function(err) {
          console.log(err);
        }
    });
  });

});