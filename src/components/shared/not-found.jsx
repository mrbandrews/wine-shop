import Layout from "../layout/layout";

const NotFound = () => {
    const style = {fontWeight: 'bold', textAlign: 'center'}
    return (
        <Layout>
            <p style={style}> Page not found</p>
        </Layout>
    );
}

export default NotFound;
