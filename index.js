const chalkAnimation = require('chalkercli');
let str = String.raw`
LOADING SHAON[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] 
`;
let logo = String.raw`
     ____  _   _    _    ___  _   _ 
 / ___|| | | |  / \  / _ \| \ | |
 \___ \| |_| | / _ \| | | |  \| |
  ___) |  _  |/ ___ \ |_| | |\  |
 |____/|_| |_/_/   \_\___/|_| \_|



`;

const karaoke = chalkAnimation.karaoke(str);
const rainbow = chalkAnimation.rainbow(logo);
setTimeout(async() => {
    await karaoke.start()
    await rainbow.start()
    console.clear()
}, 1000);

setTimeout(() => {
    karaoke.stop()
    rainbow.stop()
    require('./app/main.js')
}, 7000);
