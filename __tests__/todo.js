/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

let dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 3))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("Todo test suite", () => {
  beforeAll(() => {
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
    let overDueToDo = overdue();
    expect(overDueToDo.length).toEqual(1);
  });

  test("Retrieval of due today items", () => {
    let dueTodayToDo = dueToday();
    expect(dueTodayToDo.length).toEqual(2);
  });

  test("Retrieval of due later items", () => {
    let dueLaterToDo = dueLater();
    expect(dueLaterToDo.length).toEqual(1);
  });
});
