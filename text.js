var fs = require("fs");
function getRecordsFromFile() {
var array = fs.readFileSync('data.txt').toString().split("\n");
    for(i in array) {
        return array[i];
    }
}
getRecordsFromFile();

