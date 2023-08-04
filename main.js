$(function() {
  const $zipcode = $('.js-zipcode');
  const $searchButton = $('.js-search-button');
  const $address = $('.js-address');
  let inputZipcode;

  $zipcode.on('input', function() {
    $address.val('');
    inputZipcode = $(this).val();
    $(this).val(inputZipcode.replace(/[^\d-]/g, ''));
    inputZipcode = inputZipcode.replace('-','');
    const isInvalidInput = !$.isNumeric(inputZipcode) || inputZipcode.length !== 7;
    $searchButton.prop('disabled', isInvalidInput);
  });

  $searchButton.on('click', function() {
    $.ajax({
      url: `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${inputZipcode}`,
      type: 'GET',
    }).done(function(data) {
      const {results} = JSON.parse(data);
      if (!results) {
        alert('その郵便番号は存在しません');
        return;
      }
      const [{address1, address2, address3}] = results;
      $address.val(address1 + address2 + address3);
    }).fail(function() {
      alert('しばらく経ってからもう一度お試しください');
    });
  });
});