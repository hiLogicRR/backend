var sql = require('mssql/msnodesqlv8');

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0}; Server={XXXX}; Database={XXXX}; Trusted_Connection={yes};',
};

class BackGateway {
    static async getBackByTrainingID(training_id) {
        sql.close();
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('training_id', sql.Int, training_id)
            .query('select exercise, reps, sets, type from Back where training_id=@training_id');
            sql.close();
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            sql.close();
            return null;
        }
    }

    static async insertBack(training_id, training) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('training_id', sql.Int, training_id)
            .input('exercise', sql.NVarChar, training['exercise'])
            .input('reps', sql.Int, training['reps'])
            .input('sets', sql.Int, training['sets'])
            .input('type', sql.Int, training['type'])
            .query('insert into Back(training_id, exercise, reps, sets, type) values(@training_id, @exercise, @reps, @sets, @type)');
            sql.close();
            return true;
        } catch (err) {
            console.log(err);
            sql.close();
            return false;
        }
    }
}

module.exports = {
    BackGateway
}
