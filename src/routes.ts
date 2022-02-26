import { PropertyController } from "./controller/PropertyController";

export const Routes = [
  {
    method: "get",
    route: "/property",
    controller: PropertyController,
    action: "index"
  },
  {
    method: "get",
    route: "/property/:id",
    controller: PropertyController,
    action: "show"
  },
  {
    method: "post",
    route: "/property",
    controller: PropertyController,
    action: "save"
  },
  {
    method: "delete",
    route: "/property/:id",
    controller: PropertyController,
    action: "remove"
  },
  {
    method: "put",
    route: "/property/:id",
    controller: PropertyController,
    action: "update"
  }
];
