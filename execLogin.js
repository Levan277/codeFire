function runProgram(){
    const exec  = require("child_process")
    exec("node loginAutomation.js",(error,stdout,stderr) => {
        if(error){
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`);
    });
}