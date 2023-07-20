import winston from 'winston';

const logger = winston.createLogger({
	level: 'error',
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json(),
		winston.format.printf((info) => {
			const { level, stack, timestamp } = info;
			return JSON.stringify({
				level,
				timestamp,
				stack,
			});
		}),
	),
	transports: [new winston.transports.File({ filename: './src/logs/error.log' })],
});

export default logger;
