export type Bytes = number;
export type Seconds = number;
export type Days = number;
export type Address = string;
const BYTES_IN_MEGABYTE = 1048576;
export function convertBytesToMegabytes(value: Bytes) {
  return value / BYTES_IN_MEGABYTE;
}
