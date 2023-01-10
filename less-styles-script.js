var fs = require('fs')
var readline = require('readline')
var execSync = require('child_process').execSync

var inputLessFilePath = './styles/variables.less'
// var outputCSSFilePath = './styles/result.css'
var outputSassVarsFilePath = './styles/root.scss'

execSync(`lessc --js ${inputLessFilePath}`)

function replace(line) {
  var str = line.trim()
  if (str.length < 2 || str[0] !== '@' || str.includes('import')) return
  return '$' + str.substr(1)
}

var linereader = readline.createInterface({
  input: fs.createReadStream(inputLessFilePath),
})

fs.writeFileSync(outputSassVarsFilePath, '')

linereader.on('line', function (line) {
  var res = replace(line)
  if (res) {
    fs.appendFileSync(outputSassVarsFilePath, res + '\n')
  }
})