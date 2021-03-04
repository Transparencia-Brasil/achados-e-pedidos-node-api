(function () {

    var winston = require('winston');
    winston.emitErrs = true;

    var loggerInfo = new winston.Logger({
        transports: [
            new (require('winston-daily-rotate-file')) ({
                name: 'info-file',
                level: 'info',
                filename: './logs/-info.log',
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                handleExceptions: false,
                json: true,
                maxsize: 524288000, //500MB
                maxFiles: 10,
                colorize: false
            })
            // ,
            // new winston.transports.Console({
            //     level: 'debug',
            //     handleExceptions: true,
            //     json: false,
            //     colorize: true
            // })
        ],
        exitOnError: false
    });

    var loggerError = new winston.Logger({
        transports: [
            new (require('winston-daily-rotate-file')) ({
                name: 'error-file',
                level: 'error',
                filename: './logs/-error.log',
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                handleExceptions: false,
                json: true,
                maxsize: 524288000, //500MB
                maxFiles: 10,
                colorize: false
            })
            // ,
            // new winston.transports.Console({
            //     level: 'debug',
            //     handleExceptions: false,
            //     json: false,
            //     colorize: true
            // })
        ],
        exitOnError: false
    });

    var loggerWarn = new winston.Logger({
        transports: [
            new (require('winston-daily-rotate-file')) ({
                name: 'warn-file',
                level: 'warn',
                filename: './logs/-warn.log',
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                handleExceptions: false,
                json: true,
                maxsize: 524288000, //500MB
                maxFiles: 10,
                colorize: false
            })
            // ,
            // new winston.transports.Console({
            //     level: 'debug',
            //     handleExceptions: true,
            //     json: false,
            //     colorize: true
            // })
        ],
        exitOnError: false
    });

    module.exports = {

        error : function(message, header) {
            loggerError.error(message, header);
        },
        
        info : function(message, header) {
            loggerInfo.info(message, header);
        },

        warn : function(message, header) {
            loggerWarn.warn(message, header);
        }
    }

})();

