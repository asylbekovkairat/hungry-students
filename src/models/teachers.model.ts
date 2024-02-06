export enum GROUPS {
  WP_1_2_23 = "ВП 1/2",
  WP_3_4_23 = "ВП 3/4",
  WP_5_6_23 = "ВП 5/6",
  WP_7_8_23 = "ВП 7/8",
}

export type Teacher = {
  value: GROUPS | string;
  label: GROUPS | string;
  id: number;
};
