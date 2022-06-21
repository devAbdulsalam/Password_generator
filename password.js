const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeSymbolsElement = document.getElementById('includeSymbols');
const includeNumbersElement = document.getElementById('includeNumbers');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');

// funtion to sync charcterAmountNumber and Range
characterAmountNumber.addEventListener('input' , syncCharacterAmount);
characterAmountRange.addEventListener('input' , syncCharacterAmount);
function syncCharacterAmount(e){
    const value = e.target.value
    characterAmountNumber.value = value
    characterAmountRange.value = value
};


// function to prevent form from subminting to generating password


form.addEventListener('submit', e => {
    e.preventDefault()
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeUppercase, 
        includeNumbers, includeSymbols)
        passwordDisplay.innerText = password
});       



    // function to generate password;
    function generatePassword(characterAmount, includeUppercase, 
        includeNumbers, includeSymbols){
            let charCodes = lowercase_char_codes
        if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
        if (includeNumbers) charCodes = charCodes.concat(numbers_char_codes)
        if (includeSymbols) charCodes = charCodes.concat(symbols_char_codes)
        
        
        const passwordCharacters = []
        for (let i = 0; i < characterAmount; i++){
            const charcterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
            passwordCharacters.push(charcterCode)
        }
        return passwordCharacters.join('')
    };
    
    
// Char_codes
const  UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const lowercase_char_codes = arrayFromLowToHigh(97, 122)
const numbers_char_codes = arrayFromLowToHigh(48, 57)
const symbols_char_codes = arrayFromLowToHigh(33, 47).concat
    (arrayFromLowToHigh(58, 64).concat
    (arrayFromLowToHigh(91, 96).concat
    (arrayFromLowToHigh(123, 126)
    )));

// function to claclute array
function arrayFromLowToHigh(low, high){
    const array =[]
    for (let i = low; i <= high; i++){
        array.push(String.fromCharCode(i))
    }
    return array
};


// Copy paassword to clipboard
clipboard = document.getElementById("copy_btn");
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password  = passwordDisplay.innerText;
    if (!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('password copied to clipboard!');
});