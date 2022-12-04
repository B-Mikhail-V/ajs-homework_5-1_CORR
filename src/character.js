export default class Character {
  constructor(name, type) {
    const types = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    if (name.length < 2 || name.length > 10 || typeof (name) !== 'string') {
      throw new Error('Ошибка в имени!');
    } else {
      this.name = name;
    }
    if (!types.includes(type)) {
      throw new Error('Ошибка в типе!');
    } else {
      this.type = type;
    }
    this.health = 100;
    this.level = 1;
  }

  levelUp() {
    if (this.health === 0) throw new Error('Персонаж уже вне игры!');
    this.level += 1;
    this.attack = Math.round(this.attack * 1.2, 0);
    this.defence = Math.round(this.defence * 1.2, 0);
    this.health = 100;
  }

  damage(points) {
    if (points <= 0 || !points) throw new Error('Параметр урона обязателен и должен быть больше нуля!');
    if (this.health === 0) throw new Error('Урон персонажу уже не нанести - персонаж уже вне игры!');
    const healthNew = this.health - points * (1 - this.defence / 100);
    this.health = healthNew >= 0 ? healthNew : 0;
  }
}
