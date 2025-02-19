'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  
  app.route('/api/check')
    .post((req, res) => {
      try {
        const inputString = req.body.puzzle;
        const coords = req.body.coordinate;
        let value = parseInt(req.body.value, 10);
        const inputVal = req.body.value;
      
        if (!inputString || !coords ||  !inputVal) {
          return res.json({ error: 'Required field(s) missing' });
        }

        solver.validate(inputString)
        solver.isValueValid(value)

        if(isNaN(value) || value < 1 || value > 9 ){
          throw new Error("Invalid value")
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
        res.json({ error: error.message });
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      try {
        const inputString = req.body.puzzle;

        if (!inputString) {
          return res.json({ error: 'Required field missing' });
        }

        solver.validate(inputString);
        res.json({ solution: solver.solve(inputString) });

      } catch (error) {
        res.json({ error: error.message });
      }
    });
};
