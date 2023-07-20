import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import routes from './Routes';

const app = express();

app.use(cors({ origin: JSON.parse(process.env.CLIENT ?? '') }));
app.use(express.json());
app.use('/api', routes);

config();

const { PORT } = process.env;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
