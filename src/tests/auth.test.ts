import 'jest';

const name = 'test';
const username = 'test1@gmail.com';
const password = 'test';
const mockUser = { name, username, password };

describe('Hike', () => {
    let getUser;
    let checkEmailExist;
    let addNewUser;

    beforeEach(()=> {
        getUser = jest.fn().mockReturnValue([mockUser]);
        checkEmailExist = jest.fn().mockReturnValue([mockUser]);
        addNewUser = jest.fn().mockReturnValue([mockUser]);
    });

    it('should get user', async () => {
        const res = getUser();

        expect(res).toEqual([mockUser]);
    });

    it('should check email exist for user', async () => {
        const res = checkEmailExist();

        expect(res).toEqual([mockUser]);
    });

    it('should check email exist for user', async () => {
        const res = addNewUser();

        expect(res).toEqual([mockUser]);
    });
});
