[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Snzl21PZ)

# Canvas Calculator

The Canvas Calculator is a simple calculator application implemented using HTML5 Canvas and JavaScript. This project allows users to perform basic arithmetic calculations visually. It's designed to help you learn about the JavaScript Canvas API while creating a functional calculator.

## User Requirements

This calculator satisfies the following user requirements:

1. **Evaluate Expressions**: Users can evaluate arithmetic expressions by clicking the "=" button.

2. **Backspace Functionality**: Users can delete a character from the expression using the "Back" button.

3. **Error Handling**: The calculator provides feedback by displaying "Invalid Expression" when an expression is malformed.

4. **Arithmetic Operators**: Users can construct expressions using standard arithmetic operators, including addition (+), subtraction (-), multiplication (*), division (/), and modulus (%).

## Features

- Arithmetic operations: addition (+), subtraction (-), multiplication (*), division (/), modulus (%).
- Visual display for the equation and result.
- Backspace functionality to delete characters.
- Error message for invalid expressions.
- Maximum of 4 decimal points in the result.


### HTML Structure

The HTML structure consists of a `<canvas>` element, styled within a container:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Canvas Calculator</title>
    <style>
        /* Styles for the canvas and container */
    </style>
</head>
<body>
    <div class="canvas-container">
        <canvas id="calculator" width="625" height="675"></canvas>
    </div>
    <script>
        // JavaScript code for the calculator
    </script>
</body>
</html>
```

## JavaScript

JavaScript code handles the functionality of the calculator, including button rendering and calculation:

1. **canvas** and **ctx** represent the canvas element and its context.
2. **buttons** and **firstbuttons** store button information.
3. **equationText** stores the input equation, and resultText holds the result.
4. **drawButtons** renders buttons and the result display.
5. Event listeners handle button clicks and actions based on the button label.

## CSS

CSS styles are used to define the appearance of the canvas, including its border, rounded corners, and text alignment for the result display.

## Usage

1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:info-6150-fall-2023/assignment-7-VinayGangadhara.git
   ```
2. Open the index.html file in a web browser (e.g., Chrome, Firefox, or Edge).

3. The Canvas Calculator interface will be displayed, allowing you to perform calculations.

4. Click the calculator buttons to enter numbers and operators.

5. Use the "=" button to evaluate the expression and see the result.

6. Click the "Back" button to delete the last character from the expression.

7. If you enter an invalid expression, an error message will be displayed.

## Contact

If you have any questions or need assistance, feel free to contact the project maintainers:

- **Vinay Gangadhara**
- **002837586**
