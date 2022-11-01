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

      await this.overdue();
      console.log("\n");

      console.log("Due Today");

      await this.dueToday();
      console.log("\n");

      console.log("Due Later");
      await this.dueLater();
    }

    static async overdue() {
      try {
        const overdueItems = await Todo.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date(),
            },
          },
        });
        const overduelist = overdueItems
          .map((overdueitem) => overdueitem.displayableString())
          .join("\n");
        console.log(overduelist);
      } catch (error) {
        console.error(error);
      }
    }

    static async dueToday() {
      try {
        const duetodayitems = await Todo.findAll({
          where: {
            dueDate: {
              [Op.eq]: new Date(),
            },
          },
        });
        const duetodaylist = duetodayitems
          .map((duetodayitem) => duetodayitem.displayableString())
          .join("\n");
        console.log(duetodaylist);
      } catch (error) {
        console.error(error);
      }
    }

    static async dueLater() {
      try {
        const duelateritems = await Todo.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date(),
            },
          },
        });
        const duelaterlist = duelateritems
          .map((duelateritem) => duelateritem.displayableString())
          .join("\n");
        console.log(duelaterlist);
      } catch (error) {
        console.error(error);
      }
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
      const d = new Date();
      let checkbox = this.completed ? "[x]" : "[ ]";
      let date =
        d.toISOString().split("T")[0] == this.dueDate ? "" : `${this.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title} ${date}`;
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
