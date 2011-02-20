HabraLinguist.Form = {

  isRegistred:  false,
  isShown:      false,

  errorMessage: function(topic, selection) {
    return 'В посте <a href="' + topic.url + '">' + topic.title + '</a>, вы писали:' +
        '\n\n<blockquote>' + selection + '</blockquote>. \n\nПохоже, вы ошиблись.'
  },

  registerTemplate: function() {
    Jaml.register('Habralinguist-Formular', function(data) {

      div({id:'Habralinguist-Formular'},
          div({id:'Details'},
              span('Выдано тов. '),
              span({id:'Genosse'}, data.author)),

          h3('Замечание с предупреждением'),

          form({id:'Schreiben', action:"#"},
              input({type:'hidden', name:'message[recipients]', id:'', value: data.author}),

              div({cls:'Feld'},
                  label({'for':'Titel'}, 'Доводим до вашего сведения вопиющий факт.'),
                  input({type:'text', name:'message[title]', id:'Titel', value:'Ошибка в тексте'})),

              div({cls:'Feld'},
                  label({'for':'Nachricht'}, 'С негодованием и осуждением, сообщаем:'),
                  textarea({id:'Nachricht', name:'message[text]', cols:20, rows:7},
                      HabraLinguist.Form.errorMessage(data.topic, data.selection))),

              div({cls:'Feld'}, 'Товарищ! Соблюдение чистоты русского языка — основа построения светлого ' +
                  'коммунистического будущего! К игнорирующим правила родной речи будут применены самые строгие меры!')),

          div({id:'Unterschrift'},
              span('Комитет грамматической безопасности.'),
              button({id:'Stempel'}, 'Дата, подпись')));

    });

    this.isRegistred = true;
  },

  validate: function() {
    var isValid = true;

    $('#Titel, #Nachricht').each(function() {
      var elem = $(this);

      if (elem.val().trim().length == 0) {
        isValid = false;
        elem.addClass('error');
      }
      else {
        elem.removeClass('error');
      }
    });

    return isValid;
  },

  sendMessage: function() {
    $.post('http://habrahabr.ru/ajax/messages/add/',
        $('#Schreiben').serialize());
  },


  build: function() {
    if (!this.isRegistred) {
      $('body').append('<div id="Habralinguist"></div>');

      this.registerTemplate();
      this.isRegistred = true;
    }

    var pageData = HabraLinguist.getPageData();

    $('#Habralinguist').html(Jaml.render('Habralinguist-Formular', pageData));

    $("#Stempel").click(function() {
      if (HabraLinguist.Form.validate()) {
        HabraLinguist.Form.sendMessage();
        HabraLinguist.Form.hide();
      }
    });

  },

  show: function() {
    this.build();

    $('#Habralinguist').modal({
      zIndex: 3001,
      overlayCss: {backgroundColor:"#ccc"},

      escClose: true,
      overlayClose: true,

      onShow: function() {
        HabraLinguist.Form.isShown = true;
      },

      onClose : function() {
        HabraLinguist.Form.hide();
      }
    });
  },

  hide: function() {
    HabraLinguist.Form.isShown = false;
    $.modal.close();
  }
};