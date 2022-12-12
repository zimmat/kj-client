import { AdminTemplate } from '@components';

export default () => {
    return (
        <AdminTemplate contentTitle={'Home'} contentTitleButton={<i className="fa fa-2x fa-home" />}>
            <div className="row">
                <p>Error: 500 Internal Server Error</p>
            </div>
        </AdminTemplate>
    )
}