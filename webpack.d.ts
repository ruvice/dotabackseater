// src/webpack.d.ts  
// Augment the NodeJS namespace to add the `context` method to `NodeRequire`
declare module '*.png' {
    const value: string;
    export default value;
}
  
declare namespace NodeJS {
    interface Require {
        context(
            directory: string,
            useSubdirectories: boolean,
            regExp: RegExp
        ): {
            keys: () => string[];
            <T>(id: string): T;
        };
    }
}