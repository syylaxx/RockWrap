import { rockWrapConfiguration } from "./@config/RockWrapConfig";

class RockWrap {
    private constructor() {};   
    public static readonly config = rockWrapConfiguration;

    public static startUp(): void {
        
    };
};

export { RockWrap };