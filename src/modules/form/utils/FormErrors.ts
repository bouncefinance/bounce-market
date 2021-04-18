export type FormErrors<T> = Partial<{ [key in keyof T]: string }>;
