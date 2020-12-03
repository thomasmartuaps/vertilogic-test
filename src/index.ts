import express from 'express';
import routes from './routes/index';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));