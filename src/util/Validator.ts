class Validator {
  date(date: Date) {
    if (date !== undefined)
      if (!String(date).match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/gm))
        return true;
    return false;
  }
  integer(integer: number) {
    if (integer !== undefined)
      if (!String(integer).match(/^-?\d+$/gm)) return true;
    return false;
  }
  email(email: string) {
    if (email !== undefined)
      if (
        !String(email).match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm
        )
      )
        return true;
    return false;
  }
  password(password: string) {
    if (password !== undefined)
      if (
        !String(password).match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,.?<>~`])[A-Za-z\d!@#$%^&*()_+=[\]{}|\\,.?<>~`]{8,}$/gm
        )
      )
        return true;
    return false;
  }

  char(data: string) {
    if (data !== undefined)
      if (!String(data).match(/^[a-zA-Z]{2,58}$/gm)) return true;
    return false;
  }

  isBoolean(isBoolean: boolean) {
    if (isBoolean !== undefined)
      if (typeof isBoolean !== "boolean") return true;
    return false;
  }

  cpf(cpf: string) {
    /* eslint-disable no-useless-escape */
    if (cpf !== undefined)
      if (!String(cpf).match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/gm)) return true;
    return false;
  }

  telephone(telephone: string) {
    if (telephone !== undefined)
      if (!String(telephone).match(/^\(\d{2}\) ?\d{4,5}\-\d{4}$/gm))
        return true;
    return false;
  }

  postalCode(postal_code: string) {
    if (postal_code !== undefined)
      if (!String(postal_code).match(/^\d{5}\-?\d{3}$/gm)) return true;
    return false;
  }
  uf(uf: string) {
    if (uf !== undefined)
      if (!String(uf).match(/^[a-zA-Z]{2,2}$/gm)) return true;
    return false;
  }

  price(value: number) {
    if (value !== undefined)
      if (!String(value).match(/^[0-9]+(\.[0-9]{1,2})?$/gm)) return true;
    return false;
  }
  percentage(value: number) {
    if (value !== undefined)
      if (!String(value).match(/^[0-9]{1,2}$/gm)) {
        return true;
      }
    return false;
  }
}
export default new Validator();
