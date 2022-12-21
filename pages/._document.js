import Document, {Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx);
        await getServerSideToken(ctx.req);

        return {...props }

    }

    render() {
        return(
            <Html>
                <Head/>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )

    }
}