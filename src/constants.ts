import Group from "react-select/dist/declarations/src/components/Group";
import { GROUPS, Teacher } from "./models/teachers.model";

export const TG_API =
  "https://api.telegram.org/bot6634424700:AAGR0bMd9rHsp2KWmG8oqQUpRTmRjgEUZhc/sendMessage";

export const CHAT_ID = "980246970";
export const SHEETS_API = "https://sheetdb.io/api/v1/ekij487g7oyx2";

export const LOCAL_STORAGE_KEY = "teachers";

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 1,
    label: GROUPS.WP_1_2_23,
    value: GROUPS.WP_1_2_23,
  },
  {
    id: 2,
    value: GROUPS.WP_3_4_23,
    label: GROUPS.WP_3_4_23,
  },
  {
    id: 3,
    label: GROUPS.WP_5_6_23,
    value: GROUPS.WP_5_6_23,
  },
  {
    id: 4,
    label: GROUPS.WP_7_8_23,
    value: GROUPS.WP_7_8_23,
  },
];
