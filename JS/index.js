// Obtain the canvas element and its drawing context
const canvas = document.getElementById('calculatorCanvas');
const ctx = canvas.getContext('2d');

// Initialize variables to hold the current expression and the display state
let currentExpression = '';
let resultDisplayed = false;

// Define the layout of the calculator buttons
const buttons = [
  '','','','%','/',
  '(', '7', '8', '9','X',
  ')', '4', '5', '6','-',
  'Back', '1', '2', '3','+',
  '0','.','='
];

// Function to draw the display area where the expression and result are shown
function drawDisplay(expression, result) {
  ctx.fillStyle = '#4e5052';  // Set the background color for the display
  ctx.fillRect(10, 10, 395, 90);  // Draw the display rectangle
  ctx.fillStyle = '#ebebec';  // Set the text color
  // Draw the current expression and result on the display
  ctx.font = '18px Arial';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(expression.toString(), 380, 30);
  ctx.font = '24px Arial';
  ctx.fillText(result.toString(), 380, 60);
}

// Function to update the display
function updateDisplay(expression, result = '') {
  drawDisplay(expression, result);
}

// Initial call to display an empty screen
updateDisplay('');

// Function to draw the control buttons (close, minimize, expand)
function drawControlButtons() {
  // Draw each control button
  drawControlButton(15, 15, 15, '', '#ff0000');  // Close button
  drawControlButton(40, 15, 15, '', '#ffcc00');  // Minimize button
  drawControlButton(65, 15, 15, '', '#00ff00');  // Expand button
}

// Function to draw a single control button
function drawControlButton(x, y, diameter, action, color) {
  ctx.beginPath();  // Begin a new path for the circle
  ctx.arc(x + diameter / 2, y + diameter / 2, diameter / 2, 0, 2 * Math.PI);  // Draw the circle
  ctx.fillStyle = color;  // Set the fill color
  ctx.fill();  // Fill the circle with color

  // Style settings for the text inside the button (not used here since 'action' is empty)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
}

// Call the function to draw control buttons
drawControlButtons();

// Function to draw a calculator button
function drawButton(x, y, width, height, text, bgColor) {
  ctx.fillStyle = bgColor;  // Set the button background color
  ctx.fillRect(x, y, width, height);  // Draw the button rectangle
  ctx.fillStyle = '#ebebec';  // Set the button text color
  // Draw the text label on the button
  ctx.font = '22px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + width / 2, y + height / 2); 
}

// Define the button dimensions and layout properties
const buttonWidth = 78; 
const buttonHeight = 40;
const buttonMargin = 1;
const buttonStartY = 100; 

// Function to draw the entire calculator interface
function drawCalculator() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas for redrawing
  updateDisplay(currentExpression);  // Update the display with the current expression
  drawControlButtons();  // Draw the control buttons

  let x = 10;  // Starting x-coordinate
  let y = buttonStartY;  // Starting y-coordinate

  // Iterate through each button definition and draw it on the canvas
  buttons.forEach((text, index) => {
      let bgColor = '#787a7e';  // Default button color
      // Set the last button in each row to a different color
      if ((index + 1) % 5 === 0) {
          bgColor = '#ff9f0a';
      }
      // Set the control buttons to a different color
      if (index < 4) {
          bgColor = '#5f6064';
      }
      // Set the width for the '0' button to span multiple slots
      let buttonWidthToUse = buttonWidth;
      if (text === '0') {
          buttonWidthToUse = (buttonWidth * 3) + 1.2 + buttonMargin;
      }
      // Draw the button with the determined properties
      drawButton(x, y, buttonWidthToUse, buttonHeight, text, bgColor);
      // If it's the '=' button, change its color
      if (index == 22) {
          drawButton(x, y, buttonWidthToUse, buttonHeight, text, '#ff9f0b');
      }
      // Move the x-coordinate for the next button
      x += buttonWidthToUse + buttonMargin;
      // Move to the next row after every fifth button
      if ((index + 1) % 5 === 0) {
          x = 10;
          y += buttonHeight + buttonMargin;
      }
  });
}

// Call the function to draw the calculator initially
drawCalculator();

// Function to calculate the result of the expression without using eval()
function calculateResult(expression) {
  try {
    // Use the Function constructor to evaluate the expression
    const calculate = new Function('return ' + expression);
    return calculate().toString();
  } catch (e) {
    // Throw an error if the expression is invalid
    throw new Error('Invalid Expression');
  }
}

// Function to handle a button click on the calculator
function handleButtonClick(button) {
  // If a result is displayed and a new button is clicked, clear the display
  if (resultDisplayed && button !== '=') {
    currentExpression = '';
    resultDisplayed = false;
  }

  // Determine the action based on the button clicked
  switch (button) {
    case 'Back':
      // Remove the last character from the current expression
      currentExpression = currentExpression.slice(0, -1);
      break;
      case '=':
        try {
          // Calculate the result and update the display
          let result = calculateResult(currentExpression);
          updateDisplay(currentExpression, result);
          drawControlButtons();
          // Set the current expression to the result for chaining calculations
          currentExpression = result;
          resultDisplayed = true;
          return;
        } catch (e) {
          // If there's an error, display it and set the result as displayed
          updateDisplay(currentExpression, e.message);
          resultDisplayed = true;
          return;
        }
    default:
      // Add the clicked button to the current expression or start a new one
      if (resultDisplayed) {
        currentExpression = button;
        resultDisplayed = false;
      } else {
        currentExpression += button;
      }
      break;
  }

  // Update the display and redraw the calculator interface
  updateDisplay(currentExpression);
  drawCalculator();
}

// Add a click event listener to the canvas to handle button clicks
canvas.addEventListener('click', function(event) {
    // Calculate the mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Determine which row and column the click was in
    const row = Math.floor((mouseY - buttonStartY) / (buttonHeight + buttonMargin));

    // Special handling for the '0', '.', and '=' buttons since they have unique positions
    if (row === 4) { 
      const zeroButtonEndX = 10 + buttonWidth * 3 + buttonMargin * 2;
      // Check if the click was on the '0', '.', or '=' button and handle accordingly
      if (mouseX >= 10 && mouseX < zeroButtonEndX) {
        handleButtonClick('0');
      } else if (mouseX >= zeroButtonEndX && mouseX < zeroButtonEndX + buttonWidth + buttonMargin) {
        handleButtonClick('.');
      } else if (mouseX >= zeroButtonEndX + buttonWidth + buttonMargin) {
        handleButtonClick('=');
      }
    } else {
      // For all other buttons, calculate the index based on the row and column
      const column = Math.floor((mouseX - 10) / (buttonWidth + buttonMargin));
      const index = row * 5 + column;

      // If the click is on a valid button (not an empty space), handle the button click
      if (index >= 0 && index < buttons.length && buttons[index] !== '') {
        if (buttons[index] === 'X') {
          // Replace the 'X' with '*' for multiplication
          handleButtonClick('*');
        } else {
          // Handle the button click normally for all other buttons
          handleButtonClick(buttons[index]);
        }
      }
    }
  });