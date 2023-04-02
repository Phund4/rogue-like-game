import { Unit } from './unit.js'

// класс героя
export class Hero extends Unit {
    // инициализация героя
    init() {
        const randCell = this.getRandom(0, this.tiles.length - 1);
        let hero = this.unit;
        hero.style.gridArea = this.tiles[randCell].style.gridArea;
        hero.style.backgroundSize = '100%';
        hero.classList.add('tileP');
        document.addEventListener('keydown', this.canDamageHandler)
        this.damage = 30;
        this.field.appendChild(hero);
        this.inithp();
        this.run();
    }

    // получение зелья
    takeHeal() {
        let heroRowStart = this.unit.style.gridRowStart;
        let heroColStart = this.unit.style.gridColumnStart;
        let arrHP = this.field.getElementsByClassName('tileHP');
        for (let i = 0; i < arrHP.length; i++) {
            let heal = arrHP.item(i);
            let [healRowStart, healColStart, ...params] = heal.style.gridArea.split(' / ');
            if (healRowStart == heroRowStart && healColStart == heroColStart && this.health < 100) {
                this.unit.childNodes[0].style.width = `${(this.health + 50 > 100 ? 100 : this.health + 50)}%`
                this.health = (this.health + 50 > 100 ? 100 : this.health + 50);
                document.querySelector('.inventory').appendChild(heal);
            }
        }
    }

    // получение меча
    takeSword() {
        let heroRowStart = this.unit.style.gridRowStart;
        let heroColStart = this.unit.style.gridColumnStart;
        let arrSword = this.field.getElementsByClassName('tileSW');
        for (let i = 0; i < arrSword.length; i++) {
            let sword= arrSword.item(i);
            let [swordRowStart, swordColStart, ...params] = sword.style.gridArea.split(' / ');
            if (swordRowStart == heroRowStart && swordColStart == heroColStart) {
                this.damage += 10;
                document.querySelector('.inventory').appendChild(sword);
            }
        }
    }

    // активация бега
    run() {
        document.addEventListener('keydown', (event) => { 
            switch (event.code) {
                case 'KeyW':
                    {
                        this.runW();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
                case 'KeyA':
                    {
                        this.runA();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
                case 'KeyS':
                    {
                        this.runS();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
                case 'KeyD':
                    {
                        this.runD();
                        this.takeHeal();
                        this.takeSword();
                        break;
                    }
            }
        })
    }

    // логика атаки
    canDamageHandler = (event) => {
        if (event.code == 'Space') {
            event.preventDefault();
            let [rowStart, colStart, ...params1] = this.unit.style.gridArea.split(' / ');
            let enemies = Unit.enemyArr;
            enemies.map(enemy => {
                let [enemyRowStart, enemyColStart, ...params2] = enemy.unit.style.gridArea.split(' / ');
                if (Math.abs(rowStart - enemyRowStart) <= 1 && Math.abs(colStart - enemyColStart) <= 1) {
                    enemy.unit.childNodes[0].style.width = `${enemy.health - this.damage}%`;
                    enemy.health -= this.damage;
                }
                if (enemy.health <= 0) {
                    this.field.removeChild(enemy.unit);
                    enemies.splice(enemies.indexOf(enemy), 1);
                    clearInterval(enemy.damageInterval);
                    clearInterval(enemy.runInterval);
                }
            })
            if(!enemies.length) {
                alert('you win');
            }
        }
    }
}