
import { EventAddress } from "../../src/models/EventAddress";
import { testServer } from "../jest.setup";
import { EventAddressKnexDBRepository } from "../../src/repositories/eventAddressKnexDBRepository";

describe("Event Address", () => {

  let defaultAccountId = ''
  let defaultAccountToken = ''
  let secondaryAccountId = ''
  let secondaryAccountToken = ''

  let defaultAddress: any
  let defaultEvent: any
  
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

    defaultEvent = await testServer.post("/api/v1/event/").send({
      account_id: secondaryAccountId, 
      name: "defaultEventAddress", 
      in_room :false,
      date_end: "2023-10-10 10:10:10", 
      date_start: "2023-10-10 10:10:10", 
      description:"description", 
      is_virtual: true, 
      video_url: "default.link", 
      is_published: true
    })   
    .set("Authorization", `Bearer ${secondaryAccountToken}`)
    defaultEvent = defaultEvent.body

    const eventAddress = new EventAddress(
      "(31)3131-3131",
      "00000-000",
      "complement",
      "city",
      "neighborhood",
      "123",
      "street",
      "uf",
      defaultEvent.id
    );
  
      defaultAddress = await new EventAddressKnexDBRepository().create(eventAddress)

  });

  describe("When user is not authenticated", ()=> {
    it('Should not create a address', async()=>{
      const result = await testServer
      .post(`/api/v1/event/${secondaryAccountId}/address`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     

    })

    it('Should not update a address', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/address/1`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should delete a address', async()=>{

      const result = await testServer
      .delete(`/api/v1/event/address/1`)
      .field({})
     
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should get one address', async()=>{
      const result = await testServer
      .get(`/api/v1/event/${defaultEvent.id}/address/`)     
      expect(result.status).toEqual(200)

    })
  })
  describe("When user is not admin", ()=> {
    it('Should not create a address', async()=>{
      const result = await testServer
      .post(`/api/v1/event/${secondaryAccountId}/address`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")   

    })

    it('Should not update a address', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/address/${defaultAddress.id}`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")    
    })
    it('Should not delete a address', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/address/${defaultAddress.id}`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")     
    })

  })

  describe("When user is authenticated and is an admin", () => { 
    
    it('Should successfully create a address', async()=>{
      const resultEvent = await testServer.post("/api/v1/event/").send({
        account_id: secondaryAccountId, 
        name: "MyEventAddress", 
        in_room :false,
        date_end: "2023-10-10 10:10:10", 
        date_start: "2023-10-10 10:10:10", 
        description:"description", 
        is_virtual: true, 
        video_url: "default.link", 
        is_published: true
      })   
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      const event = resultEvent.body

      const address = {
        event_id: event.id, 
        telephone: "(31)3131-3131",
        postal_code: "00000-333",
        complement: "complement",
        city: "createCity",
        neighborhood: "neighborhood",
        number: "123",
        street: "street",
        uf: "uf",
      }

      const result = await testServer
      .post(`/api/v1/event/${event.id}/address`)
      .send(address)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      expect(result.status).toEqual(201)
      expect(result.body.telephone).toEqual("(31)3131-3131")
      expect(result.body.street).toEqual("street")
      expect(result.body.number).toEqual("123")
    })

    it('Should successfully update a event', async()=>{
      const address = {
        event_id: secondaryAccountId, 
        telephone: "(31)3131-3131",
        postal_code: "00000-333",
        complement: "complement",
        city: "createCity",
        neighborhood: "updateNeighborhood",
        number: "123",
        street: "street",
        uf: "uf",
      }
      const result = await testServer
      .patch(`/api/v1/event/address/${defaultAddress.id}`)
      .send(address)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)     
      expect(result.status).toEqual(200)
      expect(result.body.neighborhood).toEqual("updateNeighborhood")
    })
    
    it('Should delete a event', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/address/${defaultAddress.id}`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`) 
      expect(result.statusCode).toEqual(200)
      expect(result.text).toEqual('{"message":"Address deleted successfully"}')     
    })

  });

});