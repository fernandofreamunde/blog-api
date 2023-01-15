import { app } from "./app";

const port = isNaN(Number(process.env.APP_PORT)) ? 3333 : Number(process.env.APP_PORT);

app.listen(port, () => console.log(`Server running on port ${port}!`));
