import express from 'express';
import http from 'http';
import logger from 'morgan';
import cors from 'cors';
import apiRoutes from './src/routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/v1', apiRoutes);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, '0.0.0.0');

console.log('server listening at:', port);

export default server;
