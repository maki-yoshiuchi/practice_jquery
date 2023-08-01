$(function() {
  const zipcode = $('.zipcode');
  const searchButton = $('.search_button');
  const address = $('.address');
  let inputZipcode;

  zipcode.on('input', function() {
    inputZipcode = zipcode.val().replace('-','');
    address.val('');

    if ($.isNumeric(inputZipcode) && inputZipcode.length === 7) {
      searchButton.prop('disabled', false);
    } else {
      searchButton.prop('disabled', true);
    }
  });

  searchButton.on('click', function() {
    $.ajax({
      url: 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + inputZipcode,
      type: 'GET',
    }).done(function(data) {
      const response = JSON.parse(data).results;
      if (response) {
        const result = response[0];
        address.val(result.address1 + result.address2 + result.address3);
      } else {
        alert('その郵便番号は存在しません');
      }
    }).fail(function() {
      alert('しばらく経ってからもう一度お試しください');
    });
  });
});