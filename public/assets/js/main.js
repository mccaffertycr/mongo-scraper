$(document).on('click', '.new-scrape', (e) => {
  e.preventDefault();
  $.ajax({
    url: '/scrape',
    type: 'GET',
    success: (res) => {
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    }
  })
})