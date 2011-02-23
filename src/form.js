var HabraLinguistForm = function(getPageData) {

  var self = {};

  var isRegistred = false;
  self.isShown = false;

  var registerTemplate = function() {
    Jaml.register('Habralinguist-Formular', function(data) {

      var errorMessage = function(topic, selection) {
        return 'В посте <a href="' + topic.url + '">' + topic.title + '</a>, вы писали:' +
            '\n\n<blockquote>' + selection + '</blockquote>. \n\nПохоже, вы ошиблись.'
      };

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
                      errorMessage(data.topic, data.selection))),

              div({cls:'Feld'}, 'Товарищ! Соблюдение чистоты русского языка — основа построения светлого ' +
                  'коммунистического будущего! К игнорирующим правила родной речи будут применены самые строгие меры!')),

          div({id:'Unterschrift'},
              span('Комитет грамматической безопасности.'),
              button({id:'Stempel'}, 'Дата, подпись')));

    });

    isRegistred = true;
  };


  var validate = function() {
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
  };

  var sendMessage = function() {
    $.post('http://habrahabr.ru/ajax/messages/add/', $('#Schreiben').serialize());
  };

  var build = function() {
    if (!isRegistred) {
      $('body').append('<div id="Habralinguist"></div>');

      registerTemplate();
      isRegistred = true;
    }

    $('#Habralinguist').html(Jaml.render('Habralinguist-Formular', getPageData()));

    $("#Stempel").click(function() {
      if (validate()) {
        sendMessage();
        hide();
      }
    });
  };

  var hide = function() {
    self.isShown = false;
    $.modal.close();
  };

  self.show = function() {
    build();

    $('#Habralinguist').modal({
      zIndex: 3001,
      overlayCss: {backgroundColor:"#ccc"},

      escClose: true,
      overlayClose: true,

      onShow: function() {
        self.isShown = true;
      },

      onClose : function() {
        hide();
      }
    });
  };

  return self;
};