var sql = require('mssql/msnodesqlv8');

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0}; Server={DESKTOP-CPETP6D}; Database={www-project}; Trusted_Connection={yes};',
};

class LegsGateway {
    static async addLegs(username, password) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('training_id', sql.NVarChar, username)
            .input('exercise', sql.NVarChar, password)
            .input('reps', sql.NVarChar, password)
            .input('sets', sql.NVarChar, password)
            .input('type', sql.NVarChar, password)//moze byc null
            .query('insert into Users (training_id, exercise, reps, sets, type) values(@username, @password)');
            sql.close();
            return true;
        } catch(err) {
            console.log(err);
            console.log('couldnt register new user');
            sql.close();
            return false;
        }
    }
}

module.exports = {
    LegsGateway
}