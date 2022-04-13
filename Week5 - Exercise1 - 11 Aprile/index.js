const fs = require("fs").promises;
const data = require("./data.json");

async function WriteFile(path, content){
    await fs.writeFile(path, content);
}

const arguments = process.argv.slice(2);

data.listElements.push(
    {
        product: arguments[0],
        quantity: arguments[1]
    }
);

WriteFile("./data.json", JSON.stringify(data));

const htmlContent = 
`
<!DOCTYPE html>
<html>
    <head>
        <title>Lista</title>
    </head>
    <body>
        <ul>
            ${data.listElements.map(({product, quantity}) => `<li>Prodotto: ${product}; Quantità: ${quantity}</li>`).join("\n\t\t\t")}
        </ul>
    </body>
</html>
`;
        
WriteFile("./index.html", htmlContent)