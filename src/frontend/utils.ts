export const dateFormat = (date?: Date) => (date ? date.toISOString() : "");
export const dateParse = (str: string) => (str ? new Date(str) : undefined);
