// Orginal file locate at app_native_code/typings/app-native-code.d.ts
// Make change there


interface AppNativeCode {
    initialize(
        successCallback?: (result: any) => void,
        errorCallback?: (error: string) => void
    ): Promise<void>
}