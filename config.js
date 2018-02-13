var config = {}; 
config.db = {}; 

config.db.type = 'mysql';
config.db.charset = 'utf8'; 

config.db.host= 'localhost'; 
config.db.user= 'root';
config.db.password= 'Bettina96@';
config.db.name= 'support_manager';

config.db.users_tbl = 'users';
config.db.admin_tbl = 'admin';

config.keys={
	secret: '9_1vz01n#5_d+w2zf6t=96$-r_1l#jkfv5yu#bhoozp30s9lgo'
}
module.exports = config; 