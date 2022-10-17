import 'jest';

const email = 'test1@gmail.com';
const gps = 'gps_logs.csv';
const distance = 12;
const start = new Date();
const end = new Date();
const path = 'testName';
const favourite = true;
const viewed = false;
const insert = new Date();
const mockHike = { email, gps, distance, start, end, path, favourite, viewed, insert };

describe('Auth', () => {
    let getAllHikes;
    let getAHike;
    let getGPSLogs;
    let getAllMemosForHike;
    let getImageUrl;
    let getAudioUrl;
    let deleteAHike;
    let updateHikeName;
    let updateHikeDistance;
    let favouriteAHike;
    let updateHikeViewedStatus;

    beforeEach(()=> {
        getAllHikes = jest.fn().mockReturnValue([mockHike]);
        getAHike = jest.fn().mockReturnValue([mockHike]);
        getGPSLogs = jest.fn().mockReturnValue([mockHike]);
        getAllMemosForHike = jest.fn().mockReturnValue([mockHike]);
        getImageUrl = jest.fn().mockReturnValue([mockHike]);
        getAudioUrl = jest.fn().mockReturnValue([mockHike]);
        deleteAHike = jest.fn().mockReturnValue([mockHike]);
        updateHikeName = jest.fn().mockReturnValue([mockHike]);
        updateHikeDistance = jest.fn().mockReturnValue([mockHike]);
        favouriteAHike = jest.fn().mockReturnValue([mockHike]);
        updateHikeViewedStatus = jest.fn().mockReturnValue([mockHike]);
    });

    it('should getAllHikes', async () => {
        const res = getAllHikes();

        expect(res).toEqual([mockHike]);
    });

    it('should getAHike', async () => {
        const res = getAHike();

        expect(res).toEqual([mockHike]);
    });

    it('should getGPSLogs', async () => {
        const res = getGPSLogs();

        expect(res).toEqual([mockHike]);
    });

    it('should getAllMemosForHike', async () => {
        const res = getAllMemosForHike();

        expect(res).toEqual([mockHike]);
    });

    it('should getImageUrl', async () => {
        const res = getImageUrl();

        expect(res).toEqual([mockHike]);
    });

    it('should getAudioUrl', async () => {
        const res = getAudioUrl();

        expect(res).toEqual([mockHike]);
    });
    
    it('should deleteAHike', async () => {
        const res = deleteAHike();

        expect(res).toEqual([mockHike]);
    });

    it('should updateHikeName', async () => {
        const res = updateHikeName();

        expect(res).toEqual([mockHike]);
    });

    it('should updateHikeDistance', async () => {
        const res = updateHikeDistance();

        expect(res).toEqual([mockHike]);
    });

    it('should favouriteAHike', async () => {
        const res = favouriteAHike();

        expect(res).toEqual([mockHike]);
    });

    it('should updateHikeViewedStatus', async () => {
        const res = updateHikeViewedStatus();

        expect(res).toEqual([mockHike]);
    });
});
