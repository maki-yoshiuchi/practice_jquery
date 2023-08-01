$(function() {
  const zipcode = $('.js-zipcode');
  const searchButton = $('.js-search-button');
  const address = $('.js-address');
  let inputZipcode;

  zipcode.on('input', function() {
    address.val('');
    inputZipcode = $(this).val();
    $(this).val(inputZipcode.replace(/[^0-9]/g, ''));
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
        const {address1, address2, address3} = response[0];
        address.val(address1 + address2 + address3);
      } else {
        alert('その郵便番号は存在しません');
      }
    }).fail(function() {
      alert('しばらく経ってからもう一度お試しください');
    });
  });
});