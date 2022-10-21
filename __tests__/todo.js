/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("Todo test suite", () => {
  beforeAll(() => {
    // var offset = (24*60*60*1000) * 1;
    // var today = new Date();
    // var yesterday = new Date();
    // yesterday.setDate(yesterday.getTime() - offset);
    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getTime()+offset);
    add({
      title: "Test Todo",
      completed: false,
      dueDate: today,
    }),
      add({
        title: "Test Todo",
        completed: false,
        dueDate: yesterday,
      }),
      add({
        title: "Test Todo",
        completed: false,
        dueDate: tomorrow,
      });
  });

  test("Should add new todo", () => {
    const count = all.length;
    add({
      title: "Test Todo",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(count + 1);
  });

  test("Should mark as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieval of overdue items", () => {
    var l = overdue();
    expect(l.length).toEqual(1);
  });

  test("Retrieval of due today items", () => {
    var l = dueToday();
    expect(l.length).toEqual(2);
  });

  test("Retrieval of due later items", () => {
    var l = dueLater();
    expect(l.length).toEqual(1);
  });
});
