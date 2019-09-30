class Form {
  constructor(name = "", email = "", gender = "", password ="",  phone= "") {
    this.name = name
    this.email = email
    this.gender = gender
    this.password = password
    this.phone = phone
  }

  checkName (reg) {
    if(reg.test(this.name)) {
      return this;
    } else {
      throw new Error(`${this.name}`)
    }
  }
}