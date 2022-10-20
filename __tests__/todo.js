/* eslint-disable no-undef */
const todoList = require("../index");
const { all, markAsComplete, add } = todoList();
describe("Todo test suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Should add new todo", () => {
    const count = all.length;
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(count + 1);
  });

  test("Should mark as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
