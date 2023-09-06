import { testServer } from "../jest.setup";
describe("Image", () => {
  let defaultAccountId = ''
  let defaultAccountToken = ''
  let secondaryAccountId = ''
  let secondaryAccountToken = ''

  let defaultImage: any
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

    const image =    {
      alt_text: "alt",
      event_id: defaultEvent.id,
    }
    const result = await testServer
    .post(`/api/v1/event/${defaultEvent.id}/image`)
    .field(image)
    .attach("url", `tests/category/url.jpg`)
    .set("Authorization", `Bearer ${secondaryAccountToken}`)
    defaultImage = result.body
  });

  describe("When user is not authenticated", ()=> {
    it('Should not create a image', async()=>{
      const result = await testServer
      .post(`/api/v1/event/1/image`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     

    })

    it('Should not update a image', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/image/1`)
      .field({})
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should delete a image', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/image/1`)
      .field({})
     
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should get one image', async()=>{
      const result = await testServer
      .get(`/api/v1/event/${defaultEvent.id}/image/`)     
      expect(result.status).toEqual(200)
    })
  })

  describe("When user is not admin", ()=> {
    it('Should not create a image', async()=>{
      const result = await testServer
      .post(`/api/v1/event/1/image`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")   
    })

    it('Should not update a image', async()=>{
      const result = await testServer
      .patch(`/api/v1/event/image/1`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")    
    })
    it('Should not delete a image', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/image/1`)
      .field({})
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")     
    })

  })

  describe("When user is authenticated and is an admin", () => { 
    
    it('Should successfully create a image', async()=>{

      const image =    {
        alt_text: "alt",
        event_id: defaultEvent.id,
      }
      const result = await testServer
      .post(`/api/v1/event/${defaultEvent.id}/image`)
      .field(image)
      .attach("url", `tests/category/url.jpg`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)
      expect(result.status).toEqual(201)
      expect(result.body.alt_text).toEqual("alt")
    })

    it('Should successfully update a image', async()=>{
      const image =    {
        alt_text: "altChange",
        event_id: defaultEvent.id,
      }
      const result = await testServer
      .patch(`/api/v1/event/image/${defaultImage.id}`)
      .field(image)
      .attach("url", `tests/category/url.jpg`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`)     
      expect(result.status).toEqual(200)
      expect(result.body.alt_text).toEqual("altChange")

    })
    
    it('Should delete a image', async()=>{
      const result = await testServer
      .delete(`/api/v1/event/image/${defaultImage.id}`)
      .set("Authorization", `Bearer ${secondaryAccountToken}`) 
      expect(result.statusCode).toEqual(200)
      expect(result.text).toEqual('{"message":"Image deleted successfully"}')     
    })

  });
});