
export const passwordValidators = (password) => [
    {
        validator: password !== undefined,
        message: 'Mot de passe necéssaire',
    },
    {
        validator: password?.length >= 8,
        message: 'Le mot de passe doit contenir au moins 8 caractères',
    },
    {
        validator: /[a-z]/g.test(password),
        message: 'Le mot de passe doit contenir au moins 1 caractère minuscule',
    },
    {
        validator: /[A-Z]/g.test(password),
        message: 'Le mot de passe doit contenir au moins 1 caractère majuscule',
    },
    {
        validator: /[0-9]/g.test(password),
        message: 'Le mot de passe doit contenir au moins 1 caractère numérique',
    },
    {
        validator: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(password),
        message: 'Le mot de passe doit contenir au moins 1 caractère spécial : !@#$%^&*()_+-=[]{};/?',
    },
]

export const confirmationValidators = (password, confirmation) => [
    {
        validator: confirmation !== undefined,
        message: 'Confirmation du mot de passe requise',
    },
    {
        validator: confirmation === password,
        message: 'Les mots de passe ne sont pas identique',
    },
]

/*export const invoiceFileFilter = (file) => {

    const authorizedFileType = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp']

    if (!authorizedFileType.includes(file.mimetype)) {
        return {
            status: 400,
            error: 'Invalid file type',
        }
    }

    return { status : 200, data : "authorizedFileType"}
}*/
