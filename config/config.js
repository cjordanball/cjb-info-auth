const ENVIRONMENT = process.env.NODE_ENV;
let DB_PATH;
let PORT;

switch (ENVIRONMENT) {
case 'test':
	DB_PATH = 'mongodb://localhost/cjballInfoTestDB';
	PORT = process.env.PORT || 3142;
	break;
case 'production':
	DB_PATH = 'mongodb://';
	PORT = process.env.PORT || 3142;
	break;
default:
	DB_PATH = 'mongodb://localhost/cjballInfoDB';
	PORT = process.env.PORT || 3142;
}

module.exports = {
	DB_PATH,
	PORT
};
