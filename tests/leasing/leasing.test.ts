import { testServer } from "../jest.setup";
describe("Leasing", () => {

  let defaultAccountId = ''
  let defaultAccountToken = ''
  let secondaryAccountId = ''
  let secondaryAccountToken = ''

  let defaultLeasing: any
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
      name: "defaultEvent", 
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

    const leasing =    {
      name:"name",
      description:"description",
      isActive: true,
      store_price: 10,
      sale_price: 10,
      student_price: 10,
      units_solid: 10,
      units: 10,
      event_id: defaultEvent.id,
    }
    const result = await testServer
    .post(`/api/v1/event/${defaultEvent.id}/leasing`)
    .send(leasing)
    .set("Authorization", `Bearer ${secondaryAccountToken}`)
    defaultLeasing = result.body
  });

  describe("When user is not authenticated", ()=> {
    it('Should not create a leasing', async()=>{
      const result = await testServer
      .post(`/api/v1/event/1/leasing`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     

    })

    it('Should not update a leasing', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/leasing/1`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should delete a leasing', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/leasing/1`)
      .field({})
     
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should get one leasing', async()=>{
      const result = await testServer
      .get(`/api/v1/event/${defaultEvent.id}/leasing/`)     
      expect(result.status).toEqual(200)
    })
  })

  describe("When user is not admin", ()=> {
    it('Should not create a leasing', async()=>{
      const result = await testServer
      .post(`/api/v1/event/1/leasing`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")   
    })

    it('Should not update a leasing', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/leasing/1`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")    
    })
    it('Should not delete a leasing', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/leasing/1`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")     
    })

  })
  describe("When user is authenticated and is an admin", () => { 
    
    it('Should successfully create a leasing', async()=>{

      const leasing =    {
        name:"name",
        description:"description",
        isActive: true,
        store_price: 10,
        sale_price: 10,
        student_price: 10,
        units_solid: 10,
        units: 10,
        event_id: defaultEvent.id,
      }
      const result = await testServer
      .post(`/api/v1/event/${defaultEvent.id}/leasing`)
      .send(leasing)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      expect(result.status).toEqual(201)
      expect(result.body.sale_price).toEqual("10.00")
      expect(result.body.description).toEqual("description")
    })

    it('Should successfully update a leasing', async()=>{
      const leasing =    {
        name:"changeName",
        description:"changeDescription",
        isActive: true,
        store_price: 10,
        sale_price: 10,
        student_price: 10,
        units_solid: 10,
        units: 10,
        event_id: defaultEvent.id,
      }
      const result = await testServer
      .patch(`/api/v1/event/leasing/${defaultLeasing.id}`)
      .send(leasing)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)     
      expect(result.status).toEqual(200)
      expect(result.body.description).toEqual("changeDescription")
      expect(result.body.name).toEqual("changeName")
    })
    
    it('Should delete a leasing', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/leasing/${defaultLeasing.id}`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`) 
      expect(result.statusCode).toEqual(200)
      expect(result.text).toEqual('{"message":"Leasing deleted successfully!"}')     
    })

  });
});