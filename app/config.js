var config = module.exports; 
config.db = {}; 

config.db.type = 'mysql';
config.db.charset = 'utf8'; 

config.db.host= 'localhost'; 
config.db.user= 'root';
config.db.password= 'Bettina96@';
config.db.name= 'support_manager';

var userRoles = config.userRoles = {
    guest: 1,    // ...001
    user: 2,     // ...010
    admin: 4     // ...100
};

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user: userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};

config.keys={
	secret: '9_1vz01n#5_d+w2zf6t=96$-r_1l#jkfv5yu#bhoozp30s9lgo'
};

  