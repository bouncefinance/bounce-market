type Keys<T> = T extends { [key: string]: any } ? keyof T : never;
export type FormErrors<T> = Partial<{ [key in Keys<T>]: string }>;
