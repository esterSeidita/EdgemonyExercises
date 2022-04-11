const fs = require("fs").promises;

async function WriteFile(path, content){
    await fs.writeFile(path, content, {flag: "a+"});
}

async function ReadFile(file){
    const result = await fs.readFile(file);
    console.log(result.toString());
}

async function WriteAndRead(path, content){
    WriteFile(path, content);
    ReadFile(path);
}

const arguments = process.argv.slice(2);

WriteAndRead("./spesa.txt", `${arguments}\n`)


