const fs = require("fs").promises;

async function WriteFile(path, content){
    await fs.writeFile(path, content);
}

// async function ReadFile(file){
//     const result = await fs.readFile(file);
//     console.log(result.toString());
// }

async function WriteAndRead(path, content){
    WriteFile(path, content);
    // ReadFile(path);
}

const arguments = process.argv.slice(2);

WriteAndRead("./index.html", `
<!DOCTYPE html>
<html>
    <head>
        <title>Lista</title>
    </head>
    <body>
        <ul>
            ${arguments.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    </body>
</html>
`)


