const YAML = require('yamljs');
const fs   = require('fs');

export class FileUtils {

  public static async getFile(fileName){
    fileName = fileName.toLowerCase();
    let JSONObj;
    const filePath='resources/Data/' + fileName + '.json';
    const doc = fs.readFileSync(filePath,'utf8');
    JSONObj = JSON.parse(doc);
    return JSONObj;
  }

  public static deleteFiles(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        let curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) {
          FileUtils.deleteFiles(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }

}









