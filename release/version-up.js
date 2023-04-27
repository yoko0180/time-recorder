const fs = require("fs")
const { join } = require("path")
const FILE_SW = "src/service-worker.ts"
const read = (file) => {
  return fs.readFileSync(file, "utf8")
}
const write = (file, content) => {
  fs.writeFileSync(file, content, "utf-8")
}

const readVer = () => {
  const c = read("package.json")
  let json
  try {
    json = JSON.parse(c)
  } catch (error) {
    console.log("package.json parse error", error)
  }
  return json.version
}
const version = readVer()
// console.log('version', version);

const contextSw = read(FILE_SW)
const newStr = contextSw.replace(/ver: ([\d\.]+)/, "ver: " + version)
console.log('newStr', newStr);

// write(FILE_SW, newStr)
