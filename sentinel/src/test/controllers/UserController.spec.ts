import sinon, { SinonSpy, SinonStub, SinonStubbedInstance } from "sinon";
import { UserController } from "../../controllers/UserControllers"
import { UserService } from "../../services/UserService";
import { Request } from "express";

describe('UserController', () => {
  let userController: UserController;
  let userServiceStub: SinonStubbedInstance<UserService>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  beforeEach(() => {
    userServiceStub = sinon.createStubInstance(UserService);
    userController = new UserController();
    req = {
      user: { displayName: 'Test User', id: "abc123" },
      body: {},
    }
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
      send: sinon.spy(),
    }  as any 
  })
})
