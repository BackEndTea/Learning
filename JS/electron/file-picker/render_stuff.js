const { dialog } = require('electron').remote;
const fs = require('fs');

let files;
let dir = '';
let index = 0;

const el = document.getElementById('foo');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

el.onclick = () => {
  let d = dialog.showOpenDialog({ properties: ['openDirectory',  'multiSelections'] })
  f = fs.readdirSync(d[0])
  index = 0;
  updateBar(d[0], f[index]);
  files = f;
  dir = d[0];
  if (files.length > 1) {
    next.classList.remove('hidden');
  }
};

next.onclick = () => {
  if(next.classList.contains('hidden')) {
    return;
  }
  prev.classList.remove('hidden');
  index++;
  displayButtons();
  updateBar(dir, files[index]);
};

prev.onclick = () => {
  if(prev.classList.contains('hidden')) {
    return;
  }
  index--;
  displayButtons();
  updateBar(dir, files[index]);
};

function displayButtons(){
  if (index >= files.length -1) {
    next.classList.add('hidden');
  } else {
    next.classList.remove('hidden')
  }
  if (index === 0) {
    prev.classList.add('hidden');
  } else {
    prev.classList.remove('hidden');
  }
}

function updateBar(dir, file) {
  document.getElementById('bar').innerHTML = `<img src="${dir +'/'+ file}">`
}

document.addEventListener("keydown", event => {
  console.log(event)
  switch(event.keyCode) {
    case 37:
      prev.click();
      break;
    case 39:
      next.click();
      break;
  }
});
