import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
export default function Home() {
    return <>
        <Sidebar />
        <div class="main-content" id="panel">
            <Navbar />
            <Outlet />
        </div>
    </>
}