const DOM = (function(){
  let DOMStrings = {
    rgbClue: '#rgb_numbers',
    new: '#new_colors',
    easy: '#easy_btn',
    hard: '#hard_btn',
    tiles: '.tile',
    header: 'header'
  }

  let DOMElements = {
    rgbClue: document.querySelector(DOMStrings.rgbClue),
    newBtn: document.querySelector(DOMStrings.new),
    easyBtn: document.querySelector(DOMStrings.easy),
    hardBtn: document.querySelector(DOMStrings.hard),
    tiles: document.querySelectorAll(DOMStrings.tiles),
    header: document.querySelector(DOMStrings.header)
  }


  return {
    DOMElements: DOMElements
  }
})()


const Controller = (function(){
  let dom = DOM.DOMElements
  //Initialisation
  function init(tiles, title){
    dom.tiles.forEach(function(e){
      if(e.style.display !== 'none'){
        e.style.background = randomColor()
      }
    })
    dom.header.style.background = 'rgb(72,120,171)'
    answer(title);
  }
  //Random
  function randomNumber(max){
    result = Math.floor(Math.random() * max);
    return result
  }
  //RandomColor
  function randomColor(){
    let result = `rgb(${randomNumber(256)}, ${randomNumber(256)}, ${randomNumber(256)})`;
    return result;
  }
  function correctTile(){
    count = 0;
    dom.tiles.forEach(function(e){
      if(e.style.display !== 'none'){
        count +=1
      }
    })
    let rTile = document.querySelector('.tile_' + (randomNumber(count) +1))
    return rTile
  }
  //Set text to one of those colors
  function answer(title){
    let correct = correctTile()
    title.textContent = correct.style.background
  }

  function checkAnswer(tile){
    if(tile.style.background === document.querySelector('h1').textContent){
      document.querySelector('h1').textContent = 'WINNER!'
      dom.newBtn.textContent = 'Play Again?'
      dom.tiles.forEach(function(e){
        e.style.background = tile.style.background
      })
      dom.header.style.background = tile.style.background
    }else{
      tile.removeAttribute('style')
      tile.classList.add('wrong')
    }
  }
  //Easy Button sets to 3 tiles
  function easyMode(tiles, title){
    document.querySelector('.tile_4').style.display = 'none'
    document.querySelector('.tile_5').style.display = 'none'
    document.querySelector('.tile_6').style.display = 'none'
    init(tiles, title);
  }
  function hardMode(tiles, title){
    document.querySelector('.tile_4').style.removeProperty('display')
    document.querySelector('.tile_5').style.removeProperty('display')
    document.querySelector('.tile_6').style.removeProperty('display')
    init(tiles, title);
  }

  return{
    randomColor: randomColor,
    correctTile: correctTile,
    init: init,
    checkAnswer: checkAnswer,
    easyMode: easyMode,
    hardMode: hardMode
  }
})(DOM)

const UIController = (function(){
  let dom = DOM.DOMElements
  let answer = Controller.answer

  //Init
  Controller.init(dom.tiles, dom.rgbClue);

  //New Game
  dom.newBtn.addEventListener('click', function(){
    Controller.init(dom.tiles, dom.rgbClue);
    document.querySelector('#new_colors').textContent = 'New Colors'

  })

  //Check Answer on Click
  dom.tiles.forEach(function(tile){
    tile.addEventListener('click', function(){
      Controller.checkAnswer(this)
    })
  })

  //Easy mode
  dom.easyBtn.addEventListener('click', function(){
    Controller.easyMode(dom.tiles, dom.rgbClue)
  } )

  //Hard easyMode
  dom.hardBtn.addEventListener('click', function(){
    Controller.hardMode(dom.tiles, dom.rgbClue)
  } )

})(DOM, Controller)
