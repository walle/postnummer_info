(function ($) {
  $(function() {
    var example = $('h2').first();

    var form = $('<form method="POST" action=""></form>');
    var zip_code_input = $('<input maxlength="6" size="6" type="text" value="111 57" />');
    var submit =  $('<input type="submit" value="Slå upp addresser" />');
    var result = $('<div class="result"></div>');
    var demo = $('<div><h2>Demonstration</h2><p>Använd formuläret nedan för att ange ett postnummer. Resultatet laddas med JSONP in i en tabell nedanför.</p></div>');

    form.append(zip_code_input);
    form.append(submit);
    demo.append(form);
    demo.append(result);
    example.before(demo);

    form.submit(function(e) {
      e.preventDefault();
      $.getJSON('http://api.postnummer.info/v1/zip_codes/' + zip_code_input.val() + '?callback=?', function(data) {
        if (data.length) {
          var table = $('<table width="100%"><tr><th>Address</th><th>Startnummer</th><th>Slutnummer</th><th>Stad</th></tr></table>');
          for (var i = 0; i < data.length; i++) {
            table.append('<tr><td>' + data[i].name + '</td><td>' + (data[i].first_number ? data[i].first_number : '&nbsp;') + '</td><td>' + (data[i].last_number ? data[i].last_number : '&nbsp;') + '</td><td>' + data[i].city + '</td></tr>');
          }
          result.html(table);
        } else {
          result.html('<p>Sökningen gav inga träffar.</p>')
        }
      });
    });
  });
})(jQuery);
