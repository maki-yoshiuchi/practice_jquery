$(function() {
  let inputZipcode;

  $('.zipcode').on('input', function() {
    inputZipcode = $('.zipcode').val().replace('-','');
    $('.address').val('');

    if ($.isNumeric(inputZipcode) && inputZipcode.length === 7) {
      $('.search_button').prop('disabled', false);
    } else {
      $('.search_button').prop('disabled', true);
    }
  });

  $('.search_button').on('click', function() {
    $.ajax({
      url: 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + inputZipcode,
      type: 'GET',
    }).done(function(data) {
      const response = JSON.parse(data)
      if (response['results']) {
        $('.address').val(response['results'][0]['address1'] + response['results'][0]['address2'] + response['results'][0]['address3']);
      } else {
        alert('その郵便番号は存在しません');
      }
    }).fail(function() {
      alert('しばらく経ってからもう一度お試しください');
    });
  });
});