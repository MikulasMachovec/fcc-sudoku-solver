'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  
  app.route('/api/check')
    .post((req, res) => {
      try {
        const inputString = req.body.puzzle;
        const coords = req.body.coordinate;
        const inputVal = req.body.value;
        let value = parseInt(req.body.value, 10);
      
        if (!inputString || !coords ||  !inputVal) {
          return res.json({ error: 'Required field(s) missing' });
        }
    
        if (inputString.length !== 81){
          return res.json({error: 'Expected puzzle to be 81 characters long'})
        }
        solver.validate(inputString)
    
        if(!solver.validate(inputString)){
          return res.json({error: 'Invalid characters in puzzle'});
        }
        
        if(!solver.isValueValid(value)){
          return res.json({error: "Invalid value"})
        }

        if(isNaN(value) || value < 1 || value > 9 ){
          return res.json({error: "Invalid value"})
        }
       
        const { rowNum, column } = solver.splitCoords(coords);

        if (rowNum === null || isNaN(column) || column < 1 || column > 9) {
          return res.json({ error: 'Invalid coordinate' });
        }
        
        let isValid = solver.isValidPlacement(inputString, rowNum, column, value);
        if (isValid) {
          res.json({valid: isValid});
        } else {
          res.json({valid: isValid, conflict: solver.conflict});
        }

      } catch (error) {
        res.json(error.message);
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      try {
        const inputString = req.body.puzzle;

        if (!inputString) {
          return res.json({ error: 'Required field missing' });
        }

        if (inputString.length !== 81){
          return res.json({error: 'Expected puzzle to be 81 characters long'})
        }

        solver.validate(inputString)
    
        if(!solver.validate(inputString)){
          return res.json({error: 'Invalid characters in puzzle'});
        }
        
        if(!solver.solve(inputString)){
          return res.json({error: 'Puzzle cannot be solved'})
        }

        res.json({ solution: solver.solve(inputString) });
        
      } catch (error) {
        res.json(error.message);
      }
    });
};
