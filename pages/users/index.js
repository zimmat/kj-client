// Declare Dependencies
import React, { useState, useEffect, Fragment } from 'react';
import { getUsers } from '@actions';

// Declare Components
import { AdminTemplate, Global } from '@components';
const { Loading } = Global

export default () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            let { users } = await getUsers()
            setUsers(users)
            setLoading(false)
        })()
    }, [])

    return (
        <AdminTemplate contentTitle={'Users'} contentTitleButton={<i className="fa fa-2x fa-users" />}>
            <Loading loading={loading}>
                <div className="row">
                    <div className="col-md-9">
                      <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Users</h3>
                                <div className="pull-right">
                                    <a className="btn btn-outline-warning" onclick={() =>alert("will navigate to /add-user")}>Add</a>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="box-container post-content">
                                    <div className="table">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, i) =>
                                                    <tr key={i}>
                                                        <td> {user.email} </td>
                                                        <td> {user.role} </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    </div>
                </div>
            </Loading>
        </AdminTemplate>
    )
}