import Character from '../src/character.js';
import Bowman from '../src/bowman.js';
import Magician from '../src/magician.js';
import Swordsman from '../src/swordsman.js';
import Undead from '../src/undead.js';
import Daemon from '../src/daemon.js';
import Zombie from '../src/zombie.js';
import { typesList } from '../src/typesList.js';

test('class Character', () => {
  const result = {
    name: 'persona1',
    type: 'Bowman',
    level: 1,
    health: 100,
  };
  expect(new Character('persona1', 'Bowman')).toEqual(result);
});

test('validate wrong type', () => {
  expect(() => (new Character('persona1', 'Bowman1'))).toThrow('Ошибка в типе!');
});

test.each([
  ['n', 'Ошибка в имени!'],
  ['long_person', 'Ошибка в имени!'],
  [123, 'Ошибка в имени!'],
])('validate name: %p', (personName, error) => {
  expect(() => (new Character(personName, 'Bowman'))).toThrow(error);
});

test('levelUp method change values', () => {
  const result = {
    name: 'persona1',
    type: 'Magician',
    health: 100,
    level: 2,
    attack: 12,
    defence: 48,
  };
  const character = new Magician('persona1');
  character.health = 50;
  character.levelUp();
  expect(character).toEqual(result);
});

test('levelUp method not for zero health hero', () => {
  const character = new Magician('persona1');
  character.health = 0;
  expect(() => (character.levelUp())).toThrow('Персонаж уже вне игры!');
});

test.each([
  [Bowman, 'Bowman', typesList.Bowman[0]],
  [Magician, 'Magician', typesList.Magician[0]],
  [Swordsman, 'Swordsman', typesList.Swordsman[0]],
  [Undead, 'Undead', typesList.Undead[0]],
  [Daemon, 'Daemon', typesList.Daemon[0]],
  [Zombie, 'Zombie', typesList.Zombie[0]],
])('all child classes, %p', (ClassName, type, persona) => {
  const result = new ClassName('testName');
  persona.name = 'testName';
  persona.type = type;
  expect(result).toEqual(persona);
});

test.each([
  [10, 92.5],
  [200, 0],
])('testing damage for points - %i', (points, healthNew) => {
  const character = new Bowman('persona1');
  character.damage(points);
  expect(character.health).toEqual(healthNew);
});

test.each([
  [0, 'Параметр урона обязателен и должен быть больше нуля!'],
  [-1, 'Параметр урона обязателен и должен быть больше нуля!'],
  ['', 'Параметр урона обязателен и должен быть больше нуля!'],
])('testing damage for not available points - %i', (points, errorMsg) => {
  const character = new Character('persona1', 'Bowman');
  expect(() => (character.damage(points))).toThrow(errorMsg);
});

test('testing damage for person with zero health', () => {
  const character = new Character('persona1', 'Bowman');
  character.health = 0;
  expect(() => (character.damage(10))).toThrow('Урон персонажу уже не нанести - персонаж уже вне игры!');
});
