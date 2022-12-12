import { AdminTemplate } from '@components';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default () => {
    const { data: session} = useSession();
    useEffect(()=>{
        document.body.className = '';
    },[])
    if (!session) return "loading"
    return (
        <AdminTemplate contentTitle={'Home'} contentTitleButton={<i className="fa fa-2x fa-home" />}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-warning">
                        <div className="card-header">
                            <h3 className="card-title">User Profile</h3>
                        </div>
                        <div className="card-body">
                            {`Email: ${session.user.email}`}
                        </div>
                    </div>
                </div>
            </div>
        </AdminTemplate>
    )
}