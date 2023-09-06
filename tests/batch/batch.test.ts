import { testServer } from "../jest.setup";
import { BatchKnexDBRepository } from "../../src/repositories/batchKnexDBRepository";

import { Batch } from "../../src/models/Batch";
describe("Batch", () => {

  let defaultAccountId = ''
  let defaultAccountToken = ''
  let secondaryAccountId = ''
  let secondaryAccountToken = ''

  let defaultBatch: any
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

    const batch = {
      percentage: "10", 
      sales_qtd: 10,
      batch_stop_date: "2023-10-10 10:10:10",
      description: "description",
      is_active: true,
      event_id: defaultEvent.id,
    }

    const result = await testServer
    .post(`/api/v1/event/${defaultEvent.id}/batch`)
    .send(batch)
    .set("Authorization", `Bearer ${secondaryAccountToken}`)
  
    defaultBatch = result.body

  });

  describe("When user is not authenticated", ()=> {
    it('Should not create a batch', async()=>{
      const result = await testServer
      .post(`/api/v1/event/${secondaryAccountId}/batch`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     

    })

    it('Should not update a batch', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/batch/1`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should delete a batch', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/batch/1`)
      .field({})
     
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should get one batch', async()=>{
      const result = await testServer
      .get(`/api/v1/event/${defaultEvent.id}/batch/`)     
      expect(result.status).toEqual(200)
    })
  })
  describe("When user is not admin", ()=> {
    it('Should not create a batch', async()=>{
      const result = await testServer
      .post(`/api/v1/event/${secondaryAccountId}/batch`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")   
    })

    it('Should not update a batch', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/batch/1`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")    
    })
    it('Should not delete a batch', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/batch/1`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")     
    })

  })

  describe("When user is authenticated and is an admin", () => { 
    
    it('Should successfully create a batch', async()=>{
      // const resultEvent = await testServer.post("/api/v1/event/").send({
      //   account_id: secondaryAccountId, 
      //   name: "MyEventevent", 
      //   in_room :false,
      //   date_end: "2023-10-10 10:10:10", 
      //   date_start: "2023-10-10 10:10:10", 
      //   description:"description", 
      //   is_virtual: true, 
      //   video_url: "default.link", 
      //   is_published: true
      // })   
      // .set("Authorization", `Bearer ${secondaryAccountToken}`)
      // const event = resultEvent.body

      const batch = {
        percentage: "10", 
        sales_qtd: 15,
        batch_stop_date: "2023-10-12 10:10:10",
        description: "description",
        is_active: true,
        event_id: defaultEvent.id,
      }

      const result = await testServer
      .post(`/api/v1/event/${defaultEvent.id}/batch`)
      .send(batch)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      expect(result.status).toEqual(201)
      expect(result.body.sales_qtd).toEqual(15)
      expect(result.body.description).toEqual("description")
    })

    it('Should successfully update a batch', async()=>{
      const batch = {
        event_id: defaultEvent.id, 
        percentage: "10", 
        sales_qtd: 10,
        batch_stop_date: "2023-10-10 10:10:10",
        description: "newDescription",
        is_active: true,
      }
      const result = await testServer
      .patch(`/api/v1/event/batch/${defaultBatch.id}`)
      .send(batch)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)     
      expect(result.status).toEqual(200)
      expect(result.body.description).toEqual("newDescription")
    })
    
    it('Should delete a batch', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/batch/${defaultBatch.id}`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`) 
      expect(result.statusCode).toEqual(200)
      expect(result.text).toEqual('{"message":"Batch deleted successfully"}')     
    })

  });
});

