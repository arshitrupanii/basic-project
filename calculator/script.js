document.addEventListener('DOMContentLoaded', function () {
    let screen = document.querySelector('.screen');
    let screenText = screen.innerText;
    let buttons = document.querySelectorAll('.btn');
    let isCleared = true;

    window.addEventListener("keydown", (e) => {
        let keyVal = e.key;

        if (keyVal === 'C' || keyVal === 'c') {
            screenText = '0';
            isCleared = true;
        }
        else if (keyVal == 'Backspace') {
            let newScreenVal = screenText.slice(0, -1);
            screenText = newScreenVal;
        }
        else if (keyVal === 'Enter') {
            try {
                screenText = eval(screenText)
            } catch (e) {
                screenText = 'Error';
            }
            isCleared = true
        }
        else if (['+', '-', '*', '/','.'].includes(keyVal)) {
            screenText += keyVal;
        }
        else if (!isNaN(keyVal)) {
            if (isCleared) {
                screenText = ''
                isCleared = false
            }

            screenText += keyVal;
        }

        // it save changes
        screen.innerText = screenText;

    })

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.innerText;

            if (buttonText === 'C') {
                screenText = '0';
                isCleared = true;
            }
            else if (buttonText === '=') {
                try {
                    screenText = eval(screenText.replace('x', '*').replace('÷', '/'));
                    isCleared = true;
                } catch (e) {
                    screenText = 'Error';
                }
            } else if (buttonText === '+/-') {
                if (screenText) {
                    screenText = String(-parseFloat(screenText));
                }
            } else {
                if (isCleared) {
                    screenText = ''
                    isCleared = false
                }
                screenText += buttonText;
            }
            // it save changes
            screen.innerText = screenText;
        });
    });
});