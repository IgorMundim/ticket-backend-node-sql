class Validator {
  email(email: string) {
    if (email !== undefined)
      if (email === null) return { messageAlert: `Email canot be null!` };
      else if (
        !String(email).match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm
        )
      )
        return { messageAlert: `Invalid email!` };
    return false;
  }
  password(password: string) {
    if (password !== undefined)
      if (password === null) return { messageAlert: `Password canot be null!` };
      else if (
        !String(password).match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,.?<>~`])[A-Za-z\d!@#$%^&*()_+=[\]{}|\\,.?<>~`]{8,}$/gm
        )
      )
        return { messageAlert: `Invalid password!` };
    return false;
  }
  name(name: string) {
    if (name !== undefined)
      if (name === null) return { messageAlert: `Name canot be null!` };
      else if (!String(name).match(/^[a-zA-Z]{2,58}$/gm))
        return { messageAlert: `Invalid name!` };
    return false;
  }
}
export default new Validator();
