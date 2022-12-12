import Content from './Content'
import Header from './Header'
import Sidebar from './Sidebar'

export default (props) => {
  const { children } = props
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <Content title={props.contentTitle} titleButton={props.contentTitleButton}>
        {children}
      </Content>
    </div>
  );
};