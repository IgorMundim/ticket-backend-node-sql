class Validator {
  date(date: Date, name: string) {
    if (date !== undefined)
      if (date === null)
        return { messageAlert: `Field ${name} canot be null!` };
      else if (!String(date).match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/gm))
        return {
          messageAlert: `Invalid value to ${name}! aaaa-mm-dd hh:mm:ss`,
        };
    return false;
  }
  integer(integer: number, name: string) {
    if (integer !== undefined)
      if (integer === null)
        return { messageAlert: `Field ${name} canot be null!` };
      else if (!String(integer).match(/^-?\d+$/gm))
        return {
          messageAlert: `Invalid value to ${name}!`,
        };
    return false;
  }
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
  isNotNull(isNotNull: string, name: string) {
    if (isNotNull !== undefined)
      if (isNotNull === null) return { messageAlert: `${name} canot be null!` };
    return false;
  }
  isBollean(isBollean: boolean, name: string) {
    if (isBollean !== undefined)
      if (typeof isBollean !== "boolean")
        return { messageAlert: `Fied ${name} needs boolean value !` };
    return false;
  }

  cpf(cpf: string) {
    /* eslint-disable no-useless-escape */
    if (cpf !== undefined)
      if (cpf === null) return { messageAlert: `CPF canot be null!` };
      else if (!String(cpf).match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/gm))
        return { messageAlert: `Invalid CPF! ???.???.???-??` };
    return false;
  }

  telephone(telephone: string) {
    if (telephone !== undefined)
      if (telephone === null)
        return { messageAlert: `Telephone canot be null!` };
      else if (!String(telephone).match(/^\(\d{2}\) ?\d{4,5}\-\d{4}$/gm))
        return {
          messageAlert: `Invalid telephone! (??)?????-???? or (??)????-????`,
        };
    return false;
  }

  postalCode(postal_code: string) {
    if (postal_code !== undefined)
      if (postal_code === null)
        return { messageAlert: `Postal code canot be null!` };
      else if (!String(postal_code).match(/^\d{5}\-?\d{3}$/gm))
        return {
          messageAlert: `Invalid postal code! ?????-???`,
        };
    return false;
  }
  uf(uf: string) {
    if (uf !== undefined)
      if (uf === null) return { messageAlert: `UF canot be null!` };
      else if (!String(uf).match(/^[a-zA-Z]{2,2}$/gm))
        return { messageAlert: `Invalid uf! ??` };
    return false;
  }
  price(value: number, name: string) {
    if (value !== undefined)
      if (value === null)
        return { messageAlert: `Field ${name} canot be null!` };
      else if (!String(value).match(/^[0-9]+(\.[0-9]{1,2})?$/gm))
        return { messageAlert: `Invalid value to ${name}! ?.?` };
    return false;
  }
}
export default new Validator();
