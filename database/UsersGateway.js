var sql = require('mssql/msnodesqlv8');

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0}; Server={XXXXXX}; Database={XXXXXX}; Trusted_Connection={yes};',
};

class UsersGateway {
    static async getUsers() {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('select id, username, password, coalesce(pullups,0) as pullups, coalesce(pushups,0) as pushups, coalesce(squats,0) as squats from Users');
            sql.close();
            return result;
        } catch(err) {
            console.log(err);
            sql.close();
            return null;
        }
    }

    static async addUser(username, password) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .query('insert into Users (username, password) values(@username, @password)');
            sql.close();
            return true;
        } catch(err) {
            console.log(err);
            console.log('couldnt register new user');
            sql.close();
            return false;
        }
    }

    static async addUserAndGiveID(username, password) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .output('id', sql.Int)
            .execute('training_procedure');
            sql.close();
            console.log(result.output.id);
            return true;
        } catch(err) {
            console.log(err);
            console.log('couldnt register new user');
            sql.close();
            return false;
        }
    }

    static async updatePassword(id, newPassword) {
        try {
            let pool = await sql.connect(config);
            await pool.request()
            .input('password', sql.NVarChar, newPassword)
            .input('id', sql.Int, id)
            .query('update Users set password=@password where id=@id');
            sql.close();
            return true;
        } catch(err) {
            console.log(err);
            sql.close();
            return false;
        }
    }

    static async updateReps(id, pullups, pushups, squats) {
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('id', sql.Int, id)
            .input('pullups', sql.Int, pullups)
            .input('pushups', sql.Int, pushups)
            .input('squats', sql.Int, squats)
            .query('update Users set pullups=@pullups, pushups=@pushups, squats=@squats where id=@id');
            sql.close();
            console.log(result)
            return true;
        } catch(err) {
            console.log(err);
            sql.close();
            return false;
        }
    }
}

module.exports = {
    UsersGateway
};
