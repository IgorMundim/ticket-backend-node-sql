import { testServer } from "../jest.setup";
import { CategoryKnexDBRepository } from "../../src/repositories/categoryKnexDBRepository";
import { Category } from "../../src/models/Category";

describe("Category", () => {

  let defaultAccountId = ''
  let defaultAccountToken = ''
  let adminAccountId = ''
  let adminAccountToken = ''
  let defaultCategory: any

  
  beforeAll(async () => {
    defaultCategory = new Category("categoryName", true, "place.com", "place")
    await defaultCategory.toJson()
    defaultCategory = await new CategoryKnexDBRepository().create(defaultCategory)

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

  });

  describe("When user is not authenticated", ()=> {
    it('Should not create a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "newCategory", 
      }
      const result = await testServer
      .post(`/api/v1/event/category/`)
      .field(category)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     

    })

    it('Should not update a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "updateCategory", 
      }
      const result = await testServer
      .patch(`/api/v1/event/category/${defaultCategory.id}`)
      .field(category)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should delete a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "updateCategory", 
      }
      const result = await testServer
      .delete(`/api/v1/event/category/${defaultCategory.id}`)
      .field(category)
     
      expect(result.status).toEqual(401)
      expect(result.text).toEqual('{"message":"Token is missing"}')     
    })
    it('Should get one category', async()=>{
      const result = await testServer
      .get(`/api/v1/event/category/${defaultCategory.id}`)     
      expect(result.status).toEqual(200)
      expect(result.body.name).toEqual("categoryName")
      expect(result.body.is_active).toEqual(true)
      expect(result.body.alt_text).toEqual("place")
    })
    it('Should get all category', async()=>{
      const result = await testServer
      .get(`/api/v1/event/category/`)     
      expect(result.status).toEqual(200)
      expect(result.body).toEqual(expect.objectContaining({}))
    })

  })
  describe("When user is not authenticated", ()=> {
    it('Should not create a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "newCategory", 
      }
      const result = await testServer
      .post(`/api/v1/event/category/`)
      .field(category)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")   

    })

    it('Should not update a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "updateCategory", 
      }
      const result = await testServer
      .patch(`/api/v1/event/category/${defaultCategory.id}`)
      .field(category)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")    
    })
    it('Should not delete a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "updateCategory", 
      }
      const result = await testServer
      .delete(`/api/v1/event/category/${defaultCategory.id}`)
      .field(category)
      .set("Authorization", `Bearer ${defaultAccountToken}`)
      expect(result.status).toEqual(401)
      expect(result.text).toEqual("{\"message\":\"You don't have admin permission!\"}")     
    })

  })

  describe("When user is authenticated and is an admin", () => { 
    
    it('Should successfully create a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "newCategory", 
      }
      const result = await testServer
      .post(`/api/v1/event/category/`)
      .field(category)
      .attach("url", `tests/category/url.jpg`)
      .set("Authorization", `Bearer ${adminAccountToken}`)
      expect(result.status).toEqual(201)
      expect(result.body.name).toEqual("newCategory")
      expect(result.body.is_active).toEqual(true)
      expect(result.body.alt_text).toEqual("place")
    })

    it('Should successfully update a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "updateCategory", 
      }
      const result = await testServer
      .patch(`/api/v1/event/category/${defaultCategory.id}`)
      .field(category)
      .attach("url", `tests/category/url.jpg`)
      .set("Authorization", `Bearer ${adminAccountToken}`)     
      expect(result.status).toEqual(200)
      expect(result.body.name).toEqual("updateCategory")
      expect(result.body.is_active).toEqual(true)
      expect(result.body.alt_text).toEqual("place")
    })
    
    it('Should delete a category', async()=>{
      const category = {
        alt_text: "place",
        is_active:true,
        name: "updateCategory", 
      }
      const result = await testServer
      .delete(`/api/v1/event/category/${defaultCategory.id}`)
      .field(category)
      .set("Authorization", `Bearer ${adminAccountToken}`)     
      expect(result.status).toEqual(200)
      expect(result.text).toEqual('{"message":"Category deleted successfully"}')     
    })

  });
});