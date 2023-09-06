import { testServer } from "../jest.setup";
import { Event } from '../../src/models/Event'
import {EventKnexDBRepository} from "../../src/repositories/eventKnexDBRepository"

describe("Event", () => {
  let defaultAccountId = ''
  let defaultAccountToken = ''
  let adminAccountId = ''
  let adminAccountToken = ''
  let defaultEvent: any
  beforeAll(async () => {
    
    const getCredential = await testServer.post("/api/v1/account/login").send({
      email: "default@email.com",
      password: "@Abc12345",
    });

    defaultAccountId = getCredential.body.refreshToken.account_id;
    defaultAccountToken = getCredential.body.token

    const getAdminCredential = await testServer.post("/api/v1/account/login").send({
      email: "secondary@email.com",
      password: "@Abc12345",
    });

    adminAccountId = getAdminCredential.body.refreshToken.account_id;
    adminAccountToken = getAdminCredential.body.token
   
    defaultEvent = await testServer.post("/api/v1/event/").send({
      account_id: defaultAccountId, 
      name: "defaultevent", 
      in_room :false,
      date_end: "2023-10-10 10:10:10", 
      date_start: "2023-10-10 10:10:10", 
      description:"description", 
      is_virtual: true, 
      video_url: "default.link", 
      is_published: true
    })   
    .set("Authorization", `Bearer ${adminAccountToken}`)
    defaultEvent = defaultEvent.body
  });

  describe("When user is not authenticated", ()=> {
    it('Should not create a event', async()=>{
      const result = await testServer
      .post(`/api/v1/event/`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     

    })

    it('Should not update a event', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/1`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should delete a event', async()=>{

      const result = await testServer
      .delete(`/api/v1/event/1`)
      .field({})
     
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should get one event', async()=>{
      const result = await testServer
      .get(`/api/v1/event/${defaultEvent.id}`)     
      expect(result.status).toEqual(200)
      expect(result.body.name).toEqual("defaultevent")
      expect(result.body.is_published).toEqual(true)
      expect(result.body.video_url).toEqual("default.link", )
      expect(result.body.in_room).toEqual(false)

    })
    it('Should get all event', async()=>{
      const result = await testServer
      .get(`/api/v1/event/`)     
      expect(result.status).toEqual(200)
      expect(result.body).toEqual(expect.objectContaining({}))
    })
  })
  describe("When user is not admin", ()=> {
    it('Should not create a event', async()=>{
      const result = await testServer
      .post(`/api/v1/event/`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")   

    })

    it('Should not update a event', async()=>{

      const result = await testServer
      .patch(`/api/v1/event/category/${defaultEvent.id}`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")    
    })
    it('Should not delete a event', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/category/${defaultEvent.id}`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")     
    })

  })

  describe("When user is authenticated and is an admin", () => { 
    
    it('Should successfully create a event', async()=>{
      const event = {
        account_id: defaultAccountId, 
        name: "newEvent", 
        in_room :false,
        date_end: "2023-10-10 10:10:10", 
        date_start: "2023-10-10 10:10:10", 
        description:"description", 
        is_virtual: true, 
        video_url: "default.link", 
        is_published: true
      }
      const result = await testServer
      .post(`/api/v1/event/`)
      .send(event)
      .set("Authorization", `Bearer ${adminAccountToken}`)
      expect(result.status).toEqual(201)
      expect(result.body.name).toEqual("newEvent")
      expect(result.body.in_room).toEqual(false)
      expect(result.body.description).toEqual("description")
    })

    it('Should successfully update a event', async()=>{
      const event = {
        id: defaultEvent.id,
        account_id: defaultAccountId, 
        name: "updateEvent", 
        in_room :false,
        date_end: "2023-10-10 10:10:10", 
        date_start: "2023-10-10 10:10:10", 
        description:"description", 
        is_virtual: true, 
        video_url: "default.link", 
        is_published: true
      }
      const result = await testServer
      .patch(`/api/v1/event/${defaultEvent.id}/`)
      .send(event)
      .set("Authorization", `Bearer ${adminAccountToken}`)     
      expect(result.status).toEqual(200)
      expect(result.body.name).toEqual("updateEvent")
    })
    
    it('Should delete a event', async()=>{

      const result = await testServer
      .delete(`/api/v1/event/${defaultEvent.id}`)
      .set("Authorization", `Bearer ${adminAccountToken}`) 
      expect(result.statusCode).toEqual(200)
      expect(result.text).toEqual('{"message":"Event deleted successfully!"}')     
    })

  });
});