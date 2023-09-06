import { AccountKnexDBRepository } from "../../src/repositories/accountKnexDBRepository";
import { Address } from "../../src/models/AccountAddress";
import { testServer } from "../jest.setup";
import { AccountAddressKnexDBRepository } from "../../src/repositories/accountAddressKnexDBRepository";
import { Account } from "../../src/models/Account";



describe("Address", () => {
  let defaultAccountId = ''
  let defaultAccountToken = ''
  let secondaryAccountId = ''
  let secondaryAccountToken = ''

  let defaultAddress: any
  let defaultTextAddress = {
    complement: "complement",
    cpf: "000.000.000-00",
    city: "city",
    number: "123",
    neighborhood: "neighborhood",
    street: "street",
    postal_code: "00000-000",
    telephone: "(31)3131-3131",
    uf: "uf",
  };
  
  beforeAll(async () => {
    const getCredential = await testServer.post("/api/v1/account/login").send({
      email: "default@email.com",
      password: "@Abc12345",
    });

    defaultAccountId = getCredential.body.refreshToken.account_id;
    defaultAccountToken = getCredential.body.token

    const getSecondaryCredential = await testServer.post("/api/v1/account/login").send({
      email: "secondary@email.com",
      password: "@Abc12345",
    });

    secondaryAccountId = getSecondaryCredential.body.refreshToken.account_id;
    secondaryAccountToken = getSecondaryCredential.body.token

    const address = new Address(
    "000.000.000-00",
    "(31)3131-3131",
    "00000-000",
    "complement",
    "city",
    "neighborhood",
    "123",
    "street",
    "uf",
    defaultAccountId
    );

    defaultAddress = await new AccountAddressKnexDBRepository().create(address)

  });

 describe("When user is authenticated", () => {
    
    it("should successfully create a address", async () => {
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .set("Authorization", `Bearer ${defaultAccountToken}`)
        .send(defaultTextAddress)

      expect(result.statusCode).toEqual(201)

      expect(result.body).toEqual(
        expect.objectContaining(defaultTextAddress)
      );
    });
    it("should return a address - GET", async ()=>{
      const result = await testServer
      .get(`/api/v1/account/${defaultAccountId}/address`)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.statusCode).toEqual(200)
    })

    it("should get a address with id - GET", async ()=>{
      const result = await testServer
      .get(`/api/v1/account/address/${defaultAddress.id}`)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.statusCode).toEqual(200)
    })
    it('should path a address - PATCH', async()=>{
      const result = await testServer
      .patch(`/api/v1/account/address/${defaultAddress.id}`)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      .send({"number": "380"})
      expect(result.statusCode).toEqual(200)
    })
    it("should return that 'City cannot be null' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        id: "1",
        neighborhood: "neighborhood",
        number: "number",
        postal_code: "00000-000",
        street: "street",
        telephone: "telephone",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"City cannot be null"}');
      expect(result.statusCode).toEqual(400);
    });

    it("should return that 'CPF  cannot be null' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        city: "city",
        id: "1",
        neighborhood: "neighborhood",
        number: "number",
        postal_code: "00000-000",
        street: "street",
        telephone: "telephone",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"CPF  cannot be null"}');
      expect(result.statusCode).toEqual(400);
    });
    it("should return that 'Neighborhood cannot be null' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        number: "123",
        postal_code: "00000-000",
        street: "street",
        telephone: "telephone",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"Neighborhood cannot be null"}');
      expect(result.statusCode).toEqual(400);
    });

    it("should return that 'Street cannot be null' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        number: "123",
        neighborhood: "neighborhood",
        postal_code: "00000-000",
        telephone: "telephone",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"Street cannot be null"}');
      expect(result.statusCode).toEqual(400);
    });

    it("should return that 'Number cannot be null' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        neighborhood: "neighborhood",
        street: "street",
        postal_code: "00000-000",
        telephone: "telephone",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"Number cannot be null"}');
      expect(result.statusCode).toEqual(400);
    });
    it("should return that 'Postal code cannot be null' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        number: "123",
        neighborhood: "neighborhood",
        street: "street",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"Postal code cannot be null"}');
      expect(result.statusCode).toEqual(400);
    });
    it("should return that 'Telephone cannot be null' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        number: "123",
        neighborhood: "neighborhood",
        street: "street",
        postal_code: "00000-000",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"Telephone cannot be null"}');
      expect(result.statusCode).toEqual(400);
    });
    it("should return that 'CPF is not valid! ???.???.???-??' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-0",
        city: "city",
        id: "1",
        number: "123",
        neighborhood: "neighborhood",
        street: "street",
        postal_code: "00000-000",
        telephone: "(31)3131-3131",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual(
        '{"message":"CPF is not valid! ???.???.???-??"}'
      );
      expect(result.statusCode).toEqual(400);
    });
    it("should return that 'Postal code is not valid! ?????-???' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        number: "123",
        neighborhood: "neighborhood",
        street: "street",
        postal_code: "00000-00",
        telephone: "(31)3131-3131",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual(
        '{"message":"Postal code is not valid! ?????-???"}'
      );
      expect(result.statusCode).toEqual(400);
    });
    it("should return that 'Telephone is not valid! (??)?????-???? or (??)????-????' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        number: "123",
        neighborhood: "neighborhood",
        street: "street",
        postal_code: "00000-000",
        telephone: "(31)3131-313",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual(
        '{"message":"Telephone is not valid! (??)?????-???? or (??)????-????"}'
      );
      expect(result.statusCode).toEqual(400);
    });
    it("should return that 'UF is not valid! ?? - POST'", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        city: "city",
        id: "1",
        number: "123",
        neighborhood: "neighborhood",
        street: "street",
        postal_code: "00000-000",
        telephone: "(31)3131-3131",
        uf: "ufd",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
      expect(result.text).toEqual('{"message":"UF is not valid! ??"}');
      expect(result.statusCode).toEqual(400);
    });
    it('should delete address', async() => {
      const result = await testServer
        .del(`/api/v1/account/address/${defaultAddress.id}`)
        .set("Authorization", `Bearer ${defaultAccountToken}`);
        expect(result.text).toEqual('{"message":"Address deleted successfully"}');
      expect(result.statusCode).toEqual(200);
    })
 });

 //
 
  describe("When user is not authenticated", () => {
    
    it("should successfully create a address", async () => {
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(defaultTextAddress)

      expect(result.statusCode).toEqual(401)

      expect(result.text).toEqual(
        '{"message":"Token is missing"}'
      );
    });
    it("should return nothing - GET", async ()=>{
      const result = await testServer
      .get(`/api/v1/account/${defaultAccountId}/address`)
      expect(result.statusCode).toEqual(401)
      expect(result.text).toEqual(
        '{"message":"Token is missing"}'
      );
    })

    it("should get a address with id - GET", async ()=>{
      const result = await testServer
      .get(`/api/v1/account/address/${defaultAddress.id}`)
      expect(result.statusCode).toEqual(401)
      expect(result.text).toEqual(
        '{"message":"Token is missing"}'
      );
    })
    it('should not patch a address - PATCH', async()=>{
      const result = await testServer
      .patch(`/api/v1/account/address/${defaultAddress.id}`)
      .send({"number": "380"})
      expect(result.statusCode).toEqual(401)
      expect(result.text).toEqual(
        '{"message":"Token is missing"}'
      );
    })
    it("should return that 'Token is missing' - POST", async () => {
      const address = {
        account_id: "1",
        complement: "complement",
        cpf: "000.000.000-00",
        id: "1",
        neighborhood: "neighborhood",
        number: "number",
        postal_code: "00000-000",
        street: "street",
        telephone: "telephone",
        uf: "uf",
      };
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .send(address)
      expect(result.text).toEqual('{"message":"Token is missing"}');
      expect(result.statusCode).toEqual(401);
    });


    it('should not delete address', async() => {
      const result = await testServer
        .del(`/api/v1/account/address/${defaultAddress.id}`)
        expect(result.text).toEqual('{"message":"Token is missing"}');
      expect(result.statusCode).toEqual(401);
    })
  });

  describe("When user is not Owner", () => {
    
    it("should not successfully create a address", async () => {
      const result = await testServer
        .post(`/api/v1/account/${defaultAccountId}/address`)
        .set("Authorization", `Bearer ${secondaryAccountToken}`)
        .send(defaultTextAddress)
  
      expect(result.statusCode).toEqual(400)
      expect(result.text).toEqual(
        '{"message":"You are not the owner!"}'
      );
    });
    it("should return nothing - GET", async ()=>{
      const result = await testServer
      .get(`/api/v1/account/${defaultAccountId}/address`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      expect(result.statusCode).toEqual(400)
      expect(result.text).toEqual(
        '{"message":"You are not the owner!"}'
      );
    })
  
    it("should get a address with id - GET", async ()=>{
      const result = await testServer
      .get(`/api/v1/account/address/${defaultAddress.id}`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      expect(result.statusCode).toEqual(400)
      expect(result.text).toEqual(
        '{"message":"Address not found!"}'
      );
    })
    it('should not patch a address - PATCH', async()=>{
      const result = await testServer
      .patch(`/api/v1/account/address/${defaultAddress.id}`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      .send({"number": "380"})
      expect(result.statusCode).toEqual(400)
      expect(result.text).toEqual(
        '{"message":"Address not found or you are not the owner!"}'
      );
    })
  
  
    it('should not delete address', async() => {
      const result = await testServer
        .del(`/api/v1/account/address/${defaultAddress.id}`)
        .set("Authorization", `Bearer ${secondaryAccountToken}`)
        expect(result.statusCode).toEqual(400)
        expect(result.text).toEqual(
          '{"message":"Address not found or you are not the owner!"}'
        );
    })
  });
});

