'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function Loading() {
   return (
      // <Spin indicator={<LoadingOutlined style={{ fontSize: 55 }} spin />} />
      <div className="loader"></div>
   );
}
