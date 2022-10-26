const todoList = require("../todo"); //../todo
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

describe("Toodlist Test Suite", () => {
  beforeAll(() => {
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

    [
      { title: "Submit assignment", dueDate: yesterday, completed: false },
      { title: "Pay rent", dueDate: today, completed: true },
      { title: "Service Vehicle", dueDate: today, completed: false },
      { title: "File taxes", dueDate: tomorrow, completed: false },
      { title: "Pay electric bill", dueDate: tomorrow, completed: false },
    ].forEach(add);

    console.log(all.length, "before");
  });
  test("Should add new todo", () => {
    // at first todolist is expected to be empty
    const todoItemCount = all.length;
    expect(all.length).toBe(5);

    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    console.log(all.length, "after");

    expect(all.length).toBe(todoItemCount + 1);
  });
  test("Should mark a task as compelete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should retrive overdue items", () => {
    expect(overdue().length).toBe(1);
  });
  test("Should retrive due today items", () => {
    expect(dueToday().length).toBe(3);
  });
  test("Should retrive due later items", () => {
    expect(dueLater().length).toBe(2);
  });
});
