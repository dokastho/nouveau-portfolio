import React from 'react';
import { createRoot } from 'react-dom/client';
import Bootstrapper from './Bootstrapper';

const container = document.getElementById('reactEntry');
const root = createRoot(container);
root.render(<Bootstrapper />);
