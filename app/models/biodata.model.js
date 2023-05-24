module.exports = (sequelizeConnection, Sequelize) =>{

    const Biodata = sequelizeConnection.define("biodata", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tempat_lahir: {
            type: Sequelize.STRING,
        },
        tanggal_lahir: {
            type: Sequelize.DATEONLY,
        },
        alamat: {
            type: Sequelize.STRING
        }
    });
    
   return Biodata; 
}    

