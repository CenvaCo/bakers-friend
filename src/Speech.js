class Speech {
    // Создаем распознаватель
    constructor() {
        this.recognizer = new webkitSpeechRecognition();

        // Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
        this.recognizer.interimResults = true;

        // Какой язык будем распознавать?
        this.recognizer.lang = 'ru-Ru';

        // Используем колбек для обработки результатов
        this.recognizer.onresult = function (event) {
            var result = event.results[event.resultIndex];
            if (result.isFinal) {
                speechSynthesis.speak(
                    new SpeechSynthesisUtterance( result[0].transcript)
                  );
                // alert('Вы сказали: ' + result[0].transcript);
            } else {
                console.log('Промежуточный результат: ', result[0].transcript);
            }
        };

        // Начинаем слушать микрофон и распознавать голос
      
    }
    listen () {
        this.recognizer.start();
    }
}
export default Speech;