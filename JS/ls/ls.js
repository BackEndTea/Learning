const fs = require('fs');

for(const item of fs.readdirSync(process.cwd())) {
    console.log(item);
}
