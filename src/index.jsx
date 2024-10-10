import { createRoot } from 'react-dom/client'
import React from 'react'
import {App} from "./Components/App";

const root = document.getElementById('root')

if (!root) {
    throw new Error('Root not found')
}

const container = createRoot(root)

container.render(<App/>)