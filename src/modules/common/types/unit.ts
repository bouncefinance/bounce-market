export type Bytes = number;
export type Timestamp = number;
export type Milliseconds = number;
export type Seconds = number;
export type Minutes = number;
export type Days = number;
export type Address = string;
const BYTES_IN_MEGABYTE = 1048576;
export function convertBytesToMegabytes(value: Bytes, fixed: number = 0) {
  return (value / BYTES_IN_MEGABYTE).toFixed(fixed);
}
