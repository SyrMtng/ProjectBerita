var express = require('express');
var router = express.Router();
var multer = require('multer');
const moment = require('moment');

const fileStorage = multer.diskStorage({
	destination: (req, file, callback) => {
	  callback(null, '././public/images');
	},
	filename: (req, file, callback) => {
	  callback(null, new Date().getTime() + '-' + file.originalname);
	}
  });
  
const kirim = multer({
	storage: fileStorage
})


const db = require('../models');
const { komen1s, komen2s } = require('../models');
const Berita = db.berita;
const Komen1s = db.komen1s;
const Komen2s = db.komen2s;
const Op = db.Sequelize.Op;

/* GET Halaman Utama */
router.get('/', function(req, res, next) {
	res.render('berita', { title: 'Daftar Berita' });
  });
  router.get('/berita', function(req, res, next) {  
	Berita.findAll()
	  .then(berita => {
		res.render('berita', { 
		title: 'Daftar Berita',
		berita: berita
	  });
	  })
	  .catch(err => {		
	  res.render('berita', { 
		title: 'Daftar Berita',
		berita: []
	  });
	  });
  
  });

  router.get('/tambahberita', function(req, res, next) {
	res.render('tambahberita', { title: 'Tambah Berita' });
  });
  router.post('/tambahberita', kirim.array('gambar', 1), function(req, res, next) {
	let gambar = req.files[0].filename;

		let berita = {
		  judul: req.body.judul,
		  deskripsi: req.body.deskripsi,
		  isi: req.body.isi,
		  gambar: gambar
	  }
	  Berita.create(berita)
	  .then(data => {
		  res.redirect('/berita');
	  })
	  .catch(err => {
		  res.render('tambahberita', { 
		title: 'Tambah Berita'
	  });
	  });
  });

router.get('/baca/:id', async function(req, res, next) {  
	var id = req.params.id; 
	var nama = req.params.nama; 
	const komentarr = await Komen1s.findAll({where:{idberita:id}});
	await Berita.findByPk(id)
	  .then(baca => {
		  if(baca){
			  res.render('baca', { 
		  		title: 'Baca Berita',
		  		berita: baca,
				komen1s: komentarr
		});
		  }else{
			  // http 404 not found
			  res.render('baca', { 
		  title: 'Baca Produk',
		  berita: {}
		});
		  }
		  
	  })
	  .catch(err => {
		  res.render('baca', { 
		title: 'Baca Berita',
		berita: {}
	  });
	  });
  
  });
  
  
  router.get('/deleteberita/:id', function(req, res, next) {  
	var id = parseInt(req.params.id); // /detail/2, /detail/3
	Berita.destroy({
		  where: {id: id}
	  })
	  .then(num => {
	  res.redirect('/berita');
	  })
	  .catch(err => {
		  res.json({
			  info: "Error",
			  message: err.message
		  });
	  });  
  
  });
  
  router.get('/editberita/:id', function(req, res, next) {  
	const id = parseInt(req.params.id);
	Berita.findByPk(id)
	  .then(berita => {
		  if(berita){
			res.render('editberita', { 
		  		title: 'Edit Berita',
		  		berita: berita
		});
		  }else{
			  // http 404 not found
			  res.redirect('/berita');
		  }
		  
	  })
	  .catch(err => {
		  res.redirect('/editberita');
	  });
  
  });
  router.post('/editberita/:id', kirim.array('gambar', 1), function(req, res, next) {  
	const id = parseInt(req.params.id);
	let gambar = req.files[0].filename;
	let berita = {
		judul: req.body.judul,
		deskripsi: req.body.deskripsi,
		isi: req.body.isi,
		gambar: gambar
	}
	Berita.update(berita, {
		  where: {id: id}
	  })
	  .then(num => {
		  res.redirect('/berita');
		  
	  })
	  .catch(err => {
		  res.json({
			  info: "Error",
			  message: err.message
		  });
	  });
  
  });

router.post('/komen', function(req, res, next) {
	let komen = {
		idberita: req.body.idberita,
		nama: req.body.nama,
		isi: req.body.isi
	}
	Komen1s.create(komen)
	.then(data => {
		res.redirect('/berita');
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
	  });
	});
});

router.post('/balas', function(req, res, next) {
	let komen1 = {
		idkomen: req.body.idkomen,
		nama1: req.body.nama1,
		balas: req.body.balas
	}
	Komen2s.create(komen1)
	.then(data => {
		res.redirect('/berita');
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
	  });
	});
});
module.exports = router;
