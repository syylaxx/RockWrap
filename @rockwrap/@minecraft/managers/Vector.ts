import { Vector2, Vector3 } from "@minecraft/server";

type VectorTypes = Vector2 | Vector3;

class Vector {
    private vector: VectorTypes;

    /**
     * Creates a Vector instance, determining if it's 2D or 3D based on the input.
     * @param vector - The vector to initialize, either 2D or 3D.
     */
    public constructor(vector: VectorTypes) {
        this.vector = vector;
    };

    /**
     * Scales the vector to match Nether coordinates, multiplying each component by 8.
     * @returns The updated vector in Nether scaling.
     */
    public toNether(): VectorTypes {
        for (const coordinate in this.vector) {
            this.vector[coordinate] *= 8
        };

        return this.vector;
    };

    /**
     * Scales the vector to match Overworld coordinates by dividing each component by 8.
     * @returns The updated vector in Overworld scaling.
     */
    public toOverworld(): VectorTypes {
        for (const coordinate in this.vector) {
            this.vector[coordinate] = Math.floor(this.vector[coordinate] / 8)
        };

        return this.vector;
    };

    /**
     * Scales the vector by a given factor.
     * @param scale - The scale factor to apply.
     * @returns The scaled vector.
     */
    public scale(scale: number): VectorTypes {
        for (const coordinate in this.vector) {
            this.vector[coordinate] *= scale
        };

        return this.vector;
    };

    /**
     * Adds another vector to this vector, component by component.
     * @param vector - The vector to add.
     * @returns The resulting vector after addition.
     */
    public add(vector: VectorTypes): VectorTypes {
        for (const coordinate in this.vector) {
            this.vector[coordinate] += vector[coordinate];
        };

        return this.vector;
    };

    /**
     * Subtracts another vector from this vector, component by component.
     * @param vector - The vector to subtract.
     * @returns The resulting vector after subtraction.
     */
    public subtract(vector: VectorTypes): VectorTypes {
        for (const coordinate in this.vector) {
            this.vector[coordinate] -= vector[coordinate];
        };

        return this.vector;
    };

    public multiply(vector: VectorTypes): VectorTypes {
        for (const coordinate in this.vector) {
            this.vector[coordinate] *= vector[coordinate];
        };

        return this.vector;
    };

    /**
     * Calculates the midpoint between this vector and another vector.
     * @param vector - The vector to calculate the midpoint with.
     * @returns The midpoint vector.
     */
    public middle(vector: VectorTypes): VectorTypes {
        const result: any = {};

        for (const coordinate in this.vector) {
            result[coordinate] = (this.vector[coordinate] + vector[coordinate]) / 2;
        };
        
        return result as VectorTypes;
    };

    /**
     * Checks if the current vector is within a specified distance (range) of another vector.
     * @param vector - The vector to check the distance to.
     * @param range - The maximum allowed distance to be considered "in range."
     * @returns True if the current vector is within the specified range of the given vector; otherwise, false.
     */
    public isInRange(vector: VectorTypes, range: number): boolean {
        const distance = this.distanceTo(this.vector);

        return distance <= range;
    };

    /**
     * Calculates the distance to another vector.
     * @param vector - The vector to calculate the distance to.
     * @returns The distance between the two vectors.
     */
    public distanceTo(vector: VectorTypes): number {
        let sum = 0;

        for (const coordinate in this.vector) {
            const difference = this.vector[coordinate] - vector[coordinate];
            
            sum += difference ** 2;
        };

        return Math.sqrt(sum);
    };

    /**
     * Calculates the magnitude (length) of the vector.
     * @returns The magnitude of the vector.
     */
    public magnitude(): number {
        let sum = 0;

        for (const coordinate in this.vector) {
            sum += this.vector[coordinate] ** 2;
        };

        return Math.sqrt(sum);
    };

    /**
     * Normalizes the vector, scaling it to a unit vector with magnitude 1.
     * @returns The normalized vector.
     */
    public normalize(): VectorTypes {
        const magnitude = this.magnitude();

        for (const coordinate in this.vector) {
            this.vector[coordinate] /= magnitude;
        };

        return this.vector;
    };

    /**
     * Checks if this vector is equal to another vector, component by component.
     * @param vector - The vector to compare with.
     * @returns True if the vectors are equal, false otherwise.
     */
    public equalsTo(vector: VectorTypes): boolean {
        for (const coordinate in this.vector) {
            if (this.vector[coordinate] !== vector[coordinate]) return false;
        };

        return true;
    };

    /**
     * Converts the vector to a string representation.
     * @returns {string} The string representation of the vector.
     */
    public toString(): string {
        return JSON.stringify(this.vector);
    };

    /**
     * Converts the vector to a string representation.
     * @param vector - The vector to stringify.
     * @returns {string} The string representation of the vector.
     */
    public static toString(vector: VectorTypes): string {
        return JSON.stringify(vector);
    };
};

export { Vector };