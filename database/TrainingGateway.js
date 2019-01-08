var sql = require('mssql/msnodesqlv8');


var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0}; Server={DESKTOP-CPETP6D}; Database={www-project}; Trusted_Connection={yes};',
};

class TrainingGateway {
    static async getTrainingIDsByUserID(user_id) {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .output('id', sql.Int)
            .query('select id, name from Training where user_id=@user_id');
            return result;
        } catch (err) {
            console.log(err);
            sql.close();
            return null;
        }
    }
}

module.exports = {
    TrainingGateway
}