const { dialog } = require('electron').remote;
const fs = require('fs');
const el = document.getElementById('foo');
el.onclick = () => {
  let f = dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] })
  console.log(f)
  console.log(fs.readdirSync(f[0]))
};
