import React from 'react';
import ReactDOM from 'react-dom/client';
import { InfinityScroll } from './infinity-scroll/InfinityScroll';
import './index.scss';

ReactDOM
	.createRoot(document.getElementById('root') as Element)
	.render(<InfinityScroll />);
