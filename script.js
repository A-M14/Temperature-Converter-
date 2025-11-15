document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const temperatureInput = document.getElementById('temperature');
    const conversionType = document.getElementById('conversionType');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    
    // Add ripple effect to button
    convertBtn.addEventListener('click', createRipple);
    
    // Clear result when input changes
    temperatureInput.addEventListener('input', () => {
        clearResult();
        clearError();
    });
    
    // Convert button click handler
    convertBtn.addEventListener('click', convertTemperature);
    
    // Handle Enter key press
    temperatureInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertTemperature();
        }
    });
    
    function convertTemperature() {
        const temp = parseFloat(temperatureInput.value);
        const type = conversionType.value;
        
        // Input validation
        if (isNaN(temp)) {
            showError('Please enter a valid number');
            return;
        }
        
        let result, unit;
        
        // Perform conversion based on selected type
        switch (type) {
            case 'fahrenheitToCelsius':
                result = (temp - 32) * 5/9;
                unit = '°C';
                break;
                
            case 'celsiusToFahrenheit':
                result = (temp * 9/5) + 32;
                unit = '°F';
                break;
                
            case 'celsiusToKelvin':
                result = temp + 273.15;
                unit = 'K';
                break;
                
            case 'fahrenheitToKelvin':
                result = (temp - 32) * 5/9 + 273.15;
                unit = 'K';
                break;
                
            case 'kelvinToCelsius':
                if (temp < 0) {
                    showError('Kelvin cannot be negative');
                    return;
                }
                result = temp - 273.15;
                unit = '°C';
                break;
                
            default:
                showError('Invalid conversion type');
                return;
        }
        
        // Display result with 2 decimal places
        showResult(`${result.toFixed(2)}${unit}`);
    }
    
    function showResult(text) {
        resultDiv.textContent = text;
        resultDiv.classList.add('show');
    }
    
    function clearResult() {
        resultDiv.textContent = '';
        resultDiv.classList.remove('show');
    }
    
    function showError(message) {
        errorDiv.textContent = message;
        setTimeout(clearError, 3000);
    }
    
    function clearError() {
        errorDiv.textContent = '';
    }
    
    // Ripple effect for button
    function createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
});
