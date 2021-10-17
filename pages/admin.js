import Layout from '../components/layout';
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {  
    const { data: session } = useSession(); 
    // session is always non-null inside this page, all the way down the React tree.  
    return (
        <Layout>
            <h1>Admin Dashboard</h1>
            Some super secret dashboard
        </Layout>
    )
}

AdminDashboard.auth = true;