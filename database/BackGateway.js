var sql = require('mssql/msnodesqlv8');

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0}; Server={DESKTOP-CPETP6D}; Database={www-project}; Trusted_Connection={yes};',
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
}

module.exports = {
    BackGateway
}