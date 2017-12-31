var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mahasiswaSchema = new Schema({
	nama: String,
    umur: String,
    semester: String,
    jurusan: String
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);
