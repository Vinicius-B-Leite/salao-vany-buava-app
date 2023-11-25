export const emailErros = {
	"auth/email-already-in-use": "Já existi uma conta com o endereço de email fornecido.",
	"auth/invalid-email": "O endereço de e-mail não é válido.",
	"auth/invalid-email-verified": "O e-mail é inválido.",
	"auth/email-already-exists": "O e-mail fornecido já está em uso.",
	"auth/user-not-found": "O usuário não correponde à nenhuma credencial.",
	"auth/account-exists-with-different-credential": "E-mail já associado a outra conta.",
}

export const passwordErrors = {
	"auth/weak-password": "A senha é muito fraca.",
	"auth/wrong-password": "Senha incorreta.",
}
export const errors = {
	...emailErros,
	...passwordErrors,
}
