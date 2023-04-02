// класс с общими параметрами и функциями
export class Helper {
    width = 30;
    height = 20;
    field = document.querySelector('.field');
    tiles = this.field.getElementsByClassName('tile');

    // получение рандомного числа
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}