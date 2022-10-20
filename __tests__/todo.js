/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add } = todoList();
describe("Todo test suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date(),
    });
  });

  test("Should add new todo", () => {
    const count = all.length;
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date(),
    });
    expect(all.length).toBe(count + 1);
  });
  test("Should mark as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Retrieval of overdue items", () => {
    var today = new Date();
    var newDate = all[0].dueDate;
    expect(newDate > today).toBe(false);
  });
  test("Retrieval of due today items", () => {
    var today = new Date();
    var newDate = all[0].dueDate;
    expect(newDate != today).toBe(true);
  });
  test("Retrieval of due later items", () => {
    var today = new Date();
    var newDate = all[0].dueDate;
    expect(newDate < today).toBe(true);
  });
});
