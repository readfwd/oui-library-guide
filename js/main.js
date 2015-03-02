define([
  '../addons/lfa-exercises/js/main',
  '../addons/lfa-backstage/js/main',
  'underscore',
], function(Exercises, Backstage, _) {
  window.Exercises = Exercises;
  window.firstTimeDoneMessages = [
     "בראבו!",
     "מזל טוב!",
     "מצוין!",
     "נכון!",
     "סופר!",
     "מרשים!",
     "מושלם!"
  ];

  var greetings = ["ברוכים הבאים!", "היי!", "יום טוב! ',' אהלן!", "מה קורה?"];

  var hh = (new Date()).getHours();

  if (hh >= 2 && hh < 12) {
    greetings.push('Good morning!');
  }
  else if (hh > 17 || hh < 2) {
    greetings.push('Good evening!!');
  } else {
    greetings.push('Hello!');
  }

  var useCounter = window.App.storage.getItem('useCounter') || 0;
  useCounter = parseInt(useCounter) + 1;

  var message = greetings[Math.min(Math.floor(Math.random() *greetings.length*1.5), greetings.length-1)];


  if(useCounter < 2){
     message = 'Apasă pentru a afla cum se folosește acest manual!';
  }

  window.setTimeout(function () {
    window.App.trigger('avatar:mood', {
      mood: 'smile',
      message: message,
      interval: 5000,
      icon: 'fa-smile-o'
    });
  }, 4000);

  window.App.storage.setItem('useCounter', useCounter);

  App.book.on('render', function() {

    $('.segment .textaloud').click(function(e){
      e.preventDefault();
      var a = $(this).parent().parent().find('audio')[0];
      if (a.currentTime > 0 && ! a.paused) {
        a.pause();

        if (!a.controls) {
          a.currentTime = 0;
        }
      } else {
        a.play();
      }
    });


    // trying to fix Safari troubles with audio playing
    $("audio").bind("stalled", function() {
        var audio = this;
        audio.load();

        // Threw in these two lines for good measure.
        audio.play();
        audio.pause();
    });

//     $(window).on('resize', _.throttle(function() {
//       if (current_popover) {
//         current_popover.popover('destroy');
//         current_popover = null;
//       }
//     }, 1000));

//     $(document).mouseup(function(e) {
//       if (current_popover == null) return;
//       if (!current_popover.is(e.target) && current_popover.has(e.target).length === 0) {
//         current_popover.popover('destroy');
//         current_popover = null;
//       }
//     });

  });
});
