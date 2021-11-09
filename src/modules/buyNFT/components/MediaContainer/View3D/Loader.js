/*
 * @module:
 * @Author: 张前领<qianling.zhang@hand-china.com>
 * @Date: 2021-06-16 14:36:28
 * @LastEditTime: 2021-06-16 15:08:26
 * @copyright: Copyright (c) 2020,Hand
 */
import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: 'blue' }}>
      {progress ? parseInt(progress) : 0} % loaded
    </Html>
  );
}
