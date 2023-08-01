$(function() {
  const zipcode = $('.js-zipcode');
  const searchButton = $('.js-search-button');
  const address = $('.js-address');
  let inputZipcode;

  zipcode.on('input', function() {
    address.val('');
    inputZipcode = zipcode.val().replace('-', '');
    const isValidInput = $.isNumeric(inputZipcode) && inputZipcode.length === 7;
    isValidInput ? searchButton.prop('disabled', false) : searchButton.prop('disabled', true);
  });

  searchButton.on('click', function() {
    $.ajax({
      url: `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${inputZipcode}`,
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