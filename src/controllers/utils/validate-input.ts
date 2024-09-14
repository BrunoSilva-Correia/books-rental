export function validateInput<T>(
    input: Partial<T>,
    requiredFields: (keyof T)[],
): {
    isValid: boolean;
    errorMessage: string;
} {
    const missingFields: string[] = [];

    for (const field of requiredFields) {
        if (!input[field]) {
            missingFields.push(field as string);
        }
    }
    return {
        isValid: missingFields.length === 0,
        errorMessage:
            missingFields.length > 0
                ? `Missing fields: ${missingFields.join(', ')}`
                : '',
    };
}
