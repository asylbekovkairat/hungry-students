import { LOCAL_STORAGE_KEY } from "../constants";
import { GROUPS } from "../models/teachers.model";

export const loadGroups = () => {
  const array =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string) || [];
  const uniqueArray = array.filter(
    (obj: any, index: any, self: any) =>
      index === self.findIndex((t: any) => t.value === obj.value)
  );

  return uniqueArray;
};

export const saveNewGroup = (teacher: any) => {
  const array = loadGroups();
  console.log("render save");

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...array, teacher]));
};

export const updateExistGroup = (
  groupName: GROUPS | string,
  changes: number
) => {
  const teachers = loadGroups();

  const updated = teachers.map((item: any) =>
    item.value === groupName
      ? {
          ...item,
          ...{ amount: +changes },
        }
      : item
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
};

export const isTeacherExist = (groupName: string) => {
  const array = loadGroups();

  const isExist = array.some((item: any) => item.value === groupName);
  return isExist;
};
