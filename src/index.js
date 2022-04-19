// Generated project node-template
require('dotenv').config();
const Redis = require("redis");

const {transports, createLogger, format} = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
	format.timestamp(),
	format.json()
  ),
  defaultMeta: { service: 'node-template' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'node-template.log' }),
  ],
});


    
const argv = require('minimist')(process.argv.slice(2));
const DEBUG = process.env['DEBUG'];



logger.info(`Start Project: ${JSON.stringify({DEBUG, argv})}  `);


(async () => {
    redis = Redis.createClient();
    try {
          await redis.connect()
          logger.info('Succesfully connected to redis');
          
        } catch (error) {
              logger.error(error.message);
            }
    
    
})();
