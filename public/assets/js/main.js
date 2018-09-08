$(document).ready(function() {

$(document).on('click', '.new-scrape', (e) => {
  e.preventDefault();
  $.ajax({
    url: '/new',
    type: 'get',
    success: (res) => {
      console.log('successfully scraped articles');
      if (res) {
        window.location.replace('/scrape');
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
});

// $(document).on('click', '.save', (e) => {
  // $(this) <- returning whole dom for some reason vanilla js below is working for now
// }
var saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', function(e) {
  e.preventDefault();
  var id = $(this).data('id');

  $.ajax({
    url: '/saved',
    type: 'put',
    data: { id: id, saved: true },
    success: (res) => {
      console.log('article saved');
      alert('article saved');
    },
    error: (err) => {
      console.log(err);
    }
  });
});

});