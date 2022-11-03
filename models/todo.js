// models/todo.js
/* eslint-disable no-undef */
"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");

      const overdueItems = await Todo.overdue();
      console.log(
        overdueItems.map((item) => item.displayableString()).join("\n")
      );
      console.log("\n");

      console.log("Due Today");

      const dueItems = await Todo.dueToday();
      console.log(dueItems.map((item) => item.displayableString()).join("\n"));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      console.log(
        dueLaterItems.map((item) => item.displayableString()).join("\n")
      );
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      try {
        await Todo.update(
          { completed: true },
          {
            where: {
              id: id,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let date =
        this.dueDate === new Date().toLocaleDateString("en-CA")
          ? ""
          : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${date}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
