const backstop = require('backstopjs');
const backstop_config = require('./backstop_config.json');
const links = require('./data/links-empresas.json');

const getArgs = () =>
    process.argv.reduce((args, arg) => {
      // long arg
      if (arg.slice(0, 2) === "--") {
        const longArg = arg.split("=");
        const longArgFlag = longArg[0].slice(2);
        const longArgValue = longArg.length > 1 ? longArg[1] : true;
        args[longArgFlag] = longArgValue;
      }
      // flags
      else if (arg[0] === "-") {
        const flags = arg.slice(1).split("");
        flags.forEach((flag) => {
          args[flag] = true;
        });
      }
      return args;
    }, {});
  
const args = getArgs();
console.log('args',args);
// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });

const urlA="https://empresas.movistar.com.pe/";
const urlB="https://uatwp-cms-empresas.movistar.com.pe/";


let scenarios = [];
links.forEach( (element, index) => {
    let item = {
        "label": element,
        "url": element.replace(urlA,urlB),
        "referenceUrl": element,
        "readyEvent": "",
        "readySelector": "",
        "delay": 0,
        "hideSelectors": [],
        "removeSelectors": [],
        "hoverSelector": "",
        "clickSelector": "",
        "postInteractionWait": 0,
        "selectors": [],
        "selectorExpansion": true,
        "expect": 0,
        "misMatchThreshold" : 0.1,
        "requireSameDimensions": true
    };
    scenarios[index]=item;     
});

backstop_config.scenarios = scenarios;

console.log('Identificados '+scenarios.length+' escenarios');

/*
backstop('reference',{
    config: backstop_config
});

backstop('test',{
    config: backstop_config
});


//run with: 
node init.js -r --l=links-empresas --o=empresas.movistar.com.pe --d=uatwp-cms-empresas.movistar.com.pe
/*
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
*/