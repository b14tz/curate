interface MusicKitInstance {
    // Add the properties and methods you need from MusicKit here
    // For example:
    getInstance(): any;
    authorize(): Promise<string>;
    unauthorize(): Promise<string>;
}

interface Window {
    MusicKit: {
        configure(options: any): void;
        getInstance(): MusicKitInstance;
    };
}
