const moment: any = jest.genMockFromModule('moment');

const mockedUtc = jest.fn();
const mockedFormat = jest.fn();

const mockedMoment = {
    utc: mockedUtc,
    format: mockedFormat,
};

moment.utc = () => mockedUtc.mockImplementation(() => mockedMoment).mockReturnThis();

// moment.utc = () => jest.fn(() => ({
//     format: () => jest.fn((format: string) => null)
// })).mockReturnThis()

moment.format = () => mockedFormat;


module.exports = moment;