/// All custom type definitions should go here.
/// Should another type definition file be necessary, ensure it is included in the tsconfig.json file.

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_URL: string
        }
    }
}

declare module 'next' {
    export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
        getLayout: (component: NextComponentType) => JSX.Element;
    };
}

export {}