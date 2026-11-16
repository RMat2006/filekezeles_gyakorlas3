const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//*JSON beolvas
const ReadJSONFile = async(filePath)=>{
    try{
        const raw = await fs.readFile(filePath,'utf8');
        return JSON.parse(raw);
    }catch(error){
        throw new Error("JSON olvasási hiba!");
    }
};



//!Endpoints:
//?GET /api/test
//*JSON filebeolvas
router.get('/getallstat', async (request,response)=>{
    try{
        const utvonal = path.join(__dirname, "../files/statisztika.json");
        const content = await ReadJSONFile(utvonal);

        response.status(200).json({
            success:true,
            content: content
        })
    }catch(error){
        response.status(500).json({
            success:true
        })
    }
});

//*Telepulés szerint visszaad
router.get('/getstat/:telepaz', async (request,response)=>{
    try{
        let telepules = request.params.telepaz
        let utvonal = path.join(__dirname, '../files/statisztika.json')
        let content = await ReadJSONFile(utvonal)
        let tomb = [];
        tomb = content.telepules;
        let j=0;
        while(j<tomb.length && tomb[j].telepaz!=telepules){
            j++;
        }
        if(j<tomb.length){
            response.status(200).json({
                success:true,
                adatok: tomb[j]
            })

        }else{
            response.status(200).json({
                success:false,
                message: "Nincs ilyen település!"
            });
        
        }
        }catch(error){
            response.status(500).json({
                success: false
            })
        }
    
});

router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

module.exports = router;
