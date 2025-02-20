const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', () => {
    suite('String test', () => {
        test('valid puzzle string of 81 characters',() => {
            const testPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            assert.strictEqual(solver.validate(testPuzzle), true);
        });

        test('puzzle string with invalid characters',() => {
            const testPuzzle = "1A5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            assert.throws(() => solver.validate(testPuzzle), Error, "Invalid characters in puzzle");
        });

        test('puzzle string that is not 81 characters in length',() => {
            const testPuzzle = "1.5..2.84..63.12.7.2..5.....9..1...."
            assert.throws(() => solver.validate(testPuzzle), Error, "Expected puzzle to be 81 characters long");
        });
    });

    suite('Row placement', () => {
        const testPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
        test('valid row placement',() => {
            assert.strictEqual(solver.checkRowPlacement(testPuzzle, 1, 2, 3), true);
        });

        test('Invalid row placement',() => {
            assert.strictEqual(solver.checkRowPlacement(testPuzzle, 1, 5, 5), false)  
        });
    });
    
    suite('Column placement', () => {
        const testPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
        test('valid column placement',() => {
            assert.strictEqual(solver.checkColPlacement(testPuzzle, 2, 1, 7), true);
        });

        test('Invalid column placement',() => {
            assert.strictEqual(solver.checkColPlacement(testPuzzle, 1, 1, 1), false)  
        });
    });

    suite('Region placement', () => {
        const testPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
        test('valid region placement',() => {
            assert.strictEqual(solver.checkRegionPlacement(testPuzzle, 3, 1, 7), true);
        });

        test('Invalid region placement',() => {
            assert.strictEqual(solver.checkRegionPlacement(testPuzzle, 2, 1, 2), false)  
        });
    });

    suite('Solver test', () => {
        const testPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
        const testPuzzleSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
        test('valid puzzle ',() => {
            assert.strictEqual(solver.validate(testPuzzle), true);
        });

        test('Invalid puzzle',() => {
            const invalidTestPuzzle = "5.1.9...6.9...5...1..3.6.2.5...1...3.6.2.8...9...6...4.7.2.5..4...7...8.3...9.1.6."
            ifassert.throws(() => solver.validate(invalidTestPuzzle), Error, "Expected puzzle to be 81 characters long"); 
        });
    
        test('valid puzzle with solution ',() => {
            const Puzzle = ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6"
            const Solution = "473891265851726394926345817568913472342687951197254638734162589685479123219538746"
            assert.strictEqual(solver.solve(Puzzle), Solution);
        });
    
    
    }); 
    
});