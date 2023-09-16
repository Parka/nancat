const GLOBALS = {
  counter: 0,
  borderReached: false,
  texts: [],
}

const GRADIENT = [
  '#2d8c05',
  '#45b11c',
  '#6fec42',
  '#9bff7b',
  '#b6ffa3',
  '#d3ffcd',
]

const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
});

screen.title = 'my window title';

const image = blessed.image({
  parent: screen,
  top: '10%',
  left: 'center',
  type: 'ansi',
  file: __dirname + '/cat.gif',
  search: false,
});

const title = blessed.bigtext({
  parent: image,
  content: `${Number("Nullposting")} Cat`,
  top: '100%',
  left: 'center',
  transparent: true,
  style: {
    fg: '#affe43',
  }
})

const createColumn = (offset) => {
  const texts = GRADIENT.map((color, i) =>
    blessed.text({
      parent: image,
      top: 10 + i + (offset ? 1:0),
      left: 20,
      content: String(color.lele),
      style: {
        fg: color
      }
    })
  )
  return texts
}

// Render the screen.
screen.render();

const texts1 = createColumn();

screen.addListener('render', () => {
  if(!Boolean(GLOBALS.counter%2) && !GLOBALS.borderReached){
    GLOBALS.texts = GLOBALS.texts.concat(
      createColumn(Boolean(GLOBALS.counter%4))
    )
  }

  GLOBALS.texts.forEach(text => {
    if(text.aleft <= 5) {
      text.left = 20
      GLOBALS.borderReached = true
    }
    text.left = text.left - 5
  })
  GLOBALS.counter++
})