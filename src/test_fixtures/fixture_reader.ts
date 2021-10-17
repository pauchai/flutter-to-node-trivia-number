import fs from "fs"
const fixture = (name: string) => {
    return fs.readFileSync(name + '.json')
}
export default  fixture