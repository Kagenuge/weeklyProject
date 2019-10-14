$(function () {
  let i = 0;
  //Test Data
  /* $('#topic').attr('value', 'Bassonsoitto')
  $('#title').attr('value', 'Släppäys')
  $('#description').attr('value', 'Sormilla basson läpsytys')
  $('#ttm').attr('value', '1000h')
  $('#timeS').attr('value', '2000h')
  $('#src').attr('value', 'https://fi.wikipedia.org/wiki/Bass')
  $('startedL').text() */

  
  $('#submit').on('click', function (e) {
    e.preventDefault();

    const topic = $('#topic').val();
    const title = $('#title').val();
    const descr = $('#description').val();
    const ttm = $('#ttm').val();
    const timeS = $('#timeS').val();
    const src = $('#src').val();
    const startedL = $('startedL').val();
    const inProg = document.getElementById('inProg').checked;
    const compDate = $('#compDate').val();

    let olio = {
      key: i,
      topic: topic,
      title: title,
      description: descr,
      ttm: ttm,
      timeS: timeS,
      src: src,
      startedL: startedL,
      inProg: inProg,
      compDate: compDate
    };


    let olioString = JSON.stringify(olio)
    //console.log(Object.keys(olio).length)
    if (confirm('Save Data?')) {
      localStorage.setItem(i, olioString)

    getDataFromLocal()
    i++;
    } else {
      alert('No doings!')
    }
  })

  const getDataFromLocal = () => {
    const keyName = localStorage.key(i)
    const tulos = JSON.parse(localStorage.getItem(i));

    console.log(tulos)
    console.log(keyName)
    $('<div id=""></div>').attr("id", i).text(tulos.topic).appendTo('#blog')
    $('<p class="title"></p>')
      .appendTo('#' + i)
      .text('Title: ' + tulos.title)
    $('<p class="description"></p>')
      .appendTo('#' + i)
      .text('Description: ' + tulos.description)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Time Spent: ' + tulos.timeS)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Links: ' + tulos.src)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Started Learning: ' + tulos.startedL)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('In Progress: ' + tulos.inProg)
    $('<p class="ttm"></p>')
      .appendTo('#' + i)
      .text('Completion Date: ' + tulos.compDate)
  }

  function updateClock() {
    var time = new Date()
    var hr = time.getHours()
    var min = time.getMinutes()
    var sec = time.getSeconds()
    var localDate = new Intl.DateTimeFormat('fi').format(time)

    document.getElementById('time').innerHTML = localDate + ' / ' + hr + ':' + min + ':' + sec

    setInterval(updateClock, 1000)
  }

  updateClock();
})