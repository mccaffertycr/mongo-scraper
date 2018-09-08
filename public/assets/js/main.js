$(document).on('click', '.new-scrape', (e) => {
  e.preventDefault();
  $.ajax({
    url: '/scrape',
    type: 'get',
    success: (res) => {
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    }
  });
});

$(document).on('click', '.save', (e) => {
  e.preventDefault();
  var id = $(this).data('id');
  $.ajax({
    url: '/saved',
    type: 'put',
    data: { id: id, saved: true },
    success: () => {
      console.log('article saved');
    },
    error: (err) => {
      console.log(err);
    }
  });
});