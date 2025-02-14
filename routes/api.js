'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const inputString = req.body.puzzle;
      const coords = req.body.coordinate;
      const value = req.body.value;
      try{
        const row = solver.splitCoords(value).row;
        const column = solver.splitCoords(value).column;
      if(!coords || !value || !inputString){
        throw new Error('Required field(s) missing');
      }else if( 1 < column ||  column > 9){
        throw new Error('Invalid value') 
      } else if('A' < row || row > 'I'){
        throw new Error('Invalid coordinate') 
      }


      if (!inputString){
        return res.json({ error: 'Required field missing' })
      }

      

        if(solver.validate(inputString)) {
          const chunks = solver.splitIntoChunks(inputString)
          


        }
      } catch(error){
        res.json({error: error.message})
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const inputString = req.body.puzzle;

      if (!inputString){
        return res.json({ error: 'Required field missing' })
      }
      try{
        if(solver.validate(inputString)) {
          const chunks = solver.splitIntoChunks(inputString)
          
        }
      } catch(error){
        res.json({error: error.message})
      }
    });
};
